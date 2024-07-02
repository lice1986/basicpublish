﻿/**
* DevExpress Analytics (core\widgets\textAlignmentEditor\_textAlignmentEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
export declare class TextAlignmentModel extends Disposable {
    private _resetHorizontalValues;
    private _resetVerticalValues;
    setValue(name: any, type: any): void;
    updateModel(value: string): void;
    updateValue(): void;
    constructor(object: {
        value: ko.Observable<string>;
        disabled?: ko.Observable<boolean>;
    });
    value: ko.Observable<string> | ko.Computed<string>;
    top: ko.Observable<boolean>;
    middle: ko.Observable<boolean>;
    bottom: ko.Observable<boolean>;
    left: ko.Observable<boolean>;
    right: ko.Observable<boolean>;
    center: ko.Observable<boolean>;
    justify: ko.Observable<boolean>;
    disabled: ko.Observable<boolean> | ko.Computed<boolean>;
    horizontalString: ko.Observable<string>;
    verticalString: ko.Observable<string>;
}