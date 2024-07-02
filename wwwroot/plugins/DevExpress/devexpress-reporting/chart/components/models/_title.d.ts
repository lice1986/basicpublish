﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_title.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IChartComponent } from '../../../common/utils/_chartUtils';
import { ChartElementCollectionItemBase } from '../../internal/_elementCollection';
export declare class TitleViewModel extends ChartElementCollectionItemBase implements IChartComponent {
    static prefix: string;
    static from(model: object, serializer?: IModelSerializer): TitleViewModel;
    getExpressionProperties(): string[];
    getInfo(): ISerializationInfoArray;
    titleID: ko.Observable<string>;
    name: ko.Observable<string>;
}
export declare class ChartViewTitleModel extends TitleViewModel {
    getInfo(): ISerializationInfoArray;
}
export declare function assignTitleActions(titles: ko.ObservableArray<TitleViewModel>): void;
export declare const defaultChartTitleText = "Chart Title";
export declare const chartViewTitleSerializationsInfo: ISerializationInfoArray;
export declare const titleSerializationsInfo: ISerializationInfoArray;
