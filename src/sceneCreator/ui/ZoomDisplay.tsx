import {
  Group,
  Stack,
  SegmentedControl,
  Text,
  Box,
  Slider,
} from "@mantine/core";
import { SceneSettings, ZoomField } from "../core/types";

interface ZoomDisplayProps {
  zoomData: ZoomField;
  path: string[];
  handleSceneSettingUpdate: (
    path: [keyof SceneSettings, ...string[]],
    keys: string[],
    value: unknown
  ) => void;
}

export default function ZoomDisplay({
  zoomData,
  path,
  handleSceneSettingUpdate,
}: ZoomDisplayProps) {
  return (
    <Group wrap="nowrap" mb="xs" align="start" pb={"xs"}>
      <Text
        size="sm"
        fw={500}
        style={{ textTransform: "capitalize", minWidth: 80 }}
      >
        {zoomData.label}
      </Text>
      <Stack gap="xs" style={{ flex: 1 }}>
        <SegmentedControl
          size="xs"
          value={zoomData.value.mode}
          data={[
            { label: "None", value: "none" },
            { label: "In", value: "in" },
            { label: "Out", value: "out" },
            { label: "Both", value: "both" },
          ]}
          transitionTimingFunction={"ease"}
          transitionDuration={0}
          onChange={(value) => {
            const fullPath = [...path, "value"];
            handleSceneSettingUpdate(
              fullPath as [keyof SceneSettings],
              ["mode"],
              value
            );
          }}
        />

        <Group gap="sm" grow>
          {/* Zoom In Control */}
          <Box
            style={{
              opacity:
                zoomData.value.mode !== "in" && zoomData.value.mode !== "both"
                  ? 0.5
                  : 1,
            }}
          >
            <Group gap={4} mb={2}>
              <Text size="xs" c="dimmed" style={{ flex: 1 }}>
                Zoom In
              </Text>
              <Text size="xs" fw={500} w={30} ta="right">
                {zoomData.value.zoomInMag.toFixed(1)}
              </Text>
            </Group>
            <Slider
              size="xs"
              value={zoomData.value.zoomInMag}
              min={1}
              max={2.5}
              step={0.1}
              disabled={
                zoomData.value.mode !== "in" && zoomData.value.mode !== "both"
              }
              onChange={(value) => {
                const fullPath = [...path, "value"];
                handleSceneSettingUpdate(
                  fullPath as [keyof SceneSettings],
                  ["zoomInMag"],
                  value
                );
              }}
              marks={[
                { value: 1, label: "1x" },
                { value: 2.5, label: "2.5x" },
              ]}
              color="blue"
            />
          </Box>

          {/* Zoom Out Control */}
          <Box
            style={{
              opacity:
                zoomData.value.mode !== "out" && zoomData.value.mode !== "both"
                  ? 0.5
                  : 1,
            }}
          >
            <Group gap={4} mb={2}>
              <Text size="xs" c="dimmed" style={{ flex: 1 }}>
                Zoom Out
              </Text>
              <Text size="xs" fw={500} w={30} ta="right">
                {zoomData.value.zoomOutMag.toFixed(1)}
              </Text>
            </Group>
            <Slider
              size="xs"
              value={zoomData.value.zoomOutMag}
              min={1}
              max={2.5}
              step={0.1}
              disabled={
                zoomData.value.mode !== "out" && zoomData.value.mode !== "both"
              }
              onChange={(value) => {
                const fullPath = [...path, "value"];
                handleSceneSettingUpdate(
                  fullPath as [keyof SceneSettings],
                  ["zoomOutMag"],
                  value
                );
              }}
              marks={[
                { value: 1, label: "1x" },
                { value: 2.5, label: "2.5x" },
              ]}
              color="orange"
            />
          </Box>

          {/* Oscillations Control */}
          <Box style={{ opacity: zoomData.value.mode === "none" ? 0.5 : 1 }}>
            <Group gap={4} mb={2}>
              <Text size="xs" c="dimmed" style={{ flex: 1 }}>
                Oscillations
              </Text>
              <Text size="xs" fw={500} w={20} ta="right">
                {zoomData.value.oscillations}
              </Text>
            </Group>
            <Slider
              size="xs"
              value={zoomData.value.oscillations}
              min={1}
              max={10}
              step={1}
              disabled={zoomData.value.mode === "none"}
              onChange={(value) => {
                const fullPath = [...path, "value"];
                handleSceneSettingUpdate(
                  fullPath as [keyof SceneSettings],
                  ["oscillations"],
                  value
                );
              }}
              marks={[
                { value: 1, label: "1" },
                { value: 10, label: "10" },
              ]}
              color="green"
            />
          </Box>
        </Group>
      </Stack>
    </Group>
  );
}
