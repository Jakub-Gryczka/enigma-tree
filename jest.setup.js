jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(() => ({})), // Mock Firebase app instance
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})), // Mock Firebase auth instance
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: {} })), // Mock signInWithEmailAndPassword to return a resolved promise
}));
