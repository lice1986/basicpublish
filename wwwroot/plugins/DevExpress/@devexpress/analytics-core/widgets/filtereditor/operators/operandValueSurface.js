﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\operandValueSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import DataSource from 'devextreme/data/data_source';
import dxScrollView from 'devextreme/ui/scroll_view';
import * as ko from 'knockout';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { formatDate } from '../../../property-grid/localization/_localization';
import { PathRequest } from '../../common/pathRequest';
import { UnaryOperatorType } from '../../criteria/operators/options/unary';
import { ValueEditorHelper } from '../../internal/_valueEditorHelper';
import { isNullOrEmptyString } from '../../_utils';
import { OperandPropertySurface } from './operandPropertySurface';
import { OperandSurfaceBase } from './operandSurfaceBase';
import { UnaryOperandSurface } from './unaryOperandSurface';
export class OperandValueSurface extends OperandSurfaceBase {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this._value = ko.observable(null);
        this._scroll = null;
        this._updateDate = function (specifics) {
            if (specifics === 'date') {
                if (!(this._value() instanceof Date)) {
                    this._value(new Date(new Date().setHours(0, 0, 0, 0)));
                }
            }
            else {
                this._value('');
            }
        };
        this.changeValue = () => {
            const parent = this.getRealParent(this.parent);
            const property = this.getRealProperty(this);
            const propertyLocation = this.getPropertyName(parent, property);
            const model = parent.model.changeValue(this.model, this.reverse, propertyLocation);
            if (propertyLocation.index !== null) {
                parent[propertyLocation.name]()[propertyLocation.index].dispose();
                parent[propertyLocation.name].splice(propertyLocation.index, 1, parent.createChildSurface(model));
            }
            else {
                parent[propertyLocation.name]().dispose();
                parent[propertyLocation.name](parent.createChildSurface(model));
            }
        };
        this.dataType = ko.observable('');
        this.values = ko.observable([]);
        this.isEditable = ko.observable(false);
        this.templateName = 'dx-filtereditor-value';
        this._getBaseOptions = (element) => {
            return {
                value: this._value,
                onFocusOut: () => this.isEditable(false),
                onFocusIn: () => this.scrollTo(element)
            };
        };
        this.getNumberEditorOptions = (element) => {
            return ValueEditorHelper.getNumberEditorOptions(this.dataType(), this.specifics(), this._getBaseOptions(element));
        };
        this.getStringEditorOptions = (element) => {
            return this._getBaseOptions(element);
        };
        this.getBoolEditorOptions = (element, $root) => {
            return Object.assign({ dataSource: [
                    { val: 'True', text: 'Yes', localizationId: 'AnalyticsCoreStringId.ParametersPanel_True' },
                    { val: 'False', text: 'No', localizationId: 'AnalyticsCoreStringId.ParametersPanel_False' }
                ], valueExpr: 'val', displayExpr: 'text', dropDownOptions: { container: $root.getPopupContainer(element) } }, this._getBaseOptions(element));
        };
        this.getDateEditorOptions = (element, $root) => {
            return Object.assign({ closeOnValueChange: true, type: 'date', dropDownOptions: { container: $root.getPopupContainer(element) } }, this._getBaseOptions(element));
        };
        this.getListEditOptions = (element, $root) => {
            const isCustomValue = typeof this.items[0] !== 'object';
            return Object.assign({ dataSource: this.dataSource, acceptCustomValue: isCustomValue, valueExpr: !isCustomValue ? 'value' : undefined, displayExpr: !isCustomValue ? 'display' : undefined, useItemTextAsTitle: true, searchEnabled: true, dropDownOptions: { container: $root.getPopupContainer(element) } }, this._getBaseOptions(element));
        };
        let dataSource = null;
        this._disposables.push(this.dataSource = ko.computed(() => {
            dataSource && dataSource.dispose();
            dataSource = new DataSource({
                store: this.values(),
                paginate: this.values().length > 200,
                pageSize: 100
            });
            return dataSource;
        }));
        if (parent instanceof UnaryOperandSurface) {
            this.specifics = parent.parent.specifics;
            this.isUpdated = parent.parent.isUpdated;
            this.dataType = parent.parent.dataType;
            if (parent.model.operatorType === UnaryOperatorType.Minus) {
                this.reverse = true;
            }
        }
        else {
            this.specifics = parent.specifics;
            this.isUpdated = parent.isUpdated;
            this.dataType = parent.dataType;
        }
        if (operator.specifics && ko.isWritableObservable(this.specifics))
            this.specifics(operator.specifics);
        this._disposables.push(this.specifics.subscribe((newVal) => {
            if (!this.isUpdated || !this.isUpdated()) {
                operator.specifics = newVal;
                this._updateDate(newVal);
            }
        }));
        this._value(operator.value);
        this._disposables.push(this._value.subscribe((newVal) => {
            this.model.value = newVal;
            this.helper.onChange();
        }));
        if (isNullOrEmptyString(this._value())) {
            this._updateDate(this.specifics());
        }
        this._disposables.push(this.value = ko.computed({
            read: () => {
                let value = this._value();
                if (value instanceof Date) {
                    value = formatDate(value);
                }
                if (this.items.length > 0) {
                    const result = this.items.filter((item) => { return String(item.value) === String(value); })[0];
                    if (result) {
                        return result.display;
                    }
                }
                if (this.reverse) {
                    value = '-' + value;
                }
                return value !== null && value !== undefined && value !== '' ? value : this.getDefaultValue();
            },
            write: (newVal) => {
                if (newVal > 0 && !this.reverse || newVal < 0 && this.reverse) {
                    this._value(newVal);
                }
                else if (newVal > 0 && this.reverse || newVal < 0 && !this.reverse) {
                    this.reverse = !this.reverse;
                    this._value(newVal < 0 ? ('' + newVal).substring(1) : newVal);
                    this.changeValue();
                }
            }
        }));
        this._disposables.push(ko.computed(() => {
            const itemsProvider = ko.unwrap(fieldListProvider);
            if (itemsProvider && itemsProvider.getValues && this.parent.leftPart instanceof OperandPropertySurface) {
                if (this.parent.leftPart.propertyName()) {
                    itemsProvider.getValues(new PathRequest(ko.unwrap(this.path) + '.' + this.parent.leftPart.propertyName())).done((result) => {
                        this.values(result);
                    });
                }
            }
        }));
        operator.specifics = this.specifics();
    }
    get items() {
        return this.values();
    }
    get displayType() {
        return null;
    }
    isDefaultDisplay() {
        return this.value() === this.getDefaultValue();
    }
    getDefaultValue() {
        return OperandValueSurface._defaultValue ? OperandValueSurface._defaultValue :
            OperandValueSurface._defaultValue = getLocalization('Enter a value', 'StringId.FilterEmptyEnter');
    }
    scrollTo(element) {
        if (!this._scroll) {
            const scrollElement = element.closest('.dx-filtereditor-tree');
            this._scroll = dxScrollView.getInstance(scrollElement);
        }
        this._scroll.scrollToElement(element);
    }
}
