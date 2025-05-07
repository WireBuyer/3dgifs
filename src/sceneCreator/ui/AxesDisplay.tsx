import { Box, Group, SegmentedControl, Text } from "@mantine/core";
// import { updateSceneSetting } from "./updateSceneSetting";

export default function AxesDisplay({
  objectName,
  settingValue,
  basePath,
  updateSceneSetting,
}: {
  objectName: string;
  settingValue: string;
  basePath: string[];
  updateSceneSetting: (path: string[], value: unknown) => void;
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
          <Group key={`${objectName}-${axis}`}>
            <Text style={{ textTransform: "capitalize" }}>{axis}</Text>
            <SegmentedControl
              data={movementOptions}
              value={movement as string}
              onChange={(val) => {
                const fullPath = [...basePath, axis];
                updateSceneSetting(fullPath, val);
                // handleSettingChange(fullPath);
              }}
            />
          </Group>
        );
      })}
    </Box>
  );
}
