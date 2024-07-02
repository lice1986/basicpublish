﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_localizableElementCollection.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ICollectionItem } from '../components/axis/_axis';
import { ChartElementCollectionItemBase } from './_elementCollection';
import { IModelSerializer, ISerializableModel, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { IChartComponent, IChartComponentInfo } from '../../common/utils/_chartUtils';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
export interface IChartComponentWithText extends ISerializableModel {
    text: ko.Observable<string>;
}
export declare class ChartComponentModelWithText extends SerializableModel implements IChartComponentWithText, IChartComponent {
    constructor(model: object, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    getExpressionProperties(): string[];
    text: ko.Observable<string>;
}
export declare class ChartLocalizableElementCollectionItemBase extends ChartElementCollectionItemBase implements ICollectionItem, IChartComponent {
    getChildComponents(): IChartComponentInfo[];
    title: IChartComponentWithText;
}
