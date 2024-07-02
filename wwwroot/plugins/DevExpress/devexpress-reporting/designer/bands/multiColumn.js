﻿/**
* DevExpress HTML/JS Reporting (designer\bands\multiColumn.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { unitsToPixel } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, floatFromModel } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export class MultiColumn extends SerializableModel {
    constructor(model, pageWidth, margins, serializer) {
        super(model || {}, serializer, multiColumnSerializationsInfo);
        this.grayAreaWidth = ko.observable(0);
        this._disposables.push(this.realColumnWidth = ko.pureComputed(() => {
            const bandWidth = pageWidth() - margins.left() - margins.right();
            let result = bandWidth;
            this.grayAreaWidth(0);
            if (this.mode() === 'UseColumnWidth') {
                if (this.columnWidth() > bandWidth) {
                    this.grayAreaWidth(0);
                    result = bandWidth - this.columnSpacing();
                }
                else if (this.columnWidth() > 0) {
                    this.grayAreaWidth(bandWidth - this.columnWidth() - this.columnSpacing());
                    result = this.columnWidth();
                }
            }
            else if (this.mode() === 'UseColumnCount' && this.columnCount() > 1) {
                result = (bandWidth - this.columnSpacing() * (this.columnCount() - 1)) / this.columnCount();
                this.grayAreaWidth(bandWidth - result - this.columnSpacing());
            }
            return result;
        }));
        this._disposables.push(this.columnWidth.subscribe((newVal) => { this.mode('UseColumnWidth'); }));
        this._disposables.push(this.columnCount.subscribe((newVal) => { this.mode('UseColumnCount'); }));
    }
}
MultiColumn.unitProperties = ['columnWidth', 'columnSpacing'];
export const multiColumnSerializationsInfo = [
    { propertyName: 'columnCount', modelName: '@ColumnCount', displayName: 'Column Count', localizationId: 'DevExpress.XtraReports.UI.MultiColumn.ColumnCount', defaultVal: 1, editor: editorTemplates.getEditor('numeric'), from: floatFromModel },
    { propertyName: 'columnWidth', modelName: '@ColumnWidth', displayName: 'Column Width', localizationId: 'DevExpress.XtraReports.UI.MultiColumn.ColumnWidth', defaultVal: 0, editor: editorTemplates.getEditor('numeric'), from: floatFromModel },
    { propertyName: 'columnSpacing', modelName: '@ColumnSpacing', displayName: 'Column Spacing', localizationId: 'DevExpress.XtraReports.UI.MultiColumn.ColumnSpacing', defaultVal: 0, editor: editorTemplates.getEditor('numeric'), from: floatFromModel },
    {
        propertyName: 'layout', modelName: '@Layout', displayName: 'Layout', localizationId: 'DevExpress.XtraReports.UI.MultiColumn.Layout', defaultVal: 'DownThenAcross', editor: editorTemplates.getEditor('combobox'), valuesArray: [
            { value: 'DownThenAcross', displayValue: 'DownThenAcross', localizationId: 'DevExpress.XtraPrinting.ColumnLayout.DownThenAcross' },
            { value: 'AcrossThenDown', displayValue: 'AcrossThenDown', localizationId: 'DevExpress.XtraPrinting.ColumnLayout.AcrossThenDown' }
        ]
    }, {
        propertyName: 'mode', modelName: '@Mode', displayName: 'Mode', localizationId: 'DevExpress.XtraReports.UI.MultiColumn.Mode', defaultVal: 'None', editor: editorTemplates.getEditor('combobox'), valuesArray: [
            { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' },
            { value: 'UseColumnCount', displayValue: 'UseColumnCount', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.UseColumnCount' },
            { value: 'UseColumnWidth', displayValue: 'UseColumnWidth', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.UseColumnWidth' }
        ]
    }
];
export class MultiColumnSurface extends Disposable {
    constructor(multiColumn, context) {
        super();
        this._disposables.push(this.grayAreaWidth = ko.pureComputed(() => {
            return unitsToPixel(multiColumn.grayAreaWidth(), context.measureUnit(), context.zoom());
        }), this.columnWidth = ko.pureComputed(() => {
            return unitsToPixel(multiColumn.realColumnWidth(), context.measureUnit(), context.zoom());
        }), this.columnSpacing = ko.pureComputed(() => {
            return unitsToPixel(multiColumn.columnSpacing(), context.measureUnit(), context.zoom());
        }), this.columnSpacingLeft = ko.pureComputed(() => {
            const columnWidth = this.columnWidth();
            return !context.rtl() ? columnWidth : context.margins.right() + this.grayAreaWidth();
        }), this.grayAreaLeft = ko.pureComputed(() => {
            const columnWidth = this.columnWidth();
            return !context.rtl() ? columnWidth + this.columnSpacing() : context.margins.right();
        }), this.haveColumns = ko.pureComputed(() => {
            return multiColumn.columnCount() > 1 && multiColumn.mode() !== 'None';
        }));
    }
}
