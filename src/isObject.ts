/**
 * Simple object check.
 */
export const isObject = (item: any): boolean => {
  return Boolean(item && typeof item === "object" && !Array.isArray(item));
};

export default isObject;
