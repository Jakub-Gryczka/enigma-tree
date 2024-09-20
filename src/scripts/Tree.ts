import { createElement, createInputElement } from "./utils";
import { images } from "./images";

abstract class Tree {
  root: string;
  protected type: string;
  protected trunk: string;
  protected branches: string;
  protected height: number;
  protected leafColor: string;
  protected main: HTMLElement;
  protected form = document.querySelector(".content__form")!;
  protected trunkRow: HTMLDivElement;
  protected leavesRow: HTMLDivElement;
  protected paragraphs = [
    `<p class="tree__info tree__height" data-translate-key = "tree_height_cur"></p>`,
    `<p class="tree__info tree__root" data-translate-key = "tree_root"></p>`,
    `<p class="tree__info tree__branches" data-translate-key = "tree_branches"></p>`,
  ];

  constructor(
    root: string,
    type: string,
    trunk: string,
    branches: string,
    height: number,
    leafColor: string
  ) {
    this.root = root;
    this.type = type;
    this.trunk = trunk;
    this.branches = branches;
    this.height = height;
    this.leafColor = leafColor;
  }

  getHeight() {
    return this.height;
  }
  getBranches() {
    return this.branches;
  }
  private disablePrevBtns(element?: HTMLElement) {
    if (element) {
      (element.previousSibling as Element)
        ?.querySelectorAll(".content__btn")
        .forEach((btn) => btn.setAttribute("disabled", "true"));
    }
  }

  protected render() {
    if (document.body.querySelector("main")) {
      return;
    }
    this.main = createElement("main", "main");
    this.main.innerHTML += images[this.type];
    return this.main;
  }

  protected grow(): number {
    return this.height++;
  }
  shrink(): void | number {
    if (this.height === 1) {
      return;
    }
    return this.height--;
  }
  private showLeaves() {
    this.leavesRow = this.form.appendChild(
      createInputElement(
        "tree_render_color",
        "data-translate-key",
        ["tree__render_color"],
        ["render_color"]
      ) as HTMLDivElement
    );
    this.disablePrevBtns(this.leavesRow);
  }
  private changeLeafColor() {
    if (!document.querySelector(".tree__color")) {
      const colorRow = this.form.appendChild(
        createInputElement(
          "tree_color",
          "data-translate-key",
          ["tree__color"],
          ["color"],
          "color",
          "#ffffff"
        )
      );

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
          colorInput.setAttribute("value", colorValue);
        });
        colorInput.dataset.listenerAdded = "true";
      }
      this.disablePrevBtns(colorRow);
    }
  }
  private changeHeight() {
    const heightRow = this.form.appendChild(
      createInputElement(
        "tree_height",
        "data-translate-key",
        ["btn__grow_tree", "btn__decrease_tree"],
        ["grow", "shrink"]
      )
    );

    heightRow.addEventListener("click", (e) => {
      e.preventDefault();
      const { target } = e;
      if (target instanceof HTMLElement) {
        if (target.classList.contains("btn__grow_tree")) {
          this.grow();
        }
        if (target.classList.contains("btn__decrease_tree")) {
          this.shrink();
        }
        if (document.body.querySelector("main")) {
          return;
        }
      }
    });
  }
  private showParagraphs() {
    if (this.main.querySelector(".tree__height")) {
      return;
    } else {
      const paragraphsWrapper = document.createElement("div");
      paragraphsWrapper.classList.add("main__par_wrapper");
      this.main.appendChild(paragraphsWrapper);

      this.paragraphs.forEach((par) => {
        const paragraphElement = document.createElement("p");
        paragraphElement.innerHTML = par;
        paragraphsWrapper.appendChild(
          paragraphElement.firstChild as HTMLParagraphElement
        );
      });
      return this.paragraphs;
    }
  }
  private showTrunk() {
    this.trunkRow = this.form.appendChild(
      createInputElement(
        "tree_trunk",
        "data-translate-key",
        ["tree__trunk"],
        ["trunk"]
      ) as HTMLDivElement
    );
  }
  initButtons() {
    this.showTrunk();
    this.trunkRow.addEventListener("click", (e) => {
      this.showLeaves();
      const trunk = document.querySelector(".trunk");
      (trunk! as HTMLElement).style.opacity = "1";
      this.leavesRow.addEventListener("click", (e) => {
        e.preventDefault();
        this.showParagraphs();
        this.changeLeafColor();
        this.changeHeight();
        (document.querySelector(
          ".tree_outline"
        ) as HTMLElement)!.style.opacity = "1";
        document.documentElement.style.setProperty("--opacity", "1");
      });
    });
  }
}

class DeciduousTree extends Tree {
  leaves: number;
  constructor(trunk: string, height: number, color: string, leaves: number) {
    super("korzeń drzewa liściastego", "deciduous", trunk, "23", height, color);
    this.leaves = leaves;
    this.paragraphs.push(
      `<p class="tree__info tree__leaves" data-translate-key = "tree_leaves"></p>`
    );
    this.render();
  }
}

class ConiferTree extends Tree {
  needles: number;
  constructor(trunk: string, height: number, color: string, needles: number) {
    super("korzeń drzewa iglastego", "conifer", trunk, "18", height, color);
    this.needles = needles;
    this.paragraphs.push(
      `<p class="tree__info tree__needles" data-translate-key = "tree_needles"></p>`
    );
    this.render();
  }
}

export { Tree, DeciduousTree, ConiferTree };
