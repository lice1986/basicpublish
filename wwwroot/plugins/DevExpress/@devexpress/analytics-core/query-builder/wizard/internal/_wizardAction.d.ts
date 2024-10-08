﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_wizardAction.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare class WizardAction {
    constructor(handler: () => void, text: string);
    isVisible: ko.Observable<boolean> | ko.Computed<boolean>;
    isDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
    handler: () => void;
    text: string;
}
