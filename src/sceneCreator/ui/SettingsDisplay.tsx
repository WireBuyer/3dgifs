import { SceneSettings } from "../core/types";

interface SceneSettingsProps {
  sceneSettings: SceneSettings;
}

export default function SettingsDisplay({ sceneSettings }: SceneSettingsProps) {
  return <div>{JSON.stringify(sceneSettings, null, 2)}</div>;
}
