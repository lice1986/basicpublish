﻿/**
* DevExpress Analytics (core\utils\_troubleshootingHelpers.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getTemplate } from '../../property-grid/widgets/templateUtils';
import { ShowMessage } from './_infoMessageHelpers';
const href = 'https://go.devexpress.com/Web_Reporting_Diagnostics_Tips.aspx';
export const showTroubleshootingMessage = () => {
    const link = `<a href="${href}" target="_blank" rel="noopener noreferrer">Reporting Application Diagnostics</a>`;
    const popupMessage = 'Open the browser developer console to investigate the issue. Review the following help topic: ';
    const consoleMessage = `Review the following help topic to diagnose a problem: ${href}`;
    ShowMessage('', 'error', null, null, function () {
        return `<div><span>${popupMessage}</span>${link}</div>`;
    });
    console.log(consoleMessage);
};
export const assignTroubleshootingPage = (element) => {
    const page = getTroubleshootingPage();
    const _element = element instanceof Element ? element : element[0];
    _element.innerHTML = page;
};
export const troubleshootingPageWrapper = (target, showErrorPage, element) => {
    try {
        return target();
    }
    catch (e) {
        if (showErrorPage && element) {
            assignTroubleshootingPage(element);
            console.error(e);
        }
        else {
            throw e;
        }
    }
};
export const getTroubleshootingPage = () => {
    const link = `<a href="${href}" target="_blank" rel="noopener noreferrer">following help topic</a>`;
    const iconTemplate = getTemplate('dxrd-svg-error');
    const icon = iconTemplate ? `<div class="dxrd-error-page-icon">${iconTemplate}</div>` : '';
    const title = 'Something went wrong';
    const message = `Review the ${link} to diagnose a problem.`;
    return `<div class="dxrd-error-page">${icon}<div class="dxrd-error-page-title">${title}</div><div class="dxrd-error-page-content">${message}</div></div>`;
};
