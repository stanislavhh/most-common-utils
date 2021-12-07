import { AnyObject, Primitive } from '@/types/customTypes';
import { isObject } from './isObject';
/**
 * merges deeply target with sources (lodash analog)
 */

type MergeDeepOverload = {
  <T, S1>(target: T, source: S1): T & S1;
  <T, S1, S2>(target: T, source1: S1, source2: S2): T & S1 & S2;
  <T, S1, S2, S3>(target: T, source1: S1, source2: S2, source3: S3): T & S1 & S2 & S3;
  <T, S1, S2, S3, S4>(target: T, source1: S1, source2: S2, source3: S3, source4: S4): T &
    S1 &
    S2 &
    S3 &
    S4;
  (target: AnyObject, ...sources: Array<AnyObject>): AnyObject;
};

export const mergeDeep: MergeDeepOverload = (
  target: AnyObject,
  ...sources: Array<AnyObject>
): AnyObject => {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();

  if (Array.isArray(target) && Array.isArray(source)) {
    target.forEach((item, index) => {
      if ((source as AnyObject)[index]) {
        if (typeof source[index] !== typeof item) {
          target[index] = source[index] as AnyObject | Primitive;
        }
        mergeDeep(item, source[index]);
      }
    });

    for (let i = target.length; i < source.length; i++) {
      (target as Array<AnyObject | Primitive>)[i] = source[i] as AnyObject | Primitive;
    }
  }

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key]) || Array.isArray(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: isObject(source[key]) ? {} : [] });
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] as Primitive });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

export default mergeDeep;
