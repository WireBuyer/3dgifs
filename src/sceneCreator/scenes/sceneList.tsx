import Scene from "../core/scene";
import CubeScene from "./cubeScene";
import PlanetScene from "./planetScene";
import SphereScene from "./sphereScene";

export const sceneList = {
  Sphere: SphereScene,
  Cube: CubeScene,
  Planet: PlanetScene,
};

export function getScene(value: string): Scene<unknown> {
  if (value.toLowerCase() === "sphere") {
    return new SphereScene();
  } else if (value.toLowerCase() === "cube") {
    return new CubeScene();
  } else {
    return new PlanetScene();
  }
}
