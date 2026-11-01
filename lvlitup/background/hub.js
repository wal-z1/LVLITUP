var LVLHub = {
	pushTimer: 0,
	async apply(x) {
		await browser.tabs
			.sendMessage(x.tabId, { type: "apply", data: { settings: x.settings } })
			.catch(() => {});
		await LVLState.save();
		this.push();
	},
	push() {
		if (this.pushTimer) return;
		this.pushTimer = setTimeout(async () => {
			this.pushTimer = 0;
			let snap = {
				type: "snapshot",
				tabs: await LVLState.snapshot(),
				config: LVLState.config,
				soloTabId: LVLState.soloTabId,
			};
			LVLState.ports.forEach((p) => {
				try {
					p.postMessage(snap);
				} catch (_) {}
			});
			LVLIcon.update();
		}, 50);
	},
	async message(m, sender) {
		let tab = sender.tab;
		if (!tab) return;
		let x = LVLState.get(tab.id, tab),
			d = m.data || {};
		if (m.type === "hello") {
			try {
				x.host = new URL(d.url).hostname;
			} catch (_) {}
			browser.tabs
				.sendMessage(tab.id, { type: "apply", data: { settings: x.settings } })
				.catch(() => {});
			browser.tabs
				.sendMessage(tab.id, { type: "duck", data: { db: x.duckDb || 0 } })
				.catch(() => {});
			return;
		}
		if (m.type === "engine") {
			x.mode = d.mode || "none";
			this.push();
			return;
		}
		if (m.type === "levels") {
			x.frames[sender.frameId || 0] = d;
			x.lastAudibleAt = Date.now();
			x.history.push(d.rmsDb);
			x.peaks.push(d.peakDb);
			if (x.history.length > 200) x.history.shift();
			if (x.peaks.length > 200) x.peaks.shift();
			LVLDucking.update();
			this.push();
			return;
		}
		if (m.type === "idle") {
			delete x.frames[sender.frameId || 0];
			this.push();
		}
	},
	async portMessage(m) {
		let x = LVLState.get(m.tabId);
		if (m.type === "set") {
			x.settings = LVL.merge(x.settings, m.patch);
			if (x.remember && x.host) {
				let d = await browser.storage.local.get("sites");
				let sites = d.sites || {};
				sites[x.host] = { settings: x.settings, lastUsed: Date.now() };
				let keys = Object.keys(sites).sort(
					(a, b) => sites[a].lastUsed - sites[b].lastUsed,
				);
				while (keys.length > 500) delete sites[keys.shift()];
				await browser.storage.local.set({ sites });
			}
			await this.apply(x);
		}
		if (m.type === "mute")
			await browser.tabs.update(m.tabId, {
				muted: !((x.tab || {}).mutedInfo || {}).muted,
			});
		if (m.type === "solo") await LVLSolo.toggle(m.tabId);
		if (m.type === "remember") {
			x.remember = !!m.on;
			await LVLState.save();
			this.push();
		}
		if (m.type === "subscribeBands")
			browser.tabs
				.sendMessage(m.tabId, { type: "bands", data: { on: !!m.on } })
				.catch(() => {});
		if (m.type === "reset") {
			x.settings = LVL.copySettings(LVL.defaults);
			await this.apply(x);
		}
	},
};
browser.runtime.onMessage.addListener((m, s) => LVLHub.message(m, s));
browser.runtime.onConnect.addListener((p) => {
	if (p.name !== "sidebar") return;
	LVLState.ports.add(p);
	p.onDisconnect.addListener(() => LVLState.ports.delete(p));
	p.onMessage.addListener((m) => LVLHub.portMessage(m));
	LVLHub.push();
});
