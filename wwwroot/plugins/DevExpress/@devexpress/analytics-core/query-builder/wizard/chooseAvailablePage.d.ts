﻿/**
* DevExpress Analytics (query-builder\wizard\chooseAvailablePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IDataSourceInfo } from '../../core/utils/_fieldListProvider';
import { IConnectionStringDefinition } from './internal/initializer';
import { IWizardPage } from './pages/IWizardPage';
import { WizardPageBase } from './pages/wizardPageBase';
export interface IChooseAvailableItemPageOperation {
    text: string;
    createNew: boolean;
}
export declare class ChooseAvailableItemPage extends WizardPageBase {
    items: ko.Subscribable<any[]>;
    private _getJsonConnectionsCallback?;
    constructor(items: ko.Subscribable<any[]>, canCreateNew?: boolean, _getJsonConnectionsCallback?: () => JQueryPromise<IConnectionStringDefinition[]>);
    canNext(): boolean;
    canCreateNew: ko.Observable<boolean>;
    selectedItems: ko.ObservableArray<IDataSourceInfo>;
    operations: IChooseAvailableItemPageOperation[];
    selectedOperation: ko.Observable<IChooseAvailableItemPageOperation>;
    _createNew: ko.PureComputed<boolean>;
    initialize(state: any): JQueryPromise<IWizardPage>;
    _displayExpr(item: any): string;
    _getSelectedItem(state?: any): IDataSourceInfo;
    onDblClick(): void;
    get createNewOperationText(): string;
    get existingOperationText(): string;
}
