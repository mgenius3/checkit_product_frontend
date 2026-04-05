import { formatCurrency, cn } from "../lib/utils";

describe("utils", () => {
  describe("formatCurrency", () => {
    it("formats USD currency correctly", () => {
      expect(formatCurrency(100)).toBe("$100.00");
      expect(formatCurrency(1234.56)).toBe("$1,234.56");
    });

    it("formats alternate currencies correctly", () => {
      // Note: Intl formatting can vary slightly by environment/Node version
      // but standard USD formatting is usually consistent.
      expect(formatCurrency(100, "EUR")).toMatch(/€100/);
    });
  });

  describe("cn", () => {
    it("merges classes correctly", () => {
      expect(cn("px-2", "py-2")).toBe("px-2 py-2");
      expect(cn("px-2", "px-4")).toBe("px-4");
      expect(cn("text-red-500", undefined, "bg-blue-500")).toBe("text-red-500 bg-blue-500");
    });
  });
});
