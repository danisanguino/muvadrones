"use client";

import { IFbxModel } from "../interfaces/interfaces";
import { useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";

function FbxContent({ url }: IFbxModel) {
  const fbx = useLoader(FBXLoader, url) as THREE.Object3D;
  
  useEffect(() => {
    return () => {
      // 🧹 Limpieza de recursos al desmontar
      fbx.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).geometry) {
          ((child as THREE.Mesh).geometry as THREE.BufferGeometry).dispose();
        }
        if ((child as THREE.Mesh).material) {
          const material = (child as THREE.Mesh).material as THREE.Material | THREE.Material[];
          if (Array.isArray(material)) {
        material.forEach((mat: THREE.Material) => mat.dispose());
          } else {
        material.dispose();
          }
        }
      });

      // 🔄 Limpia la caché del loader
      useLoader.clear(FBXLoader, url);
    };
  }, [fbx, url]);

  return <primitive object={fbx} scale={0.01} />;
}

export default function FbxModel({ url }: IFbxModel) {
  if (!url) return null; 
  return (
    <div>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <FbxContent url={url} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
