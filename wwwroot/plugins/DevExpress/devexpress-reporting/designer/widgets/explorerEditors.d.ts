﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\explorerEditors.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectExplorerProvider, ObjectStructureTreeListController } from '@devexpress/analytics-core/analytics-internal';
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class ExplorerEditor extends Editor {
    constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    private _collectionNames;
    private _isEqualModel;
    private _isVisible;
    treeListController: ObjectStructureTreeListController;
    displayExpr: ko.Observable<string> | ko.Computed<string>;
    itemsProvider: ObjectExplorerProvider;
}
export declare class DrillDownEditor extends ExplorerEditor {
    private _setDisabled;
    private _findFistAvailableBand;
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    path: ko.Observable<any>;
}
