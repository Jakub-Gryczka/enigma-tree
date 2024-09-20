import HandleLanguage from "./HandleLanguage";
import { createElement, createInputElement } from "./utils";
import { ConiferTree, DeciduousTree } from "./Tree";

export let treeType: ConiferTree | DeciduousTree;

class ContentPage {
  private body = document.body;
  private formElement: HTMLElement;

  private createButtons() {
    if (!document.querySelector(".tree__trunk")) {
      treeType.initButtons();
    }
  }

  private handleClick(e: Event) {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const element = target;
      if (!treeType) {
        if (element.value === "Iglaste" || element.value === "Conifer") {
          treeType = new ConiferTree("Thin", 4, "green", 80_000);
        } else {
          treeType = new DeciduousTree("Thick", 6, "green", 133_000);
        }
        this.createButtons();
      }
      new HandleLanguage().updateContent();
    }
  }

  private contentPage(
    user: { email: string | null } = { email: "test@test.pl" }
  ) {
    this.body.classList.add("content__page");
    this.body.style.backdropFilter = `blur(3px)`;
    this.body.innerHTML = "";
    createElement("h1", "content__title", "data-translate-key", "welcome");
    createElement(
      "button",
      "content__btn logout__btn",
      "data-translate-key",
      "logout__btn"
    );

    this.formElement = createElement("form", "content__form");
    this.formElement.appendChild(
      createInputElement(
        "tree_type",
        "data-translate-key",
        ["tree__type--button-deciduous", "tree__type--button-conifer"],
        ["deciduous", "conifer"]
      )
    );

    this.formElement?.addEventListener("click", (e: Event) =>
      this.handleClick(e)
    );
  }

  constructor(user?: any) {
    this.contentPage(user);
    new HandleLanguage().initLanguage();
  }
}

export { ContentPage };
