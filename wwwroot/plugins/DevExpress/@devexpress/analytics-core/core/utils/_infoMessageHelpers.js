﻿/**
* DevExpress Analytics (core\utils\_infoMessageHelpers.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery';
import { chooseBetterPositionOf } from '../internal/_surfaceHelpers';
import { DEBUG } from './_debug';
export const NotifyType = {
    info: 'info',
    warning: 'warning',
    error: 'error',
    success: 'success'
};
const wrappedConsole = (console => {
    const getWrappedMethod = methodName => (function (...args) {
        if (console && $.isFunction(console[methodName])) {
            console[methodName].apply(console, arguments);
        }
    });
    return {
        info: getWrappedMethod('info'),
        warn: getWrappedMethod('warn'),
        error: getWrappedMethod('error')
    };
})(window.console);
let showWarnings = false;
export function NotifyAboutWarning(msg, showForUser = false) {
    if (showForUser) {
        ShowMessage(msg);
    }
    if (DEBUG) {
        throw new Error(msg);
    }
    else {
        showWarnings && wrappedConsole.warn(msg);
    }
}
export function getErrorMessage(deferredResult) {
    return deferredResult && deferredResult.responseJSON && deferredResult.responseJSON.error ? deferredResult.responseJSON.error : '';
}
const _showMessage = (msg, type = 'error', displayTime, debugInfo, contentTemplate, containerElement) => {
    containerElement = containerElement || $.fn.constructor('.dx-designer-viewport')[0];
    notify({
        message: msg,
        type: type,
        maxWidth: containerElement ? containerElement.clientWidth : undefined,
        position: { boundary: containerElement, collision: 'fit', of: chooseBetterPositionOf(document.documentElement, containerElement), my: 'bottom', at: 'bottom', offset: '0 -10' },
        container: containerElement,
        hideOnOutsideClick: true,
        closeOnSwipe: false,
        displayTime: displayTime || (type === 'error' ? 60000 : 3000),
        contentTemplate: contentTemplate
    });
};
export let ShowMessage = _showMessage;
export const _setShowMessageFunc = (func) => ShowMessage = func;
export const _resetShowMessageFunc = () => ShowMessage = _showMessage;
export const _muteWarnings = () => showWarnings = false;
export const _unmuteWarnings = () => showWarnings = true;