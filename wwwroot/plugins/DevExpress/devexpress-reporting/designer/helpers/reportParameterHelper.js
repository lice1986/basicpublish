﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\reportParameterHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getUniqueNameForNamedObjectsArray } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { ParameterHelper } from '../../viewer/parameters/parameterHelper';
import { GroupLayoutItem, ParameterLayoutItem } from '../dataObjects/parameters/layoutItems';
export class ReportParameterHelper extends ParameterHelper {
    constructor(container) {
        super();
        this.container = container;
        this._disposables.push(this.allLayoutItems = ko.pureComputed(() => {
            var _a;
            let allItems = [];
            if (this.parameterPanelLayoutItems && ((_a = this.parameterPanelLayoutItems()) === null || _a === void 0 ? void 0 : _a.length))
                allItems = this.getAllLayoutItems(this.parameterPanelLayoutItems());
            return allItems;
        }));
    }
    get parameters() {
        return this.container.parameters;
    }
    get parameterPanelLayoutItems() {
        return this.container.parameterPanelLayoutItems;
    }
    getAllLayoutItems(items) {
        const allChildLayoutItems = [];
        items.forEach((item) => {
            allChildLayoutItems.push(item);
            if (item instanceof GroupLayoutItem) {
                const subLayoutItems = this.getAllLayoutItems(item.parameterPanelLayoutItems());
                if (subLayoutItems && subLayoutItems.length)
                    allChildLayoutItems.push(...subLayoutItems);
            }
        });
        return allChildLayoutItems;
    }
    addParameterPanelLayoutItem(item) {
        if (item instanceof GroupLayoutItem && !item.title()) {
            const newName = getUniqueNameForNamedObjectsArray(this.allLayoutItems().filter(x => x instanceof GroupLayoutItem), 'Group');
            item.title(newName);
        }
    }
    startEditing() {
        this.parameters().forEach(parameter => {
            parameter._isEditing(true);
            parameter._showLayoutProperties(true);
        });
    }
    endEditing() {
        this.parameters().forEach(parameter => {
            parameter._isEditing(false);
            parameter._showLayoutProperties(false);
        });
    }
    updateParameterLayoutItems() {
        this.parameters().forEach(parameter => {
            const parameterLayoutItem = this.getParameterLayoutItem(parameter);
            if (!parameterLayoutItem) {
                const newItem = new ParameterLayoutItem({}, this.container, undefined, parameter);
                this.parameterPanelLayoutItems.push(newItem);
            }
        });
    }
    clearLayoutItems() {
        const toRemove = [];
        this.parameterPanelLayoutItems().forEach(item => {
            if (item instanceof ParameterLayoutItem) {
                const isModify = item.getInfo().some(x => !!x.editor && item.isPropertyModified(x.propertyName));
                if (!isModify) {
                    toRemove.push(item);
                }
            }
        });
        toRemove.forEach(x => this.parameterPanelLayoutItems.remove(x));
    }
    getParameterLayoutItem(parameter) {
        return this.allLayoutItems().filter(x => x['parameter'] && x['parameter']() === parameter)[0];
    }
    removeParameterModel(parameter) {
        for (const parameterLayoutItem of this.allLayoutItems()) {
            if (parameterLayoutItem['parameter'] && parameterLayoutItem['parameter']() === parameter) {
                parameterLayoutItem.delete();
            }
        }
    }
}
