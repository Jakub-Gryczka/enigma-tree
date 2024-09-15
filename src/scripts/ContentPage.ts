import HandleLanguage from "./HandleLanguage";
import { createElement } from "./utils";
import { ConiferTree, DeciduousTree } from "./Tree";

export let treeHeight: number;
class ContentPage {
  private body = document.body;
  private createInputElement = function (
    labelAttrib: string,
    attribLabel: string,
    classNameBtns: Array<String>,
    attribBtns: Array<String>,
    type: string = "button",
    value?: string
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
      inputElements += `<input type="${type}" class="content__btn ${classNameBtns[index]}" ${attribLabel}="${attrib}" value=${value}>`;
    }
    divElement.appendChild(labelElement);
    divElement.insertAdjacentHTML("beforeend", inputElements);
    return divElement;
  };
  private disablePrevBtns(element?: HTMLElement) {
    if (element) {
      (element.previousSibling as Element)
        ?.querySelectorAll(".content__btn")
        .forEach((btn) => btn.setAttribute("disabled", "true"));
    }
  }

  private handleClick(e: Event) {
    const { target } = e;
    let element;
    if (target instanceof HTMLInputElement) {
      element = target;
      if (element.value === "Iglaste" || element.value === "Conifer") {
        const conifer = new ConiferTree("Thin", 4, "green");
        treeHeight = conifer.getHeight();
      } else {
        const deciduous = new DeciduousTree("Thick", 6, "green");
        treeHeight = deciduous.getHeight();
      }

      if (!document.querySelector(".tree__color")) {
        const colorRow = document
          .querySelector(".content__form")
          ?.appendChild(
            this.createInputElement(
              "tree_color",
              "data-translate-key",
              ["tree__color"],
              ["color"],
              "color"
            )
          );
        this.disablePrevBtns(colorRow);
      }

      const colorInput = document.querySelector(
        ".tree__color"
      ) as HTMLInputElement;
      if (colorInput && !colorInput.dataset.listenerAdded) {
        colorInput.addEventListener("input", () => {
          const colorValue = colorInput.value;
          document.documentElement.style.setProperty(
            "--tree-color",
            colorValue
          );
        });
        colorInput.dataset.listenerAdded = "true";
      }
      new HandleLanguage();
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
