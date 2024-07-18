// ==UserScript==
// @name         TPB - Hide 0 Seeders
// @namespace    https://github.com/Sporkyy/
// @version      2024.02.07
// @description  Hide results with 0 seeders
// @author       Sporkyy
// @match        https://tpb.party/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tpb.party
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';

  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => ctx.querySelectorAll(sel);
  const qsaa = (...args) => [...qsa.apply(null, args)];

  const hide = el => (el.style.display = 'none');
  const toInt = el => Number.parseInt(el.textContent, 10);
  const closestTr = el => el.closest('tr');

  // The tbody is not in the source, but it's there in the DOM
  const tbody = qs('#searchResult > tbody');
  const cntTDs = qsaa('tr:first-of-type > td', tbody).length;
  // 3rd for Double, 6th for Single
  const nth = 4 === cntTDs ? 3 : 6;
  const tdSeeders = qsaa(`tr > td:nth-of-type(${nth})`, tbody);

  tdSeeders
    .map(td => [toInt(td), closestTr(td)])
    .filter(([cntSeeders]) => 0 === cntSeeders)
    .forEach(([, tr]) => hide);
})();

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

Single:

<table id="searchResult">
  <thead id="tableHead">
    <tr class="header">
      <!-- 1 --> <th>Type</th>
      <!-- 2 --> <th>Name</th>
      <!-- 3 --> <th>Uploaded</th>
      <!-- 4 --> <th>Magnet link</th>
      <!-- 5 --> <th>Size</th>
      <!-- 6 --> <th>SE</th>
      <!-- 7 --> <th>LE</th>
      <!-- 8 --> <th>ULed by</th>
    </tr>
  </thead>
  <tr>
    <!-- 1: Type     --> <td class="vertTh">Audio</td>
    <!-- 2: Name     --> <td>Reality.mkv</td>
    <!-- 3: Uploaded --> <td>01-05&nbsp;17:58</td>
    <!-- 4: Magnet   --> <td>Magnet link</td>
    <!-- 5: Size     --> <td>1.6&nbsp;GiB</td>
    <!-- 6: SE       --> <td>0</td>
    <!-- 7: LE       --> <td>1</td>
    <!-- 8: Uled by  --> <td>codyhun27</td>
  </tr>
  <tr class="alt">
    <!-- 1: Type     --> <td class="vertTh">Audio</td>
    <!-- 2: Name     --> <td>rare interviews album post-TOS.mp3</td>
    <!-- 3: Uploaded --> <td>08-11&nbsp;2021</td>
    <!-- 4: Magnet   --> <td>Magnet link</td>
    <!-- 5: Size     --> <td>25.75&nbsp;MiB</td>
    <!-- 6: SE       --> <td>2</td>
    <!-- 7: LE       --> <td>0</td>
    <!-- 8: Uled by  --> <td>TMA-1</td>
  </tr>
</table>

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

Double:

<table id="searchResult">
  <thead id="tableHead">
    <tr class="header">
      <!-- 1 --> <th>Type</th>
      <!-- 2 --> <th>Name, Uploaded, Size, ULed by</th>
      <!-- 3 --> <th>SE</th>
      <!-- 4 --> <th>LE</th>
    </tr>
  </thead>
  <tr>
    <!-- 1: Type    --> <td>Audio</td>
    <!-- 2: Details --> <td>Name, Magnet link, Uploaded, Size, ULed by</td>
    <!-- 3: SE      --> <td80</td>
    <!-- 4: LE      --> <td>6</td>
  </tr>
  <tr class="alt">
    <!-- 1: Type    --> <td>Audio</td>
    <!-- 2: Details --> <td>Name, Magnet link, Uploaded, Size, ULed by</td>
    <!-- 3: SE      --> <td>16</td>
    <!-- 4: LE      --> <td>2</td>
  </tr>
</table>

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
