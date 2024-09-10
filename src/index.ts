// import auth from "./scripts/auth";
import { handleLangSwitch, updateContent } from "./scripts/handleLanguage";
import initLoginPage from "./scripts/loginPage";
import "./styles/main.scss";
import { images } from "./scripts/images";
import Auth from "./scripts/auth";

document.addEventListener("DOMContentLoaded", () => {
  initLoginPage();
  handleLangSwitch();
  updateContent();
  const app = new Auth();
});
