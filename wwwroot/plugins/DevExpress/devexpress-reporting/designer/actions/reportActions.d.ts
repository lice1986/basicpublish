﻿/**
* DevExpress HTML/JS Reporting (designer\actions\reportActions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisposableActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, IAction } from '@devexpress/analytics-core/analytics-utils';
import { IComponentAddedEventArgs } from '../utils/inititalizer';
import { IReportDesignerRootContext } from '../tools/generator/reportDesignerContext';
export declare class ReportActions extends Disposable implements IDisposableActionsProvider {
    private _buildingModel?;
    actions: IAction[];
    private _contextModel;
    private _targetModel;
    private _canAddBand;
    private _addBand;
    private createComputed;
    constructor(onComponentAdded?: any, _buildingModel?: IReportDesignerRootContext);
    getActions(context: any): IAction[];
    onComponentAdded: (e: IComponentAddedEventArgs) => void;
}
