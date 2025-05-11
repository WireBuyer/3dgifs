import {
  Box,
  Group,
  Paper,
  SegmentedControl,
  Title,
  Text,
} from "@mantine/core";
import { SceneObjects, SceneSettings } from "../core/types";
import AxesDisplay from "./AxesDisplay";

interface ObjectSettingsProps {
  sceneObjects: SceneObjects;
  handleSceneSettingUpdate: (
    path: [keyof SceneSettings, ...string[]],
    value: unknown
  ) => void;
}

export default function ObjectSettingsDisplay({
  sceneObjects,
  handleSceneSettingUpdate,
}: ObjectSettingsProps) {
  let counter = 0;

  return (
    <Box>
      {/* <Title order={4}>Scene Settings</Title> */}
      {Object.entries(sceneObjects).map(([objectName, obbjectSettings]) => {
        const basePath: string[] = ["objects", objectName];

        return (
          <Paper key={objectName}>
            <Title order={5} style={{ textTransform: "capitalize" }}>
              {objectName}
            </Title>

            {Object.entries(obbjectSettings).map(
              ([settingName, settingValue]) => {
                // make checks for possible base settings otherwise render from metadata
                if (settingName === "axes") {
                  basePath.push(settingName);
                  return (
                    <AxesDisplay
                      objectName={objectName}
                      settingValue={settingValue}
                      basePath={basePath}
                      handleSceneSettingUpdate={handleSceneSettingUpdate}
                      key={`${objectName}-${settingName}`}
                    />
                  );
                } else {
                  // basePath.push("unknown", settingValue as string);
                  counter += 1;
                  return (
                    <Text key={`${objectName}-${counter}`}>{settingName}</Text>
                  );
                }
              }
            )}
          </Paper>
        );
      })}
    </Box>
  );
}

//     <Paper withBorder p="xs" radius="md">
//       <Title order={5} mb="xs">
//         General Settings
//       </Title>
//       <Group justify="space-between" wrap="nowrap">
//         <Text size="sm">Zoom In/Out Effect</Text>
//         <Switch checked={sceneSettings.scene.zoomInOut} size="sm" />
//       </Group>
//     </Paper>
//   </Box>
// </Card>
