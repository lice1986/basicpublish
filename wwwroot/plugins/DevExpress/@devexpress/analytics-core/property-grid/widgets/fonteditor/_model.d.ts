﻿/**
* DevExpress Analytics (property-grid\widgets\fonteditor\_model.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
export declare const availableUnits: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare class FontModel extends Disposable {
    private _toString;
    updateModel(value: string): void;
    updateValue(value: any): void;
    constructor(value: ko.Observable<string> | ko.Computed<string>);
    family: ko.Observable<any>;
    unit: ko.Observable<any>;
    isUpdateModel: boolean;
    size: ko.Observable<any>;
    modificators: {
        bold: ko.Observable<boolean>;
        italic: ko.Observable<boolean>;
        strikeout: ko.Observable<boolean>;
        underline: ko.Observable<boolean>;
    };
}
