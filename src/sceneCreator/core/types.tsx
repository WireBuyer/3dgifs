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
    // camera will be changed to include preset angles
    cameraPos: [number, number, number];
    zoomInOut: boolean;
  };
}
