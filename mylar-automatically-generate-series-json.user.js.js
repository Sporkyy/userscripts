// ==UserScript==
// @name         Mylar - Automatically Generate series.json
// @namespace    https://github.com/Sporkyy/userscripts
// @version      2024.02.18
// @description  Automatically generate missing series.json files
// @author       Sporkyy
// @match        *://localhost:8090/comicDetails*
// @match        *://macmini.lumpatio.us:8090/comicDetails*
// @match        *://mylar.lumpatio.us/comicDetails*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mylarcomics.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';

  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const hasSH = !!qs('#seriesheader');
  // The "series.json" link in the "Comic Details" box
  const hasSJ = !!qs('span[title^="series.json located"]');
  // The "❃ (Comic Information is currently being loaded)" message
  const isLoading = `${qs('#series_status')?.innerText}`.includes(
    'currently being loaded',
  );

  // If the page didn't load correctly, give up
  if (!hasSH) {
    console.log('No Series Header found; doing nothing');
    return;
  } else if (hasSJ) {
    console.log('Found `series.json`; doing nothing');
    return;
  } else if (isLoading) {
    console.log('Already loading info; doing nothing');
    return;
  }

  // The "🔄 Refresh Comic" button
  const elRefreshComic = qs('#menu_link_refresh');

  const randmm = (min, max) => Math.trunc(Math.random() * (max - min) + min);
  const timeout = randmm(1000, 15000);
  console.log(`Missing 'series.json'; refreshing comic in ${timeout}s`);
  setTimeout(() => {
    console.log('Refreshing comic now');
    elRefreshComic.click();
  }, timeout);

  // Reloading the browser might be necessary, but detecting when/if is tricky
  // Reloading might trigger an unnecessary refresh of the series
  // Maybe some time in the future I'll add a URL hash parameter
  // So the browser can reload without refreshing the series
  // But automatic reloading might be more annoying than helpful
})();
