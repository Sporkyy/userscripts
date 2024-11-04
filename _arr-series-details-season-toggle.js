// ==UserScript==
// @name         *arr - Series Details Season Toggle
// @namespace    https://github.com/Sporkyy/userscripts
// @version      2024.11.04
// @description  Expands all season details or collapses them
// @author       Sporkyy
// @match        *://localhost:8989/*
// @match        *://*.local:8989/*
// @match        *://radarr.*/*
// @match        *://*/radarr/*
// @match        *://localhost:6969/*
// @match        *://*.local:6969/*
// @match        *://whisparr.*/*
// @match        *://*/whisparr/*
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';

  const qsa = (sel, ctx = document) => ctx.querySelectorAll(sel);
  const qsaa = (sel, ctx = document) => [...qsa(sel, ctx)];

  GM_registerMenuCommand('Toggle All Seasons', () => {
    const buttons = qsaa('button[class^="SeriesDetailsSeason-expandButton"]');
    console.log(buttons);
    buttons.forEach(b => b.click());
  });
})();

/*
<button
  type="button"
  class="SeriesDetailsSeason-expandButton-CqcBw Link-link-RInnp Link-link-RInnp">
  <span title="Show episodes">
    <svg>...</svg>
  </span>
  <span>&nbsp;</span>
</button>
*/

/*
<button
  type="button"
  class="SeriesDetailsSeason-expandButton-CqcBw Link-link-RInnp Link-link-RInnp">
  <span title="Hide episodes">
    <svg>...</svg>
  </span>
  <span>&nbsp;</span>
</button>
*/
