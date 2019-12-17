import { clamp } from "./misc";
import { Mat4 } from "./mat4";

export type Quat = [number, number, number, number, 'Quat']; // number[] | Float64Array | Float32Array;

export const quat = {
  create(x = 0, y = 0, z = 0, w = 1): Quat {
    return [x, y, z, w, 'Quat'];
  },

  clone(result: Quat, a: Quat) {
    result[0] = a[0];
    result[1] = a[1];
    result[2] = a[2];
    result[3] = a[3];
  },

  set(result: Quat, x = 0, y = 0, z = 0, w = 1) {
    result[0] = x;
    result[1] = y;
    result[2] = z;
    result[3] = w;
  },

  equal(a: Quat, b: Quat): boolean {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  },

  invert(result: Quat, a: Quat) {
    const dot = a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
    if (dot === 0) {
      quat.set(result, 0, 0, 0, 0);
      return;
    }
    result[0] = -a[0] / dot;
    result[1] = -a[1] / dot;
    result[2] = -a[2] / dot;
    result[3] = a[3] / dot;
  },

  normalise(result: Quat, a: Quat) {
    const length = Math.sqrt((a[0] ** 2) + (a[1] ** 2) + (a[2] ** 2) + (a[3] ** 2));

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

  add(result: Quat, a: Quat, b: Quat) {
    result[0] = a[0] + b[0];
    result[1] = a[1] + b[1];
    result[2] = a[2] + b[2];
    result[3] = a[3] + b[3];
  },

  sub(result: Quat, a: Quat, b: Quat) {
    result[0] = a[0] - b[0];
    result[1] = a[1] - b[1];
    result[2] = a[2] - b[2];
    result[3] = a[3] - b[3];
  },

  mul(result: Quat, a: Quat, scalar: number) {
    result[0] = a[0] * scalar;
    result[1] = a[1] * scalar;
    result[2] = a[2] * scalar;
    result[3] = a[3] * scalar;
  },

  dot(a: Quat, b: Quat): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  },

  slerp(result: Quat, a: Quat, b: Quat, t: number) {
    const tempA = quat.create();
    const tempB = quat.create();

    quat.normalise(tempA, a);
    quat.normalise(tempB, b);

    let dot = quat.dot(tempA, tempB);

    // If the dot product is negative, the quaternions
    // have opposite handed-ness and slerp won't take
    // the shorter path. Fix by reversing one quaternion.
    if (dot < 0) {
      quat.mul(tempB, tempB, -1);
      dot = -dot;
    }

    dot = clamp(dot, -1, 1);
    const theta0 = Math.acos(dot);
    const theta = theta0 * t;

    const s0 = Math.cos(theta) - dot * Math.sin(theta) / Math.sin(theta0);
    const s1 = Math.sin(theta) / Math.sin(theta0);

    quat.mul(tempA, tempA, s0);
    quat.mul(tempB, tempB, s1);
    quat.add(result, tempA, tempB);
  },

  isZero(a: Quat): boolean {
    return a[0] === 0 && a[1] === 0 && a[2] === 0 && a[3] === 0;
  },

  toMat4(result: Mat4, a: Quat) {
    const xx = a[0] ** 2;
    const xy = a[0] * a[1];
    const xz = a[0] * a[2];
    const xw = a[0] * a[3];
    const yy = a[1] ** 2;
    const yz = a[1] * a[2];
    const yw = a[1] * a[3];
    const zz = a[2] ** 2;
    const zw = a[2] * a[3];

    result[0] = 1 - 2 * (yy + zz);
    result[1] = 2 * (xy + zw);
    result[2] = 2 * (xz - yw);
    result[3] = 0;
    result[4] = 2 * (xy - zw);
    result[5] = 1 - 2 * (xx + zz);
    result[6] = 2 * (yz + xw);
    result[7] = 0;
    result[8] = 2 * (xz + yw);
    result[9] = 2 * (yz - xw);
    result[10] = 1 - 2 * (xx + yy);
    result[11] = 0;
    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
  },

  toFloat32Array(a: Quat): Float32Array {
    return new Float32Array([a[0], a[1], a[2], a[3]]);
  },

  toString(a: Quat, precision: number = 0): string {
    const m = Math.pow(10, precision);
    const r = (n: number) => Math.round(n * m) / m;
    return `[${r(a[0])}, ${r(a[1])}, ${r(a[2])}, ${r(a[3])}]`;
  },
};
