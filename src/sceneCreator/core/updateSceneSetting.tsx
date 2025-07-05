import { SceneSettings } from "../core/types";

export function updateSceneSetting(
  sceneSettings: SceneSettings,
  path: [keyof SceneSettings, ...string[]],
  keys: string[],
  value: unknown
): SceneSettings {
  const [topKey, ...nestedPath] = path;
  const newSettings = { ...sceneSettings };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current = newSettings[topKey] as any;

  // create a clone of the branch that needs updating, then navigate to the last key
  for (let i = 0; i < nestedPath.length; i++) {
    const key = nestedPath[i];
    current[key] = { ...current[key] };
    current = current[key];
  }

  // update all keys with the value
  keys.forEach((key) => {
    if (key in current) {
      current[key] = value;
    } else {
      console.warn(`Key "${key}" does not exist at path "${path.join(".")}"`);
    }
  });

  return newSettings;
}
