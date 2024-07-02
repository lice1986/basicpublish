﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_crossTabConverter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { findFirstItemMatchesCondition, formatUnicorn } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization, ModelSerializer, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { CellKind, DataFieldLayout, TotalsPosition } from '../controls/crossTab/enums';
import { appearanceInfo } from '../controls/metadata/pivotgrid/pivotgridfield';
import { XRChartViewModel } from '../controls/xrChart';
import { CrossTabDataFieldModel } from '../controls/xrCrossTab';
import { XRCrossTabCellViewModel } from '../controls/xrCrossTabCell';
import { XRPivotGridViewModel } from '../controls/xrPivotgrid';
import { StylesHelper, stylesProperties } from '../helpers/_styleHelper';
import { ControlConverterService } from '../services/_controlConverterService';
import { controlsFactory } from '../utils/settings';
import { BaseConverter } from './_baseConverter';
export class CrossTabConverter extends BaseConverter {
    constructor(_selectionProvider, _context) {
        super();
        this._selectionProvider = _selectionProvider;
        this._context = _context;
        this._detailLink = 'https://docs.devexpress.com/XtraReports/DevExpress.XtraReports.UI.XRPivotGrid#convert-to-the-cross-tab-control';
        this.popupOptions.height = 316;
        this.popupOptions.confirmMessage = getLocalization('The Cross Tab control does not support specific Pivot Grid functionality. Do you want to continue?', 'ASPxReportsStringId.ReportDesigner_ConvertPivotGridToCrossTab_Message_Confirmation');
        this.popupOptions.infoMessage = getLocalization("You can use the 'Revert to Original Pivot Grid' action in the Cross Tab properties window to restore the Pivot Grid control.", 'ASPxReportsStringId.ReportDesigner_ConvertPivotGridToCrossTab_Message_Info');
        this.popupOptions.linkText = getLocalization('[More infomation about Cross Tab conversion]', 'ASPxReportsStringId.ReportDesigner_ConvertPivotGridToCrossTab_Message_LinkText');
        this.popupOptions.linkUrl = this._detailLink;
    }
    _applyChanges() {
        this._warnings = [];
        const pivotGrid = this._model;
        this._undoEngine = UndoEngine.tryGetUndoEngine(pivotGrid);
        this._undoEngine && this._undoEngine.start();
        const crossTab = controlsFactory().createControl(controlsFactory().controlsMap['XRCrossTab'].defaultVal, pivotGrid.parentModel());
        pivotGrid.getInfo().forEach(item => {
            if (crossTab[item.propertyName] && ko.isObservable(pivotGrid[item.propertyName]))
                crossTab[item.propertyName](pivotGrid[item.propertyName]());
        });
        crossTab.location.x(pivotGrid.location.x());
        crossTab.location.y(pivotGrid.location.y());
        crossTab.name('CrossTab_' + pivotGrid.name());
        this._convertOptions(pivotGrid, crossTab);
        const convertedFields = this._convertFields(pivotGrid, crossTab);
        this._convertStyles(pivotGrid, crossTab, convertedFields);
        this._applyVisibility(pivotGrid, crossTab);
        this._applyText(pivotGrid, crossTab);
        this._validateChartLinked(pivotGrid);
        if (ko.isObservable(crossTab.size.width))
            crossTab.size.width.valueHasMutated();
        this._saveOriginalLayout(pivotGrid, crossTab);
    }
    _convertStyles(pivotGrid, crossTab, convertedFields) {
        const root = crossTab.root;
        const resultStyleGroups = [];
        crossTab.cells().forEach(cell => {
            const deafultStyle = root.findStyle(cell.styleName());
            let cellStyle = StylesHelper.generateStyle(deafultStyle, crossTab);
            this._applyStyles(pivotGrid, cell, cellStyle);
            pivotGrid.fields().forEach(field => cell.field() == convertedFields[field.name()] && this._applyStyles(field, cell, cellStyle));
            cellStyle = StylesHelper.styleEqualityComparer(deafultStyle, cellStyle) ? deafultStyle : cellStyle;
            let styleAdded = false;
            for (const group of resultStyleGroups) {
                if (group.style == cellStyle) {
                    group.cells.push(cell);
                    styleAdded = true;
                    break;
                }
            }
            !styleAdded && resultStyleGroups.push({ style: cellStyle, cells: [cell] });
        });
        crossTab.onDelete();
        if (resultStyleGroups.length === 1) {
            this._prepareGeneralStyle(resultStyleGroups, crossTab, root);
            return;
        }
        if (resultStyleGroups.length === 3)
            if (this._prepareStandardStyles(resultStyleGroups, crossTab, root))
                return;
        this._prepareNoStyles(resultStyleGroups, crossTab);
    }
    _prepareNoStyles(resultStyleGroups, crossTab) {
        resultStyleGroups.forEach(group => group.cells.forEach(x => stylesProperties.forEach(element => {
            const value = group.style[element] && group.style.isPropertyModified(element) && group.style[element]();
            if (value) {
                x[element](group.style[element]());
            }
        })));
        crossTab['generalStyleName']('');
        crossTab['headerAreaStyleName']('');
        crossTab['dataAreaStyleName']('');
        crossTab['totalAreaStyleName']('');
    }
    _prepareGeneralStyle(resultStyleGroups, crossTab, root) {
        const generalStyle = resultStyleGroups[0].style;
        generalStyle.name(crossTab['generalStyleName']());
        root.styles.push(generalStyle);
        crossTab['headerAreaStyleName']('');
        crossTab['dataAreaStyleName']('');
        crossTab['totalAreaStyleName']('');
    }
    _prepareStandardStyles(resultStyleGroups, crossTab, root) {
        const headerStyle = findFirstItemMatchesCondition(resultStyleGroups, (item) => item.cells.every(x => XRCrossTabCellViewModel.cellKinds.Header.indexOf(x.kind()) !== -1)).style;
        headerStyle.name(crossTab['headerAreaStyleName']());
        if (!headerStyle)
            return false;
        const dataStyle = findFirstItemMatchesCondition(resultStyleGroups, (item) => item.cells.every(x => XRCrossTabCellViewModel.cellKinds.Data.indexOf(x.kind()) !== -1)).style;
        dataStyle.name(crossTab['dataAreaStyleName']());
        if (!dataStyle)
            return false;
        const totalStyle = findFirstItemMatchesCondition(resultStyleGroups, (item) => item.cells.every(x => XRCrossTabCellViewModel.cellKinds.Total.indexOf(x.kind()) !== -1)).style;
        if (!totalStyle)
            return false;
        totalStyle.name(crossTab['totalAreaStyleName']());
        crossTab['generalStyleName']('');
        root.styles.push(headerStyle, dataStyle, totalStyle);
        return true;
    }
    _applyStyles(source, cell, cellStyle) {
        XRCrossTabCellViewModel.cellKinds.Header.indexOf(cell.kind()) == -1 && this._applyStyle(source.appearances.cellAppearance, cell);
        if (cell.kind() == CellKind.Corner || cell.kind() == CellKind.DataHeader) {
            this._applyStyle(source.appearances.fieldHeaderAppearance, cellStyle);
        }
        if (cell.kind() === CellKind.Data) {
            this._applyStyle(source.appearances.cellAppearance, cellStyle);
        }
        else if (cell.isBindable()) {
            this._applyStyle(source.appearances.fieldValueAppearance, cellStyle);
        }
        if (cell.kind() == CellKind.RowTotalHeader || cell.kind() == CellKind.ColumnTotalHeader) {
            this._applyStyle(source.appearances.fieldValueTotalAppearance, cellStyle);
            if (cell.rowLevel === undefined && cell.columnLevel == undefined) {
                this._applyStyle(source.appearances.fieldValueGrandTotalAppearance, cellStyle);
            }
        }
        if (cell.kind() == CellKind.GrandTotal && (cell.rowLevel === undefined || cell.columnLevel == undefined) ||
            cell.kind() == CellKind.RowTotal && cell.rowLevel == undefined || cell.kind() == CellKind.ColumnTotal && cell.columnLevel == undefined) {
            this._applyStyle(source.appearances.grandTotalCellAppearance, cellStyle);
        }
        else if (cell.kind() == CellKind.RowTotal || cell.kind() == CellKind.ColumnTotal) {
            this._applyStyle(source.appearances.totalCellAppearance, cellStyle);
        }
    }
    _applyStyle(style, target) {
        appearanceInfo.forEach(element => {
            const propertyName = element.propertyName;
            if (propertyName == 'textOptions') {
                let result = '';
                const vertical = style.textOptions.textVerticalAlignment();
                if (vertical == 'Center')
                    result += 'Middle';
                else if (vertical != 'Default')
                    result += vertical;
                const horizontal = style.textOptions.textHorizontalAlignment();
                if (horizontal == 'Near')
                    result += 'Left';
                if (horizontal == 'Far')
                    result += 'Right';
                if (horizontal == 'Center')
                    result = 'Center';
                result && target['textAlignment'](result);
            }
            else {
                const value = style[propertyName] && style[propertyName]() && style[propertyName]();
                if (value) {
                    target[propertyName](value);
                }
            }
        });
    }
    _convertOptions(pivotGrid, crossTab) {
        crossTab.layoutOptions.columnTotalsPosition(pivotGrid['optionsView'].columnTotalsLocation() === 'Far' ?
            TotalsPosition[TotalsPosition.AfterData] : TotalsPosition[TotalsPosition.BeforeData]);
        crossTab.layoutOptions.rowTotalsPosition(pivotGrid['optionsView'].rowTotalsLocation() === 'Far' ?
            TotalsPosition[TotalsPosition.AfterData] : TotalsPosition[TotalsPosition.BeforeData]);
        crossTab['printOptions'].printTotalsForSingleValues(pivotGrid['optionsView'].showTotalsForSingleValues());
        crossTab['printOptions'].repeatColumnHeaders(pivotGrid['optionsPrint'].printColumnAreaOnEveryPage());
        crossTab['printOptions'].repeatRowHeaders(pivotGrid['optionsPrint'].printRowAreaOnEveryPage());
        crossTab.layoutOptions.dataFieldLayout(pivotGrid['optionsDataField'].area() === 'RowArea'
            ? DataFieldLayout[DataFieldLayout.InColumn] : DataFieldLayout[DataFieldLayout.InRow]);
    }
    _convertFields(pivotGrid, crossTab) {
        const convertedFields = {};
        const addField = (type, pivotField) => {
            const field = crossTab.getInfo().filter(info => info.propertyName === type)[0].addHandler();
            this._copyPropertiesToField(field, pivotField);
            crossTab[type].push(field);
            const dependentCell = crossTab.cells().filter(cell => cell.field() == field)[0];
            dependentCell.size.width(pivotField['width']());
            convertedFields[pivotField.name()] = field;
        };
        pivotGrid.fields().forEach(x => {
            if (x['unboundExpression']()) {
                this._warnings.push(formatUnicorn('Cannot convert Field {0} - unbound expression is not supported', x.name()));
            }
            else {
                if (x.area() == 'ColumnArea')
                    addField('columnFields', x);
                else if (x.area() == 'RowArea')
                    addField('rowFields', x);
                else if (x.area() == 'DataArea')
                    addField('dataFields', x);
                else
                    this._warnings.push(formatUnicorn('Cannot convert Field {0} - area is not supported', x.name()));
            }
        });
        return convertedFields;
    }
    _copyPropertiesToField(crossTabField, pivotField) {
        crossTabField.fieldName(pivotField.fieldName());
        if (crossTabField instanceof CrossTabDataFieldModel) {
            if (pivotField.summaryType() != 'Custom') {
                crossTabField['summaryType'](pivotField.summaryType());
                crossTabField['summaryDisplayType'](pivotField.summaryDisplayType());
            }
            else
                this._warnings.push(formatUnicorn('Pivot Field {0} with a Custom Summary Type is not supported.', pivotField.fieldName()));
        }
        else {
            if (pivotField.groupInterval() != 'Custom') {
                crossTabField.crossTabGroupInterval(pivotField.groupInterval());
                crossTabField.crossTabGroupIntervalNumericRange(pivotField.groupIntervalNumericRange());
            }
            else {
                this._warnings.push(formatUnicorn('Pivot Field {0} with a Custom Group Interval is not supported.', pivotField.fieldName()));
            }
            crossTabField.sortOrder(pivotField.sortOrder() === 'Ascending' ? 'Ascending' : 'Descending');
            if (pivotField.sortBySummaryInfo.summaryType() != 'Custom') {
                crossTabField.crossTabSortBySummaryInfo.fieldName(pivotField.sortBySummaryInfo.fieldName());
                crossTabField.crossTabSortBySummaryInfo.summaryType(pivotField.sortBySummaryInfo.summaryType());
            }
            else {
                this._warnings.push(formatUnicorn('Pivot Field {0} with a Custom Summary Type is not supported.', pivotField.fieldName()));
            }
        }
    }
    _saveOriginalLayout(pivotGrid, crossTab) {
        const originalDataSource = pivotGrid.dataSource();
        const originalDataMember = pivotGrid.dataMember();
        pivotGrid.dataSource(null);
        pivotGrid.dataMember(null);
        const layout = new ModelSerializer().serialize(pivotGrid);
        ControlConverterService.getXmlStringFromJson(layout, result => {
            const parentControls = pivotGrid.parentModel()['controls'];
            crossTab.originalPivotGridLayout(result);
            parentControls.splice(parentControls.indexOf(pivotGrid), 1, crossTab);
            this._selectionProvider.focused(crossTab.surface);
            this.popupOptions.visible(false);
            this._warnings.forEach(x => console.warn(x));
            pivotGrid.dataSource(originalDataSource);
            pivotGrid.dataMember(originalDataMember);
            this._undoEngine && this._undoEngine.end();
        }, error => {
            this._undoEngine && this._undoEngine.end();
            this._undoEngine && this._undoEngine.undo();
        });
    }
    _applyVisibility(pivotGrid, crossTab) {
        crossTab.cells().forEach(cell => {
            if ((!pivotGrid['optionsView'].showColumnTotals() && cell.kind() == CellKind.ColumnTotalHeader && cell.columnLevel !== undefined)
                || (!pivotGrid['optionsView'].showColumnGrandTotals() && cell.kind() == CellKind.ColumnTotalHeader && cell.columnLevel === undefined)) {
                cell.columnVisible(false);
            }
            if ((!pivotGrid['optionsView'].showRowTotals() && cell.rowLevel !== undefined && cell.kind() == CellKind.RowTotalHeader)
                || (!pivotGrid['optionsView'].showRowGrandTotals() && cell.rowLevel === undefined && cell.kind() == CellKind.RowTotalHeader)) {
                cell.rowVisible(false);
            }
        });
    }
    _applyText(pivotGrid, crossTab) {
        crossTab.cells().forEach(cell => {
            const cellKind = cell.kind();
            let formatInfo;
            const pivotGridFieldItem = this._findRelatedPivotGridItem(pivotGrid, cell.dataLevel, cell.columnLevel, cell.rowLevel);
            if (cellKind == CellKind.ColumnHeader || cellKind == CellKind.RowHeader) {
                formatInfo = pivotGridFieldItem.valueFormat;
            }
            else if ((cellKind === CellKind.ColumnTotalHeader && cell.columnLevel !== undefined)
                || (cellKind === CellKind.RowTotalHeader && cell.rowLevel !== undefined)) {
                formatInfo = !!pivotGridFieldItem.totalValueFormat.formatString() ? pivotGridFieldItem.totalValueFormat : {
                    formatType: ko.observable('Numeric'),
                    formatString: ko.observable('{0} Total')
                };
            }
            else {
                if (pivotGridFieldItem) {
                    const isTotal = cellKind === CellKind.RowTotal || cellKind === CellKind.ColumnTotal;
                    const isGrandTotal = cellKind === CellKind.GrandTotal;
                    let cellFormat = !pivotGridFieldItem.cellFormat.formatString() ? null : pivotGridFieldItem.cellFormat;
                    const totalCellFormat = !pivotGridFieldItem.totalCellFormat.formatString() ? cellFormat : pivotGridFieldItem.totalCellFormat;
                    if (isGrandTotal)
                        cellFormat = !pivotGridFieldItem.grandTotalCellFormat.formatString() ? totalCellFormat : pivotGridFieldItem.grandTotalCellFormat;
                    if (isTotal)
                        cellFormat = totalCellFormat || cellFormat;
                    if (cellFormat == null || !cellFormat.formatString()) {
                        if (pivotGridFieldItem.summaryDisplayType().indexOf('Percent') === 0) {
                            cellFormat = {
                                formatType: ko.observable('Numeric'),
                                formatString: ko.observable('{0:p}')
                            };
                        }
                        else {
                            if (pivotGridFieldItem.summaryDisplayType().indexOf('Index') === 0)
                                cellFormat = {
                                    formatType: ko.observable('Numeric'),
                                    formatString: ko.observable('{0:f2}')
                                };
                            else if (pivotGridFieldItem.summaryType() !== 'Count' && pivotGridFieldItem.summaryType() !== 'CountDistinct' && pivotGridFieldItem.summaryDisplayType().indexOf('RankIn') === -1) {
                                const fieldType = pivotGridFieldItem.getFieldType();
                                if (['Float', 'Double', 'Decimal'].some(x => x === fieldType) && ((pivotGridFieldItem.groupInterval() !== 'Default' || !!pivotGridFieldItem.unboundExpression()) || pivotGridFieldItem.unboundType() === 'Decimal'))
                                    cellFormat = {
                                        formatType: ko.observable('Numeric'),
                                        formatString: ko.observable('{0:c}')
                                    };
                            }
                        }
                    }
                    formatInfo = cellFormat;
                }
            }
            if (formatInfo && formatInfo.formatType() !== 'None' && formatInfo.formatString()) {
                cell.textFormatString(formatInfo.formatString());
            }
            if (cellKind == CellKind.Corner || cellKind == CellKind.DataHeader) {
                if (pivotGridFieldItem.caption && pivotGridFieldItem.caption())
                    cell.text(pivotGridFieldItem.caption());
            }
        });
    }
    _findRelatedPivotGridItem(pivotGrid, dataLevel, columnLevel, rowLevel) {
        if (dataLevel > -1) {
            return pivotGrid.fields().filter(x => x.area() === 'DataArea')[dataLevel];
        }
        else if (columnLevel > -1) {
            return pivotGrid.fields().filter(x => x.area() === 'ColumnArea')[columnLevel];
        }
        else if (rowLevel > -1) {
            return pivotGrid.fields().filter(x => x.area() === 'RowArea')[rowLevel];
        }
    }
    _validateChartLinked(pivotGrid) {
        const controlsHelper = this._context() && this._context().controlsHelper;
        controlsHelper && controlsHelper.allControls().forEach(control => {
            if (control instanceof XRChartViewModel) {
                if (control.dataSource() == pivotGrid) {
                    this._warnings.push(formatUnicorn('Chart {0} uses PivotGrid as a DataSource, but the CrossTab can not be linked with Chart.', control.name()));
                }
            }
        });
    }
}
export class PivotGridConverter extends BaseConverter {
    constructor(_selectionProvider) {
        super();
        this._selectionProvider = _selectionProvider;
        this.popupOptions.confirmMessage = getLocalization('All changes made to the Cross Tab will be lost. ' +
            'Do you want to continue?', 'ReportStringId.UD_Msg_RevertCrossTabToPivotGrid');
        this.popupOptions.height = 240;
    }
    _applyChanges() {
        const model = this._model;
        if (!model.originalPivotGridLayout())
            return;
        ControlConverterService.getControlModelFromXmlString(model.originalPivotGridLayout(), result => {
            const parentControls = model.parentModel()['controls'];
            const pivotGrid = new XRPivotGridViewModel(result, model.parentModel());
            pivotGrid.location.x(model.location.x());
            pivotGrid.location.y(model.location.y());
            pivotGrid.dataSource(model.dataSource());
            pivotGrid.dataMember(model['dataMember']());
            parentControls.splice(parentControls.indexOf(model), 1, pivotGrid);
            model.onDelete();
            this._selectionProvider.focused(pivotGrid.surface);
            this.popupOptions.visible(false);
        }, error => { });
    }
}