import p5 from "p5";

// TODO:
//  eed to add validation logic to scenes
// use syncing logic for gifs with differing total frames
// refactor to make the p5 object and camera class members
export default abstract class Scene<T> {
  abstract getDefaultSettings(): T;
  abstract draw(p: p5, progress: number, settings: T): void;
}
