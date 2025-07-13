import { Button, Text, Group, Box } from "@mantine/core";
import { CameraInfo } from "../core/types";

interface CameraAngleSelectorProps {
  cameraInfo: CameraInfo;
  setCameraPosition: (position: [number, number, number]) => void;
}

// TODO: add a movement option to easily move left right up down
export default function CameraAngleSelector({
  cameraInfo,
  setCameraPosition,
}: CameraAngleSelectorProps) {
  return (
    <Box mt={"xs"}>
      <Text
        size="sm"
        fw={500}
        style={{ textTransform: "capitalize", minWidth: 80 }}
      >
        {cameraInfo.label}
      </Text>
      <Group gap="xs" mt={"xs"}>
        {Object.entries(cameraInfo.presetAngles).map(([label, coordinates]) => (
          <Button
            key={label}
            variant="light"
            size="xs"
            onClick={() => setCameraPosition(coordinates)}
            style={{ textTransform: "capitalize" }}
          >
            {label}
          </Button>
        ))}
      </Group>
    </Box>
  );
}
