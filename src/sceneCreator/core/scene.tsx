import p5 from "p5";

export default abstract class Scene<T> {
  // TODO: remove settings and handle it in the main app.tsx file
  settings: T;

  constructor() {
    this.settings = this.getDefaultSettings();
  }

  abstract getDefaultSettings(): T;

  abstract draw(p: p5, progress: number): void;
}
