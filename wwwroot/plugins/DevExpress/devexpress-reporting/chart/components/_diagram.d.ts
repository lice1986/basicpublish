﻿/**
* DevExpress HTML/JS Reporting (chart\components\_diagram.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, IModelSerializerRef, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IChartComponent, IChartComponentInfo } from '../../common/utils/_chartUtils';
import { IChartComponentWithText } from '../internal/_localizableElementCollection';
import { AxisXYViewModel } from './axis/_axisXYViewModel';
import { SecondaryAxisViewModel } from './axis/_secondaryAxisViewModel';
import { AdditionalPaneViewModel } from './models/_additionalPane';
export interface IDiagramViewModel {
    axisX?: any;
    axisY?: any;
    secondaryAxesX?: ko.ObservableArray<SecondaryAxisViewModel>;
    secondaryAxesY?: ko.ObservableArray<SecondaryAxisViewModel>;
    defaultPane?: any;
    panes?: ko.ObservableArray<AdditionalPaneViewModel>;
    getInfo: () => ISerializationInfoArray;
}
export declare class DiagramViewModel extends SerializableModel implements IDiagramViewModel, IChartComponent {
    getChildComponents(): IChartComponentInfo[];
    static toJson(value: DiagramViewModel, serializer: IModelSerializer, refs: IModelSerializerRef): object;
    constructor(model: object, type: string, serializer?: IModelSerializer);
    secondaryAxesX: ko.ObservableArray<SecondaryAxisViewModel>;
    secondaryAxesY: ko.ObservableArray<SecondaryAxisViewModel>;
    axisX: AxisXYViewModel;
    axisY: AxisXYViewModel;
    panes: ko.ObservableArray<AdditionalPaneViewModel>;
    defaultPane: {
        title: IChartComponentWithText;
    };
}
export declare const diagram: ISerializationInfo;