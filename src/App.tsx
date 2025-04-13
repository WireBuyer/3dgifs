import p5 from "p5";
import { useRef, useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { Grid, Select } from "@mantine/core";
import Scene from "./sceneCreator/core/scene";
import { getScene, sceneList } from "./sceneCreator/scenes/sceneList";
import SettingsDisplay from "./sceneCreator/ui/SettingsDisplay";
import { SceneSettings } from "./sceneCreator/core/types";

function App() {
  const scenes = Object.keys(sceneList);
  const [sceneSelection, setSceneSelection] = useState(scenes[0]);

  // consider making a type for this
  const [currentScene, setCurrentScene] = useState<Scene<unknown>>(() => {
    return getScene(sceneSelection);
  });
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        currentScene.draw(p, progress);
      };
    };

    const p5Sketch = new p5(sketch, previewRef.current!);

    return () => {
      p5Sketch.remove();
    };
  }, [currentScene]);

  const handleSceneChange = (value: string | null) => {
    if (value == null) return;
    setSceneSelection(value);
    setCurrentScene(getScene(value));
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
        {currentScene && (
          <SettingsDisplay
            sceneSettings={currentScene.settings as SceneSettings}
          />
        )}
      </Grid.Col>
    </Grid>
  );
}

export default App;
