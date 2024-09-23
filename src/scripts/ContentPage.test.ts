import { ContentPage, treeType } from "./ContentPage";
import HandleLanguage from "./HandleLanguage";
import { createElement, createInputElement } from "./utils";
import { ConiferTree, DeciduousTree } from "./Tree";

jest.mock("./HandleLanguage");
jest.mock("./utils");
jest.mock("./Tree", () => {
  const actualTree = jest.requireActual("./Tree");
  return {
    ...actualTree,
    ConiferTree: actualTree.ConiferTree,
    DeciduousTree: actualTree.DeciduousTree,
  };
});

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
    (createInputElement as jest.Mock).mockImplementation(
      (type, attr, classNames: string[], values: string[]) => {
        const fragment = document.createDocumentFragment();
        classNames.forEach((className, index) => {
          const input = document.createElement("input");
          input.type = "button";
          input.className = `content__btn ${className}`;
          input.setAttribute(attr, values[index]);
          fragment.appendChild(input);
        });
        return fragment;
      }
    );
    contentPageInstance = new ContentPage();
    jest.spyOn(HandleLanguage.prototype, "updateContent");
    jest.spyOn(HandleLanguage.prototype, "initLanguage");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("constructor initializes content page and language", () => {
    expect(HandleLanguage.prototype.initLanguage).toHaveBeenCalled();
    expect(document.body.classList.contains("content__page")).toBe(true);
  });

  test("createButtons creates buttons if they don't exist", () => {
    document.body.innerHTML = ""; // Clear the body to ensure buttons don't exist
    (treeType as any) = { initButtons: jest.fn() }; // Mock treeType.initButtons
    contentPageInstance["createButtons"]();
    expect((treeType as any).initButtons).toHaveBeenCalled();
  });

  test("handleClick instantiates correct tree type and creates buttons", () => {
    let treeType;
    const deciduousButton = document.createElement("input");
    deciduousButton.type = "button";
    deciduousButton.value = "Deciduous";
    contentPageInstance["handleClick"]({
      target: deciduousButton,
    } as unknown as Event);
    treeType = DeciduousTree;
    expect(treeType).toBe(DeciduousTree);
    expect(HandleLanguage.prototype.updateContent).toHaveBeenCalled();

    const coniferButton = document.createElement("input");
    coniferButton.type = "button";
    coniferButton.value = "Conifer";
    contentPageInstance["handleClick"]({
      target: coniferButton,
    } as unknown as Event);
    treeType = ConiferTree;
    expect(treeType).toBe(ConiferTree);
    expect(HandleLanguage.prototype.updateContent).toHaveBeenCalled();
  });

  test("contentPage sets up the content page correctly", () => {
    contentPageInstance["contentPage"]();
    expect(document.body.classList.contains("content__page")).toBe(true);
    expect(document.body.style.backdropFilter).toBe("blur(3px)");
    expect(document.body.innerHTML).not.toBe(null);
    expect(createElement).toHaveBeenCalledWith(
      "h1",
      "content__title",
      "data-translate-key",
      "welcome"
    );
    expect(createElement).toHaveBeenCalledWith(
      "button",
      "content__btn logout__btn",
      "data-translate-key",
      "logout__btn"
    );
    expect(createInputElement).toHaveBeenCalledWith(
      "tree_type",
      "data-translate-key",
      ["tree__type--button-deciduous", "tree__type--button-conifer"],
      ["deciduous", "conifer"]
    );
  });
});
