import p5 from "p5";
import Scene from "../core/scene";
import { AnimationSystem } from "../core/animationSystem";
import {
  SceneSettings,
  ObjectSettings,
  Axes,
  SliderField,
} from "../core/types";
import {
  createAxesField,
  createSliderField,
  createZoomField,
} from "../core/fieldHelper";

interface SphereObjectSettings extends ObjectSettings {
  radius: SliderField;
}

interface SphereSceneSettings extends SceneSettings {
  objects: {
    sphere: SphereObjectSettings;
  };
}

export default class SphereScene extends Scene<SphereSceneSettings> {
  getDefaultSettings(): SphereSceneSettings {
    const axesDefault: Axes = {
      x: "off",
      y: "rotate",
      z: "off",
    };

    const sphereObject: SphereObjectSettings = {
      axes: createAxesField(axesDefault),
      radius: createSliderField("radius", 150, 50, 300, 10),
    };

    const defaults: SphereSceneSettings = {
      objects: {
        sphere: sphereObject,
      },
      general: {
        zoom: createZoomField(),
      },
    };
    return defaults;
  }

  draw(p: p5, progress: number, settings: SphereSceneSettings): void {
    AnimationSystem.applyCommonGeneralAnimations(p, progress, settings.general);

    AnimationSystem.applyCommonObjectAnimations(
      p,
      progress,
      settings.objects.sphere
    );

    p.sphere(150);
  }
}
