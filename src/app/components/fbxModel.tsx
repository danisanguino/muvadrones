"use client";

import { IFbxModel } from "../interfaces/interfaces";
import { useFBX } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

function FbxContent({ url }: IFbxModel) {
  const fbx = useFBX(url);
  return <primitive object={fbx} scale={0.01} />;
}

export default function FbxModel({ url }: IFbxModel) {
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
