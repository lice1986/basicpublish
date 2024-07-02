﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ValueChangedEvent } from 'devextreme/ui/text_box';
import * as ko from 'knockout';
import { IDataSourceInfo } from '../../../core/utils/_fieldListProvider';
import { CodeResolver } from '../../../property-grid/internal/_codeResolver';
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '../../../serializer/propertyChangedEvents';
import { IPathRequest } from '../../../widgets/common/pathRequest';
import { KoTreeListItemFactory } from '../../../widgets/treelist/_ko_treelistUtils';
import { ITreeListOptions, TreeListItemViewModel } from '../../../widgets/treelist/_treelistItem';
import { ITreeListItemViewModel } from '../../../widgets/treelist/_treelistItem.viewModel';
import { IDataMemberInfo, IItemsProvider } from '../../../widgets/utils';
import { DataSourceParameter } from '../../dataSource/dataSourceParameter';
import { FederationDataSource } from '../../dataSource/federation/federationDataSource';
import { SqlDataConnection } from '../../dataSource/sql/sqlDataConnection';
import { SqlDataSource } from '../../dataSource/sql/sqlDataSource';
import { ISqlQueryViewModel } from '../../dataSource/utils';
import { IRebuildSchemaResponse, ISelectStatementResponse } from '../../utils/requestwrapper';
import { _DataSourceWizardOptions } from '../dataSourceWizard';
import { _WrappedWizardPage } from '../pages/__wrappedWizardPage';
import { BaseWizard } from '../wizard';
import { IBeforeWizardPageInitializeEventArgs, IWizardPageEventArgs } from '../wizardEventManager';
import { WizardPageProcessor } from './_wizardPageProcessor';
export interface IParameter {
    name: string;
    value: any;
    type?: string;
}
export declare enum WizardSectionPosition {
    Left = 1,
    TopLeft = 2,
    BottomLeft = 3,
    Right = 4,
    TopRight = 5,
    BottomRight = 6,
    Top = 7,
    Bottom = 8
}
export interface IJsonDataSourceWizardCallbacks {
    getParameters?: () => IParameter[];
}
export interface IDataSourceWizardCallbacks extends IJsonDataSourceWizardCallbacks {
    selectStatement?: (connection: SqlDataConnection, queryJSON: string) => JQueryPromise<ISelectStatementResponse>;
    finishCallback?: (wizardModel: any) => JQueryPromise<any>;
    customQueriesPreset?: (dataSource: SqlDataSource) => JQueryPromise<ISqlQueryViewModel[]>;
    customizeQBInitData?: (data: any) => any;
    validateJsonUri?: (data: any) => any;
    getItemsProviderCallback?: () => IItemsProvider;
    fieldListsCallback?: (request: IPathRequest, dataSource?: IDataSourceInfo, useCache?: boolean) => JQueryPromise<IDataMemberInfo[]>;
}
export interface IPopoverListOptions {
    showPopover: () => void;
    target?: string;
    popoverListItems: () => any[];
    className?: string;
    popoverVisible: ko.Observable<boolean> | ko.Computed<boolean>;
    position?: any;
    popupContainer?: string;
}
export interface ICustomQueryTreeListItemViewModel extends ITreeListItemViewModel {
    queryName: string;
    queryNameHasChanged: (event: ValueChangedEvent) => void;
}
export declare class CustomQueryTreeListItem extends TreeListItemViewModel {
    protected _getTemplateName(): string;
    protected _getCustomizedTemplateName(isEditable: boolean): string;
    updateViewModel(args: PropertyChangedEventArgs<TreeListItemViewModel> | ArrayPropertyChangedEventArgs<TreeListItemViewModel>): void;
    createViewModel(): ITreeListItemViewModel;
    onPropertyChanged(args: PropertyChangedEventArgs<CustomQueryTreeListItem> | ArrayPropertyChangedEventArgs<CustomQueryTreeListItem>): void;
    queryName: string;
}
export declare class MultiQueryTreeListItemFactory extends KoTreeListItemFactory {
    createItem(options: ITreeListOptions, path?: string[], onItemsVisibilityChanged?: () => void, rtl?: boolean, resolver?: CodeResolver): TreeListItemViewModel;
}
export interface IMultiQueryDataSourceWizardCallbacks extends IDataSourceWizardCallbacks {
    sqlDataSourceResultSchema?: (dataSource: SqlDataSource) => JQueryPromise<IRebuildSchemaResponse>;
    federationDataSourceResultSchema?: (dataSource: FederationDataSource) => JQueryPromise<{
        resultSchemaJSON: string;
    }>;
}
export interface IParametersViewModelConverter {
    createParameterViewModel(parameter: DataSourceParameter): any;
    getParameterFromViewModel(parameterViewModel: any): DataSourceParameter;
}
export interface IWizardPageStyle {
    top?: any;
    bottom?: any;
    left?: any;
    right?: any;
    width?: any;
    height?: any;
    display?: any;
}
export declare function getSectionStyle(position: WizardSectionPosition, defaultMargin?: number, isVisible?: boolean): IWizardPageStyle;
export declare function subscribeArray<T>(array: ko.ObservableArray<T>, subscribeItem: (value: T, onChange: () => void) => void, onChange: () => void): ko.Subscription;
export declare function subscribeProperties(properties: Array<ko.Observable<any> | ko.Computed<any>>, onChange: (val?: any) => void): ko.Subscription[];
export declare function subscribeObject<T>(object: ko.Observable<T> | ko.Computed<T>, subscribeProperties: (value: T, onChange: () => void) => void, onChange: () => void): ko.Subscription;
export declare function _createBeforeInitializePageEventArgs<TWizard extends BaseWizard | WizardPageProcessor>(page: _WrappedWizardPage, self: TWizard): IBeforeWizardPageInitializeEventArgs<TWizard>;
export declare function _createPageEventArgs<TWizard extends BaseWizard | WizardPageProcessor>(page: _WrappedWizardPage, self: TWizard): IWizardPageEventArgs<TWizard>;
export declare function _isMoreThanOneDataSourceTypeAvailable(dataSourceOptions: _DataSourceWizardOptions): boolean;