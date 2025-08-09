class HotModule {
  file;
  cb;

  constructor(file) {
    this.file = file;
  }

  accept(cb) {
    this.cb = cb;
  }

  handleAccept() {
    if (!this.cb) return;

    import(`${this.file}?t=${Date.now()}`).then((newMod) => {
      this.cb(newMod);
    });
  }
}

const hmrClient = (mod) => {
  const url = new URL(mod.url);
  const hot = new HotModule(url.pathname);
  import.meta.hot = hot;
  window.hotModules.set(url.pathname, hot);

  setInterval(() => {
    handleAccept();
  }, 3000);
};
