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
  createCameraField,
  createSliderField,
  createTextureField,
  createZoomField,
} from "../core/fieldHelper";
import defaultTexture from "../core/defaultTexture";

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
    const surfaceNames = ["Sphere"];

    const sphereObject: SphereObjectSettings = {
      axes: createAxesField(axesDefault),
      radius: createSliderField("radius", 120, 50, 200, 10),
    };

    const defaults: SphereSceneSettings = {
      objects: {
        sphere: sphereObject,
      },
      general: {
        zoom: createZoomField(),
        textures: createTextureField(surfaceNames),
      },
      cameraInfo: createCameraField({ default: [0, 0, 800] }),
    };
    return defaults;
  }

  draw(p: p5, progress: number, settings: SphereSceneSettings): void {
    p.push();
    AnimationSystem.applyCommonGeneralAnimations(p, progress, settings.general);
    AnimationSystem.applyCommonObjectAnimations(
      p,
      progress,
      settings.objects.sphere
    );

    p.rotateY((75 * Math.PI) / 180);
    const radius = settings.objects.sphere.radius.value;
    const textures = settings.general.textures.value;
    this.drawSphere(p, radius, textures);
    p.pop();
  }

  drawSphere(p: p5, size: number, textures: Record<string, p5.Image | null>) {
    if (textures["Sphere"]) {
      p.texture(textures["Sphere"]);
    } else {
      p.texture(defaultTexture.value!);
    }
    p.sphere(size);
  }
}
