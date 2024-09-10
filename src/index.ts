import auth from "./scripts/auth";
import { handleLangSwitch, updateContent } from "./scripts/handleLanguage";
import "./styles/main.scss";
import { images } from "./scripts/images";

document.addEventListener("DOMContentLoaded", () => {
  handleLangSwitch();
  updateContent();
});

console.log(auth());
