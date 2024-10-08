﻿/**
* DevExpress HTML/JS Reporting (designer\utils\utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { availableFonts as availableFontsAnalytics } from '@devexpress/analytics-core/analytics-widgets-internal';
import { BandViewModel } from '../bands/xrBand';
function b64ToUint6(nChr) {
    return nChr > 64 && nChr < 91 ?
        nChr - 65
        : nChr > 96 && nChr < 123 ?
            nChr - 71
            : nChr > 47 && nChr < 58 ?
                nChr + 4
                : nChr === 43 ?
                    62
                    : nChr === 47 ?
                        63
                        :
                            0;
}
function base64DecToArr(sBase64, nBlockSize) {
    const sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ''), nInLen = sB64Enc.length, nOutLen = nBlockSize ? Math.ceil((nInLen * 3 + 1 >>> 2) / nBlockSize) * nBlockSize : nInLen * 3 + 1 >>> 2, aBytes = new Uint8Array(nOutLen);
    for (let nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
        nMod4 = nInIdx & 3;
        nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
        if (nMod4 === 3 || nInLen - nInIdx === 1) {
            for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                aBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
            }
            nUint24 = 0;
        }
    }
    return aBytes;
}
function _arrayBufferToString(buf, callback) {
    const bb = new Blob([new Uint16Array(buf)]);
    const f = new FileReader();
    f.onload = function (e) {
        callback(btoa(e.target['result']));
    };
    f.readAsText(bb, 'UTF-16');
}
function btoaAtob16(utf16Base64, resultCallback) {
    try {
        resultCallback(btoa(String.fromCharCode.apply(null, new Uint16Array(base64DecToArr(utf16Base64, 2).buffer))));
    }
    catch (e) {
        _arrayBufferToString(base64DecToArr(utf16Base64, 2).buffer, resultCallback);
    }
}
export function base64UTF16LEtobase64UTF8(base64UTF16, resultCallback) {
    base64UTF16 == undefined ? resultCallback(undefined) : atob(base64UTF16).indexOf('{\\rtf1') === 0 ? resultCallback(base64UTF16) : btoaAtob16(base64UTF16, resultCallback);
}
export function _isReorderBand(dropTarget, dragFrom) {
    return BandViewModel.isReorderingBand(dropTarget.getControlModel()) &&
        BandViewModel.isReorderingBand(dragFrom) &&
        dropTarget.getControlModel().controlType === dragFrom.controlType &&
        dropTarget.getControlModel().parentModel() === dragFrom.parentModel();
}
export function _isMarginBand(band) {
    return (band.controlType === 'TopMarginBand' || band.controlType === 'BottomMarginBand');
}
export function _isPageBand(band) {
    return (band.controlType === 'PageHeaderBand' || band.controlType === 'PageFooterBand');
}
export const availableFonts = availableFontsAnalytics;
