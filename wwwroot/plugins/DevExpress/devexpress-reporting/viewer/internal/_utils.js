﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { previewDefaultResolution } from '../settings';
import * as $ from 'jquery';
export function getCurrentResolution(zoom) {
    return Math.floor((zoom || 1) * previewDefaultResolution());
}
export function getImageBase64(url) {
    const deferred = $.Deferred();
    const background = new Image();
    background.src = url;
    background.crossOrigin = 'anonymous';
    background.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = background.width;
        canvas.height = background.height;
        canvas.getContext('2d').drawImage(background, 0, 0);
        try {
            deferred.resolve(canvas.toDataURL());
        }
        catch (e) {
            deferred.reject(e);
        }
    };
    return deferred.promise();
}
export function getEnumValues(enumType) {
    return Object.keys(enumType).filter(key => !isNaN(Number(enumType[key])));
}
export function safelyRunWindowOpen(url, target = '_blank') {
    const newWindow = window.open(url, target);
    target === '_blank' && newWindow && (newWindow.opener = newWindow);
    return newWindow;
}
