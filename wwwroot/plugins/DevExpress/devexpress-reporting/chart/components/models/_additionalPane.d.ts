﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_additionalPane.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ChartLocalizableElementCollectionItemBase } from '../../internal/_localizableElementCollection';
export declare class AdditionalPaneViewModel extends ChartLocalizableElementCollectionItemBase {
    static from(model: object, serializer?: IModelSerializer): AdditionalPaneViewModel;
    constructor(model: object, parent: ko.ObservableArray<AdditionalPaneViewModel>, serializer?: IModelSerializer);
    static prefix: string;
}
