import p5 from "p5";
import { useRef, useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { Grid, Select } from "@mantine/core";
import SphereScene from "./sceneCreator/scenes/sphereScene";
import CubeScene from "./sceneCreator/scenes/CubeScene";
import Scene from "./sceneCreator/core/scene";
import { sceneList } from "./sceneCreator/scenes/sceneList";
import PlanetScene from "./sceneCreator/scenes/planetScene";
import SettingsDisplay from "./sceneCreator/ui/SettingsDisplay";
import { SceneSettings } from "./sceneCreator/core/types";

function App() {
  const scenes = Object.keys(sceneList);
  const [sceneSelection, setSceneSelection] = useState(scenes[0]);
  // consider making a type for this
  const sceneRef = useRef<Scene<unknown> | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // temp function, move to another file and use registry
  const getScene = (value: string): Scene<unknown> => {
    if (value.toLowerCase() === "sphere") {
      return new SphereScene();
    } else if (value.toLowerCase() === "cube") {
      return new CubeScene();
    } else {
      return new PlanetScene();
    }
  };

  useEffect(() => {
    sceneRef.current = getScene(sceneSelection);

    // move these to the scenes
    let texture: p5.Image;
    const fps = 25;
    const totalFrames = 50;

    const sketch = (p: p5) => {
      p.preload = () => {
        // texture = p.loadImage("/a.gif");
      };

      p.setup = () => {
        p.createCanvas(350, 350, p.WEBGL);
        p.frameRate(fps);
        p.noStroke();
        p.normalMaterial();
      };

      p.draw = () => {
        p.orbitControl();
        p.background(20);

        const progress = ((p.frameCount - 1) % totalFrames) / totalFrames;
        // p.texture(texture);
        sceneRef.current!.draw(p, progress);
      };
    };

    const p5Sketch = new p5(sketch, previewRef.current!);

    return () => {
      p5Sketch.remove();
    };
  }, [sceneSelection]);

  const handleSceneChange = (value: string | null) => {
    if (value == null) return;
    setSceneSelection(value);
  };

  return (
    <Grid h="100vh" gutter="md" style={{ minWidth: "1200px" }}>
      <Grid.Col span={4}>
        <div ref={previewRef}></div>
      </Grid.Col>
      <Grid.Col span={8}>
        <Select
          data={scenes}
          value={sceneSelection}
          onChange={handleSceneChange}
        />

        {/* {JSON.stringify(sceneRef.current?.getDefaultSettings(), null, 2)} */}
        {sceneRef.current && (
          <SettingsDisplay
            sceneSettings={sceneRef.current.settings as SceneSettings}
          />
        )}
      </Grid.Col>
    </Grid>
  );
}

export default App;
