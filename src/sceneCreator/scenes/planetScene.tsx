import p5 from "p5";
import Scene from "../core/scene";
import { SceneSettings, ObjectSettings, SliderField } from "../core/types";
import { AnimationSystem } from "../core/animationSystem";
import { createSliderField, createZoomField } from "../core/fieldHelper";

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
    const planetObject: PlanetObjectSettings = {
      radius: createSliderField("radius", 60, 30, 120, 5),
    };

    const moonObject: MoonObjectSettings = {
      distance: createSliderField("distance", 125, 50, 250, 5),
    };

    const defaults: PlanetSceneSettings = {
      objects: {
        planet: planetObject,
        moon: moonObject,
      },
      general: { zoom: createZoomField() },
    };
    return defaults;
  }

  draw(p: p5, progress: number, settings: PlanetSceneSettings): void {
    AnimationSystem.applyCommonGeneralAnimations(p, progress, settings.general);

    // planet
    p.push();
    p.sphere(60);
    p.pop();

    // moon
    p.push();
    const orbitRadius = 125;
    // make it use the moon distance setting
    const moonX = orbitRadius * p.cos(2 * Math.PI * progress);
    const moonZ = orbitRadius * p.sin(2 * Math.PI * progress);

    p.translate(moonX, 0, moonZ);
    p.rotateY(2 * Math.PI * progress);
    p.sphere(25);
    p.pop();
  }
}
