﻿/**
* DevExpress HTML/JS Reporting (viewer\settings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createGlobalModuleVariableFunc, NotifyAboutWarning, NotifyType, ShowMessage } from '@devexpress/analytics-core/analytics-internal-native';
export const EditablePreviewEnabled = createGlobalModuleVariableFunc(true);
export const SearchAvailable = createGlobalModuleVariableFunc(true);
export const ReportServerInvokeUri = '/RSWebDocumentViewerApi/Invoke';
export const ReportServerExportUri = '/RSWebDocumentViewerApi/Download';
export const AsyncExportApproach = createGlobalModuleVariableFunc(false);
export const MessageHandler = createGlobalModuleVariableFunc({
    processError: (message, showForUser, prefix = '', element) => {
        showForUser && ShowMessage(message.substr(prefix.length), undefined, undefined, undefined, undefined, element);
        NotifyAboutWarning(message, false);
    },
    processMessage: (message, showForUser, element) => { showForUser && ShowMessage(message, NotifyType.success, 10000, undefined, undefined, element); },
    processWarning: (message, showForUser, element) => { showForUser && ShowMessage(message, undefined, undefined, undefined, undefined, element); }
});
export const HandlerUri = createGlobalModuleVariableFunc('DXXRDV.axd');
export const previewDefaultResolution = createGlobalModuleVariableFunc(96);
export const ReportServerDownloadUri = createGlobalModuleVariableFunc('');
export const PollingDelay = createGlobalModuleVariableFunc(300);
export const TimeOut = createGlobalModuleVariableFunc(105000);
export const PreloadedPagesOffset = createGlobalModuleVariableFunc(15);
export const MultipageScrollingThrottle = createGlobalModuleVariableFunc(150);
