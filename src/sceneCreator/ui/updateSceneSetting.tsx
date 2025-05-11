import { SceneSettings } from "../core/types";

export function updateSceneSetting(
  sceneSettings: SceneSettings,
  path: [keyof SceneSettings, ...string[]],
  value: unknown
): SceneSettings {
  const [topKey, ...nestedPath] = path;
  const newSettings = { ...sceneSettings };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current = newSettings[topKey] as any;

  // create a clone of the branch that needs updating
  for (let i = 0; i < nestedPath.length - 1; i++) {
    const key = nestedPath[i];
    current[key] = { ...current[key] };
    current = current[key];
  }

  current[nestedPath[nestedPath.length - 1]] = value;

  return newSettings;
}
