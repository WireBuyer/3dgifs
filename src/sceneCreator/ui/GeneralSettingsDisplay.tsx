import { Box, Title } from "@mantine/core";
import { GeneralSettings, SceneSettings } from "../core/types";
import { isZoomField } from "../core/fieldHelper";
import ZoomDisplay from "./ZoomDisplay";

interface GeneralSettingsProps {
  sceneSettings: GeneralSettings;
  handleSceneSettingUpdate: (
    path: [keyof SceneSettings, ...string[]],
    value: unknown
  ) => void;
}

// this is similar to the ObjectSettingsDisplay but for the general settings
export default function GeneralSettingsDisplay({
  sceneSettings,
  handleSceneSettingUpdate,
}: GeneralSettingsProps) {
  return (
    <Box>
      <Title order={5} style={{ textTransform: "capitalize" }} pb={"sm"}>
        General Settings
      </Title>

      {Object.entries(sceneSettings).map(([settingName, settingData]) => {
        const basePath: string[] = ["general"];
        const key = `${basePath.toString()}-${settingName}`;

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
        }
      })}
    </Box>
  );
}
