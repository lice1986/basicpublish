﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_progressBarUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { stringToPosition, getDockedElementCallback } from './_sizeUtils';
import * as $ from 'jquery';
export function getUpdateProgressBarCallback(progressBarSettings, designerModel, reportPreview, rootElement, $window = $.fn.constructor(window)) {
    const keepProgressBarVisible = !progressBarSettings || progressBarSettings.keepOnVisibleArea !== false;
    const position = stringToPosition(progressBarSettings && progressBarSettings.position);
    reportPreview.progressBar.setPosition(position);
    if (!keepProgressBarVisible)
        return $.noop;
    const $root = $.fn.constructor(rootElement);
    const $progress = $root.find('.dxrd-preview-progress');
    const updateProgressBarPosition = getDockedElementCallback($progress, $root, $window, '.dxrd-preview-progress', position);
    const progressBar = reportPreview.progressBar;
    const unsubscribe = progressBar && progressBar.events.on('visibleChanged', (args) => {
        progressBar.visible && this.updateProgressBarPosition();
    });
    designerModel.addDisposable(unsubscribe);
    const wrappedUpdateProgressPosition = () => {
        if (reportPreview.progressBar && reportPreview.progressBar.visible)
            updateProgressBarPosition(rootElement);
    };
    window.addEventListener('scroll', wrappedUpdateProgressPosition);
    designerModel.addDisposable(() => window.removeEventListener('scroll', wrappedUpdateProgressPosition));
    return wrappedUpdateProgressPosition;
}
