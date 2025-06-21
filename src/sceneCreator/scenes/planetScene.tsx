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
  createSliderField,
  createTextureField,
  createZoomField,
} from "../core/fieldHelper";
import defaultTexture from "../core/defaultTexture";

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
      y: "off",
      z: "off",
    };

    const moonAxesDefault: Axes = {
      x: "off",
      y: "rotate",
      z: "off",
    };

    const textureData = ["Planet", "Moon"];

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
        textures: createTextureField(textureData),
      },
    };
    return defaults;
  }

  // TODO: the moon starting position needs to be changed when the new default camera angle is added
  draw(p: p5, progress: number, settings: PlanetSceneSettings): void {
    AnimationSystem.applyCommonGeneralAnimations(p, progress, settings.general);

    // TODO: implement the use of the standard rotation options

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
    p.sphere(planetSize);
    p.pop();

    // moon
    p.push();
    const moonX = (orbitRadius + planetSize) * p.cos(2 * Math.PI * progress);
    const moonZ = (orbitRadius + planetSize) * p.sin(2 * Math.PI * progress);
    p.translate(-moonX, 0, moonZ);
    // p.rotateY(2 * Math.PI * progress);
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
    p.sphere(25);
    p.pop();
  }
}
