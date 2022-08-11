import { isEqual } from "../";

describe("isEqual util", () => {
  it("returns correct result for primitives and objects like types", () => {
    expect(isEqual(false, true)).toBe(false);
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual("1", 1)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
    expect(isEqual(null, "1")).toBe(false);

    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual("test", "test")).toBe(true);
    expect(isEqual(null, null)).toBe(true);

    expect(isEqual([1], [2])).toBe(false);
    expect(isEqual({}, { test: "test" })).toBe(false);
    expect(isEqual({}, null)).toBe(false);
    expect(
      isEqual(
        () => {},
        () => {}
      )
    ).toBe(false);

    expect(isEqual({ obj: "obj " }, { obj: "obj " })).toBe(true);
    expect(isEqual([{ obj: "obj " }], [{ obj: "obj " }])).toBe(true);
    const fn = () => {};
    expect(isEqual(fn, fn)).toBe(true);
  });
});
