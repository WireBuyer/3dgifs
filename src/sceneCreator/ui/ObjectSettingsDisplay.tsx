import {
  Box,
  Group,
  Paper,
  SegmentedControl,
  Title,
  Text,
  Checkbox,
  Slider,
  Stack,
} from "@mantine/core";
import { Axes, SceneObjects, SceneSettings } from "../core/types";
import AxesDisplay from "./AxesDisplay";
import {
  isAxesField,
  isCheckboxField,
  isSliderField,
} from "../core/fieldHelper";

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
  const labelStyles = {
    label: {
      fontSize: "16px",
      fontWeight: 500,
    },
  };

  return (
    <Box>
      {Object.entries(sceneObjects).map(([objectName, obbjectSettings]) => {
        const basePath: string[] = ["objects", objectName];

        return (
          <Paper key={objectName} mb={"sm"} p={5}>
            <Title order={5} style={{ textTransform: "capitalize" }}>
              {objectName}
            </Title>

            <Box p={5}>
              {Object.entries(obbjectSettings).map(
                ([settingName, settingData]) => {
                  // console.log("basepath is", basePath);
                  const key = `${basePath.toString()}-${settingName}`;
                  // console.log("key is", key);

                  if (isAxesField(settingData)) {
                    const axesPath = [...basePath, settingName];
                    return (
                      <AxesDisplay
                        settingValue={settingData.value}
                        path={axesPath}
                        handleSceneSettingUpdate={handleSceneSettingUpdate}
                        key={key}
                      />
                    );
                  } else if (isCheckboxField(settingData)) {
                    return (
                      <Checkbox
                        checked={settingData.value}
                        label={settingData.label}
                        labelPosition="left"
                        styles={labelStyles}
                        key={key}
                        onChange={(e) => {
                          const fullPath = [...basePath, settingName, "value"];
                          console.log(fullPath);
                          console.log(e.currentTarget.checked);
                          handleSceneSettingUpdate(
                            fullPath as [keyof SceneSettings, ...string[]],
                            e.currentTarget.checked
                          );
                        }}
                      />
                    );
                  } else if (isSliderField(settingData)) {
                    return (
                      <Stack gap={0} key={key}>
                        <Text
                          size="sm"
                          fw={500}
                          style={{ textTransform: "capitalize" }}
                          key={`${key}-label`}
                        >
                          {settingData.label}
                        </Text>
                        <Group gap="md" align="center">
                          <Text size="sm" c="dimmed">
                            {settingData.min}
                          </Text>
                          <Slider
                            defaultValue={settingData.value}
                            min={settingData.min}
                            max={settingData.max}
                            step={settingData.step}
                            style={{ flex: 1 }}
                            onChange={(value) => {
                              const fullPath = [
                                ...basePath,
                                settingName,
                                "value",
                              ];
                              handleSceneSettingUpdate(
                                fullPath as [keyof SceneSettings, ...string[]],
                                value
                              );
                            }}
                          />
                          <Text size="sm" c="dimmed">
                            {settingData.max}
                          </Text>
                        </Group>
                      </Stack>
                    );
                  }
                }
              )}
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}
