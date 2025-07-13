// split this up if it gets too long

type FieldTypes =
  | "axes"
  | "camera"
  | "checkbox"
  | "slider"
  | "texture"
  | "zoom";

interface BaseField {
  type: FieldTypes;
  label: string;
}

export type AxisMovement = "rotate" | "wobble" | "off";
export type Axes = {
  x?: AxisMovement;
  y?: AxisMovement;
  z?: AxisMovement;
};
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
  label: "Textures";
  value: Record<string, string | null>;
}

export type ZoomData = {
  mode: "in" | "out" | "both" | "none";
  zoomInMag: number;
  zoomOutMag: number;
  // TODO: rename oscillations later
  oscillations: number;
};
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
  zoom: ZoomField;
  textures: TextureField;
};

export interface CameraInfo extends BaseField {
  type: "camera";
  label: string;
  presetAngles: Record<string, [number, number, number]>;
  value: [number, number, number];
}

export type SceneObjects = Record<string, ObjectSettings>;

export interface SceneSettings {
  objects: SceneObjects;
  general: GeneralSettings;
  cameraInfo: CameraInfo;
}

export interface RecordingSettings {
  fps: number;
  totalFrames: number;
}
