import {isObject} from '../utils';

describe('isObject util', () => {
  it('returns true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject(new Set())).toBe(true);
    expect(isObject(new Map())).toBe(true);
  });

  it('returns false for primitives', () => {
    expect(isObject(1)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(false)).toBe(false);
  });

  it('returns false for arrays and fns', () => {
    expect(isObject([])).toBe(false);
    expect(isObject(() => {})).toBe(false);
  });
});
