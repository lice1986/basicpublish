﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationQueryBuilderPopupBase.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DragHelperContent } from '../../../../core/dragDrop/_dragHelperContent';
import { WizardDragDropHandler } from '../../../../core/dragDrop/_wizardDragDropHandler';
import { PopupEditorBase } from '../../../../core/widgets/_popupEditorBase';
import { getLocalization } from '../../../../property-grid/localization/_localization';
import { ResizeHelper } from '../../../../widgets/internal/_resizeHelper';
import { getParentContainer } from '../../../../widgets/_utils';
import { QuerySurface } from '../../../elements/querySurface';
import { FederatedUnionQueryBuilderTreeListController } from '../../../utils/_federationUnionQueryBuilderTreeListController';
export class FederationQueryBuilderPopupBase extends PopupEditorBase {
    constructor(onSaveCallback, _dataSource, rtl = false, onCloseCallback) {
        super();
        this.onSaveCallback = onSaveCallback;
        this._dataSource = _dataSource;
        this.rtl = rtl;
        this.onCloseCallback = onCloseCallback;
        this.selectedPath = ko.observable();
        this.title = () => getLocalization('Query Builder', 'DataAccessUIStringId.QueryBuilder');
        this.getPopupContainer = getParentContainer;
        this.loaded = ko.observable(false);
        this.maxHeight = '90%';
        this.width = '900px';
        this.height = '710px';
        this.cssClass = 'dxrd-querybuilder-federation-popup-wrapper';
        this.resultGridHeight = ko.observable(250);
        this.dragDropHandler = new WizardDragDropHandler({
            dragHelperContent: new DragHelperContent(null),
            parent: '.dx-designer-viewport .dxrd-querybuilder-federation-popup-wrapper .dxrd-querybuilder-federation-popup',
            containment: 'parent',
            target: this.popupTarget(),
            addHandler: (dropTarget, item, position) => {
                if (dropTarget && dropTarget instanceof FederationQueryBuilderPopupBase || dropTarget instanceof QuerySurface)
                    this.addDataMember(item, position);
            }
        });
        const treeListController = new FederatedUnionQueryBuilderTreeListController(this.dragDropHandler, (item) => treeListController.isDraggable(item) && this.addDataMember(item));
        this.fieldListModel = {
            itemsProvider: this._dataSource.dbSchemaProvider,
            treeListController: treeListController,
            selectedPath: this.selectedPath,
            pageSize: 100,
            expandRootItems: true,
            onItemsChanged: (items) => {
                items.forEach(item => {
                    if (item.parent && treeListController.isDraggable(item.parent) && item.parent.data.isListType)
                        item.parent.collapsed = true;
                });
            },
            rtl: rtl
        };
        this._disposables.push(this.dragDropHandler, treeListController);
        this._aliasValidationRule = {
            type: 'custom',
            validationCallback: (options) => {
                if (!options.value)
                    return true;
                return this._aliasValidationCallback(options.value, options.data);
            },
            get message() { return getLocalization('Alias is not unique', 'DataAccessUIStringId.FederationDataSourceQueryBuilder_AliasUniqueMessage'); }
        };
        this.resizeHelper = new ResizeHelper();
    }
    _aliasValidationCallback(alias, data) {
        return true;
    }
    dispose() {
        super.dispose();
        this.fieldListModel = null;
        this.onSaveCallback = null;
        this._dataSource = null;
    }
    addDataMember(item, position) { }
    save() {
        this.close();
    }
    close() {
        this.onCloseCallback && this.onCloseCallback();
        this.popupVisible(false);
    }
    popupTarget() {
        return '.dxrd-result-source-grid';
    }
    onHiding() { }
}
