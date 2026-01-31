import { applyFilters, type UsersFilterValues } from "../../src/utils/filters";
import type { User } from "../../src/data/users";

function user(overrides: Partial<User> = {}): User {
  return {
    id: "1",
    name: "John",
    email: "john@test.com",
    phone: "08012345678",
    organization: "lendsqr",
    status: "Active",
    dateJoined: new Date("2024-01-15"),
    ...overrides,
  } as User;
}

const noFilter: UsersFilterValues = { organization: "", username: "", email: "", phone: "", dateFrom: "", dateTo: "", status: "" };

describe("applyFilters", () => {
  it("returns everyone when no filters", () => {
    const list = [user(), user({ id: "2" })];
    expect(applyFilters(list, noFilter)).toHaveLength(2);
  });

  it("filters by organization", () => {
    const list = [user({ organization: "lendsqr" }), user({ id: "2", organization: "irorun" })];
    const out = applyFilters(list, { ...noFilter, organization: "lendsqr" });
    expect(out).toHaveLength(1);
    expect(out[0].organization).toBe("lendsqr");
  });

  it("filters by status", () => {
    const list = [user({ status: "Active" }), user({ id: "2", status: "Pending" })];
    const out = applyFilters(list, { ...noFilter, status: "Pending" });
    expect(out).toHaveLength(1);
    expect(out[0].status).toBe("Pending");
  });

  it("returns empty when nothing matches", () => {
    const list = [user({ organization: "irorun" })];
    const out = applyFilters(list, { ...noFilter, organization: "lendsqr" });
    expect(out).toHaveLength(0);
  });

  it("returns empty when given empty list", () => {
    expect(applyFilters([], noFilter)).toHaveLength(0);
  });
});
