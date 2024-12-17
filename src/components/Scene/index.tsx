"use client";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Models from "./models";
import Logo from "./logo";
import { Suspense } from "react";
import Animations from "./camera/Animations";
import ShowingCanvas from "../ShowingCanvas";

const SOCoffeScene = () => {
  return (
    <div className="fixed w-screen h-screen canvas-wrapper opacity-0 ">
      <ShowingCanvas />
      <Loader
        containerStyles={{
          backgroundColor: "rgba(255, 255, 255, 1)",
          minWidth: "100px",
          borderRadius: "50%",
        }}
        innerStyles={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
        barStyles={{
          backgroundColor: "#000000",
        }}

        // dataStyles={{ color: "rgba(11, 0, 20, 1)", fontFamily: "Satoshi" }}
        // dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}
      />

      <Canvas
        shadows
        className="h-full w-full"
        flat
        camera={{ fov: 60, position: [-2, 0, 10], near: 0.1, far: 500 }}
        dpr={[1, 2]}
        gl={{
          powerPreference: "high-performance",
        }}
      >
        {/* <OrbitControls /> */}

        <Suspense>
          {/* <Perf position={"top-left"} /> */}

          <Logo />
          <Models />
        </Suspense>
        <Animations />
        <ambientLight />
      </Canvas>
    </div>
  );
};

export default SOCoffeScene;
