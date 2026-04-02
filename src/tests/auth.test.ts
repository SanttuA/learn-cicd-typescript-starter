import { describe, it, expect } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  it("should return null when no authorization header is present", () => {
    const headers = {};
    expect(getAPIKey(headers)).toBe(null);
  });

  it("should return null when authorization header does not start with ApiKey", () => {
    const headers = { authorization: "Bearer token123" };
    expect(getAPIKey(headers)).toBe(null);
  });

  it("should return null when authorization header is ApiKey without space and key", () => {
    const headers = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBe(null);
  });

  it("should return the API key when authorization header is correctly formatted", () => {
    const headers = { authorization: "ApiKey mysecretkey" };
    expect(getAPIKey(headers)).toBe("mysecretkey");
  });

  it("should return null when authorization header starts with apikey (lowercase)", () => {
    const headers = { authorization: "apikey mysecretkey" };
    expect(getAPIKey(headers)).toBe(null);
  });
});
