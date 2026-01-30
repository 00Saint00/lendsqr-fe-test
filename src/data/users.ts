import { faker } from "@faker-js/faker";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  avatar: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  dateJoined: Date;
  password: string;
  role: "admin" | "user";
  organization: string;
  bvn: string;
  balance: number;
  rating: number;
  bank: string;
  accountNumber: string;
  gender: "Male" | "Female";
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  children: number | "None";
  typeOfResidence: "Parent's Apartment" | "Own Apartment" | "Rent" | "Business";
  monthlyIncome: number;
  monthlyIncomeMin: number;
  monthlyIncomeMax: number;
  loanRepayment: number;
  levelOfEducation: "Bachelor's" | "Master's" | "PhD" | "High School" | "Other";
  employmentStatus:
    | "Employed"
    | "Unemployed"
    | "Self-Employed"
    | "Retired"
    | "Student";
  employmentDuration: number;
  guarantorName: string;
  guarantorPhone: string;
  guarantorEmail: string;
  guarantorRelationship: string;
  secondGuarantorName: string;
  secondGuarantorPhone: string;
  secondGuarantorEmail: string;
  secondGuarantorRelationship: string;
  twitter: string;
  facebook: string;
  instagram: string;
}

const STORAGE_KEY = "lendsqr_users";

export const generateUsers = (count: number = 500): User[] => {
  return Array.from({ length: count }, (_, index) => {
    const employmentStatus = faker.helpers.arrayElement([
      "Employed",
      "Unemployed",
      "Self-Employed",
      "Retired",
      "Student",
    ] as const);
    const noIncome =
      employmentStatus === "Retired" || employmentStatus === "Unemployed";
    const incomeBase = noIncome
      ? 0
      : faker.number.float({ min: 1000, max: 5000000 });
    const monthlyIncomeMin = noIncome ? 0 : incomeBase * 0.6;
    const monthlyIncomeMax = noIncome ? 0 : incomeBase * 1.4;
    return {
      id: faker.string.uuid(),
      name: index === 0 ? "Admin" : faker.person.fullName(),
      organization: faker.helpers.arrayElement([
        "lendsqr",
        "irorun",
        "lendstar",
      ]),
      // email: faker.internet.email(),
      email: index === 0 ? "admin@lendsqr.com" : faker.internet.email(),
      phone: "080" + faker.string.numeric(8),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      avatar: faker.image.avatar(),
      status: faker.helpers.arrayElement([
        "Active",
        "Inactive",
        "Pending",
        "Blacklisted",
      ]),
      dateJoined: faker.date.past(),
      password: import.meta.env.VITE_DEMO_PASSWORD,
      role: index === 0 ? "admin" : "user",
      accountNumber: faker.finance.accountNumber(10),
      bvn: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
      balance: faker.number.float({
        min: 1000,
        max: 500000,
        fractionDigits: 2,
      }),
      monthlyIncome: noIncome ? 0 : incomeBase,
      monthlyIncomeMin,
      monthlyIncomeMax,
      loanRepayment: faker.number.float({ min: 1000, max: 5000000 }),
      rating: faker.number.int({ min: 1, max: 5 }),
      bank: faker.finance.accountName(),
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      maritalStatus: faker.helpers.arrayElement([
        "Single",
        "Married",
        "Divorced",
        "Widowed",
      ]),
      children: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: 10 })
        : "None",

      typeOfResidence: faker.helpers.arrayElement([
        "Parent's Apartment",
        "Own Apartment",
        "Rent",
        "Business",
      ]),
      levelOfEducation: faker.helpers.arrayElement([
        "Bachelor's",
        "Master's",
        "PhD",
        "High School",
        "Other",
      ]),
      employmentStatus,
      employmentDuration: faker.number.int({ min: 1, max: 10 }),
      guarantorName: faker.person.fullName(),
      guarantorPhone: "080" + faker.string.numeric(8),
      guarantorEmail: faker.internet.email(),
      guarantorRelationship: faker.helpers.arrayElement([
        "Parent",
        "Sibling",
        "Friend",
        "Other",
      ]),
      secondGuarantorName: faker.person.fullName(),
      secondGuarantorPhone: "080" + faker.string.numeric(8),
      secondGuarantorEmail: faker.internet.email(),
      secondGuarantorRelationship: faker.helpers.arrayElement([
        "Parent",
        "Sibling",
        "Friend",
        "Other",
      ]),
      twitter: "@" + faker.internet.username().toLowerCase().replace(/\s/g, ""),
      facebook: faker.internet.username().replace(/_/g, " "),
      instagram:
        "@" + faker.internet.username().toLowerCase().replace(/\s/g, "_"),
    };
  });
};

/**
 * Get users from localStorage or generate and persist them
 * Seeds faker only once when storage is empty
 */
const EXPECTED_USER_COUNT = 500;

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      const users = JSON.parse(stored);
      if (Array.isArray(users) && users.length === EXPECTED_USER_COUNT) {
        return users.map((user: User) => ({
          ...user,
          dateJoined: new Date(user.dateJoined),
        }));
      }
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error parsing stored users:", error);
    }
  }

  faker.seed(123);
  const users = generateUsers(EXPECTED_USER_COUNT);

  // Persist to localStorage (convert dates to strings)
  const usersForStorage = users.map((user) => ({
    ...user,
    dateJoined: user.dateJoined.toISOString(),
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usersForStorage));

  return users;
};

export const saveUsers = (users: User[]): void => {
  const usersForStorage = users.map((user) => ({
    ...user,
    dateJoined:
      user.dateJoined instanceof Date
        ? user.dateJoined.toISOString()
        : user.dateJoined,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usersForStorage));
};

export const updateUser = (
  userId: string,
  updates: Partial<User>,
): User | null => {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) return null;

  users[index] = { ...users[index], ...updates };
  saveUsers(users);

  return users[index];
};

/**
 * Delete a user by ID
 */
export const deleteUser = (userId: string): boolean => {
  const users = getUsers();
  const filtered = users.filter((u) => u.id !== userId);

  if (filtered.length === users.length) return false;

  saveUsers(filtered);
  return true;
};

export const addUser = (userData: Omit<User, "id" | "dateJoined">): User => {
  const users = getUsers();
  const newUser: User = {
    ...userData,
    id: faker.string.uuid(),
    dateJoined: new Date(),
  };

  users.push(newUser);
  saveUsers(users);

  return newUser;
};
