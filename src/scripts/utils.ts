function sanitizeEmail(email: string | null) {
  return email ? email.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "Guest";
}
function createElement(
  elementType: string,
  className: string,
  attribute?: string,
  attributeValue?: string
) {
  const element = document.createElement(elementType);
  element.className += className;
  if (attribute && attributeValue) {
    element.setAttribute(attribute, attributeValue);
  }
  return document.body.appendChild(element);
}

function createInputElement(
  labelAttrib: string,
  btnAttrib: string,
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

  for (const [index, attribVal] of attribBtns.entries()) {
    inputElements += `<input type="${type}" class="content__btn ${classNameBtns[index]}" ${btnAttrib}="${attribVal}" value=${value}>`;
  }
  divElement.appendChild(labelElement);
  divElement.insertAdjacentHTML("beforeend", inputElements);
  return divElement;
}

export { sanitizeEmail, createElement, createInputElement };
