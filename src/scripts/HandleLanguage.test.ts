import HandleLanguage from "./HandleLanguage";

jest.mock("./ContentPage", () => {
  const originalModule = jest.requireActual("./ContentPage");
  return {
    ...originalModule,
    treeType: new (require("./Tree").ConiferTree)("Thin", 4, "green"),
  };
});

describe("HandleLanguage", () => {
  const handleLanguage = new HandleLanguage();

  beforeEach(() => {
    document.body.innerHTML = `
    <form class="content__form"></form>
    <input type="color" class="tree__color" />
    <button class="btn__grow_tree" data-translate-key="grow"></button>
    <button class="btn__shrink_tree" data-translate-key="shrink"></button>
  `;
  });

  test("properly updating the content", () => {
    handleLanguage["selectedLang"] = "pl";

    handleLanguage.updateContent();

    const growBtn = document.querySelector(".btn__grow_tree");
    const shrinkBtn = document.querySelector(".btn__shrink_tree");

    expect(growBtn?.textContent).toBe("Rośnij");
    expect(shrinkBtn?.textContent).toBe("Malej");
  });

  test("should add switch if not present", () => {
    expect(document.querySelector(".language")).toBeNull();

    handleLanguage.createLangSwitch();

    const languageDiv = document.querySelector(".language");
    expect(languageDiv).not.toBeNull();

    const languageToggle = document.querySelector(
      ".language-toggle"
    ) as HTMLInputElement;
    const languageLabel = document.querySelector(".language-label");

    expect(languageToggle).not.toBeNull();
    expect(languageLabel).not.toBeNull();

    const flagPl = languageLabel?.querySelector(".flag__pl");
    const flagUk = languageLabel?.querySelector(".flag__uk");

    expect(flagPl).not.toBeNull();
    expect(flagUk).not.toBeNull();
  });
  test("shouldn't add switch if present", () => {
    const languageDiv = document.createElement("div");
    languageDiv.classList.add("language");
    document.body.appendChild(languageDiv);

    handleLanguage.createLangSwitch();

    const languageElements = document.querySelectorAll(".language");
    expect(languageElements.length).toBe(1);
  });
});
