﻿/**
* DevExpress HTML/JS Reporting (designer\internal\reportExplorer\_reportExplorer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { deleteSelection, getUniqueNameForNamedObjectsArray, ObjectExplorerProvider, ObjectStructureTreeListController } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { BandViewModel } from '../../bands/xrBand';
import { ComponentsModel } from '../../controls/properties/components';
import { FormattingRule } from '../../controls/properties/formattingrules';
import { StyleModel } from '../../controls/properties/style';
import { XRCrossBandControlViewModel } from '../../controls/xrCrossband';
import { ReportViewModel } from '../../controls/xrReport';
import { XRReportElementViewModel } from '../../controls/xrReportelement';
import { XRTableCellViewModel } from '../../controls/xrTableCell';
import { XRTableRowViewModel } from '../../controls/xrTableRow';
import { DataBindingMode } from '../_dataBindingMode';
export class ReportExplorerModel extends Disposable {
    constructor(reportModel, editableObject, clickHandler, dragDropHandler, selection, _dataSourceSettings) {
        super();
        this._dataSourceSettings = _dataSourceSettings;
        this._disposables.push(this.itemsProvider = new ObjectExplorerProvider([
            { model: reportModel, name: 'Report', displayName: getLocalization('Report', 'ASPxReportsStringId.DocumentViewer_RibbonReportGroupText'), className: 'master_report', data: reportModel, hasContextMenu: true },
            { model: ko.pureComputed(() => { return reportModel() && reportModel().styles(); }), name: 'Styles', displayName: getLocalization('Styles', 'DevExpress.XtraReports.UI.XRPivotGrid.Styles'), className: 'styles' },
            { model: ko.pureComputed(() => { return reportModel() && reportModel().formattingRuleSheet(); }), name: 'Formatting Rules', displayName: getLocalization('Formatting Rules', 'DevExpress.XtraReports.UI.XRControl.FormattingRules'), className: 'formattingrules' },
            { model: ko.pureComputed(() => { return reportModel() && reportModel().crossBandControls(); }), name: 'Crossband Controls', displayName: getLocalization('Cross-Band Controls', 'ASPxReportsStringId.ReportDesigner_CrossBandControls'), className: 'xrcrossbandbox', hasContextMenu: true },
            { model: ko.pureComputed(() => { return reportModel() && reportModel().components(); }), name: 'Components', displayName: getLocalization('Data Sources', 'ASPxReportsStringId.ReportDesigner_DataSources'), className: 'components' }
        ], ['bands', 'controls', 'rows', 'cells'], editableObject, (model) => {
            let path = ReportExplorerModel.getPathByMember(model);
            if (!path) {
                if (model === (reportModel() && reportModel().styles())) {
                    path = 'Styles';
                }
                else if (model === (reportModel() && reportModel().formattingRuleSheet())) {
                    path = 'Formatting Rules';
                }
                else if (model === (reportModel() && reportModel().components())) {
                    path = 'Components';
                }
                else if (model instanceof StyleModel) {
                    path = this._getPathNonControl(model, 'Styles', 'styles', editableObject, reportModel);
                }
                else if (model instanceof FormattingRule) {
                    path = this._getPathNonControl(model, 'Formatting Rules', 'formattingRuleSheet', editableObject, reportModel);
                }
                else if (model instanceof ComponentsModel) {
                    path = this._getPathNonControl(model, 'Components', 'components', editableObject, reportModel);
                }
                else if (model === (reportModel() && reportModel().crossBandControls())) {
                    path = 'Crossband Controls';
                }
            }
            return path;
        }));
        const exprPropertyNames = ['bands', 'controls', 'rows', 'cells', 'Report', 'Styles', 'Crossband Controls', 'Components'];
        const bindingPropertyNames = [].concat(exprPropertyNames, 'Formatting Rules');
        this._disposables.push(this.treeListController = new ObjectStructureTreeListController(exprPropertyNames));
        this.treeListController.itemsFilter = (item) => {
            const realPropertyName = item.name.split('.')[0];
            const propertyNames = reportModel() && reportModel()._dataBindingMode() !== DataBindingMode.Bindings ? exprPropertyNames : bindingPropertyNames;
            return propertyNames ? propertyNames.indexOf(realPropertyName) !== -1 || $.isNumeric(realPropertyName) : true;
        };
        this.treeListController.getActions = (item) => {
            if (item.data && item.data.name !== 'Crossband Controls' && item.data.name !== 'Components') {
                if (item.data.name !== 'Styles' && item.data.name !== 'Formatting Rules') {
                    return this._createActionsForOneElement(clickHandler, selection, editableObject, reportModel, item);
                }
                else {
                    return this._createActionsForArray(item, reportModel);
                }
            }
        };
        this.treeListController.dragDropHandler = dragDropHandler;
    }
    static getPathByMember(model) {
        if (model.parentModel && model.parentModel()) {
            if (model instanceof BandViewModel) {
                return ReportExplorerModel.getPathByMember(model.parentModel()) + '.bands.' + model.parentModel().bands().indexOf(model);
            }
            else if (model instanceof XRCrossBandControlViewModel) {
                return 'Crossband Controls.Crossband Controls.' + model.parentModel().crossBandControls().indexOf(model);
            }
            else if (model instanceof XRTableCellViewModel) {
                return ReportExplorerModel.getPathByMember(model.parentModel()) + '.cells.' + model.parentModel().cells().indexOf(model);
            }
            else if (model instanceof XRTableRowViewModel) {
                return ReportExplorerModel.getPathByMember(model.parentModel()) + '.rows.' + model.parentModel().rows().indexOf(model);
            }
            else if (model instanceof XRReportElementViewModel) {
                return ReportExplorerModel.getPathByMember(model.parentModel()) + '.controls.' + model.parentModel().controls().indexOf(model);
            }
        }
        else if (model instanceof ReportViewModel) {
            return 'Report';
        }
        return null;
    }
    _createActionsForOneElement(clickHandler, selection, editableObject, reportModel, item) {
        var _a, _b, _c, _d;
        const element = item.data && item.data.data;
        let isEditDeny = false;
        let isDeleteDeny = element && ((element.getMetaData && element.getMetaData().isDeleteDeny) || false);
        const isLocked = element && ((element.lockedInUserDesigner && element.lockedInUserDesigner()) || false);
        if (element && element instanceof ComponentsModel) {
            isEditDeny = !((_b = (_a = this._dataSourceSettings) === null || _a === void 0 ? void 0 : _a.allowEditDataSource) !== null && _b !== void 0 ? _b : true);
            isDeleteDeny = !((_d = (_c = this._dataSourceSettings) === null || _c === void 0 ? void 0 : _c.allowRemoveDataSource) !== null && _d !== void 0 ? _d : true) || isDeleteDeny || isLocked;
        }
        const actions = [];
        if (!isEditDeny)
            actions.push({
                text: 'Properties',
                displayText: () => getLocalization('Properties', 'AnalyticsCoreStringId.Cmd_Properties'),
                imageClassName: 'dx-image-edit',
                imageTemplateName: 'dxrd-svg-operations-edit',
                clickAction: (treeListItemViewModel) => {
                    clickHandler(treeListItemViewModel.data['data']);
                }
            });
        if (!isDeleteDeny && !isLocked) {
            actions.push({
                text: 'Delete',
                displayText: () => getLocalization('Delete', 'AnalyticsCoreStringId.Cmd_Delete'),
                imageClassName: 'dxrd-image-recycle-bin',
                imageTemplateName: 'dxrd-svg-operations-recycle_bin',
                clickAction: (treeListItemViewModel) => {
                    const selectedObject = treeListItemViewModel === null || treeListItemViewModel === void 0 ? void 0 : treeListItemViewModel.data['data'];
                    if (selectedObject instanceof StyleModel) {
                        reportModel().styles.remove(selectedObject);
                    }
                    else if (selectedObject instanceof FormattingRule) {
                        reportModel().formattingRuleSheet.remove(selectedObject);
                    }
                    else if (selectedObject instanceof ComponentsModel) {
                        const dsHelper = reportModel().dsHelperProvider();
                        const removedDs = dsHelper.findDataSourceInfo(selectedObject.data);
                        removedDs && dsHelper.removeDataSource(removedDs);
                    }
                    else {
                        deleteSelection(selection, selectedObject);
                    }
                }
            });
        }
        return actions;
    }
    _createActionsForArray(item, reportModel) {
        if (item.data.name === 'Styles' || item.data.name === 'Formatting Rules') {
            return [{
                    text: 'Add New ' + (item.data.name === 'Styles' ? 'Style' : 'Formatting Rule'),
                    imageClassName: 'dx-image-add',
                    imageTemplateName: 'dxrd-svg-operations-add',
                    clickAction: () => {
                        const report = reportModel();
                        if (item.data.name === 'Styles') {
                            const newStyleName = getUniqueNameForNamedObjectsArray(report.styles(), 'xrControlStyle');
                            report.styles.push(new StyleModel({ '@Name': newStyleName }, report));
                        }
                        else {
                            report.formattingRuleSheet.push(FormattingRule.createNew(report));
                        }
                    }
                }];
        }
        return [];
    }
    _getPathNonControl(model, rootName, arrayName, editableObject, reportModel) {
        const array = reportModel() && reportModel()[arrayName]();
        const index = array && array.indexOf(model) || 0;
        if (index < 0) {
            editableObject(array[0] || reportModel());
            return array.length > 0 ? [rootName, rootName, 0].join('.') : 'Report';
        }
        return [rootName, rootName, index].join('.');
    }
}
