﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_fieldListDragDropHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Size } from '@devexpress/analytics-core/analytics-elements';
import { PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import { ReportSurface } from '../../controls/xrReport';
import { Parameter } from '../../dataObjects/parameters/parameter';
import { assignBinding, createPictureBox, createSimpleControl, getFirstSurfaceParentByType, getUsefulReportWidth, isList, _checkBandsType } from './_utils';
export class FieldListDragDropHelper {
    constructor(_dataBindingMode, _size) {
        this._dataBindingMode = _dataBindingMode;
        this._size = _size;
        this._getItemsFromList = (treeListItem, childCollection) => {
            const deferred = $.Deferred();
            treeListItem.getItems().done((items) => {
                const simpleFields = items.filter(item => { return !isList(item.data); });
                childCollection.push.apply(childCollection, simpleFields);
                deferred.resolve();
            });
            return deferred.promise();
        };
    }
    _createTable(parent, items) {
        if (items.length === 0)
            return null;
        const tableSize = this._size ? [this._size.width(), this._size.height()].join(',') : '200, 23';
        const table = parent.getControlFactory().createControl({ '@ControlType': 'XRTable', '@SizeF': tableSize }, parent);
        const tableRow = table.createChild({ '@ControlType': 'XRTableRow', '@Weight': '1' });
        items.forEach(item => {
            const cell = createSimpleControl('XRTableCell', tableRow);
            if (item.data.specifics !== 'Array') {
                assignBinding(cell, tableRow, 'Text', item, this._dataBindingMode);
            }
            else {
                const path = item.data instanceof Parameter ? item.path : new PathRequest(item.path).path;
                cell.addChild(createPictureBox(cell, path, this._dataBindingMode));
            }
        });
        return table;
    }
    _getFirstLevelItems(treeListItems) {
        const deferred = $.Deferred();
        const promises = [];
        const childCollection = [];
        for (let i = 0; i < treeListItems.length; i++) {
            if (!isList(treeListItems[i].data))
                childCollection.push.apply(childCollection, [treeListItems[i]]);
            else
                promises.push(this._getItemsFromList(treeListItems[i], childCollection));
        }
        $.when.apply($, promises).done(() => {
            deferred.resolve(childCollection);
        });
        return deferred.promise();
    }
    createTableFromListSource(treeListItem, parent) {
        const deferred = $.Deferred();
        treeListItem.getModel().getItems().done((items) => {
            if (items.length === 0)
                deferred.resolve(null);
            const simpleFields = items.filter(item => { return !isList(item.data); });
            if (simpleFields.length === 1) {
                const control = (memberControlsMap[simpleFields['specifics']] || memberControlsMap['Default']).drop(simpleFields[0].getViewModel(), parent, this._dataBindingMode);
                deferred.resolve(control);
            }
            else if (simpleFields.length > 1) {
                deferred.resolve(this._createTable(parent, simpleFields));
            }
            else {
                this.createTableFromItems(items, parent).done(table => deferred.resolve(table));
            }
        });
        return deferred.promise();
    }
    createTableFromItems(treeListItems, parent) {
        const deferred = $.Deferred();
        this._getFirstLevelItems(treeListItems).done(items => deferred.resolve(this._createTable(parent, items)));
        return deferred.promise();
    }
}
export const listMemberControlsMap = {
    'List': {
        drop: (treeListItem, dropTargetControl, dataBindingMode, size) => {
            const helper = new FieldListDragDropHelper(dataBindingMode, size);
            if (treeListItem.data.specifics === 'ListSource')
                return helper.createTableFromListSource(treeListItem, dropTargetControl);
            return helper.createTableFromItems([treeListItem.getModel()], dropTargetControl);
        },
        size: getUsefulReportWidth,
        adjustDropTarget: (dropTarget) => {
            if (dropTarget instanceof ReportSurface)
                return dropTarget;
            const targetSurface = getFirstSurfaceParentByType(dropTarget, _checkBandsType);
            targetSurface.underCursor().x = 0;
            return targetSurface;
        }
    },
    'MultiList': {
        drop: (treeListItem, dropTargetControl, dataBindingMode, size) => {
            const helper = new FieldListDragDropHelper(dataBindingMode, size);
            return helper.createTableFromItems(treeListItem.getSelectedItems(), dropTargetControl);
        },
        size: getUsefulReportWidth,
        adjustDropTarget: (dropTarget) => {
            if (dropTarget instanceof ReportSurface)
                return dropTarget;
            const targetSurface = getFirstSurfaceParentByType(dropTarget, _checkBandsType);
            targetSurface.underCursor().x = 0;
            return targetSurface;
        }
    }
};
export const memberControlsMap = Object.assign({ 'Array': {
        drop: (treeListItem, dropTargetControl, dataBindingMode) => {
            return createPictureBox(dropTargetControl, new PathRequest(treeListItem.path).path, dataBindingMode);
        },
        size: (surface) => {
            return Size.fromString('100, 100');
        }
    }, 'Bool': {
        drop: (treeListItem, dropTargetControl, dataBindingMode) => {
            const control = createSimpleControl('XRCheckBox', dropTargetControl);
            assignBinding(control, dropTargetControl, 'CheckBoxState', treeListItem.getModel(), dataBindingMode);
            control.text(treeListItem.data.displayName);
            return control;
        },
        size: (surface) => {
            return Size.fromString('100, 23');
        }
    }, 'Default': {
        drop: (treeListItem, dropTargetControl, dataBindingMode) => {
            const control = createSimpleControl('XRLabel', dropTargetControl);
            assignBinding(control, dropTargetControl, 'Text', treeListItem.getModel(), dataBindingMode);
            return control;
        },
        size: (surface) => {
            return Size.fromString('100, 23');
        }
    } }, listMemberControlsMap);
