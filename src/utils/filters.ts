import type { User } from "../data/users";

export interface UsersFilterValues {
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateFrom: string;
  dateTo: string;
  status: User["status"] | "";
}

export function applyFilters(
  users: User[],
  filters: UsersFilterValues,
): User[] {
  return users.filter((user) => {
    const org = (filters.organization || "").toLowerCase();
    if (org && user.organization.toLowerCase() !== org) return false;

    const name = (filters.username || "").toLowerCase();
    if (name && !user.name.toLowerCase().includes(name)) return false;

    const email = (filters.email || "").toLowerCase();
    if (email && !user.email.toLowerCase().includes(email)) return false;

    const phone = (filters.phone || "").replace(/\D/g, "");
    if (phone && !user.phone.replace(/\D/g, "").includes(phone)) return false;

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      from.setHours(0, 0, 0, 0);
      const joined =
        user.dateJoined instanceof Date
          ? user.dateJoined
          : new Date(user.dateJoined);
      if (joined < from) return false;
    }

    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      to.setHours(23, 59, 59, 999);
      const joined =
        user.dateJoined instanceof Date
          ? user.dateJoined
          : new Date(user.dateJoined);
      if (joined > to) return false;
    }

    if (filters.status && user.status !== filters.status) return false;

    return true;
  });
}
