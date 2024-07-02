﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportExpressionEditorAdapter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { createExpressionEditorCollectionToolOptions, ExpressionEditorTreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { addVariablesToExpressionEditor } from '../../internal/_addVariablesToExpressionEditor';
export class ReportExpressionEditorAdapter extends Disposable {
    constructor(values, value) {
        super();
        this.values = values;
        this.value = value;
        this.popupVisible = ko.observable(false);
    }
    _onHidingPopup(e) {
        if (this._relatedControlClassName)
            e.component.content().classList.remove(this._relatedControlClassName);
    }
    _onShowingPopup(editableObject) {
        return (e) => {
            if (editableObject && editableObject.expressionObj) {
                const type = editableObject.controlType || 'unknown';
                this._relatedControlClassName = 'dx-expression-popup-related-' + type.toLowerCase().split('.').join('_');
                $.fn.constructor(e.component.content())[0].classList.add(this._relatedControlClassName);
            }
        };
    }
    patchOptions(reportExplorerProvider, editableObject) {
        if (!this.value()) {
            return false;
        }
        else {
            if (!this.value()['customizeCategories']) {
                this.value()['customizeCategories'] = (sender, groups, onClick) => {
                    groups.splice(0, 0, this._createReportItems(reportExplorerProvider, onClick));
                    if (this.values() && this.values().length > 0) {
                        groups.splice(2, 0, this._createValuesTab());
                    }
                    const fillExpressionItems = (items) => {
                        var _a;
                        const shouldAddArguments = this.value().eventName === 'PrintOnPage' || this.value().eventName === 'BeforePrint' && ((_a = this.value()['serializationInfo']) === null || _a === void 0 ? void 0 : _a.modelName) === 'WatermarkId';
                        if (shouldAddArguments) {
                            items.push({ text: 'Arguments.PageIndex', val: '[Arguments.PageIndex]', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Arguments_PageIndex' });
                            items.push({ text: 'Arguments.PageCount', val: '[Arguments.PageCount]', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Arguments_PageCount' });
                        }
                        return items;
                    };
                    addVariablesToExpressionEditor(groups, fillExpressionItems);
                    editableObject.customizeExpressionCategories && editableObject.customizeExpressionCategories(sender, groups);
                };
                this.value().onHiding = this._onHidingPopup;
                this.value().onShowing = this._onShowingPopup(editableObject);
            }
            return true;
        }
    }
    _createReportItems(reportExplorerProvider, onClick) {
        const item = {
            displayName: getLocalization('Report Items', 'ReportStringId.ExpressionEditor_ItemInfo_ReportItems'),
            content: {
                showDescription: false,
                isSelected: ko.observable(false),
                data: {
                    fields: {
                        itemsProvider: reportExplorerProvider,
                        expandRootItems: true,
                        selectedPath: ko.observable(''),
                        templateName: 'dx-ee-treelist-item',
                        treeListController: new ExpressionEditorTreeListController('', (item, element) => { onClick('[' + ['ReportItems', item.text].join('.') + ']'); })
                    }
                },
                name: 'dx-expressioneditor-report-items'
            },
            dispose: () => { }
        };
        return item;
    }
    _createValuesTab() {
        const items = this.values().map(item => {
            const display = item.value || item;
            return {
                text: "'" + display + "'",
                displayName: display
            };
        });
        return createExpressionEditorCollectionToolOptions(items, 'Values', 'ReportStringId.ExpressionEditor_ItemInfo_Values', false);
    }
}
