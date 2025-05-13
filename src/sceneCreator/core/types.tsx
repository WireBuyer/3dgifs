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

export type GeneralSettings = {
  zoomInOut: boolean;
};

export interface SceneSettings {
  objects: SceneObjects;
  // rename scene to something better
  general: GeneralSettings;
}
