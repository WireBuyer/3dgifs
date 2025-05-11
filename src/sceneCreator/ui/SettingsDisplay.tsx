import { Card } from "@mantine/core";
import { SceneSettings } from "../core/types";
import ObjectSettingsDisplay from "./ObjectSettingsDisplay";

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
      {/* make a component for scene params or just make one component handle both */}
      <Card.Section>
        <ObjectSettingsDisplay
          sceneObjects={sceneSettings.objects}
          handleSceneSettingUpdate={handleSceneSettingUpdate}
        />
      </Card.Section>
    </Card>
  );
}
