import p5 from "p5";
import { useRef, useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { Box, Button, Flex, Select } from "@mantine/core";
import Scene from "./sceneCreator/core/scene";
import { getScene, sceneList } from "./sceneCreator/scenes/sceneList";
import SettingsDisplay from "./sceneCreator/ui/SettingsDisplay";
import { SceneSettings } from "./sceneCreator/core/types";
import { updateSceneSetting } from "./sceneCreator/core/updateSceneSetting";

function App() {
  const scenes = Object.keys(sceneList);
  const [sceneSelection, setSceneSelection] = useState(scenes[0]);
  // get the default settings for the first scene
  const [sceneSettings, setSceneSettings] = useState<SceneSettings>(
    getScene(scenes[0]).getDefaultSettings() as SceneSettings
  );

  const canvasWidth = 350;
  const canvasHeight = 350;

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentScene = getScene(sceneSelection);
    let texture: p5.Image;
    let camera: p5.Camera;

    // move these to the scenes
    const fps = 85;
    const totalFrames = 100;

    const sketch = (p: p5) => {
      p.preload = () => {
        // texture = p.loadImage("/a.jpg");
      };

      p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
        p.frameRate(fps);
        p.noStroke();
        p.normalMaterial();
        camera = p.createCamera();
      };

      p.draw = () => {
        p.orbitControl(6);
        p.background(20);
        // p.texture(texture);

        const progress = ((p.frameCount - 1) % totalFrames) / totalFrames;

        currentScene.draw(p, progress, sceneSettings);
      };
    };

    const p5Sketch = new p5(sketch, previewRef.current!);

    return () => {
      p5Sketch.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneSelection]);

  const handleSceneChange = (value: string | null) => {
    if (value == null) return;
    setSceneSelection(value);
    setSceneSettings(getScene(value).getDefaultSettings() as SceneSettings);
  };

  const handleSceneSettingUpdate = (
    path: [keyof SceneSettings, ...string[]],
    value: unknown
  ) => {
    const updatedSettings = updateSceneSetting(sceneSettings, path, value);
    setSceneSettings(updatedSettings);
  };

  return (
    <Box
      style={{
        minWidth: "1200px",
        minHeight: "600px",
        width: "100%",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Flex
        p="md"
        gap="xl"
        align="flex-start"
        justify="center"
        style={{ minHeight: "100%" }}
      >
        <Box
          style={{
            minWidth: "350px",
            padding: "32px 16px",
            height: "100%",
          }}
        >
          <Box ref={previewRef} w={canvasWidth} h={canvasHeight} mt={20} />
          <Button mt="md" fullWidth w={canvasWidth}>
            Download GIF
          </Button>
        </Box>

        <Box
          style={{
            flex: 1,
            minWidth: "500px",
            maxWidth: "1100px",
            padding: "16px",
            overflowY: "auto",
            height: "100%",
          }}
        >
          <Select
            data={scenes}
            value={sceneSelection}
            onChange={handleSceneChange}
            allowDeselect={false}
            mb="xl"
            w="100%"
            searchable
            nothingFoundMessage="Nothing found..."
          />

          <SettingsDisplay
            sceneSettings={sceneSettings}
            handleSceneSettingUpdate={handleSceneSettingUpdate}
          />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
