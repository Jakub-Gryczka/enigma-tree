import { createElement } from "./utils";
import { images } from "./images";

abstract class Tree {
  protected type: string;
  protected trunk: string;
  protected branches: string;
  protected height: number;
  protected leafColor: string;

  constructor(
    type: string,
    trunk: string,
    branches: string,
    height: number,
    leafColor: string
  ) {
    this.type = type;
    this.trunk = trunk;
    this.branches = branches;
    this.height = height;
    this.leafColor = leafColor;
  }
  getHeight() {
    return this.height;
  }

  render() {
    if (document.body.querySelector("main")) {
      return;
    }
    const main = createElement("main", "main");
    main.innerHTML += images[this.type];
    main.innerHTML += `<p class="tree__height" data-translate-key = "tree_height_cur">Aktualna wysokość drzewa wynosi: ${this.height}m</p>`;
    return main;
  }

  grow(amount: number): void {
    this.height += amount;
    console.log(`${this.type} tree height increased to ${this.height}`);
    // Add logic to update the tree's height in the DOM
  }

  changeLeafColor(color: string): void {
    this.leafColor = color;
    console.log(`${this.type} tree leaf color changed to ${this.leafColor}`);
    // Add logic to update the tree's leaf color in the DOM
  }
}

class DeciduousTree extends Tree {
  constructor(trunk: string, height: number, color: string) {
    super("deciduous", trunk, "Many", height, color);
    this.render();
  }
}

class ConiferTree extends Tree {
  constructor(trunk: string, height: number, color: string) {
    super("conifer", trunk, "Many", height, color);
    this.render();
  }
}

export { Tree, DeciduousTree, ConiferTree };
