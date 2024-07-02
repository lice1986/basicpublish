﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\chartValueBindingEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { ISerializationInfo, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import { TreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { Parameter } from '../dataObjects/parameters/parameter';
export declare class ChartValueBindingEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    generateDisplayValue(reportDataSource: ko.Observable<IDataSourceInfo>): string;
    generateValue(undoEngine: UndoEngine, reportParameters: ko.ObservableArray<Parameter>, reportDataSource: ko.Observable<IDataSourceInfo>): ko.Observable<string> | ko.Computed<string>;
    treeListController: TreeListController;
    binding: ko.Observable<string> | ko.Computed<string>;
    displayBinding: ko.Observable<string> | ko.Computed<string>;
}