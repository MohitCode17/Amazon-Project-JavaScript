import { formatMoney } from "../utils/formatMoney.js";

// Creating a group of spec(test) called suite
describe("test suite: formatMoney", () => {
  it("converts cents into dollars", () => {
    expect(formatMoney(2894)).toEqual("28.94");
  });

  it("works with 0", () => {
    expect(formatMoney(0)).toEqual("0.00");
  });

  it("rounds up to the nearest cent", () => {
    expect(formatMoney(2000.5)).toEqual("20.01");
  });
});
