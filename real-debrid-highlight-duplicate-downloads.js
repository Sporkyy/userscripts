// ==UserScript==
// @name         Real-Debrid Highlight Duplicate Downloads
// @namespace    https://github.com/Sporkyy/userscripts
// @match        https://real-debrid.com/torrents*
// @grant        none
// @version      2025.01.29.0
// @author       Sporkyy
// @description  Highlight duplicate downloads (by the download URL).
// @run-at       document-idle
// @icon         https://www.google.com/s2/favicons?sz=64&domain=real-debrid.com
// ==/UserScript==

(function () {
  'use strict';

  // MARK: Helper Functions

  const qsa = (sel, ctx = document) => ctx.querySelectorAll(sel);

  const qsaa = (sel, ctx = document) => Array.from(qsa(sel, ctx));

  // https://gist.github.com/soundrussian/bed4a2a644150a0cb1220e6932857cc8
  const stringToColour = str => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 7) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 17)) & 0xff;
      colour += ('14' + value.toString(16)).slice(-2);
    }
    return colour;
  };

  // https://gist.github.com/osamaashahi/c39fdde5d6024582f71454c2d037240d
  const getContrastingColor = hex => {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#2d3142' : '#FFFFFF';
  };

  // MARK: Main Script
  const downloadTextareas = qsaa('form[action="./downloader"] textarea');
  const urlElPairs = downloadTextareas.map(el => [el.value, el]);
  const elsByUrlMap = new Map();

  urlElPairs.forEach(([url, el]) => {
    // Skip empty URLs
    if (!url || 0 === url.length) return;
    if (elsByUrlMap.has(url)) {
      elsByUrlMap.get(url).push(el);
    } else {
      elsByUrlMap.set(url, [el]);
    }
  });

  for ([url, els] in elsByUrlMap.entries() || []) {
    if (els.length > 1) {
      // els.forEach(el => (el.style.backgroundColor = 'red'));
      backgroundColor = stringToColour(url);
      color = getContrastingColor(backgroundColor);
      els.forEach(el => {
        el.style.backgroundColor = backgroundColor;
        el.style.color = color;
      });
    }
  }
})();
