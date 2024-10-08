﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_customMergingEngine.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class CustomMergingEngine {
    private _customMergeForFormatString;
    customMerge(propertyName: string, controls: {}[], undoEngine: ko.Observable<UndoEngine>): {
        result: ko.ObservableArray<any>;
        subscriptions: any[];
    };
}
