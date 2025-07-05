import p5 from "p5";
import Scene from "../core/scene";
import {
  SceneSettings,
  ObjectSettings,
  SliderField,
  Axes,
} from "../core/types";
import { AnimationSystem } from "../core/animationSystem";
import {
  createAxesField,
  createCameraField,
  createSliderField,
  createTextureField,
  createZoomField,
} from "../core/fieldHelper";
import defaultTexture from "../core/defaultTexture";
import getCameraPosition from "../core/cameraHelper";

interface PlanetObjectSettings extends ObjectSettings {
  radius: SliderField;
}

interface MoonObjectSettings extends ObjectSettings {
  distance: SliderField;
}

interface PlanetSceneSettings extends SceneSettings {
  objects: {
    planet: PlanetObjectSettings;
    moon: MoonObjectSettings;
  };
}

export default class PlanetScene extends Scene<PlanetSceneSettings> {
  getDefaultSettings(): PlanetSceneSettings {
    const planetAxesDefault: Axes = {
      x: "off",
      y: "rotate",
      z: "off",
    };

    const moonAxesDefault: Axes = {
      x: "off",
      y: "rotate",
      z: "off",
    };

    const surfaceNames = ["Planet", "Moon"];

    const planetObject: PlanetObjectSettings = {
      axes: createAxesField(planetAxesDefault),
      radius: createSliderField("size", 75, 50, 100, 5),
    };

    const moonObject: MoonObjectSettings = {
      axes: createAxesField(moonAxesDefault),
      distance: createSliderField("distance", 60, 50, 100, 5),
    };

    const defaults: PlanetSceneSettings = {
      objects: {
        planet: planetObject,
        moon: moonObject,
      },
      general: {
        zoom: createZoomField(),
        textures: createTextureField(surfaceNames),
      },
      cameraInfo: createCameraField({
        default: [0, 0, 800],
        "upper right": getCameraPosition(-30, 55),
      }),
    };
    return defaults;
  }

  draw(p: p5, progress: number, settings: PlanetSceneSettings): void {
    AnimationSystem.applyCommonGeneralAnimations(p, progress, settings.general);

    const planetSize = settings.objects.planet.radius.value;
    const orbitRadius = settings.objects.moon.distance.value;

    // planet
    p.push();
    if (settings.general.textures.value["Planet"]) {
      p.texture(settings.general.textures.value["Planet"]);
    } else {
      p.texture(defaultTexture.value!);
    }
    AnimationSystem.applyCommonObjectAnimations(
      p,
      progress,
      settings.objects.planet
    );
    p.rotateY((75 * Math.PI) / 180);
    p.sphere(planetSize);
    p.pop();

    // moon
    p.push();
    const moonX = -(orbitRadius + planetSize) * p.cos(2 * Math.PI * progress);
    const moonZ = (orbitRadius + planetSize) * p.sin(2 * Math.PI * progress);
    p.translate(moonX, 0, moonZ);
    if (settings.general.textures.value["Moon"]) {
      p.texture(settings.general.textures.value["Moon"]);
    } else {
      p.texture(defaultTexture.value!);
    }
    AnimationSystem.applyCommonObjectAnimations(
      p,
      progress,
      settings.objects.moon
    );
    p.rotateY((-75 * Math.PI) / 180);
    p.sphere(25);
    p.pop();
  }
}
