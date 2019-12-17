import { v2, V2 } from "./v2";

export const EPSILON = 0.000001;

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function randomPointInCircle(radius: number): V2 {
  const t = 2 * Math.PI * Math.random();
  const u = Math.random() + Math.random();
  const r = u > 1 ? 2 - u : u;
  const result = v2.create(r * Math.cos(t), r * Math.sin(t));
  v2.mul(result, result, radius);
  return result;
}
