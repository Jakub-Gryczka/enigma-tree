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
  element.classList.add(className);
  if (attribute && attributeValue) {
    element.setAttribute(attribute, attributeValue);
  }
  return element;
}

export { sanitizeEmail, createElement };
