import { Box, Checkbox, Group, Text, Title } from "@mantine/core";
import { GeneralSettings, SceneSettings } from "../core/types";

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
      <Title order={5} style={{ textTransform: "capitalize" }}>
        General Settings
      </Title>

      {Object.entries(sceneSettings).map(([settingName, settingValue]) => {
        const basePath: string[] = ["general"];
        if (settingName === "zoomInOut") {
          return (
            <Group key={`${settingName}`} wrap="nowrap" mb="xs">
              <Text size="sm" fw={500} style={{ textTransform: "capitalize" }}>
                {settingName}
              </Text>
              <Checkbox
                checked={settingValue}
                onChange={(event) => {
                  const fullPath = [...basePath];
                  fullPath.push(settingName);

                  handleSceneSettingUpdate(
                    fullPath as [keyof SceneSettings, ...string[]],
                    event.currentTarget.checked
                  );
                }}
              />
            </Group>
          );
        } else {
          return <Box key={settingName}>{settingName}</Box>;
        }
      })}
    </Box>
  );
}
