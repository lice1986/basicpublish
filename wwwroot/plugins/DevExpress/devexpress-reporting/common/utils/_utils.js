﻿/**
* DevExpress HTML/JS Reporting (common\utils\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { accessibilityFontSizeZoomFactor, createGlobalModuleVariableFunc } from '@devexpress/analytics-core/analytics-internal-native';
import { propertiesGridEditorsPaddingLeft } from '@devexpress/analytics-core/analytics-widgets-internal-native';
import devices from 'devextreme/core/devices';
export const cultureInfo = {};
export const generateGuid = () => {
    const getNewQuartet = function (i) {
        return Math.floor((1 + Math.random()) * Math.pow(0x10000, i)).toString(16).substring(1);
    };
    return getNewQuartet(2) + '-' + getNewQuartet(1) + '-' + getNewQuartet(1) + '-' + getNewQuartet(1) + '-' + getNewQuartet(3);
};
let commonBlur = HTMLElement.prototype.blur;
const fullscreenEventsList = ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'MSFullscreenChange'];
export function createFullscreenComputed(element, parent) {
    const fullscreen = createGlobalModuleVariableFunc(false, (newVal) => toggleFullscreen(element, newVal));
    let func = () => {
        const isFullscreen = document.fullscreen || !!document['msFullscreenElement'] || !!document['webkitFullscreenElement'];
        if (element['msRequestFullscreen']) {
            HTMLElement.prototype.blur = isFullscreen ? function () {
                try {
                    commonBlur.apply(this);
                }
                catch (e) {
                    document.body.blur();
                }
            } : commonBlur;
        }
        fullscreen.notifySubscribers(isFullscreen);
    };
    addFullscreenListener(document, func);
    parent._disposables.push({
        dispose: () => {
            removeFullscreenListener(document, func);
            commonBlur = null;
            func = null;
        }
    });
    return fullscreen;
}
export function processZoomFactor(accessibilityCompliant) {
    if (!accessibilityCompliant)
        return;
    const defaultFontSize = 16;
    const zoomFactor = (parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('font-size')) || defaultFontSize) / defaultFontSize;
    if (zoomFactor !== accessibilityFontSizeZoomFactor()) {
        propertiesGridEditorsPaddingLeft(zoomFactor * propertiesGridEditorsPaddingLeft());
        accessibilityFontSizeZoomFactor(zoomFactor);
    }
}
function addFullscreenListener(element, func) {
    fullscreenEventsList.forEach((eventName) => {
        element.addEventListener(eventName, func);
    });
}
function removeFullscreenListener(element, func) {
    fullscreenEventsList.forEach((eventName) => {
        element.removeEventListener(eventName, func);
    });
}
function showFullscreen(element) {
    if (element.requestFullscreen)
        element.requestFullscreen();
    else if (element['mozRequestFullScreen'])
        element['mozRequestFullScreen']();
    else if (element['webkitRequestFullscreen'])
        element['webkitRequestFullscreen']();
    else if (element['msRequestFullscreen']) {
        element['msRequestFullscreen']();
    }
}
function exitFullscreen() {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document['mozCancelFullScreen'])
        document['mozCancelFullScreen']();
    else if (document['webkitExitFullscreen'])
        document['webkitExitFullscreen']();
    else if (document['msExitFullscreen']) {
        HTMLElement.prototype.blur = commonBlur;
        document['msExitFullscreen']();
    }
}
function toggleFullscreen(element, value) {
    if (!element)
        return;
    if (value)
        showFullscreen(element);
    else
        exitFullscreen();
}
export const isIOS = devices.real().ios || devices.real()['mac'] && window.navigator.maxTouchPoints > 0;
export const isAndroid = devices.real().android;
export const isMobile = isIOS || isAndroid;
export function transformNewLineCharacters(value) {
    return value.replace(/(\r\n|\n|\r)/g, '\r\n');
}
