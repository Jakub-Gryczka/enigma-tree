import { Tree, DeciduousTree, ConiferTree } from "./Tree";
import { createElement, createInputElement } from "./utils";
import { images } from "./images";

jest.mock("./utils");
jest.mock("./images");

describe("Tree class", () => {
  let treeInstance: Tree;

  beforeEach(() => {
    document.body.innerHTML = `
      <form class="content__form"></form>
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
      (type, attr, classNames, values) => {
        const fragment = document.createDocumentFragment();
        classNames.forEach((className: string, index: number) => {
          const input = document.createElement("input");
          input.type = "button";
          input.className = `content__btn ${className}`;
          input.setAttribute(attr, values[index]);
          fragment.appendChild(input);
        });
        return fragment;
      }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Tree constructor initializes properties correctly", () => {
    treeInstance = new DeciduousTree("oak", 10, "green", 100);
    expect(treeInstance.root).toBe("korzeń drzewa liściastego");
    expect((treeInstance as any).type).toBe("deciduous");
    expect((treeInstance as any).trunk).toBe("oak");
    expect(treeInstance.getBranches()).toBe("23");
    expect(treeInstance.getHeight()).toBe(10);
    expect((treeInstance as any).leafColor).toBe("green");
  });

  test("DeciduousTree constructor initializes leaves property", () => {
    const deciduousTree = new DeciduousTree("oak", 10, "green", 100);
    expect(deciduousTree.leaves).toBe(100);
  });

  test("ConiferTree constructor initializes needles property", () => {
    const coniferTree = new ConiferTree("pine", 15, "green", 200);
    expect(coniferTree.needles).toBe(200);
  });

  test("shrink method decreases height", () => {
    treeInstance = new DeciduousTree("oak", 10, "green", 100);
    treeInstance.shrink();
    expect(treeInstance.getHeight()).toBe(9);
  });

  test("shrink method does not decrease height below 1", () => {
    treeInstance = new DeciduousTree("oak", 1, "green", 100);
    treeInstance.shrink();
    expect(treeInstance.getHeight()).toBe(1);
  });

  test("render method creates main element with tree image", () => {
    images["deciduous"] = "<svg>Deciduous Tree</svg>";
    treeInstance = new DeciduousTree("oak", 10, "green", 100);
    const mainElement = treeInstance["render"]();
    expect(mainElement).toBeInstanceOf(HTMLElement);
    expect(mainElement?.innerHTML).toContain("<svg>Deciduous Tree</svg>");
  });
});

describe("DeciduousTree class", () => {
  let deciduousTreeInstance: DeciduousTree;

  beforeEach(() => {
    document.body.innerHTML = `
      <form class="content__form"></form>
    `;
  });

  test("DeciduousTree constructor initializes properties and calls render", () => {
    const renderSpy = jest.spyOn(DeciduousTree.prototype as any, "render");
    deciduousTreeInstance = new DeciduousTree("trunk", 10, "green", 100);
    expect(deciduousTreeInstance.leaves).toBe(100);
    expect(renderSpy).toHaveBeenCalled();
  });
});

describe("ConiferTree class", () => {
  let coniferTreeInstance: ConiferTree;

  beforeEach(() => {
    document.body.innerHTML = `
      <form class="content__form"></form>
    `;
  });

  test("ConiferTree constructor initializes properties and calls render", () => {
    const renderSpy = jest.spyOn(ConiferTree.prototype as any, "render");
    coniferTreeInstance = new ConiferTree("trunk", 10, "green", 100);
    expect(coniferTreeInstance.needles).toBe(100);
    expect(renderSpy).toHaveBeenCalled();
  });
});
