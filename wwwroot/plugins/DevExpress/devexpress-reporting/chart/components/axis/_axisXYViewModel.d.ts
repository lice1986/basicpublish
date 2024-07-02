﻿/**
* DevExpress HTML/JS Reporting (chart\components\axis\_axisXYViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, IModelSerializerRef, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { IChartComponent, IChartComponentInfo } from '../../../common/utils/_chartUtils';
import { IChartComponentWithText } from '../../internal/_localizableElementCollection';
import { ConstantLineViewModel } from '../models/_constantLine';
import { ScaleBreakViewModel } from '../models/_scaleBreak';
import { StripViewModel } from '../models/_strip';
import { WholeRangeModel } from '../models/_wholeRange';
export declare class AxisXYViewModel extends SerializableModel implements IChartComponent {
    static from(info?: ISerializationInfoArray): (model: object, serializer: IModelSerializer) => AxisXYViewModel;
    static toJson(value: AxisXYViewModel, serializer: IModelSerializer, refs: IModelSerializerRef): object;
    getChildComponents(): IChartComponentInfo[];
    constructor(model: object, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    constantLines: ko.ObservableArray<ConstantLineViewModel>;
    scaleBreaks: ko.ObservableArray<ScaleBreakViewModel>;
    strips: ko.ObservableArray<StripViewModel>;
    axisTitle: IChartComponentWithText;
    wholeRange: WholeRangeModel;
}
export declare const axisX: ISerializationInfo;
export declare const axisY: ISerializationInfo;
