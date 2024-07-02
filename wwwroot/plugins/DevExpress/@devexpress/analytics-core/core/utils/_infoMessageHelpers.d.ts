﻿/**
* DevExpress Analytics (core\utils\_infoMessageHelpers.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare const NotifyType: {
    info: string;
    warning: string;
    error: string;
    success: string;
};
export declare function NotifyAboutWarning(msg: any, showForUser?: boolean): void;
export declare function getErrorMessage(deferredResult: any): any;
export declare let ShowMessage: (msg: string, type?: string, displayTime?: number, debugInfo?: string, contentTemplate?: any, containerElement?: Element) => void;
export declare const _setShowMessageFunc: (func: any) => any;
export declare const _resetShowMessageFunc: () => (msg: string, type?: string, displayTime?: number, debugInfo?: string, contentTemplate?: any, containerElement?: Element) => void;
export declare const _muteWarnings: () => boolean;
export declare const _unmuteWarnings: () => boolean;
