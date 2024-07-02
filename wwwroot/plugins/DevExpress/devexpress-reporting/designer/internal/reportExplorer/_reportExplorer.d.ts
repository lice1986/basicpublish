﻿/**
* DevExpress HTML/JS Reporting (designer\internal\reportExplorer\_reportExplorer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISelectionProvider, ObjectExplorerProvider, ObjectStructureTreeListController } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportViewModel } from '../../controls/xrReport';
import { IDataSourceSettings } from '../../utils/inititalizer';
import { ReportExplorerDragDropHandler } from '../dragdrop/_reportExplorerDragDropHandler';
export declare class ReportExplorerModel extends Disposable {
    private _dataSourceSettings?;
    static getPathByMember(model: any): any;
    private _createActionsForOneElement;
    private _createActionsForArray;
    private _getPathNonControl;
    constructor(reportModel: ko.Observable<ReportViewModel>, editableObject: any, clickHandler: any, dragDropHandler: ReportExplorerDragDropHandler, selection: ISelectionProvider, _dataSourceSettings?: IDataSourceSettings);
    itemsProvider: ObjectExplorerProvider;
    treeListController: ObjectStructureTreeListController;
}