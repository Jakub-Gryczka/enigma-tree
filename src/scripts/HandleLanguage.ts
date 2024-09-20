import { treeType } from "./ContentPage";
import { ConiferTree, DeciduousTree } from "./Tree";

interface Translations {
  [lang: string]: {
    [key: string]: string;
  };
}
class HandleLanguage {
  private selectedLang: string;
  private translations: Translations = {
    pl: {
      title: "Zaloguj się",
      email: "E-mail",
      password: "Hasło",
      login__btn: "Wchodzę!",
      welcome: "Witaj!",
      logout__btn: "Wyloguj się",
      deciduous: "Liściaste",
      conifer: "Iglaste",
      tree_type: "Jakiego rodzaju drzewo chcesz stworzyć?",
      tree_color: "Zmień kolor",
      tree_render_color: "Wyświetl liście",
      render_color: "KLIK",
      tree_height: "Zmień wysokość drzewa",
      tree_height_cur: "Aktualna wysokość drzewa wynosi: ",
      tree_branches: "Ilość gałęzi: ",
      tree_needles: "Ilość igieł: ",
      tree_leaves: "Ilość liści: ",
      tree_root: "Korzeń: ",
      tree_trunk: "Wyświetl pień drzewa",
      trunk: "KLIK",
      grow: "Rośnij",
      shrink: "Malej",
    },
    en: {
      title: "Log In",
      email: "E-mail",
      password: "Password",
      login__btn: "Coming in!",
      welcome: "Welcome!",
      logout__btn: "Log Out",
      deciduous: "Deciduous",
      conifer: "Conifer",
      tree_type: "What type of tree would you like to create?",
      tree_color: "Change color",
      tree_render_color: "Show leaves",
      render_color: "CLICK",
      tree_height: "Change tree's height",
      tree_height_cur: "Current tree's height is:  ",
      tree_branches: "Tree's branches: ",
      tree_leaves: "Leaves amount: ",
      tree_needles: "Needles amount: ",
      tree_root: "Root: ",
      tree_trunk: "Show tree's trunk",
      trunk: "CLICK",
      grow: "Grow",
      shrink: "Shrink",
    },
  };

  public updateContent() {
    const elements = document.querySelectorAll("[data-translate-key]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate-key");
      if (key) {
        element.textContent = this.translations[this.selectedLang][key];
        if (element.classList.contains("tree__height")) {
          console.log(element);
          element.textContent += `${treeType.getHeight()}m`;
        }
        if (element.classList.contains("tree__branches")) {
          console.log(element);
          element.textContent += `${treeType.getBranches()}`;
        }
        if (
          element.classList.contains("tree__needles") ||
          element.classList.contains("tree__leaves")
        ) {
          if (treeType instanceof ConiferTree) {
            element.textContent += `${treeType.needles}`;
          }
          if (treeType instanceof DeciduousTree) {
            element.textContent += `${treeType.leaves}`;
          }
        }
        if (element.classList.contains("tree__root")) {
          element.textContent += `${treeType.root}`;
        }
      }
      if (
        key &&
        element.tagName == "INPUT" &&
        element.getAttribute("type") === "button"
      ) {
        element.setAttribute(
          "value",
          this.translations[this.selectedLang][key]
        );
        if (element.getAttribute("type") === "color") {
          element.setAttribute("value", "#000000");
        }
        element.textContent = "";
      }
    });
  }
  public createLangSwitch() {
    let language = <HTMLDivElement>document.querySelector(".language")!;
    if (!language) {
      language = document.createElement("div");
      language.classList.add("language");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = "language-toggle";
      input.classList.add("language-toggle");

      const label = document.createElement("label");
      label.htmlFor = "language-toggle";
      label.classList.add("language-label");

      const flagPl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      flagPl.classList.add("flag", "flag__pl");
      flagPl.setAttribute("width", "16px");
      flagPl.setAttribute("height", "16px");
      flagPl.setAttribute("viewBox", "0 0 36 36");
      flagPl.innerHTML = `<path fill="#EEE" d="M32 5H4a4 4 0 0 0-4 4v9h36V9a4 4 0 0 0-4-4z"></path><path fill="#DC143C" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-9H0v9z"></path>`;

      const flagUk = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      flagUk.classList.add("flag", "flag__uk");
      flagUk.setAttribute("width", "16px");
      flagUk.setAttribute("height", "16px");
      flagUk.setAttribute("viewBox", "0 0 36 36");
      flagUk.innerHTML = `<path fill="#00247D" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"></path><path fill="#CF1B2B" d="M25.14 23l9.712 6.801a3.977 3.977 0 0 0 .99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8a3.988 3.988 0 0 0-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2a3.994 3.994 0 0 0-.991 1.749L7.372 13h3.487z"></path><path fill="#EEE" d="M36 21H21v10h2v-5.836L31.335 31H32a3.99 3.99 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9a3.983 3.983 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4.001 4.001 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4a3.985 3.985 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A3.968 3.968 0 0 0 0 9v.059L5.628 13H0v2h15V5h-2z"></path><path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z"></path>`;

      label.appendChild(flagPl);
      label.appendChild(flagUk);

      language.appendChild(input);
      language.appendChild(label);

      document.body.appendChild(language);

      const languageSwitch = <HTMLInputElement>(
        document.querySelector(".language-toggle")
      );
      languageSwitch.addEventListener("click", () => {
        this.selectedLang = languageSwitch.checked ? "en" : "pl";
        localStorage.setItem("selectedLang", this.selectedLang);
        languageSwitch?.checked
          ? (this.selectedLang = "en")
          : (this.selectedLang = "pl");
        this.updateContent();
      });

      languageSwitch.checked = this.selectedLang === "en";
    }
  }

  public initLanguage() {
    this.createLangSwitch();
    this.updateContent();
  }
  constructor() {
    this.selectedLang = localStorage.getItem("selectedLang") || "pl";
  }
}
export default HandleLanguage;
