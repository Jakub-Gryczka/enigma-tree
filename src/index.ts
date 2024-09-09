import auth from "./auth";
import { handleLangSwitch, updateContent } from "./handleLanguage";
import "./styles/main.scss";
import flagPL from "./assets/flags/flag_pl.svg";
import flagUK from "./assets/flags/flag_uk.svg";

document.addEventListener("DOMContentLoaded", () => {
  handleLangSwitch();
  updateContent();
});

console.log(auth());
