﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_objectDataSourceEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ObjectDataSource } from '@devexpress/analytics-core/analytics-data';
import { IAction } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceWizardPageIterator, IDataSourceWizardState, IObjectDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
import { DataSourceEditorBase, IDataSourceInfo } from './_sqlDataSourceEditor';
export declare class ObjectDataSourceEditParametersIterator extends DataSourceWizardPageIterator {
    getNextPageId(pageId: any): string;
}
export declare class ObjectDataSourceEditor extends DataSourceEditorBase {
    static createObjectDataSourceInfo(objectDataSourceWizard: IObjectDataSourceWizardState, objectDataSource: ObjectDataSource, base64?: string): JQueryPromise<IDataSourceInfo>;
    applyDataSourceWizardChanges(dataSourceWizardModel: IDataSourceWizardState): JQuery.Promise<IDataSourceInfo, any, any>;
    getActions(context: any): IAction[];
    editSchema(dataSourceID: string): void;
    editParametersAction: {
        clickAction: (item: any) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
}
