import { Card } from "@mantine/core";
import { SceneSettings } from "../core/types";
import ObjectSettingsDisplay from "./ObjectSettingsDisplay";
import GeneralSettingsDisplay from "./GeneralSettingsDisplay";

interface SceneSettingsProps {
  sceneSettings: SceneSettings;
  handleSceneSettingUpdate: (
    path: [keyof SceneSettings, ...string[]],
    value: unknown
  ) => void;
}

export default function SettingsDisplay({
  sceneSettings,
  handleSceneSettingUpdate,
}: SceneSettingsProps) {
  return (
    <Card p={25}>
      {/* TODO: refactor. this can be done in one component*/}
      <Card.Section>
        <ObjectSettingsDisplay
          sceneObjects={sceneSettings.objects}
          handleSceneSettingUpdate={handleSceneSettingUpdate}
        />
      </Card.Section>
      <Card.Section>
        <GeneralSettingsDisplay
          sceneSettings={sceneSettings.general}
          handleSceneSettingUpdate={handleSceneSettingUpdate}
        />
      </Card.Section>
    </Card>
  );
}
