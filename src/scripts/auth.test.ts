import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Auth from "./Auth";

describe("Auth class", () => {
  let authInstance: Auth;

  beforeEach(() => {
    document.body.innerHTML = `
      <form class="login__form">
        <input type="email" class="form__email" />
        <input type="password" class="form__password" />
        <button type="submit">Login</button>
      </form>
    `;
    authInstance = new Auth();
  });

  it("initialize Firebase with the correct config", () => {
    expect(initializeApp).toHaveBeenCalledWith(authInstance["firebaseConfig"]);
  });

  it("add event listener to the form", () => {
    const form = document.querySelector(".login__form");
    const event = new Event("submit");
    form?.dispatchEvent(event);
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it("call signInWithEmailAndPassword with correct arguments", () => {
    const form = document.querySelector(".login__form");
    const emailInput = document.querySelector(
      ".form__email"
    ) as HTMLInputElement;
    const passwordInput = document.querySelector(
      ".form__password"
    ) as HTMLInputElement;

    emailInput.value = "test@example.com";
    passwordInput.value = "password123";

    const event = new Event("submit");
    form?.dispatchEvent(event);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(), // auth instance
      "test@example.com",
      "password123"
    );
  });

  it("handle errors correctly", async () => {
    const form = document.querySelector(".login__form");
    const emailInput = document.querySelector(
      ".form__email"
    ) as HTMLInputElement;
    const passwordInput = document.querySelector(
      ".form__password"
    ) as HTMLInputElement;

    emailInput.value = "test@example.com";
    passwordInput.value = "password123";

    const error = { code: "auth/error", message: "An error occurred" };
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(error);

    const consoleSpy = jest.spyOn(console, "log");

    const event = new Event("submit");
    form?.dispatchEvent(event);

    await new Promise(process.nextTick); // Wait for the promise to resolve

    expect(consoleSpy).toHaveBeenCalledWith(`${error.code} ${error.message}`);
  });
});
