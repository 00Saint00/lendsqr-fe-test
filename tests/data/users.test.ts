jest.mock("@faker-js/faker", () => {
  let n = 0;
  return {
    faker: {
      seed: () => {},
      helpers: { arrayElement: (arr: unknown[]) => arr[0] },
      number: { float: () => 1000, int: () => 1 },
      string: { uuid: () => `id-${++n}`, numeric: () => "12345678" },
      person: { fullName: () => "Test User" },
      internet: { email: () => "test@test.com", username: () => "user" },
      location: { streetAddress: () => "123 St", city: () => "City", state: () => "State", zipCode: () => "12345" },
      image: { avatar: () => "" },
      date: { past: () => new Date() },
      finance: { accountNumber: () => "123", accountName: () => "Bank" },
      datatype: { boolean: () => false },
    },
  };
});

import { generateUsers, updateUser, deleteUser } from "../../src/data/users";
import type { User } from "../../src/data/users";

const KEY = "lendsqr_users";

beforeEach(() => localStorage.clear());

// getUsers() only uses storage when there are exactly 500 users; otherwise it regenerates.
function seedStorageWith500Users(overrides: Partial<User>[] = []): void {
  const users: User[] = Array.from({ length: 500 }, (_, i) => ({
    ...overrides[i],
    id: overrides[i]?.id ?? String(i + 1),
    dateJoined: overrides[i]?.dateJoined ?? new Date().toISOString(),
    status: (overrides[i]?.status ?? "Active") as User["status"],
    organization: (overrides[i]?.organization ?? "lendsqr") as User["organization"],
  } as User));
  const withDates = users.map((u) => ({
    ...u,
    dateJoined: u.dateJoined instanceof Date ? u.dateJoined.toISOString() : u.dateJoined,
  }));
  localStorage.setItem(KEY, JSON.stringify(withDates));
}

describe("users", () => {
  it("generateUsers returns requested count", () => {
    expect(generateUsers(10)).toHaveLength(10);
  });

  it("updateUser updates status in storage", () => {
    seedStorageWith500Users([
      { id: "1", status: "Active" },
      { id: "2", status: "Pending" },
    ]);
    const out = updateUser("1", { status: "Blacklisted" });
    expect(out?.status).toBe("Blacklisted");
    const stored = JSON.parse(localStorage.getItem(KEY)!);
    expect(stored.find((u: User) => u.id === "1").status).toBe("Blacklisted");
  });

  it("updateUser returns null for unknown id", () => {
    seedStorageWith500Users([{ id: "1", status: "Active" }]);
    expect(updateUser("bad", { status: "Blacklisted" })).toBeNull();
  });

  it("deleteUser removes user and returns true", () => {
    seedStorageWith500Users([{ id: "1" }, { id: "2" }]);
    expect(deleteUser("1")).toBe(true);
    expect(JSON.parse(localStorage.getItem(KEY)!).length).toBe(499);
  });

  it("deleteUser returns false for unknown id", () => {
    seedStorageWith500Users([{ id: "1" }]);
    expect(deleteUser("bad")).toBe(false);
  });
});
