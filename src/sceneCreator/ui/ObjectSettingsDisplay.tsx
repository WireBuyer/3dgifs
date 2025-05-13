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
  return (
    <Box>
      {Object.entries(sceneObjects).map(([objectName, obbjectSettings]) => {
        const basePath: string[] = ["objects", objectName];

        return (
          <Paper key={objectName} mb={"sm"}>
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
                  return (
                    <Text key={`${objectName}-${settingName}`}>
                      {settingName}
                    </Text>
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
