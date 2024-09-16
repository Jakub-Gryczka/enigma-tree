import { ConiferTree, DeciduousTree } from "./Tree";

describe("Tree classes", () => {
  it("should create a ConiferTree instance", () => {
    const coniferTree = new ConiferTree("Thin", 4, "green");
    expect(coniferTree).toBeInstanceOf(ConiferTree);
  });

  it("should create a DeciduousTree instance", () => {
    const deciduousTree = new DeciduousTree("Thick", 6, "green");
    expect(deciduousTree).toBeInstanceOf(DeciduousTree);
  });

  it("should grow the tree", () => {
    const coniferTree = new ConiferTree("Thin", 4, "green");
    const initialHeight = coniferTree.getHeight();
    coniferTree.grow();
    expect(coniferTree.getHeight()).toBeGreaterThan(initialHeight);
  });

  it("should decrease the tree height", () => {
    const deciduousTree = new DeciduousTree("Thick", 6, "green");
    deciduousTree.grow();
    const initialHeight = deciduousTree.getHeight();
    deciduousTree.decrease();
    expect(deciduousTree.getHeight()).toBeLessThan(initialHeight);
  });
});
