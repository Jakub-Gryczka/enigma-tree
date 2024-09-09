import auth from "./auth";
import "./styles/main.scss";

const h1 = document.querySelector(".h1");

h1 ? (h1.textContent = "Hello world!") : null;

console.log(auth());
console.log(1);
console.log("ts is here");
