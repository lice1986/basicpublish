﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_wholeRange.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { IChartComponent } from '../../../common/utils/_chartUtils';
export declare class WholeRangeModel extends SerializableModel implements IChartComponent {
    constructor(model: object, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    getExpressionProperties(): string[];
    minValue: ko.Observable<number>;
    maxValue: ko.Observable<number>;
}
