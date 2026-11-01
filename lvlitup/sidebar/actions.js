LVL.actions = {
  port: null,
  connect(onSnapshot) {
    this.port = browser.runtime.connect({ name: "sidebar" });
    this.port.onMessage.addListener((message) => {
      if (message.type === "snapshot") onSnapshot(message);
    });
  },
  send(type, data) {
    if (this.port) this.port.postMessage(Object.assign({ type }, data));
  },
  openOptions() {
    browser.runtime.openOptionsPage();
  },
  toggleDuck(config) {
    const next = Object.assign({}, config, { duck: !config.duck });
    browser.storage.local.set({ config: next });
    return next;
  }
};
