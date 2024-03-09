import request from "supertest";

const API_URL = "https://date.nager.at/api/v3";

describe("Available Countries API", () => {
  test("should return 200 and list of available countries", async () => {
    const response = await request(API_URL).get("/AvailableCountries");

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach((country: any) => {
      expect(country).toEqual(
        expect.objectContaining({
          countryCode: expect.any(String),
          name: expect.any(String),
        })
      );
    });
  });
});
