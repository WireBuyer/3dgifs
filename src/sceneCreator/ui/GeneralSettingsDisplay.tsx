import { Box, Title } from "@mantine/core";
import { GeneralSettings, SceneSettings } from "../core/types";
import { isTextureField, isZoomField } from "../core/fieldHelper";
import ZoomDisplay from "./ZoomDisplay";
import p5 from "p5";
import TextureDisplay from "./TextureDisplay";

interface GeneralSettingsProps {
  p5Instance: p5;
  sceneSettings: GeneralSettings;
  handleSceneSettingUpdate: (
    path: [keyof SceneSettings, ...string[]],
    keys: string[],
    value: unknown
  ) => void;
  sceneSelection: string;
}

// this is similar to the ObjectSettingsDisplay but for the general settings
export default function GeneralSettingsDisplay({
  p5Instance,
  sceneSettings,
  handleSceneSettingUpdate,
  // need this solely to make a unique key that changes when the scene changes
  // the object settings component can get away with having different object names between scenes
  sceneSelection,
}: GeneralSettingsProps) {
  return (
    <Box>
      <Title order={5} style={{ textTransform: "capitalize" }} pb={"sm"}>
        General Settings
      </Title>

      {Object.entries(sceneSettings).map(([settingName, settingData]) => {
        const basePath: string[] = ["general"];
        const key = `${sceneSelection}-${basePath.toString()}-${settingName}`;

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
            <TextureDisplay
              textureData={settingData}
              path={texturePath}
              handleSceneSettingUpdate={handleSceneSettingUpdate}
              p={p5Instance}
              key={key}
            />
          );
        }
      })}
    </Box>
  );
}
