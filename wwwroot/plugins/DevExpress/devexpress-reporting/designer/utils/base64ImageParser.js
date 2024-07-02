﻿/**
* DevExpress HTML/JS Reporting (designer\utils\base64ImageParser.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class Base64ImageParser {
    static getImageRatio(data, format) {
        const imageRatio = { x: 1, y: 1 };
        const byteArray = this._getDataChunks(data, format);
        let dpiX, dpiY;
        if (format === 'png') {
            if (!this._pngHasDpiChunks(data) || byteArray.length < 8)
                return imageRatio;
            dpiX = this._countDpiFromBytes(byteArray.slice(0, 4));
            dpiY = this._countDpiFromBytes(byteArray.slice(4, 8));
        }
        if (format === 'jpg' || format === 'jpeg') {
            if (byteArray.length < 4)
                return imageRatio;
            dpiX = this._countDpiFromBytes(byteArray.slice(0, 2));
            dpiY = this._countDpiFromBytes(byteArray.slice(2, 4));
        }
        if (dpiX && dpiY) {
            const ppi = this.getMonitorPPI();
            imageRatio.x = ppi / dpiX;
            imageRatio.y = ppi / dpiY;
        }
        return imageRatio;
    }
    static _getDataChunks(encoded, format) {
        const byteArray = [];
        if (!encoded)
            return [];
        const decodeString = atob(encoded);
        const startOfChunks = format === 'png' ? decodeString.indexOf('pHYs') + 4 : 14;
        if (startOfChunks == 3 || startOfChunks >= decodeString.length)
            return [];
        for (let i = startOfChunks; i < decodeString.length; i++) {
            byteArray.push(decodeString.charCodeAt(i));
        }
        return byteArray;
    }
    static _countDpiFromBytes(byteArray) {
        const defaultValuePerMeter = 39.370;
        if (byteArray && byteArray.length == 4)
            return ((byteArray[0] << 24) + (byteArray[1] << 16) + (byteArray[2] << 8) + byteArray[3]) / defaultValuePerMeter;
        if (byteArray && byteArray.length == 2)
            return (byteArray[0] << 8) + byteArray[1];
    }
    static _pngHasDpiChunks(data) {
        return data.indexOf('AAlwSFlz') != -1 || data.indexOf('AAAJcEhZ') != -1 || data.indexOf('AAAACXBI') != -1;
    }
    static getMonitorPPI() {
        const el = document.createElement('div');
        el.style.width = '1in';
        document.body.appendChild(el);
        const ppi = el.offsetWidth;
        document.body.removeChild(el);
        return ppi;
    }
}
