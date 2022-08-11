import { isDate } from "../";

describe("isDate util", () => {
  it("should return correct boolean flag depending on param type", () => {
    expect(isDate(undefined)).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate("1")).toBe(false);
    expect(isDate(1)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(() => {})).toBe(false);

    expect(isDate(new Date())).toBe(true);
  });
});
