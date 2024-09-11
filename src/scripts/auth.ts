import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    const form = <HTMLFormElement>document.querySelector(".login__form");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = <HTMLInputElement>document.querySelector(".form__email");
      const password = <HTMLInputElement>(
        document.querySelector(".form__password")
      );
      signInWithEmailAndPassword(authorization, email.value, password.value)
        .then((cred) => {
          const user = cred.user;
          console.log(user);
          form.reset();
          email.blur();
          password.blur();
        })
        .catch((err) => {
          console.log(`${err.code} ${err.message}`);
        });
    });
  }
  constructor() {
    initializeApp(this.firebaseConfig);
    this.auth();
  }
}
const auth = new Auth();
export default Auth;
