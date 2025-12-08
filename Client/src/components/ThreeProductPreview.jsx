// ThreeProductPreview.jsx
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Center, OrbitControls } from "@react-three/drei";

export default function ThreeProductPreview({ modelUrl }) {
  const Model = () => {
    const gltf = useGLTF(modelUrl);

    // Dispose geometry/materials on unmount to avoid leaks
    useEffect(() => {
      return () => {
        gltf.scene.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      };
    }, [gltf]);

    // Center the model so small assets (like avocado) are framed nicely
    return (
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    );
  };

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [2.8, 2.2, 4.2], fov: 45 }}
      style={{ width: "100%", height: "420px", borderRadius: "12px" }}
    >
      <Suspense fallback={<mesh />}>
        <ambientLight intensity={1.1} />
        <directionalLight intensity={1.4} position={[5, 5, 5]} />
        <Model />
        <OrbitControls enableZoom autoRotate autoRotateSpeed={2} />
      </Suspense>
    </Canvas>
  );
}