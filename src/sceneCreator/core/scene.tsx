import p5 from "p5";

// TODO:
//  need to add validation logic to scenes
//  use syncing logic for gifs with differing total frames
export default abstract class Scene<T> {
  abstract getDefaultSettings(): T;
  abstract draw(p: p5, progress: number, settings: T): void;
  // TODO: add camera positions
}
