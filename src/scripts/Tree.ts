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

  grow(): number {
    return this.height++;
  }
  shrink(): void | number {
    if (this.height === 1) {
      return;
    }
    return this.height--;
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
