import { test, expect, describe, beforeEach, vi } from "vitest";
import { ExternalAuthorizationService } from "./externalAuthorization.service";

describe("ExternalAuthorizationService", () => {
  let authService: ExternalAuthorizationService;

  beforeEach(() => {
    authService = new ExternalAuthorizationService();
  });

  test("authorizeTransaction should return true when authorization is successful", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ message: "Autorizado" }),
    });

    const result = await authService.authorizeTransaction();

    expect(result).toBe(true);
  });

  test("authorizeTransaction should return false when authorization is not successful", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ message: "Not authorized" }),
    });

    const result = await authService.authorizeTransaction();

    expect(result).toBe(false);
  });
});
