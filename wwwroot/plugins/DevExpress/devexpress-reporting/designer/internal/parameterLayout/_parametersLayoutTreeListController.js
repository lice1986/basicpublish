﻿/**
* DevExpress HTML/JS Reporting (designer\internal\parameterLayout\_parametersLayoutTreeListController.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization, ObjectStructureTreeListController } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { ReportViewModel } from '../../controls/xrReport';
import { GroupLayoutItem, ParameterLayoutItem } from '../../dataObjects/parameters/layoutItems';
import { ParameterLayoutDragDropHandler } from './_parameterLayoutDragDropHandler';
export class ParametersLayoutTreeListController extends ObjectStructureTreeListController {
    constructor(_report, _selectedItemModel) {
        super(undefined, undefined);
        this._report = _report;
        this._selectedItemModel = _selectedItemModel;
        this.getActions = (item) => {
            const model = item && item.data && item.data['data'];
            const imageTemplateName = model instanceof GroupLayoutItem ? 'dxrd-svg-actions-ungroup' : 'dxrd-svg-operations-recycle_bin';
            const imageClassName = model instanceof GroupLayoutItem ? 'dxrd-image-ungroup' : 'dxrd-image-recycle-bin';
            return [{
                    text: 'Delete',
                    displayText: () => getLocalization('Delete', 'AnalyticsCoreStringId.Cmd_Delete'),
                    imageClassName: imageClassName,
                    imageTemplateName: imageTemplateName,
                    clickAction: (treeListItem) => this.delete(treeListItem.data['data'])
                }];
        };
        this._disposables.push(this.dragDropHandler = new ParameterLayoutDragDropHandler(_selectedItemModel));
    }
    _innerSwap(selectedItemModel, swapElement, goUp, currentCollection) {
        currentCollection.remove(selectedItemModel);
        if (goUp) {
            swapElement.parameterPanelLayoutItems.push(selectedItemModel);
        }
        else {
            swapElement.parameterPanelLayoutItems.unshift(selectedItemModel);
        }
        selectedItemModel.parentModel(swapElement);
    }
    _outerSwap(selectedItemModel, goUp, currentCollection) {
        const parentModel = selectedItemModel.parentModel();
        const grandParentModel = parentModel.parentModel();
        currentCollection.remove(selectedItemModel);
        currentCollection = grandParentModel.parameterPanelLayoutItems;
        const index = currentCollection().indexOf(parentModel) + (goUp ? 0 : 1);
        currentCollection.splice(index, 0, selectedItemModel);
        selectedItemModel.parentModel(grandParentModel);
    }
    _siblingsSwap(currentCollection, index, offset) {
        const _collection = ko.unwrap(currentCollection);
        [_collection[index + offset], _collection[index]] = [_collection[index], _collection[index + offset]];
        currentCollection.valueHasMutated();
    }
    _checkIndex(index, goUp, parentModel) {
        return goUp ? index > 0 : parentModel.parameterPanelLayoutItems().length - 1 > index;
    }
    addItem(item) {
        let selectedItemModel = this._selectedItemModel();
        let root = this._report;
        if (selectedItemModel) {
            root = selectedItemModel instanceof GroupLayoutItem ? selectedItemModel : (selectedItemModel.parentModel() || selectedItemModel);
        }
        else {
            selectedItemModel = root.parameterPanelLayoutItems()[0];
        }
        root.parameterPanelLayoutItems.splice(root.parameterPanelLayoutItems().indexOf(selectedItemModel) + 1, 0, item);
        item.parentModel(root);
        this._selectedItemModel(item);
    }
    move(goUp = true) {
        const offset = goUp ? -1 : 1;
        const selectedItemModel = this._selectedItemModel();
        if (!selectedItemModel)
            return;
        const parentModel = selectedItemModel.parentModel();
        const collection = parentModel.parameterPanelLayoutItems;
        const index = collection().indexOf(selectedItemModel);
        if (this._checkIndex(index, goUp, parentModel)) {
            const swapElement = collection()[index + offset];
            if (swapElement instanceof GroupLayoutItem) {
                this._innerSwap(selectedItemModel, swapElement, goUp, collection);
            }
            else {
                this._siblingsSwap(collection, index, offset);
            }
        }
        else if (parentModel instanceof GroupLayoutItem) {
            this._outerSwap(selectedItemModel, goUp, collection);
        }
        this._selectedItemModel.valueHasMutated();
    }
    delete(item = this._selectedItemModel()) {
        if (!item)
            return;
        const isSelectedItem = item === this._selectedItemModel();
        const parentModel = item.parentModel();
        const collection = parentModel.parameterPanelLayoutItems.peek();
        const index = collection.indexOf(item);
        if (item instanceof GroupLayoutItem) {
            const childItems = item.parameterPanelLayoutItems();
            childItems.forEach(item => item.parentModel(parentModel));
            collection.splice(index, 0, ...childItems);
        }
        item.delete();
        if (item instanceof ParameterLayoutItem) {
            this._report.parameterHelper.parameters.remove(item.parameter());
        }
        if (isSelectedItem) {
            const nextItem = collection[index === collection.length ? index - 1 : index];
            if (nextItem) {
                this._selectedItemModel(nextItem);
            }
            else if (!(parentModel instanceof ReportViewModel)) {
                this._selectedItemModel(parentModel);
            }
            else {
                this._selectedItemModel(null);
            }
        }
    }
}
