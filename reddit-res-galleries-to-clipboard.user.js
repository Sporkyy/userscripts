// ==UserScript==
// @name         Reddit - RES - Galleries to Clipboard
// @namespace    https://github.com/Sporkyy/userscripts
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

  // MARK: Functions
  const qsa = (sel, ctx = document) => ctx.querySelectorAll(sel);
  const aqsa = (sel, ctx = document) => [...qsa(sel, ctx)];

  const els = aqsa('a.title[href*="reddit.com/gallery/"]');
  // console.log(els);
  const urls = [...Set(els.map(e => e.href))];
  // console.log(urls);

  // MARK: Menu Commands
  GM_registerMenuCommand('Copy Gallery URLs', () => {
    GM_setClipboard(urls.join(' \n '), 'text');
    console.log(`Copied ${urls.length} urls to clipboard`);
  });
})();
