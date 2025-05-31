import p5 from "p5";

export default abstract class Scene<T> {
  abstract getDefaultSettings(): T;
  abstract draw(p: p5, progress: number, settings: T): void;
}
