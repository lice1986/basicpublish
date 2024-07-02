﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_series.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IAction, IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ICollectionItem } from '../axis/_axis';
import { SeriesPointModel } from './_point';
import { SeriesTemplateViewModel } from './_template';
import { SeriesViewViewModel } from './_view';
export declare class SeriesViewModel extends SeriesTemplateViewModel implements ICollectionItem {
    static prefix: string;
    updateByView(view: SeriesViewViewModel): void;
    _isDataMemberPropertyDisabled(name: string): boolean;
    constructor(model: any, parent: ko.ObservableArray<SeriesViewModel>, serializer?: IModelSerializer);
    isIncompatible: ko.Observable<boolean>;
    parent: ko.ObservableArray<SeriesViewModel>;
    points: ko.ObservableArray<SeriesPointModel>;
    innerActions: IAction[];
}
export declare const seriesSerializationsInfo: ISerializationInfoArray;