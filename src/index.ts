// import auth from "./scripts/auth";
import HandleLanguage from "./scripts/handleLanguage";
import loginPage from "./scripts/loginPage";
import "./styles/main.scss";
import Auth from "./scripts/auth";

class App {
  constructor() {
    new loginPage();
    new Auth();
    new HandleLanguage();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new App();
  // handleLangSwitch();
  // updateContent();
});
