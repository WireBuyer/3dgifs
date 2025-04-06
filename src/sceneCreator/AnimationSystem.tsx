import p5 from "p5";
import { Axes, ObjectSettings } from "./scenes/types";

export class AnimationSystem {
  static applyCommonObjectAnimations(
    p: p5,
    progress: number,
    settings: ObjectSettings
  ): void {
    if (settings.axes) {
      this.handleAxisMovement(p, settings.axes, progress);
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
}
