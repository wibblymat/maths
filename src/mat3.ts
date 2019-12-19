import { V2 } from "./v2";
import { EPSILON } from "./misc";

export type Mat3 = Float32Array;

export const mat3 = {
  create(): Mat3 {
    const result = new Float32Array(16);
    // Identity matrix
    result[0] = 1;
    result[4] = 1;
    result[8] = 1;
    return result;
  },

  clone(result: Mat3, a: Mat3) {
    result.set(a);
  },

  set(result: Mat3, ...values: number[]) {
    let i = 0;
    for (const value of values) {
      result[i] = value;
      i++;
      if (i > 8) {
        return;
      }
    }
  },

  identity(result: Mat3) {
    result[0] = 1;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 1;
    result[5] = 0;
    result[6] = 0;
    result[7] = 0;
    result[8] = 1;
  },

  mul(result: Mat3, a: Mat3, b: Mat3) {
    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];
    const a3 = a[3];
    const a4 = a[4];
    const a5 = a[5];
    const a6 = a[6];
    const a7 = a[7];
    const a8 = a[8];

    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    const b3 = b[3];
    const b4 = b[4];
    const b5 = b[5];
    const b6 = b[6];
    const b7 = b[7];
    const b8 = b[8];

    result[0] = b0 * a0 + b1 * a3 + b2 * a6;
    result[1] = b0 * a1 + b1 * a4 + b2 * a7;
    result[2] = b0 * a2 + b1 * a5 + b2 * a8;

    result[3] = b3 * a0 + b4 * a3 + b5 * a6;
    result[4] = b3 * a1 + b4 * a4 + b5 * a7;
    result[5] = b3 * a2 + b4 * a5 + b5 * a8;

    result[6] = b6 * a0 + b7 * a3 + b8 * a6;
    result[7] = b6 * a1 + b7 * a4 + b8 * a7;
    result[8] = b6 * a2 + b7 * a5 + b8 * a8;
  },

  translate(result: Mat3, a: Mat3, b: V2) {
    if (result !== a) {
      mat3.clone(result, a);
    }
    result[6] = a[0] * b[0] + a[3] * b[1] + a[6];
    result[7] = a[1] * b[0] + a[4] * b[1] + a[7];
    result[8] = a[2] * b[0] + a[5] * b[1] + a[8];
  },

  scale(result: Mat3, a: Mat3, b: V2) {
    result[0] = a[0] * b[0];
    result[1] = a[1] * b[0];
    result[2] = a[2] * b[0];
    result[3] = a[3] * b[1];
    result[4] = a[4] * b[1];
    result[5] = a[5] * b[1];
    result[6] = a[6];
    result[7] = a[7];
    result[8] = a[8];
  },

  rotate(result: Mat3, a: Mat3, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);

    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];
    const a3 = a[3];
    const a4 = a[4];
    const a5 = a[5];

    result[0] = a0 * c + a3 * s;
    result[1] = a1 * c + a4 * s;
    result[2] = a2 * c + a5 * s;
    result[3] = a3 * c - a0 * s;
    result[4] = a4 * c - a1 * s;
    result[5] = a5 * c - a2 * s;
    result[6] = a[6];
    result[7] = a[7];
    result[8] = a[8];
  },

  /** Apply a matrix to a vector, i.e. apply some transformation to a POINT */
  apply(result: V2, a: Mat3, b: V2) {
    const w = a[2] * b[0] + a[5] * b[1] + a[8];
    result[0] = (a[0] * b[0] + a[3] * b[1] + a[6]) / w;
    result[1] = (a[1] * b[0] + a[4] * b[1] + a[7]) / w;
  },
};
