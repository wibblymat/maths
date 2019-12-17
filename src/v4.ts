import { V3, v3 } from "./v3";

export type V4 = [number, number, number, number, 'V4']; // number[] | Float64Array | Float32Array;

export const v4 = {
  create(x = 0, y = 0, z = 0, w = 1): V4 {
    return [x, y, z, w, 'V4'];
  },

  clone(result: V4, a: V4) {
    result[0] = a[0];
    result[1] = a[1];
    result[2] = a[2];
    result[3] = a[3];
  },

  set(result: V4, x = 0, y = 0, z = 0, w = 1) {
    result[0] = x;
    result[1] = y;
    result[2] = z;
    result[3] = w;
  },

  equal(a: V4, b: V4): boolean {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  },

  dot(a: V4, b: V4): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  },

  invert(result: V4, a: V4) {
    result[0] = -a[0];
    result[1] = -a[1];
    result[2] = -a[2];
    result[3] = -a[3];
  },

  normalise(result: V4, a: V4) {
    const length = v4.length(a);

    if (length === 0) {
      result[0] = 0;
      result[1] = 0;
      result[2] = 0;
      result[3] = 0;
    } else {
      result[0] = a[0] / length;
      result[1] = a[1] / length;
      result[2] = a[2] / length;
      result[3] = a[3] / length;
    }
  },

  scale(result: V4, a: V4, b: V4) {
    result[0] = a[0] * b[0];
    result[1] = a[1] * b[1];
    result[2] = a[2] * b[2];
    result[3] = a[3] * b[3];
  },

  add(result: V4, a: V4, b: V4) {
    result[0] = a[0] + b[0];
    result[1] = a[1] + b[1];
    result[2] = a[2] + b[2];
    result[3] = a[3] + b[3];
  },

  sub(result: V4, a: V4, b: V4) {
    result[0] = a[0] - b[0];
    result[1] = a[1] - b[1];
    result[2] = a[2] - b[2];
    result[3] = a[3] - b[3];
  },

  mul(result: V4, a: V4, scalar: number) {
    result[0] = a[0] * scalar;
    result[1] = a[1] * scalar;
    result[2] = a[2] * scalar;
    result[3] = a[3] * scalar;
  },

  average(result: V4, ...vs: V4[]) {
    v4.set(result, 0, 0, 0, 0);
    for (const v of vs) {
      v4.add(result, result, v);
    }
    v4.mul(result, result, 1 / vs.length);
  },

  rotate(/* result: V4, a: V4, angle: number */) {
    throw new Error('V4 rotation is not fully implemented');
  },

  rotateX(result: V4, a: V4, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const y = a[1] * c - a[2] * s;
    const z = a[1] * s + a[2] * c;
    result[0] = a[0];
    result[1] = y;
    result[2] = z;
  },

  rotateY(result: V4, a: V4, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const x = a[2] * s + a[0] * c;
    const z = a[2] * c - a[0] * s;
    result[0] = x;
    result[1] = a[1];
    result[2] = z;
  },

  rotateZ(result: V4, a: V4, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const x = a[0] * c - a[1] * s;
    const y = a[0] * s + a[1] * c;
    result[0] = x;
    result[1] = y;
    result[2] = a[2];
  },

  lerp(result: V4, a: V4, b: V4, t: number) {
    result[0] = a[0] + (b[0] - a[0]) * t;
    result[1] = a[1] + (b[1] - a[1]) * t;
    result[2] = a[2] + (b[2] - a[2]) * t;
    result[3] = a[3] + (b[3] - a[3]) * t;
  },

  isZero(a: V4): boolean {
    return a[0] === 0 && a[1] === 0 && a[2] === 0 && a[3] === 0;
  },

  length(a: V4): number {
    return Math.sqrt(v4.lengthSquared(a));
  },

  lengthSquared(a: V4): number {
    return (a[0] ** 2) + (a[1] ** 2) + (a[2] ** 2) + (a[3] ** 2);
  },

  distance(a: V4, b: V4): number {
    return Math.sqrt(v4.distanceSquared(a, b));
  },

  distanceSquared(a: V4, b: V4): number {
    return ((a[0] - b[0]) ** 2) + ((a[1] - b[1]) ** 2) + ((a[2] - b[2]) ** 2) + ((a[3] - b[3]) ** 2);
  },

  toFloat32Array(a: V4): Float32Array {
    return new Float32Array([a[0], a[1], a[2], a[3]]);
  },

  xyz(a: V4): V3 {
    return v3.create(a[0], a[1], a[2]);
  },

  toString(a: V4, precision: number = 0): string {
    const m = Math.pow(10, precision);
    const r = (n: number) => Math.round(n * m) / m;
    return `[${r(a[0])}, ${r(a[1])}, ${r(a[2])}, ${r(a[3])}]`;
  },
};
