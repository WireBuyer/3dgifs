import { Box, Group, SegmentedControl, Text } from "@mantine/core";
import { SceneSettings } from "../core/types";

export default function AxesDisplay({
  objectName,
  settingValue,
  basePath,
  handleSceneSettingUpdate,
}: {
  objectName: string;
  settingValue: string;
  basePath: string[];
  handleSceneSettingUpdate: (
    path: [keyof SceneSettings, ...string[]],
    value: unknown
  ) => void;
}) {
  const movementOptions = [
    { value: "off", label: "Off" },
    { value: "rotate", label: "Rotate" },
    { value: "wobble", label: "Wobble" },
  ];

  return (
    <Box p={"xs"}>
      {Object.entries(settingValue).map(([axis, movement]) => {
        return (
          <Group key={`${objectName}-${axis}`} gap={"xs"} p={4}>
            <Text fw={500} style={{ textTransform: "capitalize" }}>
              {axis}
            </Text>
            <SegmentedControl
              data={movementOptions}
              value={movement as string}
              onChange={(val) => {
                const fullPath = [...basePath, axis];
                handleSceneSettingUpdate(
                  fullPath as [keyof SceneSettings, ...string[]],
                  val
                );
              }}
            />
          </Group>
        );
      })}
    </Box>
  );
}
