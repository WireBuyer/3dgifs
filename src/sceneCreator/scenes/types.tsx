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

export interface SceneSettings {
  objects: {
    [objects: string]: ObjectSettings;
  };
  scene: {
    camera: [number, number, number];
  };
}
