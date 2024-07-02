﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_constantLine.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ChartLocalizableElementCollectionItemBase } from '../../internal/_localizableElementCollection';
export declare class ConstantLineViewModel extends ChartLocalizableElementCollectionItemBase {
    static from(model: object, serializer?: IModelSerializer): ConstantLineViewModel;
    constructor(model: object, parent: ko.ObservableArray<ConstantLineViewModel>, serializer?: IModelSerializer);
    getExpressionProperties(): string[];
    static prefix: string;
    axisValue: ko.Observable<string>;
    _axisValue: ko.Observable<string>;
    legendText: ko.Observable<string>;
}