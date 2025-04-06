import p5 from "p5";

export default abstract class Scene<T> {
  settings: T;

  constructor() {
    this.settings = this.getDefaultSettings();
  }

  abstract getDefaultSettings(): T;

  // add update
  // add reset

  abstract draw(p: p5, progress: number): void;
}
