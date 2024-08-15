// ==UserScript==
// @name         DrunkenSlug - Improve Titles
// @namespace    https://github.com/Sporkyy/userscripts
// @version      2024.02.15
// @description  Improves tht titles of pages on DrunkenSlug
// @author       Sporkyy
// @match        https://drunkenslug.com/*
// @icon         data:image/png;base64,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
// @grant        none
// ==/UserScript==

(() => {
  const qs = (sel, ctx = document) => ctx.querySelector(sel);

  const wd = window.document;

  const search = qs('#search');
  const active = qs('.breadcrumb .active');
  const h2 = qs('h2');

  if (search) wd.title = `🔎 🙶${search.value}🙷`;
  else if (active) wd.title = `${active.textContent.trim()}`;
  else if (h2) wd.title = `${h2.textContent.trim()}`;
})();
