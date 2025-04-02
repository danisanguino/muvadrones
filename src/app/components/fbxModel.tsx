import { IFbxModel } from '../interfaces/interfaces';
import { useFBX } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


export default function FbxModel( {url}: IFbxModel) {
  const fbx = useFBX(url);
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight />
      <directionalLight position={[2, 2, 2]} />
      <primitive object={fbx} scale={0.01} />
      <OrbitControls />
    </Canvas>
  );
}