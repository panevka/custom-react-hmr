import { Child } from "./child.js";

export function mount() {
  const $app = document.querySelector("#app");
  const now = new Date().toLocaleTimeString();
  $app.innerText = `Current date: ${now}`;
  $app.appendChild(Child());
}
