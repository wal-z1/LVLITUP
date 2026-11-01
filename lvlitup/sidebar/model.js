LVL.tabModel = {
  snapshot: { tabs: [], config: {} },
  expanded: new Set(),
  set(snapshot) {
    this.snapshot = snapshot;
  },
  toggleExpanded(tabId) {
    if (this.expanded.has(tabId)) this.expanded.delete(tabId);
    else this.expanded.add(tabId);
  },
  visibleTabs() {
    const soloTabId = this.snapshot.soloTabId;
    return this.snapshot.tabs
      .filter((tab) => tab.audible || tab.tabId === soloTabId)
      .sort((left, right) =>
        Number(right.tabId === soloTabId) - Number(left.tabId === soloTabId) ||
        Number(right.active) - Number(left.active) ||
        right.rmsDb - left.rmsDb
      );
  }
};
