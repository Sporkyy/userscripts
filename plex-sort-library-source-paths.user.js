// ==UserScript==
// @name         Plex - Sort Libray Source Paths
// @namespace    https://github.com/Sporkyy/userscripts
// @version      2024.06.14.7
// @description  Sorts the paths to the folders in the library
// @author       Sporkyy
// @match        *://localhost:32400/*
// @match        *://*.local:32400/*
// @match        *://plex.*/*
// @match        *://*/plex/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.plex.tv
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';

  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => ctx.querySelectorAll(sel);
  const qsaa = (sel, ctx = document) => [...qsa(sel, ctx)];

  if (!!!qs('body > #plex.application')) return;

  GM_registerMenuCommand('↕️ Sort Library Folder Paths', () => {
    const inputs = qsaa('.paths-region input[name="path"]');
    if (inputs.length < 2) return;
    const paths = inputs.map(i => i.value);
    paths.sort((a, b) => a.localeCompare(b));
    paths.forEach((p, i) => {
      inputs[i].setAttribute('value', p);
      inputs[i].value = p;
    });
  });
})();
