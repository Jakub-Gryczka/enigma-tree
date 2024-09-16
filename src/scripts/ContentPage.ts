import HandleLanguage from "./HandleLanguage";
import { createElement } from "./utils";
import { ConiferTree, DeciduousTree } from "./Tree";

export let treeType: ConiferTree | DeciduousTree;

class ContentPage {
  private body = document.body;
  private formElement: HTMLElement;

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
  private createColorHeight() {
    if (!document.querySelector(".tree__color")) {
      const colorRow = this.formElement.appendChild(
        this.createInputElement(
          "tree_color",
          "data-translate-key",
          ["tree__color"],
          ["color"],
          "color",
          "#ffffff"
        )
      );
      const heightRow = this.formElement.appendChild(
        this.createInputElement(
          "tree_height",
          "data-translate-key",
          ["btn__grow_tree", "btn__decrease_tree"],
          ["grow", "shrink"]
        )
      );
      this.disablePrevBtns(colorRow);

      heightRow.addEventListener("click", (e) => {
        e.preventDefault();
        const { target } = e;
        if (target instanceof HTMLElement) {
          if (target.classList.contains("btn__grow_tree")) {
            treeType.grow();
          }
          if (target.classList.contains("btn__decrease_tree")) {
            treeType.decrease();
          }
        }
      });
    }

    const colorInput = document.querySelector(
      ".tree__color"
    ) as HTMLInputElement;
    if (colorInput && !colorInput.dataset.listenerAdded) {
      colorInput.addEventListener("input", () => {
        const colorValue = colorInput.value;
        document.documentElement.style.setProperty("--tree-color", colorValue);
        colorInput.setAttribute("value", colorValue);
      });
      colorInput.dataset.listenerAdded = "true";
    }
  }

  private handleClick(e: Event) {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const element = target;
      if (!treeType) {
        if (element.value === "Iglaste" || element.value === "Conifer") {
          treeType = new ConiferTree("Thin", 4, "green");
        } else {
          treeType = new DeciduousTree("Thick", 6, "green");
        }
        this.createColorHeight();
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
      this.createInputElement(
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
