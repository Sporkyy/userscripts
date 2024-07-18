// ==UserScript==
// @name         Reddit - RES - Galleries to Clipboard
// @namespace    https://github.com/Sporkyy/
// @version      2014.02.07
// @description	 Copies gallery URLs to clipboard
// @author       Sporkyy
// @match        *://old.reddit.com/*
// @match        *://old.reddit.com/r/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';
  const aqsa = (s, c = document) => [...c.querySelectorAll(s)];
  const els = aqsa('a.title[href*="reddit.com/gallery/"]');
  // console.log(els);
  const urls = els.map(e => e.href);
  // console.log(urls);
  GM_registerMenuCommand(
    'Copy Gallery URLs',
    () => {
      GM_setClipboard(urls.join(' \n '), 'text');
      // console.log(urls.length);
    },
    () => {
      console.log(`${urls.length} gallery URLs copied`);
    },
  );
})();
