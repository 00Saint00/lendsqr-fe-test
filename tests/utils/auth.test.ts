import { login, logout, getCurrentUser, isAuthenticated, isAdmin } from "../../src/utils/auth";

const mockGetUsers = jest.fn();
jest.mock("../../src/data/users", () => ({ getUsers: () => mockGetUsers() }));

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe("auth", () => {
  it("login: returns user when email and password match", () => {
    mockGetUsers.mockReturnValue([{ id: "1", email: "a@b.com", name: "Test", password: "password123", role: "user", avatar: "" }]);
    const result = login("a@b.com", "password123");
    expect(result).not.toBeNull();
    expect(result?.email).toBe("a@b.com");
    expect(localStorage.getItem("lendsqr_auth")).toBeTruthy();
  });

  it("login: returns null when password is wrong", () => {
    mockGetUsers.mockReturnValue([{ id: "1", email: "a@b.com", name: "Test", password: "password123", role: "user", avatar: "" }]);
    expect(login("a@b.com", "wrong")).toBeNull();
  });

  it("login: returns null when email not found", () => {
    mockGetUsers.mockReturnValue([{ id: "1", email: "other@b.com", name: "Other", password: "password123", role: "user", avatar: "" }]);
    expect(login("a@b.com", "password123")).toBeNull();
  });

  it("logout: clears auth from storage", () => {
    localStorage.setItem("lendsqr_auth", "{}");
    logout();
    expect(localStorage.getItem("lendsqr_auth")).toBeNull();
  });

  it("getCurrentUser: returns stored user", () => {
    const user = { id: "1", email: "a@b.com", name: "Test", role: "user", avatar: "" };
    localStorage.setItem("lendsqr_auth", JSON.stringify(user));
    expect(getCurrentUser()).toEqual(user);
  });

  it("getCurrentUser: returns null when nothing stored", () => {
    expect(getCurrentUser()).toBeNull();
  });

  it("isAuthenticated: true when user in storage", () => {
    localStorage.setItem("lendsqr_auth", JSON.stringify({ id: "1" }));
    expect(isAuthenticated()).toBe(true);
  });

  it("isAuthenticated: false when no user", () => {
    expect(isAuthenticated()).toBe(false);
  });

  it("isAdmin: true when role is admin", () => {
    localStorage.setItem("lendsqr_auth", JSON.stringify({ id: "1", role: "admin" }));
    expect(isAdmin()).toBe(true);
  });

  it("isAdmin: false when role is user", () => {
    localStorage.setItem("lendsqr_auth", JSON.stringify({ id: "1", role: "user" }));
    expect(isAdmin()).toBe(false);
  });
});
