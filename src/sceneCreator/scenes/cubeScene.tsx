import p5 from "p5";
import Scene from "../core/scene";
import { AnimationSystem } from "../core/animationSystem";
import { SceneSettings, ObjectSettings } from "../core/types";

interface CubeObjectSettings extends ObjectSettings {
  size: number;
}

interface CubeSceneSettings extends SceneSettings {
  objects: {
    cube: CubeObjectSettings;
  };
}

export default class CubeScene extends Scene<CubeSceneSettings> {
  // update this so each param is an object with min/max or other values for the ui to use
  getDefaultSettings(): CubeSceneSettings {
    const cubeObject: CubeObjectSettings = {
      axes: {
        x: "off",
        y: "rotate",
        z: "wobble",
      },
      size: 10,
    };

    const defaults: CubeSceneSettings = {
      objects: {
        cube: cubeObject,
      },
      scene: { cameraPos: [0, 0, 0], zoomInOut: false },
    };
    return defaults;
  }

  draw(p: p5, progress: number): void {
    AnimationSystem.applyCommonObjectAnimations(
      p,
      progress,
      this.settings.objects.cube
    );

    p.box(150);
  }
}
