﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_indicator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IChartComponent } from '../../../common/utils/_chartUtils';
import { ChartElementCollectionItemBase } from '../../internal/_elementCollection';
export declare class Indicator extends ChartElementCollectionItemBase implements IChartComponent {
    static prefix: string;
    constructor(model: object, parent: ko.ObservableArray<Indicator>, serializer?: IModelSerializer);
    getExpressionProperties(): string[];
    legendText: ko.Observable<string>;
}
export declare function assignIndicatorActions(indicators: ko.ObservableArray<Indicator>): void;
