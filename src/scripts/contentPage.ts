import HandleLanguage from "./handleLanguage";
import { createElement, sanitizeEmail } from "./utils";
import { images } from "./images";

function contentPage(user: { email: string | null }) {
  let treeImg: string;
  const body = document.body;
  body.classList.add("content__page");
  body.style.backdropFilter = `blur(3px)`;
  body.innerHTML = "";
  createElement("h1", "content__title", "data-translate-key", "welcome");
  createElement(
    "button",
    "content__btn logout__btn",
    "data-translate-key",
    "logout__btn"
  );
  const createInputElement = function (
    attribLabel: string,
    attribBtnFirst: string,
    attribBtnSecond: string,
    firstBtnClassName: string,
    secondBtnClassName: string
  ) {
    const element = `<div class= "content__form_row">
      <label for="tree-type" class= "content__form_row--label" data-translate-key="${attribLabel}"></label>
        <input type="button" class="content__btn ${firstBtnClassName}" data-translate-key="${attribBtnFirst}">
        <input type="button" class="content__btn ${secondBtnClassName}"data-translate-key="${attribBtnSecond}">
     </div>
    `;
    return element;
  };

  const formElement = createElement("form", "content__form");
  formElement.insertAdjacentHTML(
    "afterbegin",
    createInputElement(
      "tree_type",
      "deciduous",
      "conifer",
      "tree__type--button-deciduous",
      "tree__type--button-conifer"
    )
  );

  formElement?.addEventListener("click", function (e) {
    const { target } = e;
    let element;
    if (target instanceof HTMLInputElement) {
      element = target;
      if (element.value === "Iglaste" || element.value === "Conifer") {
        treeImg = "conifer";
      } else {
        treeImg = "deciduous";
      }
    }
    if (body.querySelector("main")) {
      return;
    }
    const main = createElement("main", "main");
    const img = document.createElement("img");
    img.classList.add("content__img");
    img.src = images[treeImg];
    main.appendChild(img);
  });

  new HandleLanguage();
}

export { contentPage };
