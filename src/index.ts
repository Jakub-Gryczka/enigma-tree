import "./styles/main.scss";
import HandleLanguage from "./scripts/HandleLanguage";
import Auth from "./scripts/Auth";
import LogInPage from "./scripts/LoginPage";
import { Tree, DeciduousTree, ConiferTree } from "./scripts/Tree";

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
