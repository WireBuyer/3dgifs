import p5 from "p5";
import { useRef, useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { Box, Button, Flex, Select } from "@mantine/core";
import Scene from "./sceneCreator/core/scene";
import { getScene, sceneList } from "./sceneCreator/scenes/sceneList";
import SettingsDisplay from "./sceneCreator/ui/SettingsDisplay";
import { SceneSettings } from "./sceneCreator/core/types";
import { updateSceneSetting } from "./sceneCreator/ui/updateSceneSetting";

function App() {
  const scenes = Object.keys(sceneList);
  const [sceneSelection, setSceneSelection] = useState(scenes[1]);

  // consider making a type for this
  const [currentScene, setCurrentScene] = useState<Scene<unknown>>(() =>
    getScene(sceneSelection)
  );

  const [sceneSettings, setSceneSettings] = useState<SceneSettings>(
    currentScene.settings as SceneSettings
  );
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // move these to the scenes
    let texture: p5.Image;
    const fps = 50;
    const totalFrames = 100;

    const sketch = (p: p5) => {
      p.preload = () => {
        // texture = p.loadImage("/a.jpg");
      };

      p.setup = () => {
        p.createCanvas(350, 350, p.WEBGL);
        p.frameRate(fps);
        p.noStroke();
        p.normalMaterial();
      };

      p.draw = () => {
        p.orbitControl(5, 5, 5);
        p.background(20);

        const progress = ((p.frameCount - 1) % totalFrames) / totalFrames;
        // p.texture(texture);
        currentScene.draw(p, progress);
        // tempdraw(p, progress, texture);
      };
    };

    const p5Sketch = new p5(sketch, previewRef.current!);

    return () => {
      p5Sketch.remove();
    };
  }, [currentScene]);

  const handleSceneChange = (value: string | null) => {
    if (value == null) return;
    const newScene = getScene(value);
    setSceneSelection(value);
    setCurrentScene(newScene);
    setSceneSettings(newScene.settings as SceneSettings);
  };

  const handleSceneSettingUpdate = (
    path: [keyof SceneSettings, ...string[]],
    value: unknown
  ) => {
    const updatedSettings = updateSceneSetting(
      currentScene.settings as SceneSettings,
      path,
      value
    );
    setSceneSettings(updatedSettings);
  };

  return (
    <Box
      style={{
        minWidth: "900px",
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
          <Box ref={previewRef} w={350} h={350} mt={20} />
          <Button mt="md" fullWidth w={350}>
            Download GIF
          </Button>
        </Box>

        <Box
          style={{
            flex: 1,
            minWidth: "500px",
            maxWidth: "800px",
            padding: "16px",
            overflowY: "auto",
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
          {currentScene && (
            <SettingsDisplay
              sceneSettings={sceneSettings}
              handleSceneSettingUpdate={handleSceneSettingUpdate}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
