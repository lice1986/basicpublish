﻿/**
* DevExpress HTML/JS Reporting (designer\controls\pivotgrid\pivotgridfield.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { cutRefs, findFirstItemMatchesCondition, getFullPath } from '@devexpress/analytics-core/analytics-internal';
import { PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { controlsFactory } from '../../utils/settings';
import { XRControlSurfaceBase } from '../xrControl';
import { ReportViewModel } from '../xrReport';
import { SortBySummaryInfo } from './sortBySummary';
export class PivotGridFieldViewModel extends ElementViewModel {
    constructor(model, parent, serializer) {
        super(cutRefs(model), parent, serializer);
        this.controlType = 'PivotGridField';
        this.areaIndexEditable = ko.pureComputed({
            read: () => { return this.areaIndex(); },
            write: (newValue) => {
                if (newValue >= 0) {
                    const fields = parent['getFieldsFromArea'](this.area());
                    if (newValue >= fields.length)
                        return;
                    const currentValue = this.areaIndex(), delta = newValue < currentValue ? 1 : -1, min = Math.min(newValue, currentValue), max = Math.max(newValue, currentValue);
                    fields.forEach((field) => {
                        const fieldAreaIndex = field.areaIndex();
                        if (min <= fieldAreaIndex && fieldAreaIndex <= max)
                            field.areaIndex(fieldAreaIndex + delta);
                    });
                    this.areaIndex(newValue);
                }
            }
        });
        this._disposables.push(this.area.subscribe((newValue) => {
            this.areaIndex(parent['getFieldsFromArea'](this.area()).length - 1);
        }));
        this.sortBySummaryInfo = new SortBySummaryInfo(this.sortBySummaryInfo || {}, this, serializer);
    }
    static createNew(parent) {
        return () => {
            return new PivotGridFieldViewModel({}, ko.unwrap(parent), null);
        };
    }
    getFieldType() {
        const report = this.root;
        if (!report || !(report instanceof ReportViewModel))
            return;
        const dataBindingsProvider = report.dataBindingsProvider && report.dataBindingsProvider();
        let resultItem;
        if (dataBindingsProvider) {
            dataBindingsProvider.getItems(new PathRequest(this.getPath(''))).done(result => {
                resultItem = findFirstItemMatchesCondition(result, x => x.name === this.fieldName());
            });
        }
        if (resultItem && resultItem.specifics)
            return resultItem.specifics;
    }
    getInfo() {
        return this.getControlFactory().controlsMap['PivotGridField'].info;
    }
    getControlFactory() {
        return controlsFactory();
    }
    getPath(propertyName) {
        return getFullPath(this.parentModel()['getPath'](''), this.parentModel()['dataMember']());
    }
    getDisplayName() {
        return this.caption() || this.fieldName() || this.name() || this['displayName'] && this['displayName']();
    }
}
PivotGridFieldViewModel.fieldHeight = 20;
export class PivotGridFieldSurface extends XRControlSurfaceBase {
    constructor(control, context) {
        super(control, context, null);
        this.isIntersect = ko.computed(() => { return false; });
        this.displayText = () => {
            return control.caption() || control.fieldName() || (control['displayName']() || '');
        };
        this._disposables.push(ko.computed(() => {
            this._width(control['width']() * context.zoom());
            this._height(PivotGridFieldViewModel.fieldHeight * context.zoom());
        }));
        this.template = 'dxrd-pivotgrid-field';
        this.selectiontemplate = 'dxrd-pivotgrid-field-selection';
        this.area = control.area;
        this.areaIndex = control.areaIndex;
        this._disposables.push(this.minWidth = ko.pureComputed(() => {
            return this.area() === 'ColumnArea' || this.area() === 'FilterArea' ? 100 : 0;
        }));
        this._disposables.push(this.positionWidthWithoutZoom = ko.pureComputed(() => {
            return this['position'].width() / this._context.zoom();
        }));
    }
}
