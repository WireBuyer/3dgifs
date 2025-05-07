// split this up if it gets too long

export type AxisMovement = "rotate" | "wobble" | "off";
export type Axes = {
  x?: AxisMovement;
  y?: AxisMovement;
  z?: AxisMovement;
};

export interface ObjectSettings {
  axes?: Axes;
}

export type SceneObjects = Record<string, ObjectSettings>;

export interface SceneSettings {
  objects: SceneObjects;
  // rename scene to something better
  scene: {
    // camera will be changed to include preset angles
    cameraPos: [number, number, number];
    zoomInOut: boolean;
  };
}
