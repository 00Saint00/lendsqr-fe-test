import { generateUsers, updateUser, deleteUser } from "../../src/data/users";
import type { User } from "../../src/data/users";

const KEY = "lendsqr_users";

beforeEach(() => localStorage.clear());

function saveUsers(users: User[]) {
  const withDates = users.map((u) => ({ ...u, dateJoined: u.dateJoined instanceof Date ? u.dateJoined.toISOString() : u.dateJoined }));
  localStorage.setItem(KEY, JSON.stringify(withDates));
}

describe("users", () => {
  it("generateUsers returns requested count", () => {
    expect(generateUsers(10)).toHaveLength(10);
  });

  it("updateUser updates status in storage", () => {
    const users: User[] = [{ id: "1", status: "Active", organization: "lendsqr" } as User, { id: "2", status: "Pending", organization: "lendsqr" } as User];
    saveUsers(users);
    const out = updateUser("1", { status: "Blacklisted" });
    expect(out?.status).toBe("Blacklisted");
    const stored = JSON.parse(localStorage.getItem(KEY)!);
    expect(stored.find((u: User) => u.id === "1").status).toBe("Blacklisted");
  });

  it("updateUser returns null for unknown id", () => {
    saveUsers([{ id: "1", status: "Active", organization: "lendsqr" } as User]);
    expect(updateUser("bad", { status: "Blacklisted" })).toBeNull();
  });

  it("deleteUser removes user and returns true", () => {
    saveUsers([{ id: "1", organization: "lendsqr" } as User, { id: "2", organization: "lendsqr" } as User]);
    expect(deleteUser("1")).toBe(true);
    expect(JSON.parse(localStorage.getItem(KEY)!).length).toBe(1);
  });

  it("deleteUser returns false for unknown id", () => {
    saveUsers([{ id: "1", organization: "lendsqr" } as User]);
    expect(deleteUser("bad")).toBe(false);
  });
});
