import { Box, Group, SegmentedControl, Text } from "@mantine/core";
import { Axes, SceneSettings } from "../core/types";

interface AxesDisplayProps {
  settingValue: Axes;
  path: string[];
  handleSceneSettingUpdate: (
    path: [keyof SceneSettings, ...string[]],
    keys: string[],
    value: unknown
  ) => void;
}

export default function AxesDisplay({
  settingValue,
  path,
  handleSceneSettingUpdate,
}: AxesDisplayProps) {
  const movementOptions = [
    { value: "off", label: "Off" },
    { value: "rotate", label: "Rotate" },
    { value: "wobble", label: "Wobble" },
  ];

  return (
    <Box>
      {Object.entries(settingValue).map(([axis, movement]) => {
        return (
          <Group key={`${path.toString()}-${axis}`} gap={"xs"} pb={5}>
            <Text fw={500} style={{ textTransform: "capitalize" }}>
              {axis}
            </Text>
            <SegmentedControl
              data={movementOptions}
              value={movement}
              transitionDuration={0}
              onChange={(val) => {
                const fullPath = [...path, "value"];
                handleSceneSettingUpdate(
                  fullPath as [keyof SceneSettings],
                  [axis],
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
