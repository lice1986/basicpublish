﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCrossTab.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { checkModelReady, createObservableArrayMapCollection, getFullPath, getLocalization, getUniqueNameForNamedObjectsArray } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray, ModelSerializer, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import { subscribeProperties } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as ko from 'knockout';
import { controlsFactory } from '../utils/settings';
import { CellCreator } from './crossTab/cellCreator';
import { CrossTabColumnDefinitionsModel, CrossTabRowDefinitionsModel, DefenitionUpdater, findcells } from './crossTab/defenitions';
import { DataFieldLayout, TotalsPosition } from './crossTab/enums';
import { crossTabCellHeight, crossTabCellWidth } from './metadata/crosstab/defenitions';
import { crossTabDataFieldInfo, crossTabGroupFieldInfo } from './metadata/crosstab/fields';
import { crossTabLayoutOptionsInfo } from './metadata/crosstab/layoutOptions';
import { crossTabStyles, crossTabStylesDefaults } from './metadata/properties/style';
import { ControlParameter } from './properties/controlParameter';
import { StyleModel } from './properties/style';
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { XRCellsurface, XRCrossTabCellViewModel } from './xrCrossTabCell';
export class XRCrossTabViewModel extends XRControlViewModel {
    constructor(model, parent, serializer = new ModelSerializer()) {
        super(model, parent, serializer);
        this.getPath = (propertyName) => this.dsHelperProvider() && this.dsHelperProvider().getDataSourcePath(this['dataSource']());
        this.dependentStyles = [];
        this._cells = ko.observableArray([]);
        this._disposables.push(this.isModelReady = ko.computed(() => { return checkModelReady(this.root) && !this.update(); }));
        this.layoutOptions = new CrossTabLayoutOptionsModel(model['LayoutOptions'] || {}, this, serializer);
        this.rowFields = this._getArray(CrossTabFieldModel, model, 'RowFields', serializer);
        this.columnFields = this._getArray(CrossTabFieldModel, model, 'ColumnFields', serializer);
        this.dataFields = this._getArray(CrossTabDataFieldModel, model, 'DataFields', serializer);
        this._rowDefinitions = this._getArray(CrossTabRowDefinitionsModel, model, 'RowDefinitions', serializer);
        this._columnDefinitions = this._getArray(CrossTabColumnDefinitionsModel, model, 'ColumnDefinitions', serializer);
        this.cells = this._getArray(XRCrossTabCellViewModel, model, 'Cells', serializer);
        this.controlParameters = deserializeArray(model['Parameters'], (item) => { return new ControlParameter(item, serializer, this.root.dataSourceHelper, this.root.dataBindingsProvider); });
        this.controlParameters().forEach(x => !x.parameter() && !x.dataSource() && x.dataSource(this.root['dataSource'] && this.root['dataSource']()));
        this.cellCreator = CellCreator.createInstance(this);
        const cells = this.cellCreator.create();
        this._cells(this.applyCells(cells, true));
        this._disposables.push(...subscribeProperties([this.rowFields, this.columnFields, this.dataFields]
            .concat(Object.keys(this.layoutOptions).map(x => this.layoutOptions[x])), () => {
            this.updateLayout();
        }));
        this._disposables.push(ko.computed(() => {
            this.size.width(this._calcSize(this._columnDefinitions()));
        }));
        this._disposables.push(this.size.width.subscribe(newWidth => {
            const columnDefinitions = this._columnDefinitions.peek();
            const currentWidth = this._calcSize(columnDefinitions);
            columnDefinitions.forEach(element => {
                element.width(element.width() + (newWidth - currentWidth) * (element.width() / currentWidth));
            });
            this._columnDefinitions.valueHasMutated();
        }));
        this._disposables.push(ko.computed(() => {
            this.size.height(this._calcSize(this._rowDefinitions()));
        }));
        this._disposables.push(this.size.height.subscribe(newHeight => {
            const rowDefinitions = this._rowDefinitions.peek();
            const currentHeight = this._calcSize(rowDefinitions);
            rowDefinitions.forEach(element => {
                element.height(element.height() + (newHeight - currentHeight) * (element.height() / currentHeight));
            });
            this._rowDefinitions.valueHasMutated();
        }));
        this._disposables.push(this.dataSource.subscribe((val) => this['dataMember'](null)));
        this._disposables.push(this.controlParameters.subscribe((args) => {
            args.forEach((change) => {
                if (!change.value.parameterName()) {
                    change.value.parameterName(getUniqueNameForNamedObjectsArray(this.controlParameters(), 'controlParameter'));
                }
            });
        }, null, 'arrayChange'));
        const dataMember = ko.pureComputed(() => getFullPath(this.getPath('dataMember'), this['dataMember']()));
        const parameters = ko.computed(() => this.controlParameters());
        const disabled = ko.pureComputed(() => !this.dataSource());
        this.filterString = new FilterStringOptions(this._filterString, dataMember, disabled);
        this.filterString.helper.parameters = parameters;
        this._disposables.push(dataMember);
        this._disposables.push(disabled);
        this._disposables.push(parameters);
    }
    _getCreator(type, serializer, name) {
        return (item) => new type(item || {}, this, serializer, name);
    }
    _getArray(type, model, name, serializer) {
        return deserializeArray(model[name], this._getCreator(type, serializer, this.getNames()[name[0].toLowerCase() + name.slice(1)]));
    }
    _initStyles(root) {
        if (root && root.styles) {
            crossTabStyles.forEach(style => {
                let styleName = this[style.propertyName]();
                if (!styleName) {
                    const newStyle = new StyleModel(crossTabStylesDefaults[style.propertyName], this);
                    styleName = getUniqueNameForNamedObjectsArray(root.styles(), newStyle.name());
                    newStyle.name(styleName);
                    root.styles.push(newStyle);
                    this[style.propertyName](styleName);
                }
            });
        }
    }
    _calcSize(defenition) {
        let result = 0;
        defenition.forEach(element => {
            result += element[(element instanceof CrossTabColumnDefinitionsModel ? 'width' : 'height')]();
        });
        return result;
    }
    removeChild(cell) {
        if (cell.canRemove()) {
            this.removeField(cell.dataLevel, cell.columnLevel, cell.rowLevel);
        }
    }
    removeField(dataLevel, columnLevel, rowLevel) {
        if (dataLevel > -1) {
            this.dataFields.splice(dataLevel, 1);
        }
        else if (columnLevel > -1) {
            this.columnFields.splice(columnLevel, 1);
        }
        else if (rowLevel > -1) {
            this.rowFields.splice(rowLevel, 1);
        }
    }
    initialize() {
        this._disposables.push(this.parentModel.subscribe((model) => { model && this._initStyles(this.root); }));
        this.parentModel() && this._initStyles(this.root);
    }
    updateLayout() {
        if (this.update())
            return;
        let undo = UndoEngine.tryGetUndoEngine(this);
        undo && undo.start();
        this.update(true);
        this.defenitionUpdater = new DefenitionUpdater(this);
        this.cellCreator = CellCreator.createInstance(this);
        const cells = this.cellCreator.create();
        const modelCells = this.applyCells(cells);
        this._cells(modelCells);
        const defs = this.defenitionUpdater.update(modelCells, crossTabCellWidth.defaultVal, crossTabCellHeight.defaultVal);
        const sumWidth = defs.columnDefs.reduce((acc, value) => {
            acc += value.width();
            return acc;
        }, 0);
        const sumHeight = defs.rowDefs.reduce((acc, value) => {
            acc += value.height();
            return acc;
        }, 0);
        const maxWidth = Math.min(sumWidth, Math.max(this.size.width(), this.parentModel().size.width() - this.location.x()));
        this._columnDefinitions(defs.columnDefs);
        this._rowDefinitions(defs.rowDefs);
        this.size.width(maxWidth);
        if (ko.isObservable(this.size.width))
            this.size.width.valueHasMutated();
        this.size.height(sumHeight);
        this.update(false);
        undo = UndoEngine.tryGetUndoEngine(this);
        undo && undo.end();
    }
    getFields() {
        return [].concat(this.rowFields(), this.columnFields(), this.dataFields());
    }
    getNames() {
        return {
            'columnFields': getLocalization('Column Field', 'DevExpress.XtraReports.UI.CrossTab.CrossTabColumnField'),
            'rowFields': getLocalization('Row Field', 'DevExpress.XtraReports.UI.CrossTab.CrossTabRowField'),
            'dataFields': getLocalization('Data Field', 'DevExpress.XtraReports.UI.CrossTab.CrossTabDataField')
        };
    }
    onDelete() {
        const root = this.root;
        this.dependentStyles = [];
        crossTabStyles.forEach(style => {
            if (root.stylesHelper()) {
                const targetStyle = root.stylesHelper().removeUnusedStyle(this[style.propertyName]());
                targetStyle && this.dependentStyles.push(targetStyle);
            }
            else {
                const targetStyle = root.findStyle(this[style.propertyName]());
                targetStyle && root.styles.remove(targetStyle) && this.dependentStyles.push(targetStyle);
            }
        });
    }
    preInitProperties() {
        const info = this.getInfo();
        this.getInfo = () => {
            info.forEach(item => {
                let type;
                if (item.propertyName === 'rowFields' || item.propertyName === 'columnFields')
                    type = CrossTabFieldModel;
                else if (item.propertyName === 'dataFields')
                    type = CrossTabDataFieldModel;
                else if (item.propertyName === 'controlParameters')
                    item.addHandler = () => new ControlParameter({}, new ModelSerializer(), this.root.dataSourceHelper, this.root.dataBindingsProvider);
                if (type)
                    item.addHandler = this._getCreator(type, new ModelSerializer(), this.getNames()[item.propertyName]);
            });
            return info;
        };
    }
    isPropertyDisabled(propertyName) {
        if (this.dataSource() === null) {
            return propertyName === 'dataMember' || propertyName === 'filterString';
        }
    }
    applyCells(cellsInfo, initOnly = false) {
        const newCells = [];
        const oldCells = [];
        cellsInfo.forEach((cell, index) => {
            let currentCell;
            cell.dependentFields = [this.dataFields()[cell.dataLevel], this.rowFields()[cell.rowLevel], this.columnFields()[cell.columnLevel]];
            if (initOnly)
                currentCell = findcells(this.cells(), cell._columnIndex(), cell._rowIndex())[0];
            else
                currentCell = this.cells().filter(x => {
                    if (x.kind() != cell.kind())
                        return false;
                    for (let i = 0; i < x.dependentFields.length; i++) {
                        if (x.dependentFields[i] != cell.dependentFields[i])
                            return false;
                    }
                    return true;
                })[0];
            if (!currentCell) {
                currentCell = controlsFactory().createControl(controlsFactory().controlsMap['XRCrossTabCell'].defaultVal, this);
                newCells.push(currentCell);
            }
            else {
                currentCell.reset();
                oldCells.push(currentCell);
            }
            this.applyCell(cell, currentCell);
        });
        for (let i = this.cells().length - 1; i >= 0; i--) {
            if (oldCells.indexOf(this.cells()[i]) == -1) {
                this.cells()[i].dispose();
                this.cells.splice(i, 1);
            }
        }
        newCells.forEach(x => this.cells.push(x));
        return oldCells.concat(newCells);
    }
    applyCell(from, to) {
        const info = from.getInfo();
        info.forEach(item => {
            to[item.propertyName](from[item.propertyName]());
        });
        ['dataLevel', 'rowLevel', 'columnLevel'].forEach(key => {
            if (from[key] != null)
                to[key] = from[key];
        });
        if (from.field)
            to.field(from.field());
        else if (to.field && to.field())
            to.field(null);
        to.kind(from.kind());
        to.dependentFields = from.dependentFields;
    }
    insertNewField(collectionName, insertPosition, fieldName, dataFieldLayout) {
        const newField = this.getInfo().filter(x => x.propertyName === collectionName)[0].addHandler();
        dataFieldLayout && this.layoutOptions.dataFieldLayout(DataFieldLayout[dataFieldLayout]);
        this[collectionName].splice(insertPosition, 0, newField);
        newField && newField.setFieldName(fieldName);
    }
    customizeExpressionCategories(tools, categories) {
        const fieldsCategory = categories.filter(item => item.content.name == 'dx-expressioneditor-fields')[0];
        fieldsCategory && categories.splice(categories.indexOf(fieldsCategory), 1);
    }
}
export class CrossTabLayoutOptionsModel extends SerializableModel {
    constructor(model, parent, serializer) {
        super(model, serializer);
        this.parent = parent;
    }
    isPropertyDisabled(name) {
        switch (name) {
            case 'cornerHeaderDisplayMode':
                return this.parent.rowFields().length == 0 && this.parent.columnFields().length == 0;
            case 'dataFieldLayout':
                return this.parent.dataFields().length < 2;
            case 'columnTotalsPosition':
                return this.parent.columnFields().length < 1;
            case 'rowTotalsPosition':
                return this.parent.rowFields().length == 0 || this.hierarchicalRowLayout();
            case 'columnTotalHeaderPosition':
                return this.parent.columnFields().length < 2;
            case 'rowTotalHeaderPosition':
                return this.parent.rowFields().length < 2;
            case 'hierarchicalRowLayout':
                return this.parent.rowFields().length < 2 || this.rowTotalsPosition() === TotalsPosition[TotalsPosition.BeforeData];
        }
    }
    getInfo() { return crossTabLayoutOptionsInfo; }
}
export class CrossTabFieldModel extends SerializableModel {
    constructor(model, parent, serializer, name) {
        super(model, serializer);
        this.getPath = (propertyName) => getFullPath(this.parent.getPath('dataMember'), this.parent['dataMember']());
        this.isPropertyDisabled = (propertyName) => propertyName == 'fieldName' && this.parent.dataSource() == null;
        this.parent = parent;
        this._disposables.push(this.name = ko.pureComputed(() => {
            if (this.fieldName())
                return name + ' (' + this.fieldName() + ')';
            return name;
        }));
        if (this.crossTabSortBySummaryInfo)
            this.crossTabSortBySummaryInfo.getPath = (propertyName) => this.getPath(propertyName);
    }
    setFieldName(fullPath) {
        const parts = fullPath.split('.');
        const dsHelper = this.parent.dsHelperProvider && this.parent.dsHelperProvider();
        if (dsHelper && parts.length >= 2) {
            let dataSource;
            if (this.parent.getPath('') === parts[0])
                dataSource = this.parent['dataSource']();
            else {
                dataSource = dsHelper && (dsHelper.findDataSourceInfoByID(parts[0])
                    || dsHelper.findDataSourceInfoByRef(parts[0]));
                dataSource && this.parent['dataSource'](dataSource.data);
            }
            dataSource && this.parent['dataMember'](parts.slice(1, -1).join('.'));
        }
        this.fieldName(parts.pop());
    }
    getInfo() { return crossTabGroupFieldInfo; }
}
export class CrossTabDataFieldModel extends CrossTabFieldModel {
    getInfo() { return crossTabDataFieldInfo; }
}
export class XRCrossTabSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this.controls = ko.observableArray();
        this._disposables.push(createObservableArrayMapCollection(control.cells, this.controls, (item) => new XRCellsurface(item, context)));
        this.selectiontemplate = 'dxrd-crosstab';
    }
    selectLine(selection, cell, isMultiSelect, isRow) {
        if (!isMultiSelect)
            selection.initialize(this);
        const model = this.getControlModel();
        const surface = cell.surface;
        let cells;
        if (isRow)
            cells = findcells(model.cells(), null, cell._rowIndex());
        else
            cells = findcells(model.cells(), cell._columnIndex());
        cells.forEach(cell => {
            if (isMultiSelect) {
                selection.selectionWithCtrl(cell.surface);
                selection.applySelection();
            }
            else
                selection.selecting({ control: cell.surface, cancel: false });
        });
        if (!isMultiSelect)
            selection.swapFocusedItem(surface);
    }
}
