import { V3 } from "./v3";
import { EPSILON } from "./misc";

export type Mat4 = Float32Array;

export const mat4 = {
  create(): Mat4 {
    const result = new Float32Array(16);
    // Identity matrix
    result[0] = 1;
    result[5] = 1;
    result[10] = 1;
    result[15] = 1;
    return result;
  },

  clone(result: Mat4, a: Mat4) {
    result.set(a);
  },

  set(result: Mat4, ...values: number[]) {
    let i = 0;
    for (const value of values) {
      result[i] = value;
      i++;
      if (i > 15) {
        return;
      }
    }
  },

  identity(result: Mat4) {
    result[0] = 1;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = 1;
    result[6] = 0;
    result[7] = 0;
    result[8] = 0;
    result[9] = 0;
    result[10] = 1;
    result[11] = 0;
    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
  },

  ortho(result: Mat4, width: number, height: number, depth: number) {
    result[0] = 2 / width;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = 2 / height;
    result[6] = 0;
    result[7] = 0;
    result[8] = 0;
    result[9] = 0;
    result[10] = 2 / depth;
    result[11] = 0;
    result[12] = -1;
    result[13] = -1;
    result[14] = -1;
    result[15] = 1;
  },

  perspective(result: Mat4, fov: number, aspect: number, near: number = 0.1, far: number = 1000) {
    const f = 1.0 / Math.tan(fov / 2);
    result[0] = f / aspect;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = f;
    result[6] = 0;
    result[7] = 0;
    result[8] = 0;
    result[9] = 0;
    result[10] = (far + near) / (near - far);
    result[11] = -1;
    result[12] = 0;
    result[13] = 0;
    result[14] = (2 * far * near) / (near - far);
    result[15] = 0;
  },

  /**
   * Creates a view matrix that looks at point target from point viewer
   */
  lookAt(result: Mat4, viewer: V3, target: V3, up: V3) {
    const eyex = viewer[0];
    const eyey = viewer[1];
    const eyez = viewer[2];
    const upx = up[0];
    const upy = up[1];
    const upz = up[2];
    const centerx = target[0];
    const centery = target[1];
    const centerz = target[2];
    if (Math.abs(eyex - centerx) < EPSILON &&
      Math.abs(eyey - centery) < EPSILON &&
      Math.abs(eyez - centerz) < EPSILON) {
      return mat4.identity(result);
    }
    let z0 = eyex - centerx;
    let z1 = eyey - centery;
    let z2 = eyez - centerz;
    const zlen = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= zlen;
    z1 *= zlen;
    z2 *= zlen;
    let x0 = upy * z2 - upz * z1;
    let x1 = upz * z0 - upx * z2;
    let x2 = upx * z1 - upy * z0;
    let len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    let y0;
    let y1;
    let y2;
    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }
    result[0] = x0;
    result[1] = y0;
    result[2] = z0;
    result[3] = 0;
    result[4] = x1;
    result[5] = y1;
    result[6] = z1;
    result[7] = 0;
    result[8] = x2;
    result[9] = y2;
    result[10] = z2;
    result[11] = 0;
    result[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    result[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    result[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    result[15] = 1;
    return result;
  },

  mul(result: Mat4, a: Mat4, b: Mat4) {
    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];
    const a3 = a[3];
    const a4 = a[4];
    const a5 = a[5];
    const a6 = a[6];
    const a7 = a[7];
    const a8 = a[8];
    const a9 = a[9];
    const a10 = a[10];
    const a11 = a[11];
    const a12 = a[12];
    const a13 = a[13];
    const a14 = a[14];
    const a15 = a[15];

    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];
    const b3 = b[3];
    const b4 = b[4];
    const b5 = b[5];
    const b6 = b[6];
    const b7 = b[7];
    const b8 = b[8];
    const b9 = b[9];
    const b10 = b[10];
    const b11 = b[11];
    const b12 = b[12];
    const b13 = b[13];
    const b14 = b[14];
    const b15 = b[15];

    result[0] = b0 * a0 + b1 * a4 + b2 * a8 + b3 * a12;
    result[1] = b0 * a1 + b1 * a5 + b2 * a9 + b3 * a13;
    result[2] = b0 * a2 + b1 * a6 + b2 * a10 + b3 * a14;
    result[3] = b0 * a3 + b1 * a7 + b2 * a11 + b3 * a15;

    result[4] = b4 * a0 + b5 * a4 + b6 * a8 + b7 * a12;
    result[5] = b4 * a1 + b5 * a5 + b6 * a9 + b7 * a13;
    result[6] = b4 * a2 + b5 * a6 + b6 * a10 + b7 * a14;
    result[7] = b4 * a3 + b5 * a7 + b6 * a11 + b7 * a15;

    result[8] = b8 * a0 + b9 * a4 + b10 * a8 + b11 * a12;
    result[9] = b8 * a1 + b9 * a5 + b10 * a9 + b11 * a13;
    result[10] = b8 * a2 + b9 * a6 + b10 * a10 + b11 * a14;
    result[11] = b8 * a3 + b9 * a7 + b10 * a11 + b11 * a15;

    result[12] = b12 * a0 + b13 * a4 + b14 * a8 + b15 * a12;
    result[13] = b12 * a1 + b13 * a5 + b14 * a9 + b15 * a13;
    result[14] = b12 * a2 + b13 * a6 + b14 * a10 + b15 * a14;
    result[15] = b12 * a3 + b13 * a7 + b14 * a11 + b15 * a15;
  },

  translate(result: Mat4, a: Mat4, b: V3) {
    if (result !== a) {
      mat4.clone(result, a);
    }
    result[12] = a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12];
    result[13] = a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13];
    result[14] = a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14];
    result[15] = a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15];
  },

  scale(result: Mat4, a: Mat4, b: V3) {
    result[0] = a[0] * b[0];
    result[1] = a[1] * b[0];
    result[2] = a[2] * b[0];
    result[3] = a[3] * b[0];
    result[4] = a[4] * b[1];
    result[5] = a[5] * b[1];
    result[6] = a[6] * b[1];
    result[7] = a[7] * b[1];
    result[8] = a[8] * b[2];
    result[9] = a[9] * b[2];
    result[10] = a[10] * b[2];
    result[11] = a[11] * b[2];
    result[12] = a[12];
    result[13] = a[13];
    result[14] = a[14];
    result[15] = a[15];
  },

  rotateX(result: Mat4, a: Mat4, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);

    const a4 = a[4];
    const a5 = a[5];
    const a6 = a[6];
    const a7 = a[7];
    const a8 = a[8];
    const a9 = a[9];
    const a10 = a[10];
    const a11 = a[11];

    result[0] = a[0];
    result[1] = a[1];
    result[2] = a[2];
    result[3] = a[3];
    result[4] = a4 * c + a8 * s;
    result[5] = a5 * c + a9 * s;
    result[6] = a6 * c + a10 * s;
    result[7] = a7 * c + a11 * s;
    result[8] = a8 * c - a4 * s;
    result[9] = a9 * c - a5 * s;
    result[10] = a10 * c - a6 * s;
    result[11] = a11 * c - a7 * s;
    result[12] = a[12];
    result[13] = a[13];
    result[14] = a[14];
    result[15] = a[15];
  },

  rotateY(result: Mat4, a: Mat4, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);

    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];
    const a3 = a[3];
    const a8 = a[8];
    const a9 = a[9];
    const a10 = a[10];
    const a11 = a[11];

    result[0] = a0 * c - a8 * s;
    result[1] = a1 * c - a9 * s;
    result[2] = a2 * c - a10 * s;
    result[3] = a3 * c - a11 * s;
    result[4] = a[4];
    result[5] = a[5];
    result[6] = a[6];
    result[7] = a[7];
    result[8] = a0 * s + a8 * c;
    result[9] = a1 * s + a9 * c;
    result[10] = a2 * s + a10 * c;
    result[11] = a3 * s + a11 * c;
    result[12] = a[12];
    result[13] = a[13];
    result[14] = a[14];
    result[15] = a[15];
  },

  rotateZ(result: Mat4, a: Mat4, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);

    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];
    const a3 = a[3];
    const a4 = a[4];
    const a5 = a[5];
    const a6 = a[6];
    const a7 = a[7];

    result[0] = a0 * c + a4 * s;
    result[1] = a1 * c + a5 * s;
    result[2] = a2 * c + a6 * s;
    result[3] = a3 * c + a7 * s;
    result[4] = a4 * c - a0 * s;
    result[5] = a5 * c - a1 * s;
    result[6] = a6 * c - a2 * s;
    result[7] = a7 * c - a3 * s;
    result[8] = a[8];
    result[9] = a[9];
    result[10] = a[10];
    result[11] = a[11];
    result[12] = a[12];
    result[13] = a[13];
    result[14] = a[14];
    result[15] = a[15];
  },

  /** Apply a matrix to a vector, i.e. apply some transformation to a POINT */
  apply(result: V3, a: Mat4, b: V3) {
    const w = a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15];
    result[0] = (a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12]) / w;
    result[1] = (a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13]) / w;
    result[2] = (a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14]) / w;
  },
};
