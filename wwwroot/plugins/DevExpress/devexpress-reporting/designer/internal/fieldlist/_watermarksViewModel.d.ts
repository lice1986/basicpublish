﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_watermarksViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, IAction } from '@devexpress/analytics-core/analytics-utils';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { WatermarkModel } from '../../controls/properties/watermark';
export declare class WatermarksViewModel extends Disposable implements IActionsProvider {
    private _watermarks;
    constructor(watermarks: ko.ObservableArray<WatermarkModel>);
    createWatermark(): WatermarkModel;
    getActions(context: TreeListItemViewModel): IAction[];
}
