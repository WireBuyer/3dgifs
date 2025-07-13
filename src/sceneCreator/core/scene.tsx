import p5 from "p5";

// TODO:
// need to add validation logic to scenes
// use syncing logic for gifs with differing total frames
// refactor to make the p5 object and camera class members
export default abstract class Scene<T> {
  // object to hold the textures of type p5.image or null
  textures: Record<string, p5.Image | null> = {};

  abstract sceneLabel: string;
  abstract getDefaultSettings(): T;
  abstract draw(p: p5, progress: number, settings: T): void;

  // used for gifs to get the index of the correct frame
  getTexture() {
    console.log("Todo");
  }

  applyTexture(p: p5, surfaces: string[], textureUrl: string) {
    p.loadImage(textureUrl, (loadedTexture) =>
      surfaces.forEach((surface) => {
        this.textures[surface] = loadedTexture;
      })
    );
  }
}
