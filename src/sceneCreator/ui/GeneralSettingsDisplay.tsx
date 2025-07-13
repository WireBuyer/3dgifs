import { Box, Title } from "@mantine/core";
import { GeneralSettings, SceneSettings } from "../core/types";
import { isTextureField, isZoomField } from "../core/fieldHelper";
import ZoomDisplay from "./ZoomDisplay";
import p5 from "p5";
import TextureUpload from "./TextureUpload";
import Scene from "../core/scene";

interface GeneralSettingsProps {
  p5Instance: p5;
  sceneSettings: GeneralSettings;
  handleSceneSettingUpdate: (
    path: [keyof SceneSettings, ...string[]],
    keys: string[],
    value: unknown
  ) => void;
  currentScene: Scene<unknown>;
}

// this is similar to the ObjectSettingsDisplay but for the general settings
export default function GeneralSettingsDisplay({
  p5Instance,
  sceneSettings,
  handleSceneSettingUpdate,
  currentScene,
}: GeneralSettingsProps) {
  return (
    <Box>
      <Title order={5} style={{ textTransform: "capitalize" }} pb={"sm"}>
        General Settings
      </Title>

      {Object.entries(sceneSettings).map(([settingName, settingData]) => {
        const basePath: string[] = ["general"];
        const key = `${
          currentScene.sceneLabel
        }-${basePath.toString()}-${settingName}`;

        if (isZoomField(settingData)) {
          const zoomPath = [...basePath, settingName];
          return (
            <ZoomDisplay
              zoomData={settingData}
              path={zoomPath}
              handleSceneSettingUpdate={handleSceneSettingUpdate}
              key={key}
            />
          );
        } else if (isTextureField(settingData)) {
          const texturePath = [...basePath, settingName];
          return (
            <TextureUpload
              p={p5Instance}
              textureData={settingData}
              path={texturePath}
              handleSceneSettingUpdate={handleSceneSettingUpdate}
              currentScene={currentScene}
              key={key}
            />
          );
        }
      })}
    </Box>
  );
}
