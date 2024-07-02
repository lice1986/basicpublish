﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_jsonDataSourceEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { JsonDataSource } from '@devexpress/analytics-core/analytics-data';
import { IAction } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceWizardPageIterator, IDataSourceWizardConnectionStrings, IDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
import { DataSourceEditorBase, IDataSourceInfo } from './_sqlDataSourceEditor';
export declare class JsonEditSchemaIterator extends DataSourceWizardPageIterator {
    getNextPageId(pageId: any): string;
}
export declare class JsonDataSourceEditor extends DataSourceEditorBase {
    private _applyDataSourceChange;
    editSchema(dataSourceID: string): void;
    applyDataSourceWizardChanges(dataSourceWizardModel: IDataSourceWizardState): JQueryPromise<IDataSourceInfo>;
    saveJsonSource(state: IDataSourceWizardState, connections: IDataSourceWizardConnectionStrings): JQuery.Promise<any, any, any>;
    static createJsonDataSourceInfo(source: JsonDataSource): JQueryPromise<IDataSourceInfo>;
    editSchemaAction: {
        clickAction: (item: any) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    getActions(context: any): IAction[];
}