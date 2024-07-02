﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCrossTabCell.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Rectangle } from '@devexpress/analytics-core/analytics-elements';
import { checkModelReady, formatUnicorn, getFullPath, getLocalization } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { createExpressionEditorCollectionToolOptions } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { stylesProperties } from '../helpers/_styleHelper';
import { controlsFactory } from '../utils/settings';
import { CellKind, DataFieldLayout, TotalsPosition } from './crossTab/enums';
import { crossTabDataFieldInfoBase, crossTabGroupFieldInfoBase } from './metadata/crosstab/fields';
import { stylesInfo } from './metadata/properties/style';
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { ReportViewModel } from './xrReport';
import { XRTextControlSurfaceBase } from './xrTextControl';
export function kindToString(kind) {
    switch (kind) {
        case CellKind.None:
            return 'NO';
        case CellKind.Corner:
            return 'CRN';
        case CellKind.RowHeader:
            return 'RH';
        case CellKind.RowTotalHeader:
            return 'RTH';
        case CellKind.RowTotal:
            return 'RT';
        case CellKind.ColumnHeader:
            return 'CH';
        case CellKind.ColumnTotalHeader:
            return 'CTH';
        case CellKind.ColumnTotal:
            return 'CT';
        case CellKind.Data:
            return 'DAT';
        case CellKind.DataHeader:
            return 'DH';
        case CellKind.GrandTotal:
            return 'GDT';
        case CellKind.Empty:
            return 'Emtpy';
        case CellKind.EmptyHeader:
            return 'EmtpyH';
    }
}
export class XRCrossTabCellViewModel extends XRControlViewModel {
    constructor(model, parent, serializer = new ModelSerializer()) {
        super(model, parent, serializer);
        this.parent = parent;
        this._showCellCode = ko.observable(false);
        this._oldFieldName = null;
        this.getPath = (propertyName) => {
            if (this.field && this.field())
                return this.field().getPath(propertyName);
            return getFullPath(this.parent.getPath('dataMember'), this.parent['dataMember']());
        };
        this.kind = ko.observable(CellKind.None);
        this.fieldNameAreValid = ko.observable(true);
        this._disposables.push(ko.computed(() => {
            if (checkModelReady(this.parent)) {
                this.size.width(this._width);
            }
        }));
        this._disposables.push(ko.computed(() => {
            if (checkModelReady(this.parent)) {
                this.size.height(this._height);
            }
        }));
        this._disposables.push(ko.computed(() => {
            if (checkModelReady(this.parent)) {
                this.location.x(this._left);
            }
        }));
        this._disposables.push(ko.computed(() => {
            if (checkModelReady(this.parent)) {
                this.location.y(this._top);
            }
        }));
        this._disposables.push(this.location.x.subscribe(newVal => {
            if (checkModelReady(this.parent)) {
                const delta = newVal - this._left;
                if (this._columnIndex() != 0) {
                    const targetColumn = parent._columnDefinitions()[this._columnIndex() - 1];
                    targetColumn.width(targetColumn.width() + delta);
                }
                else {
                    parent.location.x(parent.location.x() + delta);
                }
            }
        }));
        this._disposables.push(this.location.y.subscribe(newVal => {
            if (checkModelReady(this.parent)) {
                const delta = newVal - this._top;
                if (this._rowIndex() != 0) {
                    const targetRow = parent._rowDefinitions()[this._rowIndex() - 1];
                    targetRow.height(targetRow.height() + delta);
                }
                else {
                    parent.location.y(parent.location.y() + delta);
                }
            }
        }));
        this._disposables.push(this.size.height.subscribe(newHeight => {
            if (checkModelReady(this.parent)) {
                const currentHeight = this._height;
                const rows = parent._rowDefinitions();
                for (let i = this._rowIndex(); i < this._rowIndex() + this._rowSpan(); i++) {
                    rows[i].height(rows[i].height() + (newHeight - currentHeight) * (rows[i].height() / currentHeight));
                }
            }
        }));
        this._disposables.push(this.size.width.subscribe(newWidth => {
            if (checkModelReady(this.parent)) {
                const currentWidth = this._width;
                const columns = parent._columnDefinitions();
                for (let i = this._columnIndex(); i < this._columnIndex() + this._columnSpan(); i++) {
                    columns[i].width(columns[i].width() + (newWidth - currentWidth) * (columns[i].width() / currentWidth));
                }
            }
        }));
        this._text = ko.observable(this.text());
        this.field = ko.observable(null);
        this._disposables.push(this.field.subscribe(field => {
            if (field) {
                crossTabGroupFieldInfoBase.concat(crossTabDataFieldInfoBase).forEach(info => {
                    if (field[info.propertyName])
                        this[info.propertyName] = field[info.propertyName];
                });
            }
        }));
        this._disposables.push(this.fieldName = ko.pureComputed({
            read: () => this.field() && this.field().fieldName() || '',
            write: (newVal) => {
                if (this.field())
                    this.field().fieldName(newVal);
                else
                    this.createAndAssignNewField(newVal, true);
            }
        }));
        this._disposables.push(ko.computed(() => {
            this._testFieldName(this.fieldName(), new PathRequest(getFullPath(this.parent.getPath(''), this.parent['dataMember']())));
        }));
        this._disposables.push(this.kind.subscribe((kind) => {
            if (this._textFormatString() === '' && this.field() && (kind == CellKind.RowTotalHeader
                || kind == CellKind.ColumnTotalHeader))
                this.textFormatString('Total {0}');
        }));
        this._disposables.push(ko.computed(() => {
            if (this._text() === '' && this.isIndependant() && this.kind() != CellKind.Corner) {
                this.text('Grand Total');
            }
            if ((this.kind() == CellKind.Corner || this.kind() == CellKind.DataHeader) && this.fieldName() && this.fieldName() != this._oldFieldName) {
                (this._oldFieldName == this.text() || this.text() === '') && this.text(this.fieldName());
                this._oldFieldName = this.fieldName();
            }
        }));
        this._disposables.push(this.text = ko.pureComputed({
            read: () => {
                if (this._showCellCode()) {
                    const kind = kindToString(this.kind());
                    const rowSpan = this._rowSpan() != 1 ? '(' + this._rowSpan() + ')' : '';
                    const columnSpan = this._columnSpan() != 1 ? '(' + this._columnSpan() + ')' : '';
                    return kind + ' X' + this._columnIndex() + columnSpan + ' Y' + this._rowIndex() + rowSpan;
                }
                if (this._text())
                    return this._text();
                const fieldName = this.fieldName() ? '[' + this.fieldName() + ']' : '';
                if (this.kind() == CellKind.RowTotalHeader || this.kind() == CellKind.ColumnTotalHeader) {
                    return this.textFormatString() ? formatUnicorn(this.textFormatString(), fieldName) : fieldName;
                }
                if (this.isBindable())
                    return fieldName || this._getDefaultName(this.kind());
            },
            write: (newVal) => this._text(newVal)
        }));
        this._disposables.push(ko.computed(() => {
            switch (this.kind()) {
                case CellKind.Corner:
                case CellKind.ColumnHeader:
                case CellKind.ColumnTotalHeader:
                case CellKind.DataHeader:
                case CellKind.RowHeader:
                case CellKind.RowTotalHeader:
                case CellKind.EmptyHeader:
                case CellKind.Empty:
                    this.styleName(this.parent['headerAreaStyleName']());
                    break;
                case CellKind.ColumnTotal:
                case CellKind.RowTotal:
                case CellKind.GrandTotal:
                    this.styleName(this.parent['totalAreaStyleName']());
                    break;
                case CellKind.Data:
                    this.styleName(this.parent['dataAreaStyleName']());
                    break;
                default:
                    this.styleName(this.parent['generalStyleName']());
            }
            stylesProperties.forEach(property => {
                if (this['_' + property] && this['_' + property]())
                    this[property](this['_' + property]());
            });
        }));
        this._disposables.push(this.rowVisible = ko.pureComputed({
            read: () => {
                const rows = parent._rowDefinitions().slice(this._rowIndex(), this._rowIndex() + this._rowSpan());
                return !rows.every(x => !x.visible());
            },
            write: (value) => {
                for (let i = 0; i < this._rowSpan(); i++) {
                    parent._rowDefinitions()[this._rowIndex() + i].visible(value);
                }
            }
        }));
        this._disposables.push(this.columnVisible = ko.pureComputed({
            read: () => {
                const columns = parent._columnDefinitions().slice(this._columnIndex(), this._columnIndex() + this._columnSpan());
                return !columns.every(x => !x.visible());
            },
            write: (value) => {
                for (let i = 0; i < this._columnSpan(); i++) {
                    parent._columnDefinitions()[this._columnIndex() + i].visible(value);
                }
            }
        }));
        this.rowAutoHeightMode = parent._rowDefinitions()[this._rowIndex()].autoHeightMode;
        this.columnAutoWidthMode = parent._columnDefinitions()[this._columnIndex()].autoWidthMode;
        this.crossTabSortBySummaryInfo.getPath = (propertyName) => this.getPath(propertyName);
    }
    get namePrefix() {
        let cellType = '';
        for (const type in XRCrossTabCellViewModel.cellKinds) {
            if (XRCrossTabCellViewModel.cellKinds[type].indexOf(this.kind()) != -1)
                cellType = type;
        }
        return 'crossTab' + cellType + 'Cell';
    }
    get _width() {
        const columns = this.parent._columnDefinitions();
        let result = 0;
        for (let i = this._columnIndex(); i < this._columnIndex() + this._columnSpan(); i++) {
            result += columns[i].width();
        }
        return result;
    }
    get _height() {
        const rows = this.parent._rowDefinitions();
        let result = 0;
        for (let i = this._rowIndex(); i < this._rowIndex() + this._rowSpan(); i++) {
            result += rows[i].height();
        }
        return result;
    }
    get _left() {
        const columns = this.parent._columnDefinitions();
        let result = 0;
        for (let i = 0; i < this._columnIndex(); i++) {
            result += columns[i].width();
        }
        return result;
    }
    get _top() {
        const rows = this.parent._rowDefinitions();
        let result = 0;
        for (let i = 0; i < this._rowIndex(); i++) {
            result += rows[i].height();
        }
        return result;
    }
    _getDefaultName(kind) {
        switch (kind) {
            case CellKind.ColumnHeader:
                return getLocalization('Columns', 'ReportStringId.CrossTab_ColumnAreaName');
            case CellKind.RowHeader:
                return getLocalization('Rows', 'ReportStringId.CrossTab_RowAreaName');
            case CellKind.Data:
                return getLocalization('Data', 'ReportStringId.CrossTab_DataAreaName');
        }
    }
    _testFieldName(fieldName, path) {
        const report = this.root;
        if (!report || !(report instanceof ReportViewModel))
            return;
        const dataBindingsProvider = report.dataBindingsProvider && report.dataBindingsProvider();
        if (dataBindingsProvider) {
            dataBindingsProvider.getItems(path).done(result => {
                this.fieldNameAreValid(result.some(x => x.name === fieldName));
            });
        }
    }
    _createParametersExpressionCategory() {
        const crossTabParameters = this.parent.controlParameters();
        crossTabParameters.forEach(x => x.initDataMemberInfo());
        return createExpressionEditorCollectionToolOptions(crossTabParameters.map(x => {
            return {
                text: x.name,
                val: '?' + x.name,
                description: (x.dataType || x.specifics || 'object').toLowerCase() + ' ' + x.name
            };
        }), 'Parameters', 'ReportStringId.CatParameters', true);
    }
    reset() {
        this.dataLevel = undefined;
        this.columnLevel = undefined;
        this.rowLevel = undefined;
    }
    canRemove() {
        return this.kind() === CellKind.Data && this.parent.dataFields().length > 0
            || this.kind() === CellKind.RowHeader && this.parent.rowFields().length > 0
            || this.kind() === CellKind.ColumnHeader && this.parent.columnFields().length > 0;
    }
    canDropDown() {
        return this.fieldName() && (this.kind() === CellKind.Data && (this.parent.dataFields().length < 2
            || this.parent.layoutOptions.dataFieldLayout() === DataFieldLayout[DataFieldLayout.InColumn])
            || this.kind() === CellKind.ColumnHeader);
    }
    canDropRight() {
        return this.fieldName() && (this.kind() === CellKind.Data && (this.parent.dataFields().length < 2
            || this.parent.layoutOptions.dataFieldLayout() === DataFieldLayout[DataFieldLayout.InRow])
            || this.kind() === CellKind.RowHeader);
    }
    canDropUp() {
        return this.fieldName() && this.kind() === CellKind.ColumnHeader;
    }
    canDropLeft() {
        return this.fieldName() && this.kind() === CellKind.RowHeader;
    }
    getExpressionBinding(property, event) {
        if (this.isBindable()) {
            return this.text();
        }
        return super.getExpressionBinding(property, event);
    }
    isPropertyVisible(name, isPopularProperty = false) {
        if (name == 'textFormatString')
            return !this.isIndependant();
        if (name == 'visible' || name == 'location' || name == 'canPublish')
            return false;
        if (name == 'fieldName')
            return this.isBindable();
        if (name == 'summaryType' || name == 'summaryDisplayType')
            return this.kind() === CellKind.Data;
        if (name == 'text' && isPopularProperty)
            return !this.isPropertyDisabled(name);
        if (stylesInfo.some(x => x.propertyName === name))
            return false;
        if (name == 'sortOrder' ||
            name == 'crossTabGroupInterval' ||
            name == 'crossTabGroupIntervalNumericRange' ||
            name == 'crossTabSortBySummaryInfo')
            return this.kind() === CellKind.RowHeader || this.kind() === CellKind.ColumnHeader;
        return super.isPropertyVisible(name);
    }
    isPropertyModified(name) {
        if (name === 'columnIndex' || name === 'rowIndex')
            return false;
        return super.isPropertyModified(name);
    }
    isPropertyDisabled(name) {
        if (name === 'text')
            return !this.isEditable();
        if (name === 'crossTabGroupInterval' ||
            name === 'sortOrder' ||
            name === 'summaryType' ||
            name === 'summaryDisplayType' ||
            name === 'crossTabSortBySummaryInfo')
            return !this.fieldName();
        if (name === 'crossTabGroupIntervalNumericRange')
            return !this.fieldName() || !this.crossTabGroupInterval() || (this.crossTabGroupInterval() != 'Numeric' &&
                this.crossTabGroupInterval() != 'DayAge' &&
                this.crossTabGroupInterval() != 'WeekAge' &&
                this.crossTabGroupInterval() != 'MonthAge' &&
                this.crossTabGroupInterval() != 'YearAge');
        return super.isPropertyDisabled(name);
    }
    isBindable() {
        return this.kind() === CellKind.RowHeader || this.kind() === CellKind.ColumnHeader || this.kind() === CellKind.Data;
    }
    isIndependant() {
        return this.kind() == CellKind.Corner ||
            this.kind() == CellKind.ColumnTotalHeader && this.columnLevel == undefined ||
            this.kind() == CellKind.RowTotalHeader && this.rowLevel == undefined;
    }
    isEditable() {
        return this.kind() == CellKind.Corner || this.kind() == CellKind.DataHeader
            || this.kind() == CellKind.ColumnTotalHeader || this.kind() == CellKind.RowTotalHeader
            || this.kind() == CellKind.EmptyHeader || this.kind() == CellKind.Empty;
    }
    createAndAssignNewField(fieldName, insertBefore, dataFieldLayout = DataFieldLayout.InRow) {
        const increment = insertBefore ? 0 : 1;
        switch (this.kind()) {
            case CellKind.ColumnHeader:
                this.parent.insertNewField('columnFields', this.columnLevel + increment, fieldName);
                break;
            case CellKind.RowHeader:
                this.parent.insertNewField('rowFields', this.rowLevel + increment, fieldName);
                break;
            case CellKind.Data:
                this.parent.insertNewField('dataFields', this.dataLevel + increment, fieldName, dataFieldLayout);
        }
    }
    customizeExpressionCategories(tools, categories) {
        const crossTabParameters = this.parent.controlParameters();
        const crossTabFields = this.parent.getFields();
        const fieldsCategory = categories.filter(item => item.content.name == 'dx-expressioneditor-fields')[0];
        if (fieldsCategory) {
            delete fieldsCategory.content.data.parameters;
            const fields = fieldsCategory.content.data.fields();
            if (fields) {
                fields.treeListController.customFilter = (path) => {
                    return crossTabFields.some(x => getFullPath(x.getPath(''), x.fieldName()) === path);
                };
            }
            else {
                categories.splice(categories.indexOf(fieldsCategory), 1);
            }
        }
        if (crossTabParameters.length > 0) {
            categories.push(this._createParametersExpressionCategory());
        }
    }
}
XRCrossTabCellViewModel.cellKinds = {
    'Header': [CellKind.ColumnHeader, CellKind.ColumnTotalHeader, CellKind.DataHeader, CellKind.RowHeader,
        CellKind.RowTotalHeader, CellKind.Corner],
    'Total': [CellKind.RowTotal, CellKind.GrandTotal, CellKind.ColumnTotal],
    'Data': [CellKind.Data]
};
export class XRCellsurface extends XRTextControlSurfaceBase {
    constructor(control, context) {
        super(control, context);
        this.controls = null;
        this.contenttemplate = 'dxrd-crosstab-control-content';
        this.dropRect = new Rectangle();
        this.isDropTarget = ko.observable(false);
        this.dragCss = ko.observable('dxrd-drag-helper-item-allowed');
        this.selectiontemplate = 'dxrd-crosstab-cell';
        this._disposables.push(this.showDropSurface = ko.computed(() => {
            if (!this.underCursor().isOver) {
                this.isDropTarget(false);
            }
            return this.isDropTarget() && this.underCursor().isOver;
        }));
    }
    checkParent(surfaceParent) {
        return this.parent === surfaceParent;
    }
    selectLine(selection, event = { ctrlKey: false, metaKey: false }, isRow = false) {
        this.parent.selectLine(selection, this.getControlModel(), event.ctrlKey || event.metaKey, isRow);
    }
    cellClick() {
        if (controlsFactory && controlsFactory()) {
            const metadata = controlsFactory().controlsMap['XRCrossTabCell'];
            const isBindable = this._control.canRemove();
            if (isBindable) {
                metadata.isDeleteDeny = false;
            }
            else if (!isBindable) {
                metadata.isDeleteDeny = true;
            }
        }
    }
    isEditable() {
        const control = this._control;
        return control.isEditable();
    }
    _getDropCallback(insertBefore = false, dataFieldLayout = DataFieldLayout.InRow) {
        return (item) => {
            const control = this._control;
            control.createAndAssignNewField(item.path, insertBefore, dataFieldLayout);
        };
    }
    _canSetFieldName(fullPath) {
        const crossTab = this._control.parentModel();
        const path = getFullPath(crossTab.getPath(''), crossTab['dataMember']());
        const pathLength = path.split('.').length;
        return fullPath.indexOf(path) == 0
            && (pathLength < 2 || fullPath.split('.').length - pathLength == 1);
    }
    getAdornTemplate() {
        let result = super.getAdornTemplate();
        if (this._context['validationMode'] && this._context['validationMode']())
            result = XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded-notvalid', this._control['isBindable']() && this._control['fieldName']() && !this._control['fieldNameAreValid']());
        result = XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded', this._control['isBindable']() && this._control['fieldName']() && this._control['fieldNameAreValid']);
        result = XRControlSurface._appendValue(result, 'dxrd-surface-hidden', !this._control['columnVisible']() || !this._control['rowVisible']());
        return result;
    }
    dragCallback(item) {
        const control = this._control;
        const crossTab = control.parentModel();
        const rect = this.dropRect;
        this.isDropTarget(true);
        rect.left(-1);
        rect.top(-1);
        rect.width(this._width() - 3);
        rect.height(this._height() - 3);
        this.dropCallback = () => { };
        if ((control.kind() == CellKind.ColumnHeader || control.kind() == CellKind.RowHeader || control.kind() == CellKind.Data) && this._canSetFieldName(item.path)) {
            this.dragCss('dxrd-drag-helper-item-allowed');
            const cursor = { x: this.underCursor().x, y: this.underCursor().y };
            if (rect.height() - cursor.y < 7 && control.canDropDown()) {
                rect.top(rect.height() - 3);
                rect.height(7);
                this.dropCallback = this._getDropCallback(false, DataFieldLayout.InColumn);
            }
            else if (rect.width() - cursor.x < 7 && control.canDropRight()) {
                rect.left(rect.width() - 3);
                rect.width(7);
                this.dropCallback = this._getDropCallback(false);
            }
            else if (cursor.x < 7 && control.canDropLeft()) {
                if (control._columnIndex() != 0) {
                    rect.height(crossTab.cells().filter((x) => x._columnIndex() == control._columnIndex() - 1 && x.kind() == control.kind())[0].surface._height() - 3);
                    if (crossTab.layoutOptions.rowTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
                        rect.top(rect.top() - rect.height() + this._height() - 4);
                    }
                }
                else {
                    const grandTotal = crossTab.cells().filter((x) => x.kind() === CellKind.RowTotalHeader && x.rowLevel === undefined)[0];
                    rect.height(grandTotal.surface._y() + grandTotal.surface._height() - this._y() - 3);
                    if (crossTab.layoutOptions.rowTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
                        rect.top(rect.top() - (this._y() - grandTotal.surface._y()));
                        rect.height(this._y() - grandTotal.surface._y() + this._height() - 4);
                    }
                }
                this.dropCallback = this._getDropCallback(true);
                rect.left(-6);
                rect.width(7);
            }
            else if (cursor.y < 7 && control.canDropUp()) {
                if (control._rowIndex() != 0) {
                    rect.width(crossTab.cells().filter((x) => x._rowIndex() == control._rowIndex() - 1 && x.kind() == control.kind())[0].surface._width() - 3);
                    if (crossTab.layoutOptions.columnTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
                        rect.left(rect.left() - rect.width() + this._width() - 4);
                    }
                }
                else {
                    const grandTotal = crossTab.cells().filter((x) => x.kind() === CellKind.ColumnTotalHeader && x.columnLevel === undefined)[0];
                    rect.width(grandTotal.surface._x() + grandTotal.surface._width() - this._x() - 3);
                    if (crossTab.layoutOptions.columnTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData]) {
                        rect.left(rect.left() - (this._x() - grandTotal.surface._x()));
                        rect.width(this._x() - grandTotal.surface._x() + this._width() - 4);
                    }
                }
                this.dropCallback = this._getDropCallback(true);
                rect.top(-6);
                rect.height(7);
            }
            else {
                this.dropCallback = (item) => {
                    if (!control.field()) {
                        this._getDropCallback(true)(item);
                        return;
                    }
                    control.field()['setFieldName'](item.path);
                };
            }
        }
        else {
            this.dragCss('dxrd-drag-helper-item-forbidden');
        }
    }
    findNextSelection() {
        return this.parent;
    }
}