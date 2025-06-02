import p5 from "p5";
import { ObjectSettings, Axes, GeneralSettings, ZoomData } from "./types";

export class AnimationSystem {
  static applyCommonGeneralAnimations(
    p: p5,
    progress: number,
    settings: GeneralSettings
  ): void {
    this.handleCameraZoom(p, settings.zoom.value, progress);
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

  static handleCameraZoom(p: p5, zoomData: ZoomData, progress: number): void {
    if (zoomData.mode === "none") {
      return;
    }

    let zoomAmount: number;
    const zoomInMag = zoomData.zoomInMag;
    const zoomOutScale = 1.0 / zoomData.zoomOutMag;
    const oscillations = zoomData.oscillations;

    if (zoomData.mode === "in") {
      zoomAmount = p.map((progress * oscillations) % 1.0, 0, 1, 1, zoomInMag);
    } else if (zoomData.mode === "out") {
      zoomAmount = p.map(
        (progress * oscillations) % 1.0,
        0,
        1,
        1,
        zoomOutScale
      );
    } else {
      zoomAmount = p.map(
        Math.sin(progress * 2 * Math.PI * oscillations),
        -1,
        1,
        zoomOutScale,
        zoomInMag
      );
    }
    p.scale(zoomAmount);
  }
}
