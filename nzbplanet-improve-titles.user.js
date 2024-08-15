// ==UserScript==
// @name         NzbPlanet - Improve Titles
// @namespace    https://github.com/Sporkyy/userscripts
// @version      2024.02.15
// @description  Gives the pages on NzbPlanet.net meaningful titles
// @author       Sporkyy
// @match        https://nzbplanet.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nzbplanet.net
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const qs = (sel, ctx = document) => ctx.querySelector(sel);

  const h1 = qs('#content h1');
  const wd = window.document;

  wd.title = `${h1?.textContent?.trim()} - NzbPlanet`;
})();
