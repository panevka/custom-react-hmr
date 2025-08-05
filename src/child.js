export function Child() {
  const $el = document.createElement("div");
  $el.id = "child";
  $el.textContent = `Hello my ID is ${(Math.random() * 100).toFixed()} `;
  return $el;
}
