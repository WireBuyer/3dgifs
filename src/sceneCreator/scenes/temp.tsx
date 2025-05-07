import p5 from "p5";

export default function tempdraw(
  p: p5,
  progress: number,
  texture: p5.Image
): void {
  p.background(0);

  p.push();

  p.translate(0, 0, 0);
  p.textureMode(p.NORMAL);
  p.textureWrap(p.REPEAT);

  const planeSize = 300;
  p.beginShape();
  p.texture(texture);

  const textureOffset = progress;
  p.vertex(-planeSize / 2, planeSize / 2, 0, textureOffset, textureOffset + 1);
  p.vertex(
    planeSize / 2,
    planeSize / 2,
    0,
    textureOffset + 1,
    textureOffset + 1
  );
  p.vertex(planeSize / 2, -planeSize / 2, 0, textureOffset + 1, textureOffset);
  p.vertex(-planeSize / 2, -planeSize / 2, 0, textureOffset, textureOffset);

  p.endShape(p.CLOSE);

  p.pop();
}
