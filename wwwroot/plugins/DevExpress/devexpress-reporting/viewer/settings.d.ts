﻿/**
* DevExpress HTML/JS Reporting (viewer\settings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface IMessageHandler {
    processError: (message: string, showForUser?: boolean, prefix?: string, element?: Element) => void;
    processMessage: (message: string, showForUser?: boolean, element?: Element) => void;
    processWarning: (message: string, showForUser?: boolean, element?: Element) => void;
}
export declare const EditablePreviewEnabled: import("@devexpress/analytics-core/analytics-internal-native").IGlobalSubscribableValue<boolean>;
export declare const SearchAvailable: import("@devexpress/analytics-core/analytics-internal-native").IGlobalSubscribableValue<boolean>;
export declare const ReportServerInvokeUri = "/RSWebDocumentViewerApi/Invoke";
export declare const ReportServerExportUri = "/RSWebDocumentViewerApi/Download";
export declare const AsyncExportApproach: import("@devexpress/analytics-core/analytics-internal-native").IGlobalSubscribableValue<boolean>;
export declare const MessageHandler: import("@devexpress/analytics-core/analytics-internal-native").IGlobalSubscribableValue<IMessageHandler>;
export declare const HandlerUri: import("@devexpress/analytics-core/analytics-internal-native").IGlobalSubscribableValue<string>;
export declare const previewDefaultResolution: import("@devexpress/analytics-core/analytics-internal-native").IGlobalSubscribableValue<number>;
export declare const ReportServerDownloadUri: import("@devexpress/analytics-core/analytics-internal-native").IGlobalSubscribableValue<string>;
export declare const PollingDelay: import("@devexpress/analytics-core/analytics-internal-native").IGlobalSubscribableValue<number>;
export declare const TimeOut: import("@devexpress/analytics-core/analytics-internal-native").IGlobalSubscribableValue<number>;
export declare const PreloadedPagesOffset: import("@devexpress/analytics-core/analytics-internal-native").IGlobalSubscribableValue<number>;
export declare const MultipageScrollingThrottle: import("@devexpress/analytics-core/analytics-internal-native").IGlobalSubscribableValue<number>;
