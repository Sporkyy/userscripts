// ==UserScript==
// @name         Real-Debrid Highlight Duplicate Downloads
// @namespace    https://github.com/Sporkyy/userscripts
// @match        https://real-debrid.com/torrents*
// @grant        none
// @version      2025.01.28.0
// @author       Sporkyy
// @description  Fully decode magnet links in Real-Debrid magnet input field
// @run-at       document-idle
// @icon         https://www.google.com/s2/favicons?sz=64&domain=real-debrid.com
// ==/UserScript==

(function () {
  'use strict';

  // MARK: Helper Functions

  const qsa = (sel, ctx = document) => ctx.querySelectorAll(sel);
  const qsaa = (sel, ctx = document) => Array.from(qsa(sel, ctx));

  // MARK: Main Function
  const el_downloads = qsaa('form[action="./downloader"] textarea');
  const downloads = el_downloads.map(el => [el.value, el]);
  const duplicates = new Map();
  downloads.forEach(([url, el]) => {
    if (duplicates.has(url)) {
      duplicates.get(url).push(el);
    } else {
      duplicates.set(url, [el]);
    }
  });
  duplicates.forEach((els, _) => {
    if (els.length > 1) {
      els.forEach(el => (el.style.backgroundColor = 'red'));
    }
  });
})();
