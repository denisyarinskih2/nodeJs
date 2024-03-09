import axios from "axios";
import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays,
} from "./public-holidays.service";

describe("public-holidays.service unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getListOfPublicHolidays", () => {
    it("should return list of public holidays", async () => {
      const axiosSpy = jest.spyOn(axios, "get").mockResolvedValue({
        data: [
          {
            name: "Holiday 1",
            localName: "Holiday 1",
            date: "2024-01-01",
            countryCode: "DE",
            fixed: true,
            global: true,
            counties: ["County 1"],
            launchYear: 2023,
            types: ["National"],
          },
        ],
      });

      const result = await getListOfPublicHolidays(2024, "DE");

      expect(result).toEqual([
        {
          name: "Holiday 1",
          localName: "Holiday 1",
          date: "2024-01-01",
        },
      ]);
      expect(axiosSpy).toHaveBeenCalledWith(
        expect.stringContaining("/PublicHolidays/2024/DE")
      );
    });

    it("should return empty array on error", async () => {
      const axiosSpy = jest
        .spyOn(axios, "get")
        .mockRejectedValue(new Error("Mock Error"));

      const result = await getListOfPublicHolidays(2024, "DE");

      expect(result).toEqual([]);
    });
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    it("should return true if today is public holiday", async () => {
      const axiosSpy = jest
        .spyOn(axios, "get")
        .mockResolvedValue({ status: 200 });

      const result = await checkIfTodayIsPublicHoliday("DE");

      expect(result).toBe(true);
      expect(axiosSpy).toHaveBeenCalledWith(
        expect.stringContaining("/IsTodayPublicHoliday/DE")
      );
    });

    it("should return false if today is not public holiday", async () => {
      const axiosSpy = jest
        .spyOn(axios, "get")
        .mockResolvedValue({ status: 404 });

      const result = await checkIfTodayIsPublicHoliday("DE");

      expect(result).toBe(false);
    });

    it("should return false on error", async () => {
      const axiosSpy = jest
        .spyOn(axios, "get")
        .mockRejectedValue(new Error("Mock Error"));

      const result = await checkIfTodayIsPublicHoliday("DE");

      expect(result).toBe(false);
    });
  });

  describe("getNextPublicHolidays unit test", () => {
    it("should return next public holidays", async () => {
      const mockCountry = "DE";
      const mockData = [
        { name: "Holiday 1", localName: "Holiday 1", date: "2024-01-01" },
        { name: "Holiday 2", localName: "Holiday 2", date: "2024-02-01" },
      ];
      const expectedShortenedData = [
        { name: "Holiday 1", localName: "Holiday 1", date: "2024-01-01" },
        { name: "Holiday 2", localName: "Holiday 2", date: "2024-02-01" },
      ];
      const axiosGetSpy = jest
        .spyOn(axios, "get")
        .mockResolvedValue({ data: mockData });

      const result = await getNextPublicHolidays(mockCountry);

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/NextPublicHolidays/${mockCountry}`)
      );
      expect(axiosGetSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedShortenedData);
    });

    it("should return empty array on error", async () => {
      const mockCountry = "DE";
      const axiosGetSpy = jest
        .spyOn(axios, "get")
        .mockRejectedValue(new Error("Mock Error"));

      const result = await getNextPublicHolidays(mockCountry);

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/NextPublicHolidays/${mockCountry}`)
      );
      expect(axiosGetSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });
});
