// Fake localStorage for Node (Jest runs in Node, which has no localStorage)
const store: Record<string, string> = {};
const fakeLocalStorage = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { for (const k of Object.keys(store)) delete store[k]; },
};
if (typeof globalThis.localStorage === "undefined") {
  Object.defineProperty(globalThis, "localStorage", { value: fakeLocalStorage, writable: true });
}
