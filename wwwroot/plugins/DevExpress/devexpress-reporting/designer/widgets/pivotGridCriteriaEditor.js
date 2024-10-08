﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\pivotGridCriteriaEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { find, getFullPath } from '@devexpress/analytics-core/analytics-internal';
import { PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { Parameter } from '../dataObjects/parameters/parameter';
export class PivotGridCriteriaEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
    }
    _createItemsProvider(fieldListProvider) {
        return {
            getItems: (pathRequest) => {
                const model = this._get('_model', 'peek');
                if (!model || pathRequest.fullPath.indexOf(Parameter.ParametersRefString) === 0)
                    return $.Deferred().resolve().promise();
                const pivot = model['parent'];
                const result = $.Deferred();
                const fullPath = new PathRequest(getFullPath(pivot.getPath(''), pivot.dataMember()));
                ko.unwrap(fieldListProvider).getItems(fullPath).done((dataSourceItems) => {
                    const items = [], fields = pivot.fields();
                    for (let i = 0; i < fields.length; i++) {
                        const field = fields[i];
                        if (field.area() === 'DataArea') {
                            continue;
                        }
                        const dataMemberInfo = dataSourceItems.filter((item) => { return item.name === field.fieldName(); })[0];
                        items.push({
                            displayName: field.getDisplayName(),
                            isList: false,
                            name: field.name(),
                            specifics: dataMemberInfo && dataMemberInfo.specifics.toLowerCase() || 'integer'
                        });
                    }
                    result.resolve(items);
                });
                return result.promise();
            }
        };
    }
    _getFieldName(name, isRealName = false) {
        const model = this._get('_model', 'peek');
        if (!model)
            return $.Deferred().resolve().promise();
        const pivot = model['parent'];
        const field = find(pivot.fields.peek(), f => (isRealName ? (f.getDisplayName() || name) : f.name()) === name);
        const def = $.Deferred();
        if (!field)
            def.reject();
        else
            def.resolve(isRealName ? field.name() : field.getDisplayName());
        return def.promise();
    }
    _createDisplayNameProvider() {
        return {
            getDisplayNameByPath: (path, name) => {
                return this._getFieldName(name);
            },
            getRealName: (path, name) => {
                return this._getFieldName(name, true);
            }
        };
    }
    wrapModel(fieldListProvider) {
        if (!this.itemsProvider) {
            this.itemsProvider = this._createItemsProvider(fieldListProvider);
            this.displayNameProvider = this._createDisplayNameProvider();
        }
        return this;
    }
}
