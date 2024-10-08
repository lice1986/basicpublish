﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_translateHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export declare class TranslateHelper extends Disposable {
    private _maxInterval;
    private _restoreDictionary;
    private _timeouts;
    private _getElement;
    dispose(): void;
    move(elementClassName: string, sign?: string, transform?: string, transition?: string): void;
    reset(elementClassName: string): void;
}
