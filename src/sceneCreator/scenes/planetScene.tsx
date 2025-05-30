import p5 from "p5";
import Scene from "../core/scene";
import { SceneSettings, ObjectSettings } from "../core/types";
import { AnimationSystem } from "../core/animationSystem";

interface PlanetObjectSettings extends ObjectSettings {
  radius: number;
}

interface MoonObjectSettings extends ObjectSettings {
  distance: number;
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
      radius: 10,
    };

    const moonObject: MoonObjectSettings = {
      distance: 10,
    };

    const defaults: PlanetSceneSettings = {
      objects: {
        planet: planetObject,
        moon: moonObject,
      },
      general: { zoomInOut: false, textures: {} },
    };
    return defaults;
  }

  draw(p: p5, progress: number): void {
    AnimationSystem.applyCommonGeneralAnimations(
      p,
      progress,
      this.settings.general
    );

    // planet
    p.push();
    p.sphere(60);
    p.pop();

    // moon
    p.push();
    const orbitRadius = 125;
    const moonX = orbitRadius * p.cos(2 * Math.PI * progress);
    const moonZ = orbitRadius * p.sin(2 * Math.PI * progress);

    p.translate(moonX, 0, moonZ);
    p.rotateY(2 * Math.PI * progress);
    p.sphere(25);
    p.pop();
  }
}
