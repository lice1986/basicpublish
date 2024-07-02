﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\dataSourceEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { Editor, IEditorViewModel } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
export interface IDataSourceEditorViewModel extends IEditorViewModel {
    getEditorOptions: (dataSourceHelper: ko.Observable<DataSourceHelper>, undoEngine: ko.Observable<UndoEngine>, popupContainer: string) => any;
}
export declare class DataSourceEditor extends Editor {
    private _getEditorOptions;
    createViewModel(): IEditorViewModel;
    dispose(): void;
    getEditorOptions(dataSourceHelper: ko.Observable<DataSourceHelper>, undoEngine: ko.Observable<UndoEngine>, popupContainer: string): any;
}