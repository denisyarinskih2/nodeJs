import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays,
} from "./public-holidays.service";

describe("integration tests", () => {
  it("should return list of public holidays", async () => {
    const year = 2024;
    const country = "DE";

    const result = await getListOfPublicHolidays(year, country);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return true if today is a public holiday in a given country", async () => {
    const country = "DE";

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(typeof result).toBe("boolean");

    if (result) {
      console.log("Today is a public holiday in", country);
    }
  });

  it("should return next public holidays", async () => {
    const country = "DE";

    const result = await getNextPublicHolidays(country);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
