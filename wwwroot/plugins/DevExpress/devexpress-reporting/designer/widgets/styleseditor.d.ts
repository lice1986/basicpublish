﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\styleseditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { StyleModel } from '../controls/properties/style';
import { ReportViewModel } from '../controls/xrReport';
export declare class StylesEditorHeaderModel {
    private _report;
    static newItem: string;
    static newItemTextId: string;
    get styles(): ko.ObservableArray<StyleModel>;
    constructor(styleName: ko.Observable<string>, _report: ko.Observable<ReportViewModel>, disabled: ko.Observable<boolean>, popupContainer: string);
    items: ko.Computed<StyleModel[]>;
    value: any;
    onValueChanged: (e: any) => void;
    displayExpr: string;
    valueExpr: string;
    displayCustomValue: boolean;
    encodeNoDataText: boolean;
    placeholder: any;
    noDataText: any;
    disabled: ko.Observable<boolean> | ko.Computed<boolean>;
    dropDownOptions: any;
}
