import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import Auth from "./Auth";
import { ContentPage } from "./ContentPage";
import { sanitizeEmail } from "./utils";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(() => ({})),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: {} })),
  onAuthStateChanged: jest.fn(() => Object),
  signOut: jest.fn(),
}));

jest.mock("./ContentPage", () => ({
  ContentPage: jest.fn(),
}));

jest.mock("./utils", () => ({
  sanitizeEmail: jest.fn((email) => email),
}));

class MockAuth extends Auth {
  constructor() {
    super();
  }
}

describe("Auth tests", () => {
  let authInstance: MockAuth;
  beforeEach(() => {
    document.body.innerHTML = `
      <form class="login__form">
        <input type="email" class="form__email" />
        <input type="password" class="form__password" />
        <button type="submit">Login</button>
      </form>
      <button class="logout__btn">Logout</button>
    `;

    (initializeApp as jest.Mock).mockReturnValue({});
    (getAuth as jest.Mock).mockReturnValue({});
    (sanitizeEmail as jest.Mock).mockImplementation((email) => email);

    authInstance = new Auth();
    // beforeEach(() => {
    //   document.body.innerHTML = `
    //     <form class="login__form">
    //       <input type="email" class="form__email" />
    //       <input type="password" class="form__password" />
    //       <button type="submit">Login</button>
    //     </form>
    //     <button class="logout__btn">Logout</button>
    //   `;

    //   authInstance = {
    //     auth: jest.fn().mockImplementation(() => {
    //       const authorization = getAuth();

    //       const form = document.querySelector(".login__form") as HTMLFormElement;

    //       onAuthStateChanged(authorization, (user) => {
    //         if (user) {
    //           new ContentPage(user);
    //           const logoutBtn = document.querySelector(".logout__btn");
    //           if (logoutBtn) {
    //             logoutBtn.addEventListener("click", function () {
    //               signOut(authorization);
    //               location.reload();
    //             });
    //           }
    //         } else return;
    //       });

    //       function handleSubmit(e: SubmitEvent) {
    //         e.preventDefault();
    //         const email = document.querySelector(
    //           ".form__email"
    //         ) as HTMLInputElement;
    //         const password = document.querySelector(
    //           ".form__password"
    //         ) as HTMLInputElement;
    //         signInWithEmailAndPassword(authorization, email.value, password.value)
    //           .then((res) => {
    //             form.reset();
    //             email.blur();
    //             password.blur();
    //           })
    //           .catch((err) => {
    //             console.log(`${err.code} ${err.message}`);
    //           });
    //       }

    //       form?.addEventListener("submit", handleSubmit);
    //     }),
    //   };
  });

  test("initializes Firebase with the correct config", () => {
    expect(initializeApp).toHaveBeenCalledWith(authInstance["firebaseConfig"]);
  });

  test("should log in user on correct credentials and handle logout", async () => {
    const mockAuth = getAuth();

    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback({ uid: "12345" }); // Simulate a logged-in user
    });
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: "12345" },
    });
    (signOut as jest.Mock).mockResolvedValue(undefined);

    new Auth();

    const emailInput = document.querySelector(
      ".form__email"
    ) as HTMLInputElement;
    const passwordInput = document.querySelector(
      ".form__password"
    ) as HTMLInputElement;
    const form = document.querySelector(".login__form") as HTMLFormElement;
    const logoutBtn = document.querySelector(
      ".logout__btn"
    ) as HTMLButtonElement;

    emailInput.value = "test@example.com";
    passwordInput.value = "password123";

    form.dispatchEvent(new Event("submit"));

    await new Promise(process.nextTick); // Wait for promises to resolve

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      mockAuth,
      "test@example.com",
      "password123"
    );

    // Simulate onAuthStateChanged callback being called after login
    (onAuthStateChanged as jest.Mock).mock.calls[0][1]({ uid: "12345" });

    expect(ContentPage).toHaveBeenCalledWith({ uid: "12345" });

    logoutBtn.click();

    expect(signOut).toHaveBeenCalledWith(mockAuth);
  });
});
