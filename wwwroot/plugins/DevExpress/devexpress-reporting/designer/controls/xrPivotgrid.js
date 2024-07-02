﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPivotgrid.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { find } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray } from '@devexpress/analytics-core/analytics-utils';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { PivotGridFieldViewModel } from './pivotgrid/pivotgridfield';
import { XRControlSurface, XRControlViewModel } from './xrControl';
function comparerFields(firstField, secondField) {
    return firstField.areaIndex() - secondField.areaIndex();
}
export class XRPivotGridViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this.fields = deserializeArray(model && model.Fields || [], (item) => { return new PivotGridFieldViewModel(item, this, serializer); });
        this._disposables.push(this.fields.subscribe(() => {
            ['FilterArea', 'DataArea', 'ColumnArea', 'RowArea'].forEach((area) => {
                const areaFields = this.getFieldsFromArea(area);
                for (let index = 0; index < areaFields.length; index++) {
                    areaFields[index].areaIndex(index);
                }
            });
        }));
        this.addFieldToArea = (area) => {
            if (this.lockedInUserDesigner())
                return;
            const newField = new PivotGridFieldViewModel({ '@ControlType': 'PivotGridField', '@Area': area }, this, serializer);
            newField.index(this.fields().length);
            newField.areaIndex(this.getFieldsFromArea(area).length);
            this.fields.push(newField);
        };
        this._initCriteriaString();
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.fields);
        this.resetObservableArray(this.fields);
    }
    _initCriteriaString() {
        this.prefilter.criteriaString = new FilterStringOptions(this.prefilter._criteriaString);
        this.prefilter.criteriaString.helper.canChoiceParameters = false;
        this.prefilter.criteriaString.helper.canChoiceProperty = false;
        this.prefilter.criteriaString.helper.getDisplayPropertyName = (path, name) => {
            const field = find(this.fields.peek(), f => f.name() === name);
            return $.Deferred()
                .resolve(field ? field.getDisplayName() : name)
                .promise();
        };
        this.prefilter.parent = this;
    }
    removeChild(selectedField) {
        this.fields.splice(this.fields().indexOf(selectedField), 1);
    }
    getFieldsFromArea(area) {
        const result = [];
        result.push.apply(result, this.fields().filter(field => { return field.area() === area; }));
        return result.sort(comparerFields);
    }
    getPath(propertyName) {
        return this.dsHelperProvider() && this.dsHelperProvider().getDataSourcePath(this.dataSource());
    }
}
export class XRPivotGridSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this.contenttemplate = 'dxrd-pivotgrid-content';
        this.selectiontemplate = 'dxrd-pivotgrid-selection';
        this._disposables.push(this.filterFields = ko.pureComputed(() => {
            return this.getAreaFields('FilterArea');
        }));
        this._disposables.push(this.dataFields = ko.pureComputed(() => {
            return this.getAreaFields('DataArea');
        }));
        this._disposables.push(this.columnFields = ko.pureComputed(() => {
            return this.getAreaFields('ColumnArea');
        }));
        this._disposables.push(this.rowFields = ko.pureComputed(() => {
            return this.getAreaFields('RowArea');
        }));
        this._disposables.push(this.totalsHeight = ko.pureComputed(() => {
            return this.columnFields().length > 0 ? this.columnFields().length * PivotGridFieldViewModel.fieldHeight : PivotGridFieldViewModel.fieldHeight;
        }));
        this._disposables.push(this.rowHeaderHeight = ko.pureComputed(() => {
            return this.totalsHeight() + (this.dataFields().length > 0 ? PivotGridFieldViewModel.fieldHeight : 0) + 8;
        }));
        this._disposables.push(this.totalsDataFieldWidth = ko.pureComputed(() => {
            return this.getTotalsAreaFieldWidth('DataArea', context.zoom());
        }));
        this._disposables.push(this.totalsRowFieldWidth = ko.pureComputed(() => {
            return this.getTotalsAreaFieldWidth('RowArea', context.zoom());
        }));
    }
    _getChildrenHolderName() { return 'fields'; }
    getAreaFields(area) {
        return this.fields().filter(field => { return field.area() === area; }).sort(comparerFields);
    }
    getTotalsAreaFieldWidth(area, zoom) {
        let total = 0;
        const areaFields = this.getAreaFields(area);
        areaFields.forEach((field) => { total += field.rect().width; });
        return areaFields.length > 0 ? total / zoom : 100;
    }
    getAdornTemplate() {
        return this.isIntersect() ? 'dxrd-intersect' : '';
    }
    isThereIntersectionWithChildCollection() {
        return false;
    }
}