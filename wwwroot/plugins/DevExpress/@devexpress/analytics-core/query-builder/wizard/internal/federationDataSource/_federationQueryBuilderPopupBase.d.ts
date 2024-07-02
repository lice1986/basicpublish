﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationQueryBuilderPopupBase.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { WizardDragDropHandler } from '../../../../core/dragDrop/_wizardDragDropHandler';
import { PopupEditorBase } from '../../../../core/widgets/_popupEditorBase';
import { ResizeHelper } from '../../../../widgets/internal/_resizeHelper';
import { ITreeListOptions, TreeListItemViewModel } from '../../../../widgets/treelist/_treelistItem';
import { getParentContainer } from '../../../../widgets/_utils';
import { FederationDataSource } from '../../../dataSource/federation/federationDataSource';
import { IFederationQuery } from '../../../dataSource/utils';
export declare class FederationQueryBuilderPopupBase extends PopupEditorBase {
    onSaveCallback: (query: IFederationQuery) => void;
    protected _dataSource: FederationDataSource;
    rtl: boolean;
    onCloseCallback?: () => void;
    protected _aliasValidationRule: {
        type: string;
        validationCallback: (options: any) => void;
        readonly message: any;
    };
    protected _aliasValidationCallback(alias: string, data: {
        key: string;
        alias: string;
    }): boolean;
    constructor(onSaveCallback: (query: IFederationQuery) => void, _dataSource: FederationDataSource, rtl?: boolean, onCloseCallback?: () => void);
    dispose(): void;
    addDataMember(item: TreeListItemViewModel, position?: {
        left: number;
        top: number;
    }): void;
    save(): void;
    close(): void;
    popupTarget(): string;
    onHiding(): void;
    selectedPath: ko.Observable<string>;
    dragDropHandler: WizardDragDropHandler;
    fieldListModel: ITreeListOptions;
    title: () => string;
    getPopupContainer: typeof getParentContainer;
    loaded: ko.Observable<boolean>;
    maxHeight: string;
    width: string;
    height: string;
    cssClass: string;
    resultGridHeight: ko.Observable<number>;
    resizeHelper: ResizeHelper;
}
