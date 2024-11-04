// ==UserScript==
// @name         Mylar - Ultron Import Checkbox Ticker
// @namespace    https://github.com/Sporkyy/userscripts
// @version      2024.11.04
// @description  Toggle import results by status in Mylar Ultron import page
// @author       Sporkyy
// @match        *://localhost:8090/*
// @match        *://*.local:8090/*
// @match        *://mylar.*/*
// @match        *://*/mylar/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mylarcomics.com
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const qsa = (sel, ctx = document) => ctx.querySelectorAll(sel);
  const qsaa = (...args) => [...qsa.apply(null, args)];
  const tick = box => (box.checked = true);
  const tickAll = (...boxes) => boxes.flat().forEach(tick);

  GM_registerMenuCommand('✅ Tick All (Visible) Imported', () => {
    const ccImported = qsaa('tr.Imported:not(.Not) input[type="checkbox"]');
    console.log(`Ticking ${ccImported.length} checkboxes`);
    tickAll(ccImported);
  });

  GM_registerMenuCommand('✅ Tick All (Visible) Not Imported', () => {
    const ccImported = qsaa('tr.Not.Imported input[type="checkbox"]');
    console.log(`Ticking ${ccImported.length} checkboxes`);
    tickAll(ccImported);
  });
})();
