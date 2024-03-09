import request from "supertest";

const API_URL = "https://date.nager.at/api/v3";

describe("CountryInfo API", () => {
  test("should return 200 and country information for a given country code", async () => {
    const countryCode = "DE";
    const response = await request(API_URL).get(`/CountryInfo/${countryCode}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      commonName: expect.any(String),
      officialName: expect.any(String),
      countryCode: countryCode,
      region: expect.any(String),
      borders: expect.anything(),
    });
  });
});
