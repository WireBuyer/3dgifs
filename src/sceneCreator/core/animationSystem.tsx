import p5 from "p5";
import { ObjectSettings, Axes, GeneralSettings } from "./types";

export class AnimationSystem {
  static applyCommonGeneralAnimations(
    p: p5,
    progress: number,
    settings: GeneralSettings
  ): void {
    console.log(settings);
  }

  static applyCommonObjectAnimations(
    p: p5,
    progress: number,
    settings: ObjectSettings
  ): void {
    if (settings.axes?.value) {
      this.handleAxisMovement(p, settings.axes.value, progress);
    }
  }

  static handleAxisMovement(p: p5, axes: Axes, progress: number) {
    const baseAngle = progress * 2 * Math.PI;
    const wobbleAmount = Math.cos(baseAngle);

    const movementAngles = {
      rotate: baseAngle,
      wobble: wobbleAmount,
    };

    const rotationTypes = ["rotate", "wobble"] as const;
    rotationTypes.forEach((axismovement) => {
      if (
        axes.x == axismovement ||
        axes.y == axismovement ||
        axes.z == axismovement
      ) {
        const vector = [
          axes.x == axismovement ? 1 : 0,
          axes.y == axismovement ? 1 : 0,
          axes.z == axismovement ? 1 : 0,
        ];
        p.rotate(movementAngles[axismovement], vector);
      }
    });
  }

  static applyCameraZoom(p: p5, progress: number) {
    // oscillates the zoom amount between 0.7x and 1.3x
    const minZoom = 0.7;
    const maxZoom = 1.3;
    const zoomAmount = p.map(
      Math.sin(progress * p.TWO_PI),
      -1,
      1,
      minZoom,
      maxZoom
    );
    p.scale(zoomAmount);
  }
}
