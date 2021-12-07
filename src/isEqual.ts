import { AnyObject } from '@/types/customTypes';

/**
 * Determines if params are equal
 */
export const isEqual = (x: any, y: any): Boolean => {
  const tx = typeof x,
    ty = typeof y;

  return x && y && tx === 'object' && tx === ty
    ? Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).every((key) => isEqual((x as AnyObject)[key], (y as AnyObject)[key]))
    : x === y;
};

export default isEqual;
