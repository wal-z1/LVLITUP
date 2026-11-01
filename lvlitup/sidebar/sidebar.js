(function () {
  const list = document.getElementById("list");
  const duck = document.getElementById("duck");

  function send(type, data) {
    LVL.actions.send(type, data);
  }

  function render() {
    const { snapshot, expanded } = LVL.tabModel;
    list.replaceChildren();
    window.soloId = snapshot.soloTabId;
    const tabs = LVL.tabModel.visibleTabs();
    if (!tabs.length) {
      list.innerHTML = '<div class="empty"><div>???</div>Nothing is playing</div>';
      return;
    }
    tabs.forEach((tab) => list.append(LVL.components.card(tab, expanded, send)));
  }

  LVL.renderSidebar = render;
  LVL.actions.connect((snapshot) => {
    LVL.tabModel.set(snapshot);
    duck.setAttribute("aria-pressed", String(Boolean(snapshot.config.duck)));
    render();
  });
  document.getElementById("options").onclick = LVL.actions.openOptions;
  duck.onclick = () => {
    LVL.tabModel.snapshot.config = LVL.actions.toggleDuck(LVL.tabModel.snapshot.config);
    duck.setAttribute("aria-pressed", String(Boolean(LVL.tabModel.snapshot.config.duck)));
  };
}());
