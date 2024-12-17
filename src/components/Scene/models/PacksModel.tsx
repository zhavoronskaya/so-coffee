import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Group, Material, Mesh, Object3D, Object3DEventMap } from "three";
import useApp from "@/hooks/useApp";

import ModelStandard1 from "./ModelWithStandardMaterialVer1";

gsap.registerPlugin(useGSAP);

type Props = {
  nodeTable: Object3D<Object3DEventMap>;
  nodePacksSalvador: Object3D<Object3DEventMap>;
  nodePacksRugabano: Object3D<Object3DEventMap>;
  nodePacksColumbia: Object3D<Object3DEventMap>;
};

const PacksModel = ({
  nodePacksSalvador,
  nodePacksRugabano,
  nodePacksColumbia,
  nodeTable,
}: Props) => {
  const app = useApp({
    watch: ["selectedCoffee", "hoveredCoffee", "modal"],
  });
  const javaRef = useRef<Group | null>(null);
  const salvadorRef = useRef<Group | null>(null);
  const rugbanoRef = useRef<Group | null>(null);
  // const tableRef = useRef<Group | null>(null);
  const javaMeshRef = useRef<Mesh | null>(null);
  const rugbanoMeshRef = useRef<Mesh | null>(null);
  const salvadorMeshRef = useRef<Mesh | null>(null);
  const tableMeshRef = useRef<Mesh | null>(null);

  useGSAP(
    () => {
      if (!javaRef.current) return;
      if (!salvadorRef.current) return;
      if (!rugbanoRef.current) return;

      const hoveredCoffee = app.state.hoveredCoffee;
      const tl = gsap.timeline();
      if (!app.state.modal) {
        tl.fromTo(
          salvadorRef.current.position,
          { y: salvadorRef.current.position.y },
          {
            y: hoveredCoffee === "salvador" ? 1 : 0,
            duration: 0.4,
            ease: hoveredCoffee === "salvador" ? "sine.in" : "bounce.out",
          },
          "<"
        );

        tl.fromTo(
          rugbanoRef.current.position,
          { y: rugbanoRef.current.position.y },
          {
            y: hoveredCoffee === "rugbano" ? 1 : 0,
            duration: 0.4,
            ease: hoveredCoffee === "rugbano" ? "sine.in" : "bounce.out",
          },
          "<"
        );

        tl.fromTo(
          javaRef.current.position,
          { y: javaRef.current.position.y },
          {
            y: hoveredCoffee === "java" ? 1 : 0,
            duration: 0.4,
            ease: hoveredCoffee === "java" ? "sine.in" : "bounce.out",
          },
          "<"
        );
      }
    },
    {
      dependencies: [app.state.hoveredCoffee, app.state.modal],
    }
  );

  useGSAP(
    () => {
      if (!javaRef.current) return;
      if (!salvadorRef.current) return;
      if (!rugbanoRef.current) return;

      if (!javaMeshRef.current) return;
      if (!salvadorMeshRef.current) return;
      if (!rugbanoMeshRef.current) return;
      if (!tableMeshRef.current) return;
      const rugabanoMaterial = rugbanoMeshRef.current.material as Material;
      const salvadorMaterial = salvadorMeshRef.current.material as Material;
      const javaMaterial = javaMeshRef.current.material as Material;
      const tableMaterial = tableMeshRef.current.material as Material;
      const selectedCoffee = app.state.selectedCoffee;

      const tl = gsap.timeline();

      tl.fromTo(
        javaRef.current.position,
        { x: javaRef.current.position.x, z: javaRef.current.position.z },
        {
          x: selectedCoffee === "java" ? 0 : 0,
          z: selectedCoffee === "java" ? 3 : 0,
          duration: 0.3,

          ease: "sine.in",
        }
      )
        .fromTo(
          rugabanoMaterial,
          {
            opacity: rugabanoMaterial.opacity,
          },
          {
            opacity: ["rugbano", null].includes(selectedCoffee) ? 1 : 0,
            onUpdate: () => {
              rugabanoMaterial.needsUpdate = true;
            },
            duration: 0.5,
            ease: "sine.in",
          },
          "<"
        )
        .fromTo(
          javaMaterial,
          {
            opacity: javaMaterial.opacity,
          },
          {
            opacity: ["java", null].includes(selectedCoffee) ? 1 : 0,
            onUpdate: () => {
              javaMaterial.needsUpdate = true;
            },
            duration: 0.5,
            ease: "sine.in",
          },
          "<"
        )
        .fromTo(
          salvadorMaterial,
          { opacity: salvadorMaterial.opacity },
          {
            opacity: ["salvador", null].includes(selectedCoffee) ? 1 : 0,
            onUpdate: () => {
              salvadorMaterial.needsUpdate = true;
            },
            duration: 0.5,

            ease: "sine.in",
          },
          "<"
        )
        .fromTo(
          tableMaterial,
          { opacity: tableMaterial.opacity },
          {
            opacity: selectedCoffee ? 0 : 1,
            onUpdate: () => {
              tableMaterial.needsUpdate = true;
            },
            duration: 0.5,

            onComplete: () => {
              selectedCoffee
                ? app.setState({
                    modal: { type: "coffee", coffeeId: selectedCoffee },
                  })
                : app.setState({
                    modal: null,
                  });
            },
            ease: "sine.in",
          },
          "<"
        )
        .fromTo(
          javaRef.current.scale,
          {
            x: javaRef.current.scale.x,
            y: javaRef.current.scale.y,
            z: javaRef.current.scale.z,
          },
          {
            x: selectedCoffee === "java" ? 1.1 : 1,
            y: selectedCoffee === "java" ? 1.1 : 1,
            z: selectedCoffee === "java" ? 1.1 : 1,
            duration: 0.3,
            ease: "sine.in",
          },
          "<"
        )
        .fromTo(
          javaRef.current.rotation,
          {
            x: javaRef.current.rotation.x,
            y: javaRef.current.rotation.y,
            z: javaRef.current.rotation.z,
          },
          {
            x: selectedCoffee === "java" ? Math.PI / 30 : 0,
            y: selectedCoffee === "java" ? Math.PI * 2.2 : 0,
            z: selectedCoffee === "java" ? 0 : 0,
            duration: 0.7,
            ease: "sine.in",
            onComplete: () => {
              app.setState({ hoveredCoffee: null });
            },
          },
          "<"
        );

      tl.fromTo(
        salvadorMeshRef.current.rotation,
        {
          x: salvadorMeshRef.current.rotation.x,
          y: salvadorMeshRef.current.rotation.y,
          z: salvadorMeshRef.current.rotation.z,
        },
        {
          x: selectedCoffee === "salvador" ? -Math.PI / 40 : 0,
          y: selectedCoffee === "salvador" ? -Math.PI * 1.82 : 0,
          z: selectedCoffee === "salvador" ? 0 : 0,
          duration: 0.7,
          ease: "sine.in",
        },
        "<"
      )
        .fromTo(
          salvadorRef.current.position,
          {
            x: salvadorRef.current.position.x,
            z: salvadorRef.current.position.z,
          },
          {
            x: selectedCoffee === "salvador" ? -7.2 : 0,
            z: selectedCoffee === "salvador" ? 3.7 : 0,
            duration: 0.3,

            ease: "sine.in",
          },
          "<"
        )
        .fromTo(
          salvadorRef.current.scale,
          {
            x: salvadorRef.current.scale.x,
            y: salvadorRef.current.scale.y,
            z: salvadorRef.current.scale.z,
          },
          {
            x: selectedCoffee === "salvador" ? 1.1 : 1,
            y: selectedCoffee === "salvador" ? 1.1 : 1,
            z: selectedCoffee === "salvador" ? 1.1 : 1,
            duration: 0.3,
            ease: "sine.in",
          },
          "<"
        )
        .fromTo(
          rugbanoRef.current.position,
          {
            y: rugbanoRef.current.position.y,
            z: rugbanoRef.current.position.z,
            x: rugbanoRef.current.position.x,
          },
          {
            z: selectedCoffee === "rugbano" ? 4 : 0,
            x: selectedCoffee === "rugbano" ? 7 : 0,
            duration: 0.3,

            ease: "sine.in",
          },
          "<"
        )
        .fromTo(
          rugbanoMeshRef.current.rotation,
          {
            x: rugbanoMeshRef.current.rotation.x,
            y: rugbanoMeshRef.current.rotation.y,
            z: rugbanoMeshRef.current.rotation.z,
          },
          {
            x: selectedCoffee === "rugbano" ? Math.PI / 40 : 0,
            y: selectedCoffee === "rugbano" ? Math.PI * 2.2 : 0,
            z: selectedCoffee === "rugbano" ? 0 : 0,

            duration: 0.7,

            ease: "sine.in",
          },
          "<"
        )
        .fromTo(
          rugbanoRef.current.scale,
          {
            x: rugbanoRef.current.scale.x,
            y: rugbanoRef.current.scale.y,
            z: rugbanoRef.current.scale.z,
          },
          {
            x: selectedCoffee === "rugbano" ? 1.1 : 1,
            y: selectedCoffee === "rugbano" ? 1.1 : 1,
            z: selectedCoffee === "rugbano" ? 1.1 : 1,
            duration: 0.3,
            ease: "sine.in",
          },
          "<"
        );
    },
    {
      dependencies: [app.state.selectedCoffee],
    }
  );

  //Group Opacity
  useGSAP(
    () => {
      if (!javaMeshRef.current) return;
      if (!salvadorMeshRef.current) return;
      if (!rugbanoMeshRef.current) return;
      if (!tableMeshRef.current) return;
      if (app.state.selectedCoffee) {
        return;
      }

      const tl = gsap.timeline();
      if (!app.state.modal) {
        tl.fromTo(
          javaMeshRef.current.material as Material,
          { opacity: 1 },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: ".section-4",
              start: "top bottom",
              end: "top 30%",
              scrub: 0.1,
            },
          },
          "<"
        )
          .fromTo(
            rugbanoMeshRef.current.material as Material,
            { opacity: 1 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: ".section-4",
                start: "top bottom",
                end: "top 30%",
                scrub: 0.1,
              },
            },
            "<"
          )
          .fromTo(
            salvadorMeshRef.current.material as Material,
            { opacity: 1 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: ".section-4",
                start: "top bottom",
                end: "top 30%",
                scrub: 0.1,
              },
            },
            "<"
          )
          .fromTo(
            tableMeshRef.current.material as Material,
            { opacity: 1 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: ".section-4",
                start: "top bottom",
                end: "top 30%",
                scrub: 0.1,
              },
            },
            "<"
          );
      }
    },
    { dependencies: [app.state.selectedCoffee, app.state.modal] }
  );
  return (
    <group>
      <ModelStandard1
        textureUrl={"/textures/tl.jpg"}
        node={nodeTable}
        alphaTest={0}
        castShadow={false}
        transparent={true}
        ref={tableMeshRef}
      />

      <group ref={javaRef}>
        <ModelStandard1
          textureUrl={"/textures/col.png"}
          node={nodePacksColumbia}
          alphaTest={0.9}
          transparent={true}
          castShadow={true}
          ref={javaMeshRef}
        />
      </group>

      <group ref={salvadorRef}>
        <ModelStandard1
          textureUrl={"/textures/salv.png"}
          node={nodePacksSalvador}
          alphaTest={0.9}
          transparent={true}
          castShadow={true}
          ref={salvadorMeshRef}
        />
      </group>

      <group ref={rugbanoRef}>
        <ModelStandard1
          textureUrl={"/textures/rug.png"}
          node={nodePacksRugabano}
          alphaTest={0.9}
          transparent={true}
          castShadow={true}
          ref={rugbanoMeshRef}
        />
      </group>
    </group>
  );
};

export default PacksModel;
