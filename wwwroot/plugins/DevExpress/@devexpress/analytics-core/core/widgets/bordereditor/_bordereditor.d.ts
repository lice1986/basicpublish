﻿/**
* DevExpress Analytics (core\widgets\bordereditor\_bordereditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
export declare class BordersModel extends Disposable {
    private _setAllValues;
    setValue(name: any): void;
    setAll(): void;
    setNone(): void;
    updateModel(value: string): void;
    updateValue(): void;
    constructor(object: {
        value: ko.Observable<string>;
        disabled?: ko.Observable<boolean>;
    });
    value: ko.Observable<string> | ko.Computed<string>;
    left: ko.Observable<boolean>;
    right: ko.Observable<boolean>;
    top: ko.Observable<boolean>;
    bottom: ko.Observable<boolean>;
    disabled: ko.Observable<boolean> | ko.Computed<boolean>;
}
