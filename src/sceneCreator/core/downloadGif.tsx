import p5 from "p5";
// @ts-expect-error - no types
import { GIFEncoder, quantize, applyPalette } from "gifenc";
import { SceneSettings } from "./types";
import { getScene } from "../scenes/sceneList";

export default function downloadGif(
  sceneSelection: string,
  sceneSettings: SceneSettings,
  cameraCoordinates: number[],
  height: number,
  width: number
) {
  const currentScene = getScene(sceneSelection);

  // gif info
  const fps = 50;
  const totalFrames = 150;
  const delay = 1000 / fps;

  const recordingContainer = document.createElement("div");
  document.body.appendChild(recordingContainer);
  recordingContainer.style.display = "none";

  const gif = GIFEncoder();

  // have to manually loop later to increase render speed
  const sketch = (p: p5) => {
    p.preload = () => {
      // initialize all textures and store it in the scene
      Object.keys(sceneSettings.general.textures.value).forEach((texture) => {
        if (sceneSettings.general.textures.value[texture] == null) return;
        currentScene.textures[texture] = p.loadImage(
          sceneSettings.general.textures.value[texture]
        );
      });
    };
    p.setup = () => {
      p.createCanvas(width, height, p.WEBGL);
      p.frameRate(300);
      p.noStroke();
      p.normalMaterial();
      p.camera(...cameraCoordinates);
    };

    p.draw = () => {
      // p5 part
      p.background(20);
      const progress = ((p.frameCount - 1) % totalFrames) / totalFrames;
      currentScene.draw(p, progress, sceneSettings);

      // gif recording stuff
      const gl = p.drawingContext as WebGLRenderingContext;
      const pixelData = new Uint8Array(width * height * 4);
      gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixelData);
      // need to flip the image
      // test flipping first and flipping after these function calls
      const flippedData = new Uint8Array(width * height * 4);
      const rowSize = width * 4;
      for (let y = 0; y < height; y++) {
        const srcOffset = (height - 1 - y) * rowSize;
        const dstOffset = y * rowSize;
        flippedData.set(
          pixelData.subarray(srcOffset, srcOffset + rowSize),
          dstOffset
        );
      }

      const format = "rgb4444";
      const palette = quantize(flippedData, 64, { format });
      const index = applyPalette(flippedData, palette, format);

      gif.writeFrame(index, width, height, { palette, delay, dispose: 2 });

      if (p.frameCount === totalFrames) {
        p.remove();
        gif.finish();

        const buffer = gif.bytesView();
        download(buffer, "animation.gif", { type: "image/gif" });
        document.body.removeChild(recordingContainer);
      }
    };
  };

  new p5(sketch, recordingContainer);
}

function download(buf: unknown, filename: string, type: unknown) {
  //@ts-expect-error - temp
  const blob = buf instanceof Blob ? buf : new Blob([buf], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
}
