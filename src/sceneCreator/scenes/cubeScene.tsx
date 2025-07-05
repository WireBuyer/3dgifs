import p5 from "p5";
import Scene from "../core/scene";
import { AnimationSystem } from "../core/animationSystem";
import {
  SceneSettings,
  ObjectSettings,
  SliderField,
  Axes,
} from "../core/types";
import {
  createAxesField,
  createCameraField,
  createSliderField,
  createTextureField,
  createZoomField,
} from "../core/fieldHelper";
import defaultTexture from "../core/defaultTexture";
import getCameraPosition from "../core/cameraHelper";

interface CubeObjectSettings extends ObjectSettings {
  size: SliderField;
}

interface CubeSceneSettings extends SceneSettings {
  objects: {
    cube: CubeObjectSettings;
  };
}

export default class CubeScene extends Scene<CubeSceneSettings> {
  getDefaultSettings(): CubeSceneSettings {
    const axesDefault: Axes = {
      x: "off",
      y: "off",
      z: "off",
    };
    const surfaceNames = ["Front", "Right", "Left", "Back", "Top", "Bottom"];

    const cubeObject: CubeObjectSettings = {
      axes: createAxesField(axesDefault),
      size: createSliderField("size", 180, 100, 250, 10),
    };

    const defaults: CubeSceneSettings = {
      objects: {
        cube: cubeObject,
      },
      general: {
        zoom: createZoomField(),
        textures: createTextureField(surfaceNames),
      },
      cameraInfo: createCameraField({
        default: [0, 0, 800],
        "upper right": getCameraPosition(-30, 55),
      }),
    };
    return defaults;
  }

  draw(p: p5, progress: number, settings: CubeSceneSettings): void {
    AnimationSystem.applyCommonGeneralAnimations(p, progress, settings.general);

    AnimationSystem.applyCommonObjectAnimations(
      p,
      progress,
      settings.objects.cube
    );

    const textures = settings.general.textures.value;
    this.drawCube(p, settings.objects.cube.size.value, textures);
  }

  drawCube(
    p: p5,
    size: number,
    textures: Record<string, p5.Image | null>
  ): void {
    // front
    p.push();
    p.translate(0, 0, size / 2);
    if (textures["Front"]) {
      p.texture(textures["Front"]);
    } else {
      p.texture(defaultTexture.value!);
    }
    p.plane(size);
    p.pop();

    // right
    p.push();
    p.translate(size / 2, 0, 0);
    p.rotateY(Math.PI / 2);
    if (textures["Right"]) {
      p.texture(textures["Right"]);
    } else {
      p.texture(defaultTexture.value!);
    }
    p.plane(size);
    p.pop();

    // left
    p.push();
    p.translate(-size / 2, 0, 0);
    p.rotateY(-Math.PI / 2);
    if (textures["Left"]) {
      p.texture(textures["Left"]);
    } else {
      p.texture(defaultTexture.value!);
    }
    p.plane(size);
    p.pop();

    // back
    p.push();
    p.translate(0, 0, -size / 2);
    p.rotateY(Math.PI);
    if (textures["Back"]) {
      p.texture(textures["Back"]);
    } else {
      p.texture(defaultTexture.value!);
    }
    p.plane(size);
    p.pop();

    // top
    p.push();
    p.translate(0, -size / 2, 0);
    p.rotateX(Math.PI / 2);
    if (textures["Top"]) {
      p.texture(textures["Top"]);
    } else {
      p.texture(defaultTexture.value!);
    }
    p.plane(size);
    p.pop();

    // bottom
    p.push();
    p.translate(0, size / 2, 0);
    p.rotateX(-Math.PI / 2);
    if (textures["Bottom"]) {
      p.texture(textures["Bottom"]);
    } else {
      p.texture(defaultTexture.value!);
    }
    p.plane(size);
    p.pop();
  }
}
