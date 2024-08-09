// ==UserScript==
// @name        Real-Debrid URL Decode Magnet Links
// @namespace   https://github.com/Sporkyy/
// @match       https://real-debrid.com/torrents*
// @grant       none
// @version     2024.04.04.02
// @author      Sporkyy
// @description Fully decode magnet links in Real-Debrid magnet input field
// @run-at      document-idle
// @icon        https://www.google.com/s2/favicons?sz=64&domain=real-debrid.com
// ==/UserScript==

(function () {
  'use strict';
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const inpMagnet = qs('input[name="magnet"]');
  const recUriDecCom = uriCom => {
    const dec = decodeURIComponent(uriCom);
    if ((uriCom = dec)) return uriCom;
    return recUriDecCom(dec);
  };
  const base64Decode = str => {
    let clearText = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    str = str.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    const keyString =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    while (i < str.length) {
      enc1 = keyString.indexOf(str.charAt(i++));
      enc2 = keyString.indexOf(str.charAt(i++));
      enc3 = keyString.indexOf(str.charAt(i++));
      enc4 = keyString.indexOf(str.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      clearText = clearText + String.fromCharCode(chr1);
      if (enc3 != 64) {
        clearText = clearText + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        clearText = clearText + String.fromCharCode(chr3);
      }
    }
    clearText = uTF8Decode(clearText);
    return clearText;
  };
  const uTF8Decode = str => decodeURIComponent(escape(str));
  const isBase64Encoded = str =>
    new RegExp(
      // prettier-ignore
      [
        '^',                       // Start of input
        '([0-9a-zA-Z+/]{4})*',     // Groups of 4 valid characters decode
                                   // to 24 bits of data for each group
        '(',                       // Either ending with:
          '([0-9a-zA-Z+/]{2}==)',  // two valid characters followed by ==
          '|',                     // , or
          '([0-9a-zA-Z+/]{3}=)',   // three valid characters followed by =
        ')?',                      // , or nothing
        '$',                       // End of input,
      ].join(''),
    ).test(str);
  inpMagnet.addEventListener('change', function () {
    let str = inpMagnet.value.trim();
    if (isBase64Encoded(str)) {
      str = base64Decode(str);
    }
    str = recUriDecCom(str);
    inpMagnet.value = str;
  });
})();

// function transform(clip) {
//   const rDecodeURI = (uri, dUri = decodeURIComponent(uri)) =>
//     uri === dUri ? dUri : rDecodeURI(dUri);
//   const rDecodeURIComponent = (
//     uriComponent,
//     dUriComponent = decodeURIComponent(uriComponent),
//   ) =>
//     uriComponent === dUriComponent
//       ? dUriComponent
//       : rDecodeURIComponent(dUriComponent);
//   const str = clip.text;
//   const trimmed = str.trim();
//   if (!trimmed.startsWith('magnet:')) return str;
//   const decoded = rDecodeURI(trimmed);
//   const [protocol, query] = decoded.split('?');
//   const components = query.split('&').map(component => {
//     const [key, value] = component.split('=');
//     const returnValue = rDecodeURIComponent(value);
//     return `${key}=${returnValue}`;
//   });
//   return `${protocol}?${components.join('&')}`;
// }
