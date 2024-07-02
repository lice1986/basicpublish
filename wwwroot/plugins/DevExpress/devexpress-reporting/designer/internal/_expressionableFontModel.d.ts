﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_expressionableFontModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IControlPropertiesViewModel } from '@devexpress/analytics-core/analytics-internal';
import { FontModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
export declare class ExpressionableFontModel extends FontModel {
    private _model;
    constructor(value: ko.Observable<string> | ko.Computed<string>, _model: ko.Observable<IControlPropertiesViewModel> | ko.Computed<IControlPropertiesViewModel>);
    modificators: {
        bold: ko.Observable<boolean>;
        boldHasExpression: ko.Computed<boolean>;
        italic: ko.Observable<boolean>;
        italicHasExpression: ko.Computed<boolean>;
        strikeout: ko.Observable<boolean>;
        strikeoutHasExpression: ko.Computed<boolean>;
        underline: ko.Observable<boolean>;
        underlineHasExpression: ko.Computed<boolean>;
    };
    isPropertyHighlighted: (propertyName: any) => boolean;
}