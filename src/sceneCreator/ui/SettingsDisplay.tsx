import { Card } from "@mantine/core";
import { SceneSettings } from "../core/types";
import ObjectSettingsDisplay from "./ObjectSettingsDisplay";
import GeneralSettingsDisplay from "./GeneralSettingsDisplay";
import p5 from "p5";

interface SceneSettingsProps {
  p5Instance: p5;
  sceneSettings: SceneSettings;
  handleSceneSettingUpdate: (
    path: [keyof SceneSettings, ...string[]],
    keys: string[],
    value: unknown
  ) => void;
  sceneSelection: string;
}
// TODO:
// add a "show simple settings" option. need to modify all params with an "advanced" or "simple" option
// make 2 columns of these instead of stacking them

export default function SettingsDisplay({
  p5Instance,
  sceneSettings,
  handleSceneSettingUpdate,
  sceneSelection,
}: SceneSettingsProps) {
  return (
    <Card p={25}>
      <Card.Section>
        <ObjectSettingsDisplay
          sceneObjects={sceneSettings.objects}
          handleSceneSettingUpdate={handleSceneSettingUpdate}
        />
      </Card.Section>
      <Card.Section>
        <GeneralSettingsDisplay
          p5Instance={p5Instance}
          sceneSettings={sceneSettings.general}
          handleSceneSettingUpdate={handleSceneSettingUpdate}
          sceneSelection={sceneSelection}
        />
      </Card.Section>
    </Card>
  );
}
