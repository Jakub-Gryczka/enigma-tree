function replaceEntity(email: string | null) {
  return email ? email.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "Guest";
}
function contentPage(user: { email: string | null }) {
  const body = document.body;
  body.classList.add("content__page");
  body.style.backdropFilter = `blur(3px)`;
  body.innerHTML = "";
  const welcomeMessage = document.createElement("h1");
  welcomeMessage.classList.add("content__title");
  const safeEmail = replaceEntity(user.email);
  welcomeMessage.textContent = `Welcome, ${safeEmail}!`;

  body.appendChild(welcomeMessage);
}

export { contentPage, replaceEntity };
