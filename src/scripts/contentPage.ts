import HandleLanguage from "./handleLanguage";
import { createElement, sanitizeEmail } from "./utils";

function contentPage(user: { email: string | null }) {
  const body = document.body;
  body.classList.add("content__page");
  body.style.backdropFilter = `blur(3px)`;
  body.innerHTML = "";
  const welcomeMessage = createElement(
    "h1",
    "content__title",
    "data-translate-key",
    "welcome"
  );
  const safeEmail = sanitizeEmail(user.email);
  welcomeMessage.textContent += `${safeEmail}!`;

  body.appendChild(welcomeMessage);
  new HandleLanguage();
}

export { contentPage, sanitizeEmail, createElement };
