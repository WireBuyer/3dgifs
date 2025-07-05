import p5 from "p5";
import {
  Fields,
  AxesField,
  CheckboxField,
  SliderField,
  TextureField,
  Axes,
  ZoomField,
  CameraInfo,
} from "./types";

// type guards for the fields
export function isAxesField(field: Fields): field is AxesField {
  return field.type === "axes";
}

export function isCheckboxField(field: Fields): field is CheckboxField {
  return field.type === "checkbox";
}

export function isSliderField(field: Fields): field is SliderField {
  return field.type === "slider";
}

export function isTextureField(field: Fields): field is TextureField {
  return field.type === "texture";
}

export function isZoomField(field: Fields): field is ZoomField {
  return field.type === "zoom";
}

// helper functions to create fields
/**
 * Creates an axes field with the specified initial value.
 * @param value - The initial value for the axes movement
 */
export function createAxesField(value: Axes): AxesField {
  return {
    type: "axes",
    label: "Axes Movement",
    value,
  };
}

/**
 * Creates a checkbox field with the specified parameters.
 * @param label - The label for the checkbox field
 * @param value - The initial value of the checkbox (true or false)
 */
export function createCheckboxField(
  label: string,
  value: boolean
): CheckboxField {
  return {
    type: "checkbox",
    label,
    value,
  };
}

/**
 *
 * @param presetAngles - Label and values of the preset angles
 * @param value - Initial value of the camera (default: [0, 0, 800])
 */
export function createCameraField(
  presetAngles: Record<string, [number, number, number]>,
  value: [number, number, number] = [0, 0, 800]
): CameraInfo {
  return {
    type: "camera",
    label: "Angle Presets",
    presetAngles: presetAngles,
    value: value,
  };
}

/**
 * Creates a slider field with the specified parameters.
 * @param label - The label for the slider field
 * @param value - The initial value of the slider
 * @param min - The minimum value for the slider
 * @param max - The maximum value for the slider
 * @param step - The step value for the slider
 */
export function createSliderField(
  label: string,
  value: number,
  min: number,
  max: number,
  step: number
): SliderField {
  return {
    type: "slider",
    label,
    value,
    min,
    max,
    step,
  };
}

/**
 * Creates a texture field with the specified texture names.
 * @param surfaces - An array of surface names to be used as keys
 * @returns
 */
export function createTextureField(surfaces: string[]): TextureField {
  const value: Record<string, p5.Image | null> = {};
  surfaces.forEach((surface) => {
    value[surface] = null;
  });

  return {
    type: "texture",
    label: "Textures",
    value: value,
  };
}

/**
 * Creates a zoom field with default parameters.
 * @param mode - The zoom mode - can be "in", "out", "both", or "none" (default is "none")
 * @param zoomInMag - The minimum zoom level (default is 1.3)
 * @param zoomOutMag - The maximum zoom level (default is 1.3)
 * @param oscillations - The number of oscillations for the zoom effect (default is 1)
 */
export function createZoomField(
  mode: "in" | "out" | "both" | "none" = "none",
  zoomInMag: number = 1.3,
  zoomOutMag: number = 1.3,
  oscillations: number = 1
): ZoomField {
  return {
    type: "zoom",
    label: "Zoom Options",
    value: {
      mode,
      zoomInMag: zoomInMag,
      zoomOutMag: zoomOutMag,
      oscillations,
    },
  };
}
