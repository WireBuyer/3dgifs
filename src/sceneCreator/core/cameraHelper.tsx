/**
 * Returns the camera coordinates based on the specified yaw and pitch angles.
 * @param yaw - Yaw angle in degrees
 * @param pitch - Pitch angle in degrees
 * @param distance - Distance from object (default: 800)
 */

export default function getCameraPosition(
  yaw: number,
  pitch: number,
  distance = 800
): [number, number, number] {
  let x = 0;
  let y = 0;
  let z = distance;

  // yaw rotation (y axis)
  const yawRad = (yaw * Math.PI) / 180;
  const tempX = x * Math.cos(yawRad) - z * Math.sin(yawRad);
  let tempZ = x * Math.sin(yawRad) + z * Math.cos(yawRad);
  x = tempX;
  z = tempZ;

  // pitch rotation (x axis)
  const pitchRad = (pitch * Math.PI) / 180;
  const tempY = y * Math.cos(pitchRad) - z * Math.sin(pitchRad);
  tempZ = y * Math.sin(pitchRad) + z * Math.cos(pitchRad);
  y = tempY;
  z = tempZ;

  return [x, y, z];
}
