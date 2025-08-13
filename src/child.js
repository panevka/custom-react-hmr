if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      document.querySelector("#child").replaceWith(newModule.Child());
    }
  });
}

export function Child() {
  const $el = document.createElement("div");
  $el.id = "child";
  $el.textContent = `Hello my ID is ${(Math.random() * 100).toFixed()} `;
  return $el;
}
