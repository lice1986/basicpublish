﻿/**
* DevExpress HTML/JS Reporting (chart\components\axis\_secondaryAxisViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IAction, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ICollectionItem } from './_axis';
import { AxisXYViewModel } from './_axisXYViewModel';
export declare class SecondaryAxisViewModel extends AxisXYViewModel implements ICollectionItem {
    static xPrefix: string;
    static yPrefix: string;
    constructor(model: object, parent: ko.ObservableArray<SecondaryAxisViewModel>, serializer?: IModelSerializer);
    get axisID(): number;
    parent: ko.ObservableArray<SecondaryAxisViewModel>;
    innerActions: Array<IAction>;
}
