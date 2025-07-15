import { Box, Button, Flex, Select } from "@mantine/core";
import "@mantine/core/styles.css";
import p5 from "p5";
import { useEffect, useRef, useState } from "react";
import defaultTexture from "./sceneCreator/core/defaultTexture";
import { SceneSettings } from "./sceneCreator/core/types";
import { updateSceneSetting } from "./sceneCreator/core/updateSceneSetting";
import { getScene, sceneList } from "./sceneCreator/scenes/sceneList";
import CameraAngleSelector from "./sceneCreator/ui/CameraAngleSelector";
import SettingsDisplay from "./sceneCreator/ui/SettingsDisplay";
import downloadGif from "./sceneCreator/core/downloadGif";
import Scene from "./sceneCreator/core/scene";

// TODO:
// instead of prop drilling use something like zustand
// refactor this to use a scene manager class

function App() {
  const scenes = Object.keys(sceneList);
  const [sceneSelection, setSceneSelection] = useState(scenes[1]);
  const [currentScene, setCurrentScene] = useState<Scene<unknown>>(
    getScene(sceneSelection)
  );
  const [sceneSettings, setSceneSettings] = useState<SceneSettings>(
    currentScene.getDefaultSettings() as SceneSettings
  );

  const CANVAS_WIDTH = 350;
  const CANVAS_HEIGHT = 350;
  const previewRef = useRef<HTMLDivElement>(null);
  const [p5Instance, setP5Instance] = useState<p5 | null>(null);
  const cameraRef = useRef<p5.Camera | null>(null);

  useEffect(() => {
    // move these to the scenes
    const fps = 50;
    const totalFrames = 150;

    const sketch = (p: p5) => {
      p.preload = () => {
        // this loads a default texture each time this component mounts (each scene change)
        // TODO: low prio but make this better
        defaultTexture.value = p.loadImage("/a.jpg");
      };

      p.setup = () => {
        p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p.WEBGL);
        p.frameRate(fps);
        p.noStroke();
        p.normalMaterial();
        cameraRef.current = p.createCamera();
      };

      p.draw = () => {
        p.orbitControl(6);
        p.background(20);
        const progress = ((p.frameCount - 1) % totalFrames) / totalFrames;
        currentScene.draw(p, progress, sceneSettings);
      };
    };

    const p5Sketch = new p5(sketch, previewRef.current!);
    setP5Instance(p5Sketch);

    return () => {
      p5Sketch.remove();
      setP5Instance(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneSelection]);

  const handleSceneChange = (value: string | null) => {
    if (value == null) return;

    const scene = getScene(value);
    setSceneSelection(value);
    setCurrentScene(scene);
    setSceneSettings(scene.getDefaultSettings() as SceneSettings);
  };

  const handleSceneSettingUpdate = (
    path: [keyof SceneSettings, ...string[]],
    keys: string[],
    value: unknown
  ) => {
    const updatedSettings = updateSceneSetting(
      sceneSettings,
      path,
      keys,
      value
    );
    setSceneSettings(updatedSettings);
  };

  // this should probably be moved
  const setCameraPosition = (position: [number, number, number]) => {
    if (p5Instance) {
      // this is needed to ensure the camera is facing the right way
      p5Instance.camera(
        position[0],
        position[1],
        position[2],
        0,
        0,
        0,
        0,
        1,
        0
      );
    } else {
      console.warn("error setting camera position");
    }
  };

  const handleGifDownload = () => {
    const cameraCoordinates = [
      cameraRef.current!.eyeX,
      cameraRef.current!.eyeY,
      cameraRef.current!.eyeZ,
      cameraRef.current!.centerX,
      cameraRef.current!.centerY,
      cameraRef.current!.centerZ,
      cameraRef.current!.upX,
      cameraRef.current!.upY,
      cameraRef.current!.upZ,
    ];
    downloadGif(
      sceneSelection,
      sceneSettings,
      cameraCoordinates,
      CANVAS_HEIGHT,
      CANVAS_WIDTH
    );
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
          w={CANVAS_WIDTH}
          style={{
            padding: "32px 16px",
            height: "100%",
          }}
        >
          <Box ref={previewRef} w={CANVAS_WIDTH} h={CANVAS_HEIGHT} mt={20} />
          {p5Instance && (
            <>
              <CameraAngleSelector
                cameraInfo={sceneSettings.cameraInfo}
                setCameraPosition={setCameraPosition}
              />
              <Button
                mt="md"
                fullWidth
                w={CANVAS_WIDTH}
                onClick={handleGifDownload}
              >
                Download GIF
              </Button>
            </>
          )}
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

          {p5Instance && (
            <SettingsDisplay
              p5Instance={p5Instance}
              sceneSettings={sceneSettings}
              handleSceneSettingUpdate={handleSceneSettingUpdate}
              currentScene={currentScene}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
