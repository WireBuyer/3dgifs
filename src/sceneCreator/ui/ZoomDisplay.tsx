import {
  Group,
  Stack,
  SegmentedControl,
  NumberInput,
  Text,
} from "@mantine/core";
import { SceneSettings, ZoomField } from "../core/types";

interface ZoomDisplayProps {
  zoomData: ZoomField;
  path: string[];
  handleSceneSettingUpdate: (
    path: [keyof SceneSettings, ...string[]],
    value: unknown
  ) => void;
}

export default function ZoomDisplay({
  zoomData,
  path,
  handleSceneSettingUpdate,
}: ZoomDisplayProps) {
  return (
    <Group wrap="nowrap" mb="xs" align="start">
      <Text size="sm" fw={500} style={{ textTransform: "capitalize" }}>
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
            const fullPath = [...path, "value", "mode"];
            handleSceneSettingUpdate(
              fullPath as [keyof SceneSettings, ...string[]],
              value
            );
          }}
        />
        <Group gap="xs" grow>
          <NumberInput
            size="xs"
            label="Zoom In Magnifyier"
            value={zoomData.value.minZoom}
            min={0.1}
            max={1}
            step={0.1}
            disabled={
              zoomData.value.mode !== "in" && zoomData.value.mode !== "both"
            }
            onChange={(value) => {
              const fullPath = [...path, "value", "minZoom"];
              handleSceneSettingUpdate(
                fullPath as [keyof SceneSettings, ...string[]],
                value
              );
            }}
          />
          <NumberInput
            size="xs"
            label="Zoom Out Magnifyier"
            value={zoomData.value.maxZoom}
            min={1}
            max={2.5}
            step={0.1}
            disabled={
              zoomData.value.mode !== "out" && zoomData.value.mode !== "both"
            }
            onChange={(value) => {
              const fullPath = [...path, "value", "maxZoom"];
              handleSceneSettingUpdate(
                fullPath as [keyof SceneSettings, ...string[]],
                value
              );
            }}
          />
          <NumberInput
            size="xs"
            label="Oscillations"
            value={zoomData.value.oscillations}
            min={1}
            max={10}
            step={1}
            disabled={zoomData.value.mode !== "both"}
            onChange={(value) => {
              const fullPath = [...path, "value", "oscillations"];
              handleSceneSettingUpdate(
                fullPath as [keyof SceneSettings, ...string[]],
                value
              );
            }}
          />
        </Group>
      </Stack>
    </Group>
  );
}
