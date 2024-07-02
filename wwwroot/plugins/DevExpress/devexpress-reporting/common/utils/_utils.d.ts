﻿/**
* DevExpress HTML/JS Reporting (common\utils\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IGlobalSubscribableValue } from '@devexpress/analytics-core/analytics-internal-native';
import { IDisposable } from '@devexpress/analytics-core/analytics-utils-native';
export declare const cultureInfo: {};
export declare const generateGuid: () => string;
export declare function createFullscreenComputed(element: Element, parent: IDisposable): IGlobalSubscribableValue<boolean>;
export declare function processZoomFactor(accessibilityCompliant: any): void;
export declare const isIOS: boolean;
export declare const isAndroid: boolean;
export declare const isMobile: boolean;
export declare function transformNewLineCharacters(value: string): string;
