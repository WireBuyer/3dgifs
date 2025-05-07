import {
  Box,
  Group,
  Paper,
  SegmentedControl,
  Title,
  Text,
} from "@mantine/core";
import { SceneObjects } from "../core/types";
import AxesDisplay from "./AxesDisplay";
// import { updateSceneSetting } from "./updateSceneSetting";

interface ObjectSettingsProps {
  sceneObjects: SceneObjects;
  updateSceneSetting: (path: string[], value: unknown) => void;
}

export default function ObjectSettingsDisplay({
  sceneObjects,
  updateSceneSetting,
}: ObjectSettingsProps) {
  const movementOptions = [
    { value: "off", label: "Off" },
    { value: "rotate", label: "Rotate" },
    { value: "wobble", label: "Wobble" },
  ];
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
                      updateSceneSetting={updateSceneSetting}
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
