import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { SeletividadeVideo } from "./SeletividadeVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SeletividadeAlimentar"
        component={SeletividadeVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
