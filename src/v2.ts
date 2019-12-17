import { V3, v3 } from "./v3";
import { V4, v4 } from "./v4";

export type V2 = [number, number, 'V2'] | [number, number]; // number[] | Float64Array | Float32Array;

export const v2 = {
  create(x = 0, y = 0): V2 {
    return [x, y, 'V2'];
  },

  clone(result: V2, a: V2) {
    result[0] = a[0];
    result[1] = a[1];
  },

  set(result: V2, x = 0, y = 0) {
    result[0] = x;
    result[1] = y;
  },

  equal(a: V2, b: V2): boolean {
    return a[0] === b[0] && a[1] === b[1];
  },

  dot(a: V2, b: V2): number {
    return a[0] * b[0] + a[1] * b[1];
  },

  invert(result: V2, a: V2) {
    result[0] = -a[0];
    result[1] = -a[1];
  },

  normalise(result: V2, a: V2) {
    const length = v2.length(a);

    if (length === 0) {
      result[0] = 0;
      result[1] = 0;
    } else {
      result[0] = a[0] / length;
      result[1] = a[1] / length;
    }
  },

  scale(result: V2, a: V2, b: V2) {
    result[0] = a[0] * b[0];
    result[1] = a[1] * b[1];
  },

  add(result: V2, a: V2, b: V2) {
    result[0] = a[0] + b[0];
    result[1] = a[1] + b[1];
  },

  sub(result: V2, a: V2, b: V2) {
    result[0] = a[0] - b[0];
    result[1] = a[1] - b[1];
  },

  mul(result: V2, a: V2, scalar: number) {
    result[0] = a[0] * scalar;
    result[1] = a[1] * scalar;
  },

  average(result: V2, ...vs: V2[]) {
    v2.set(result, 0, 0);
    for (const v of vs) {
      v2.add(result, result, v);
    }
    v2.mul(result, result, 1 / vs.length);
  },

  rotate(result: V2, a: V2, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const x = a[0] * c - a[1] * s;
    const y = a[0] * s + a[1] * c;
    result[0] = x;
    result[1] = y;
  },

  lerp(result: V2, a: V2, b: V2, t: number) {
    result[0] = a[0] + (b[0] - a[0]) * t;
    result[1] = a[1] + (b[1] - a[1]) * t;
  },

  isZero(a: V2): boolean {
    return a[0] === 0 && a[1] === 0;
  },

  length(a: V2): number {
    return Math.sqrt(v2.lengthSquared(a));
  },

  lengthSquared(a: V2): number {
    return (a[0] ** 2) + (a[1] ** 2);
  },

  distance(a: V2, b: V2): number {
    return Math.sqrt(v2.distanceSquared(a, b));
  },

  distanceSquared(a: V2, b: V2): number {
    return ((a[0] - b[0]) ** 2) + ((a[1] - b[1]) ** 2);
  },

  toFloat32Array(a: V2): Float32Array {
    return new Float32Array([a[0], a[1]]);
  },

  xyz(a: V2): V3 {
    return v3.create(a[0], 0, a[1]);
  },

  xyzw(a: V2): V4 {
    return v4.create(a[0], 0, a[1], 1);
  },

  toString(a: V2, precision: number = 0): string {
    const m = Math.pow(10, precision);
    return `[${Math.round(a[0] * m) / m}, ${Math.round(a[1] * m) / m}]`;
  },
};
