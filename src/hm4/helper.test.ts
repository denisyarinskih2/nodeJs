import { shortenPublicHoliday, validateInput } from "./helper";

describe("Helpers unit tests", () => {
  describe("validateInput", () => {
    it("should not throw error when country is supported and year is current", () => {
      const validCountry = "DE";
      const validYear = new Date().getFullYear();

      expect(() =>
        validateInput({ country: validCountry, year: validYear })
      ).not.toThrow();
    });

    it("should throw error when country is not supported", () => {
      const invalidCountry = "InvalidCountry";

      expect(() => validateInput({ country: invalidCountry })).toThrow(
        `Country provided is not supported, received: ${invalidCountry}`
      );
    });

    it("should throw error when year is not current", () => {
      const invalidYear = new Date().getFullYear() - 1;

      expect(() => validateInput({ year: invalidYear })).toThrow(
        `Year provided not the current, received: ${invalidYear}`
      );
    });
  });

  describe("shortenPublicHoliday", () => {
    it("should return a shortened public holiday", () => {
      const holiday = {
        name: "Holiday 1",
        localName: "Holiday 1",
        date: "2024-01-01",
        countryCode: "US",
        fixed: true,
        global: true,
        counties: ["County 1"],
        launchYear: 2023,
        types: ["National"],
      };
      const expectedShortenedHoliday = {
        name: "Holiday 1",
        localName: "Holiday 1",
        date: "2024-01-01",
      };

      expect(shortenPublicHoliday(holiday)).toEqual(expectedShortenedHoliday);
    });
  });
});
