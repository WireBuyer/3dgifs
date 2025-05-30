// split this up if it gets too long

export type AxisMovement = "rotate" | "wobble" | "off";
export type Axes = {
  x: AxisMovement;
  y: AxisMovement;
  z: AxisMovement;
};

export type ZoomData = {
  mode: "in" | "out" | "both" | "none";
  minZoom: number;
  maxZoom: number;
  oscillations: number;
};

type FieldTypes = "axes" | "checkbox" | "slider" | "texture" | "zoom";

interface BaseField {
  type: FieldTypes;
  label: string;
}

export interface AxesField extends BaseField {
  type: "axes";
  label: string;
  value: Axes;
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
  label: string;
  value: boolean;
}

export interface SliderField extends BaseField {
  type: "slider";
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
}

export interface TextureField extends BaseField {
  type: "texture";
  label: string;
  value: string;
}

export interface ZoomField extends BaseField {
  type: "zoom";
  label: string;
  value: ZoomData;
}

export type Fields =
  | AxesField
  | CheckboxField
  | SliderField
  | TextureField
  | ZoomField;

export interface ObjectSettings {
  axes?: AxesField;
}

export type GeneralSettings = {
  zoomInOut: ZoomField;
};

export type SceneObjects = Record<string, ObjectSettings>;

export interface SceneSettings {
  objects: SceneObjects;
  general: GeneralSettings;
}
