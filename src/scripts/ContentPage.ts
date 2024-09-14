import HandleLanguage from "./HandleLanguage";
import { createElement } from "./utils";
import { images } from "./images";
import { ConiferTree, DeciduousTree } from "./Tree";

class ContentPage {
  private body = document.body;
  private createInputElement = function (
    labelAttrib: string,
    attribLabel: string,
    classNameBtns: Array<String>,
    attribBtns: Array<String>,
    type: string = "button"
  ): HTMLElement {
    const divElement = createElement("div", "content__form_row");
    const labelElement = createElement(
      "label",
      "content__form_row--label",
      "data-translate-key",
      `${labelAttrib}`
    );
    let inputElements = "";

    for (const [index, attrib] of attribBtns.entries()) {
      inputElements += `<input type="${type}" class="content__btn ${classNameBtns[index]}" ${attribLabel}="${attrib}">`;
    }
    divElement.appendChild(labelElement);
    divElement.insertAdjacentHTML("beforeend", inputElements);
    return divElement;
  };
  private handleClick(e: Event) {
    const { target } = e;
    let element;
    if (target instanceof HTMLInputElement) {
      element = target;
      if (element.value === "Iglaste" || element.value === "Conifer") {
        new ConiferTree("Thin", 4, "green");
      } else {
        new DeciduousTree("Thick", 6, "green");
      }
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

    const formElement = createElement("form", "content__form");

    formElement.appendChild(
      this.createInputElement(
        "tree_type",
        "data-translate-key",
        ["tree__type--button-deciduous", "tree__type--button-conifer"],
        ["deciduous", "conifer"]
      )
    );

    formElement?.addEventListener("click", (e) => this.handleClick(e));

    new HandleLanguage();
  }
  constructor(user?: any) {
    this.contentPage(user);
  }
}

export { ContentPage };
