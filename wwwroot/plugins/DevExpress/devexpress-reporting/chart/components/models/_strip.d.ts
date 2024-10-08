﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_strip.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { IChartComponent, IChartComponentInfo } from '../../../common/utils/_chartUtils';
import { ChartElementCollectionItemBase } from '../../internal/_elementCollection';
import { StripLimitViewModel } from './_stripLimit';
export declare class StripViewModel extends ChartElementCollectionItemBase implements IChartComponent {
    static initialModel: {
        MinLimit: {
            '@AxisValueSerializable': string;
        };
        MaxLimit: {
            '@AxisValueSerializable': string;
        };
    };
    static from(model: object, serializer?: IModelSerializer): StripViewModel;
    constructor(model: object, parent: ko.ObservableArray<StripViewModel>, serializer?: IModelSerializer);
    getExpressionProperties(): string[];
    getChildComponents(): IChartComponentInfo[];
    static prefix: string;
    minLimit: StripLimitViewModel;
    maxLimit: StripLimitViewModel;
    legendText: ko.Observable<string>;
    axisLabelText: ko.Observable<string>;
}
export declare const stripSerializationsInfo: ISerializationInfoArray;
