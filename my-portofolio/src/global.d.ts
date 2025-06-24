import { ReactThreeFiber } from "@react-three/fiber";

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
      card: Mesh;
      clip: Mesh;
      clamp: Mesh;
    };
    materials: {
      metal: MeshStandardMaterial;
    };
  };
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: ReactThreeFiber.Object3DNode<
        MeshLineGeometry,
        typeof MeshLineGeometry
      >;
      meshLineMaterial: ReactThreeFiber.Object3DNode<
        MeshLineMaterial,
        typeof MeshLineMaterial
      >;
    }
  }
}
