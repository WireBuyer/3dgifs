import p5 from "p5";
import Scene from "../core/scene";
import { AnimationSystem } from "../core/animationSystem";
import { SceneSettings, ObjectSettings } from "../core/types";

interface SphereObjectSettings extends ObjectSettings {
  radius: number;
}

interface SphereSceneSettings extends SceneSettings {
  objects: {
    sphere: SphereObjectSettings;
  };
}

export default class SphereScene extends Scene<SphereSceneSettings> {
  // update this so each param is an object with min/max or other values for the ui to use
  getDefaultSettings(): SphereSceneSettings {
    const sphereObject: SphereObjectSettings = {
      axes: {
        x: "off",
        y: "rotate",
        z: "wobble",
      },
      radius: 10,
    };

    const defaults: SphereSceneSettings = {
      objects: {
        sphere: sphereObject,
      },
      scene: { cameraPos: [0, 0, 0], zoomInOut: false },
    };
    return defaults;
  }

  draw(p: p5, progress: number): void {
    AnimationSystem.applyCommonObjectAnimations(
      p,
      progress,
      this.settings.objects.sphere
    );

    p.sphere(150);
  }
}
