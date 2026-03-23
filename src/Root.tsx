import React from "react";
import { Composition } from "remotion";
import { SeletividadeAlimentar } from "./SeletividadeAlimentar";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SeletividadeAlimentar"
        component={SeletividadeAlimentar}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
