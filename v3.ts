import { V2, v2 } from "./v2";
import { V4, v4 } from "./v4";

export type V3 = [number, number, number, 'V3']; // number[] | Float64Array | Float32Array;

export const v3 = {
  create(x = 0, y = 0, z = 0): V3 {
    return [x, y, z, 'V3'];
  },

  clone(result: V3, a: V3) {
    result[0] = a[0];
    result[1] = a[1];
    result[2] = a[2];
  },

  set(result: V3, x = 0, y = 0, z = 0) {
    result[0] = x;
    result[1] = y;
    result[2] = z;
  },

  equal(a: V3, b: V3): boolean {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  },

  dot(a: V3, b: V3): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  },

  cross(result: V3, a: V3, b: V3) {
    const ax = a[0];
    const ay = a[1];
    const az = a[2];
    const bx = b[0];
    const by = b[1];
    const bz = b[2];
    result[0] = ay * bz - az * by;
    result[1] = az * bx - ax * bz;
    result[2] = ax * by - ay * bx;
  },

  invert(result: V3, a: V3) {
    result[0] = -a[0];
    result[1] = -a[1];
    result[2] = -a[2];
  },

  normalise(result: V3, a: V3) {
    const length = v3.length(a);

    if (length === 0) {
      result[0] = 0;
      result[1] = 0;
      result[2] = 0;
    } else {
      result[0] = a[0] / length;
      result[1] = a[1] / length;
      result[2] = a[2] / length;
    }
  },

  scale(result: V3, a: V3, b: V3) {
    result[0] = a[0] * b[0];
    result[1] = a[1] * b[1];
    result[2] = a[2] * b[2];
  },

  add(result: V3, a: V3, b: V3) {
    result[0] = a[0] + b[0];
    result[1] = a[1] + b[1];
    result[2] = a[2] + b[2];
  },

  sub(result: V3, a: V3, b: V3) {
    result[0] = a[0] - b[0];
    result[1] = a[1] - b[1];
    result[2] = a[2] - b[2];
  },

  mul(result: V3, a: V3, scalar: number) {
    result[0] = a[0] * scalar;
    result[1] = a[1] * scalar;
    result[2] = a[2] * scalar;
  },

  average(result: V3, ...vs: V3[]) {
    v3.set(result, 0, 0, 0);
    for (const v of vs) {
      v3.add(result, result, v);
    }
    v3.mul(result, result, 1 / vs.length);
  },

  rotateX(result: V3, a: V3, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const y = a[1] * c - a[2] * s;
    const z = a[1] * s + a[2] * c;
    result[0] = a[0];
    result[1] = y;
    result[2] = z;
  },

  rotateY(result: V3, a: V3, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const x = a[2] * s + a[0] * c;
    const z = a[2] * c - a[0] * s;
    result[0] = x;
    result[1] = a[1];
    result[2] = z;
  },

  rotateZ(result: V3, a: V3, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const x = a[0] * c - a[1] * s;
    const y = a[0] * s + a[1] * c;
    result[0] = x;
    result[1] = y;
    result[2] = a[2];
  },

  lerp(result: V3, a: V3, b: V3, t: number) {
    result[0] = a[0] + (b[0] - a[0]) * t;
    result[1] = a[1] + (b[1] - a[1]) * t;
    result[2] = a[2] + (b[2] - a[2]) * t;
  },

  isZero(a: V3): boolean {
    return a[0] === 0 && a[1] === 0 && a[2] === 0;
  },

  length(a: V3): number {
    return Math.sqrt(v3.lengthSquared(a));
  },

  lengthSquared(a: V3): number {
    return (a[0] ** 2) + (a[1] ** 2) + (a[2] ** 2);
  },

  distance(a: V3, b: V3): number {
    return Math.sqrt(v3.distanceSquared(a, b));
  },

  distanceSquared(a: V3, b: V3): number {
    return ((a[0] - b[0]) ** 2) + ((a[1] - b[1]) ** 2) + ((a[2] - b[2]) ** 2);
  },

  toFloat32Array(a: V3): Float32Array {
    return new Float32Array([a[0], a[1], a[2]]);
  },

  xz(a: V3): V2 {
    return v2.create(a[0], a[2]);
  },

  xyzw(a: V3): V4 {
    return v4.create(a[0], a[1], a[2], 1);
  },

  toString(a: V3, precision: number = 0): string {
    const m = Math.pow(10, precision);
    return `[${Math.round(a[0] * m) / m}, ${Math.round(a[1] * m) / m}, ${Math.round(a[2] * m) / m}]`;
  },
};
