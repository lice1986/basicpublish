﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\styleseditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { addDisposeCallback, getUniqueNameForNamedObjectsArray, noDataText, selectPlaceholder } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { getTemplate, ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { styleSerializationInfo } from '../controls/metadata/properties/style';
import { StyleModel } from '../controls/properties/style';
export class StylesEditorHeaderModel {
    constructor(styleName, _report, disabled, popupContainer) {
        this._report = _report;
        this.displayExpr = 'name';
        this.valueExpr = 'name';
        this.displayCustomValue = true;
        this.encodeNoDataText = true;
        this.placeholder = selectPlaceholder();
        this.noDataText = noDataText();
        this.value = ko.pureComputed({
            read: () => {
                return styleName();
            },
            write: (newVal) => {
                if (newVal !== getLocalization(StylesEditorHeaderModel.newItem, StylesEditorHeaderModel.newItemTextId)) {
                    styleName(newVal);
                }
            }
        });
        this.items = ko.pureComputed(() => {
            const result = [new StyleModel({ '@Name': getLocalization(StylesEditorHeaderModel.newItem, StylesEditorHeaderModel.newItemTextId) }, this._report())];
            if (this.styles && this.styles()) {
                result.push.apply(result, this.styles());
            }
            return result;
        });
        this.onValueChanged = (e) => {
            if (e.value === getLocalization(StylesEditorHeaderModel.newItem, StylesEditorHeaderModel.newItemTextId)) {
                const newStyleName = getUniqueNameForNamedObjectsArray(this.styles(), 'xrControlStyle');
                const newStyle = new StyleModel({ '@Name': newStyleName }, this._report());
                this.styles.push(newStyle);
                this.value(newStyleName);
            }
        };
        this.disabled = disabled;
        this.dropDownOptions = { container: popupContainer };
    }
    get styles() {
        var _a;
        return (_a = this._report()) === null || _a === void 0 ? void 0 : _a.styles;
    }
}
StylesEditorHeaderModel.newItem = 'Create New Style';
StylesEditorHeaderModel.newItemTextId = 'ASPxReportsStringId.ReportDesigner_StylesEditor_CreateNew';
ko.bindingHandlers['dxStylesEditor'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        let _subscriptionNewStyle;
        $.fn.constructor(element).children().remove();
        const templateHtml = getTemplate('dx-propertieseditor');
        let $element = $.fn.constructor(element).append(templateHtml);
        const style = ko.pureComputed(() => {
            const value = valueAccessor(), styles = value.styles && value.styles(), filtered = styles && styles.filter((item) => {
                return item.name() === value.styleName();
            });
            if (filtered && filtered.length > 0) {
                const style = filtered[0];
                _subscriptionNewStyle = style.name.subscribe(newName => {
                    value.styleName(newName);
                    _subscriptionNewStyle.dispose();
                });
                return style;
            }
            return null;
        });
        addDisposeCallback(element, () => {
            $element = null;
            _subscriptionNewStyle && _subscriptionNewStyle.dispose();
        });
        ko.applyBindings(bindingContext.createChildContext(new ObjectProperties(style, { editors: styleSerializationInfo }, 1, viewModel.disabled, undefined, viewModel.textToSearch)), $element.children()[0]);
        return { controlsDescendantBindings: true };
    }
};
