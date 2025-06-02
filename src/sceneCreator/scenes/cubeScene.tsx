import p5 from "p5";
import Scene from "../core/scene";
import { AnimationSystem } from "../core/animationSystem";
import {
  SceneSettings,
  ObjectSettings,
  SliderField,
  Axes,
} from "../core/types";
import {
  createAxesField,
  createSliderField,
  createZoomField,
} from "../core/fieldHelper";

interface CubeObjectSettings extends ObjectSettings {
  size: SliderField;
}

interface CubeSceneSettings extends SceneSettings {
  objects: {
    cube: CubeObjectSettings;
  };
}

export default class CubeScene extends Scene<CubeSceneSettings> {
  getDefaultSettings(): CubeSceneSettings {
    const axesDefault: Axes = {
      x: "off",
      y: "rotate",
      z: "off",
    };

    const cubeObject: CubeObjectSettings = {
      axes: createAxesField(axesDefault),
      size: createSliderField("size", 150, 50, 300, 10),
    };

    const defaults: CubeSceneSettings = {
      objects: {
        cube: cubeObject,
      },
      general: { zoom: createZoomField() },
    };
    return defaults;
  }

  draw(p: p5, progress: number, settings: CubeSceneSettings): void {
    AnimationSystem.applyCommonGeneralAnimations(p, progress, settings.general);

    AnimationSystem.applyCommonObjectAnimations(
      p,
      progress,
      settings.objects.cube
    );

    p.box(150);
  }
}
