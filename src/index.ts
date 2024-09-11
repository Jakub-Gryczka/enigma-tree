// import auth from "./scripts/auth";
import { handleLangSwitch, updateContent } from "./scripts/handleLanguage";
import loginPage from "./scripts/loginPage";
import "./styles/main.scss";
import Auth from "./scripts/auth";

document.addEventListener("DOMContentLoaded", () => {
  class App {
    constructor() {
      new loginPage();
      new Auth();
    }
  }
  new App();
  handleLangSwitch();
  updateContent();
});
