import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { contentPage, sanitizeEmail } from "./contentPage";

class Auth {
  private firebaseConfig: object = {
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.FIREBASE_APP_ID || "",
  };
  private auth() {
    const authorization = getAuth();
    signOut(authorization);
    const form = <HTMLFormElement>document.querySelector(".login__form");

    onAuthStateChanged(authorization, (user) => {
      if (user) {
        contentPage(user);
      } else return;
    });
    function handleSubmit(e: SubmitEvent) {
      e.preventDefault();
      const email = <HTMLInputElement>document.querySelector(".form__email");
      const password = <HTMLInputElement>(
        document.querySelector(".form__password")
      );
      signInWithEmailAndPassword(
        authorization,
        sanitizeEmail(email.value),
        password.value
      )
        .then((res) => {
          form.reset();
          email.blur();
          password.blur();
        })
        .catch((err) => {
          console.log(`${err.code} ${err.message}`);
        });
    }

    form?.addEventListener("submit", handleSubmit);
  }
  constructor() {
    initializeApp(this.firebaseConfig);
    this.auth();
  }
}
export default Auth;
