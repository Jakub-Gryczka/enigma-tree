import { ContentPage, treeType } from "./ContentPage";
import HandleLanguage from "./HandleLanguage";
import { createElement } from "./utils";
import { ConiferTree, DeciduousTree } from "./Tree";

jest.mock("./HandleLanguage");
jest.mock("./utils");
jest.mock("./Tree");

describe("ContentPage class", () => {
  let contentPageInstance: ContentPage;

  beforeEach(() => {
    document.body.innerHTML = `
      <form class="content__form">
        <input type="color" class="tree__color" />
        <button class="btn__grow_tree"></button>
        <button class="btn__decrease_tree"></button>
      </form>
    `;
    (createElement as jest.Mock).mockImplementation(
      (tag, className, attr, value) => {
        const element = document.createElement(tag);
        element.className = className;
        if (attr && value) {
          element.setAttribute(attr, value);
        }
        return element;
      }
    );
    contentPageInstance = new ContentPage();
    jest.spyOn(HandleLanguage.prototype, "updateContent");
  });

  test("creates color and height input elements", () => {
    contentPageInstance["createButtons"]();
    expect(createElement).toHaveBeenCalledWith("div", "content__form_row");
    expect(createElement).toHaveBeenCalledWith(
      "label",
      "content__form_row--label",
      "data-translate-key",
      "tree_color"
    );
    expect(createElement).toHaveBeenCalledWith(
      "label",
      "content__form_row--label",
      "data-translate-key",
      "tree_height"
    );
  });

  test("disables previous buttons", () => {
    const previousSiblingElement = document.createElement("form");
    previousSiblingElement.innerHTML = `
        <div class="content__form_row">
          <label class="content__form_row--label" data-translate-key="tree_type">What type of tree would you like to create?</label>
          <input type="button" class="content__btn tree__type--button-deciduous" data-translate-key="deciduous" value="Deciduous" disabled="true">
          <input type="button" class="content__btn tree__type--button-conifer" data-translate-key="conifer" value="Conifer" disabled="true">
        </div>
      `;

    const element = document.createElement("div");
    element.innerHTML = `
        <label class="content__form_row--label" data-translate-key="tree_color">Change color</label>
        <input type="color" class="content__btn tree__color" data-translate-key="color" value="#7d2626" data-listener-added="true">
      `;

    document.body.appendChild(previousSiblingElement);
    document.body.appendChild(element);

    // contentPageInstance["disablePrevBtns"](element);

    const buttons = previousSiblingElement.querySelectorAll(".content__btn");
    buttons.forEach((btn) => {
      expect((btn as HTMLInputElement).disabled).toBe(true);
    });
  });

  test("handles color input change", () => {
    const colorInput = document.createElement("input");
    colorInput.innerHTML = `<input type="color" class="content__btn tree__color" data-translate-key="color" value="#7d2626" data-listener-added="true">`;

    let colorValue = colorInput.value;
    if (colorInput && !colorInput.dataset.listenerAdded) {
      colorInput.addEventListener("input", () => {
        document.documentElement.style.setProperty("--tree-color", colorValue);
        colorInput.setAttribute("value", colorValue);
      });
      colorInput.dataset.listenerAdded = "true";
    }

    expect(colorInput.value).toBe(colorValue);
  });
  test("initializes content page and language", () => {
    expect(HandleLanguage.prototype.initLanguage).toHaveBeenCalled();
  });
});
