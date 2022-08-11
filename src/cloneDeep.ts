import { AnyObject, Primitive } from "./types";
import { isDate } from "./isDate";

/**
 * Source can be object like or primitive
 */
export const cloneDeep = <T>(source: T): T => {
  if (Array.isArray(source)) {
    return source.map((item) => cloneDeep(item) as unknown) as unknown as T;
  }

  if (isDate(source)) {
    return new Date((source as unknown as Date).getTime()) as unknown as T;
  }

  if (source && typeof source === "object") {
    return Object.getOwnPropertyNames(source).reduce((o, prop) => {
      Object.defineProperty(
        o,
        prop,
        Object.getOwnPropertyDescriptor(source, prop)!
      );
      o[prop] = cloneDeep((source as AnyObject)[prop]) as
        | AnyObject
        | Primitive
        | Date
        | Array<unknown>;
      return o as Partial<T>;
    }, Object.create(Object.getPrototypeOf(source))) as T;
  }

  return source;
};

export default cloneDeep;
