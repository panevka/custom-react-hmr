export function mount() {
  const $app = document.querySelector("#app");
  const now = new Date().toLocaleTimeString();
  $app.innerText = `Current date: ${now}`;
}
