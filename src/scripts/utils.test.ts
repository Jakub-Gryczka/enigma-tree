import { sanitizeEmail, createElement } from "./utils";

test("properly sanitizing email", () => {
  expect(sanitizeEmail("test@test.pl")).toBe("test@test.pl");
});
test("properly creating and adding an element to body", () => {
  const createdElement = createElement("div", "div");
  expect(document.body.contains(createdElement)).toBe(true);
});
