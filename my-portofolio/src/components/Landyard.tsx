"use client";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Canvas, extend, useFrame, ThreeEvent } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import type { RapierRigidBody, RigidBodyProps } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

import "../app/Landyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  start?: boolean;
}

interface LerpableRigidBody extends RapierRigidBody {
  lerped?: THREE.Vector3;
}

useGLTF.preload("/landyard/card.glb");

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  start = false,
}: LanyardProps) {
  if (!start) return null;
  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />

        {start && (
          <Physics gravity={gravity} timeStep={1 / 60}>
            <Band />
          </Physics>
        )}

        <Environment blur={0.75} preset="city">
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
}: {
  maxSpeed?: number;
  minSpeed?: number;
}) {
  const band = useRef<THREE.Mesh>(null!);

  const fixed = useRef<LerpableRigidBody>(null);
  const j1 = useRef<LerpableRigidBody>(null);
  const j2 = useRef<LerpableRigidBody>(null);
  const j3 = useRef<LerpableRigidBody>(null);
  const card = useRef<LerpableRigidBody>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: RigidBodyProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(
    "/landyard/card.glb"
  ) as unknown as GLTFResult;

  const photoTexture = useTexture("/landyard/photo2.png");
  photoTexture.flipY = false; // Memastikan tekstur tidak terbalik secara vertikal

  // Membuat tekstur untuk tali dengan tulisan "Can Saragih"
  const textTexture = useRef(
    new THREE.CanvasTexture(generateTextCanvas())
  ).current;

  function generateTextCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "bold 65px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Can Saragih", canvas.width / 2, canvas.height / 2);
    return canvas;
  }

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  const [isSmall, setIsSmall] = useState<boolean>(() => {
    if (typeof window !== "undefined") return window.innerWidth < 1024;
    return false;
  });

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useRopeJoint(
    fixed as React.RefObject<RapierRigidBody>,
    j1 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1]
  );
  useRopeJoint(
    j1 as React.RefObject<RapierRigidBody>,
    j2 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1]
  );
  useRopeJoint(
    j2 as React.RefObject<RapierRigidBody>,
    j3 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1]
  );
  useSphericalJoint(
    j3 as React.RefObject<RapierRigidBody>,
    card as React.RefObject<RapierRigidBody>,
    [
      [0, 0, 0],
      [0, 1.45, 0],
    ]
  );

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current &&
      band.current
    ) {
      [j1, j2].forEach((ref) => {
        if (!ref.current!.lerped) {
          ref.current!.lerped = new THREE.Vector3().copy(
            ref.current!.translation()
          );
        }

        const clampedDistance = Math.max(
          0.1,
          Math.min(
            1,
            ref.current!.lerped.distanceTo(ref.current!.translation())
          )
        );

        ref.current!.lerped.lerp(
          ref.current!.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      if (
        j1.current.lerped &&
        j2.current.lerped &&
        j3.current &&
        fixed.current &&
        card.current
      ) {
        curve.points[0].copy(j3.current.translation());
        curve.points[1].copy(j2.current.lerped);
        curve.points[2].copy(j1.current.lerped);
        curve.points[3].copy(fixed.current.translation());
        (band.current.geometry as unknown as MeshLineGeometry).setPoints(
          curve.getPoints(32)
        );

        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());
        card.current.setAngvel(
          { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
          true
        );
      }
    }
  });

  curve.curveType = "chordal";
  photoTexture.wrapS = photoTexture.wrapT = THREE.ClampToEdgeWrapping;
  photoTexture.rotation = 0; // Memastikan tidak ada rotasi tambahan
  photoTexture.offset.set(0, 0); // Memastikan offset tidak menggeser gambar
  photoTexture.center.set(0.5, 0.5);
  textTexture.wrapS = textTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.8, 0.01]} />{" "}
          {/* Memperpanjang tinggi kartu lebih banyak */}
          <group
            scale={[3.4, 3.4, 3.4]} // 🔧 Membesarkan hanya kartu (bisa disesuaikan)
            position={[0, -2.65, -0.1]} // ⚠️ Sesuaikan agar posisi tidak tabrakan
            rotation={[0, 0, 0]} // Memastikan rotasi grup tidak membalik
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              (e.target as HTMLElement).releasePointerCapture(
                e.nativeEvent.pointerId
              );
              drag(false);
            }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              (e.target as HTMLElement).setPointerCapture(
                e.nativeEvent.pointerId
              );
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current!.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={photoTexture}
                clearcoat={1}
                clearcoatRoughness={0.1}
                roughness={0.7}
                metalness={0.6}
                reflectivity={0.5}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {React.createElement("meshLineGeometry", { attach: "geometry" })}
        {React.createElement("meshLineMaterial", {
          attach: "material",
          color: "white",
          depthTest: false,
          resolution: isSmall ? [1000, 2000] : [1000, 1000],
          useMap: true,
          map: textTexture,
          repeat: [-2.5, 1],
          lineWidth: 2.2,
        })}
      </mesh>
    </>
  );
}
