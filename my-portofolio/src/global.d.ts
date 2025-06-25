import * as THREE from "three";

export {};

declare module "*.glb";
declare module "*.png";

declare module "meshline" {
  import { BufferGeometry, Material, Texture, Vector3 } from "three";

  export class MeshLineGeometry extends BufferGeometry {
    setPoints(points: Vector3[]): void;
  }

  export class MeshLineMaterial extends Material {
    constructor(options?: {
      color?: string;
      depthTest?: boolean;
      resolution?: [number, number];
      useMap?: boolean;
      map?: Texture;
      repeat?: [number, number];
      lineWidth?: number;
    });
  }
}

declare global {
  type GLTFResult = {
    nodes: {
      card: THREE.Mesh;
      clip: THREE.Mesh;
      clamp: THREE.Mesh;
    };
    materials: {
      metal: THREE.MeshStandardMaterial;
    };
  };
}
