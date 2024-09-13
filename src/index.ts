import HandleLanguage from "./scripts/handleLanguage";
import "./styles/main.scss";
import Auth from "./scripts/auth";
import LogInPage from "./scripts/LoginPage";

class App {
  constructor() {
    new LogInPage();
    new Auth();
    new HandleLanguage();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
