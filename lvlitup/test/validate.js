"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
assert.equal(manifest.manifest_version, 3);
assert.equal(manifest.browser_specific_settings.gecko.strict_min_version, "140.0");
assert.deepEqual(manifest.permissions, ["tabs", "storage", "theme"]);
assert.equal(manifest.content_scripts.length, 2);
assert.equal(manifest.content_scripts[0].world, "MAIN");
assert.equal(manifest.content_scripts[1].world, undefined);

const context = { globalThis: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "shared", "constants.js"), "utf8"), context);
const LVL = context.LVL;
assert.equal(LVL.bands.length, 10);
assert.equal(LVL.copySettings({ volume: 10, eq: [99] }).volume, 4);
assert.equal(LVL.copySettings({ volume: 10, eq: [99] }).eq[0], 12);
assert.equal(LVL.copySettings({ balance: -9 }).balance, -1);
assert.equal(LVL.copySettings({}).eq.length, 10);

const page = fs.readFileSync(path.join(root, "test", "test-page.html"), "utf8");
["media", "tone", "loud", "stop"].forEach((id) => assert.match(page, new RegExp(`id=["']${id}["']`)));

console.log("validate: manifest, settings schema, and audio fixture passed");

