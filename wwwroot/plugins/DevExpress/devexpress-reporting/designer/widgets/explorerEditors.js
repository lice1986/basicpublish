﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\explorerEditors.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectExplorerProvider, ObjectStructureTreeListController } from '@devexpress/analytics-core/analytics-internal';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { BandViewModel } from '../bands/xrBand';
import { DetailBand } from '../bands/xrDetailBand';
import { ReportExplorerModel } from '../internal/reportExplorer/_reportExplorer';
export class ExplorerEditor extends Editor {
    constructor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        super(modelPropertyInfo, level, parentDisabled, textToSearch);
        this._collectionNames = ['controls', 'bands'];
        this._disposables.push(this.displayExpr = ko.computed(() => {
            const value = ko.unwrap(this.value);
            return value && ko.unwrap(value.displayName || value.name) || '';
        }));
        const model = ko.computed(() => {
            const model = this._get('_model');
            return model && model['root'];
        });
        this._disposables.push(model);
        this._disposables.push(this.itemsProvider = new ObjectExplorerProvider([{ model: model, name: 'Report', displayName: 'Report', className: 'master_report' }], ['bands', 'controls', 'rows', 'cells'], this.value, ReportExplorerModel.getPathByMember));
        this.itemsProvider.path('Report');
        this.treeListController = new ObjectStructureTreeListController(['bands', 'controls', 'rows', 'cells', 'Report']);
        this.treeListController.canSelect = (item) => {
            return !item.hasItems && !(item.data && (item.data['data'] instanceof BandViewModel));
        };
        this.treeListController.itemsFilter = (item) => {
            return item && item['data'] && this._isVisible(item['data']);
        };
    }
    _isEqualModel(item) {
        const model = this._get('_model');
        return item === model || (model && model['isSame'] && model['isSame'](item));
    }
    _isVisible(item) {
        if (item instanceof BandViewModel) {
            for (let i = 0; i < this._collectionNames.length; i++) {
                const collection = item[this._collectionNames[i]] && item[this._collectionNames[i]]();
                if (collection) {
                    for (let j = 0; j < collection.length; j++) {
                        if (this._isVisible(collection[j]))
                            return true;
                    }
                }
            }
            return false;
        }
        else {
            return !this._isEqualModel(item) &&
                item.controlType !== 'XRTableOfContents' &&
                item.controlType !== 'XRPivotGrid' &&
                item.controlType !== 'XRPageBreak' &&
                item.controlType !== 'XRSubreport' &&
                item.controlType !== 'PivotGridField';
        }
    }
}
export class DrillDownEditor extends ExplorerEditor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
        this.path = ko.observable(null);
        this._disposables.push(ko.computed(() => {
            const model = this._get('_model');
            if (model && model instanceof BandViewModel) {
                let target = null;
                if (model instanceof DetailBand && model.hasHierarchyPrintOptions()) {
                    target = model;
                }
                else {
                    const bands = model.parentModel()['bands']();
                    const position = bands.indexOf(model);
                    target = this._findFistAvailableBand(bands, position - 1);
                }
                if (target) {
                    this._setDisabled(false);
                    this.itemsProvider.path(ReportExplorerModel.getPathByMember(target));
                }
                else {
                    this.itemsProvider.path('');
                    this._setDisabled(true);
                }
            }
        }));
    }
    _setDisabled(value) {
        const info = this._get('info');
        if (info.disabled) {
            if (ko.isObservable(info.disabled)) {
                info.disabled(value);
            }
            else {
                info.disabled = value;
            }
        }
        else {
            info.disabled = ko.observable(value);
        }
    }
    _findFistAvailableBand(bands, position) {
        if (position === -1) {
            return null;
        }
        const target = bands[position];
        if (target && (target.controlType === 'GroupHeaderBand' || target.controlType === 'DetailBand')) {
            return target;
        }
        else if (target) {
            return this._findFistAvailableBand(bands, position - 1);
        }
        else {
            return null;
        }
    }
}
