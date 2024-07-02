﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonParameter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { ModelSerializer } from '../../../serializer/serializer';
import { editorTemplates } from '../../../property-grid/widgets/editorsInfo';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
export var JsonParameterType;
(function (JsonParameterType) {
    JsonParameterType[JsonParameterType["PathParameter"] = 0] = "PathParameter";
    JsonParameterType[JsonParameterType["QueryParameter"] = 1] = "QueryParameter";
    JsonParameterType[JsonParameterType["Header"] = 2] = "Header";
})(JsonParameterType || (JsonParameterType = {}));
export class JsonParameter extends Disposable {
    constructor(model, serializer) {
        super();
        this.expression_Prefix = 'expression:';
        this.namePlaceholder = () => getLocalization('Name', 'AnalyticsCoreStringId.CollectionEditor_Name_Placeholder');
        this.valuePlaceholder = () => getLocalization('Value', 'AnalyticsCoreStringId.CollectionEditor_Value_Placeholder');
        this._editingValue = ko.observable('');
        this._expression = { value: ko.observable('') };
        this.isExpression = ko.observable(false);
        this.itemsProvider = null;
        this._parameterTypes = parameterTypes;
        this.nameValidationRules = undefined;
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this._initEditingProperties();
        this._disposables.push(this.value = ko.computed(() => {
            const expressionValue = (this.expression_Prefix + this._expression.value());
            const editingValue = this._editingValue();
            return this.isExpression.peek() ? expressionValue : editingValue;
        }));
    }
    static from(model, serializer) {
        return new JsonParameter(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    }
    _initEditingProperties() {
        const currentValue = this.value() || '';
        if (currentValue.indexOf(this.expression_Prefix) === 0) {
            this.isExpression(true);
            this._expression.value(currentValue.substring(this.expression_Prefix.length));
        }
        else {
            this._editingValue(currentValue);
        }
    }
    switchEditors() {
        const newIsExpression = !this.isExpression();
        this.isExpression(newIsExpression);
        if (newIsExpression) {
            this._expression.value(this._editingValue() ? "'" + this._editingValue() + "'" : '');
        }
        else {
            this._editingValue('');
        }
    }
    getInfo() {
        return [
            { propertyName: 'name', modelName: '@Name', displayName: 'Name', editor: editorTemplates.getEditor('text') },
            { propertyName: 'value', modelName: '@Value', displayName: 'Value', editor: editorTemplates.getEditor('text') },
            { propertyName: 'itemType', modelName: '@ItemType', defaultVal: JsonParameterType[JsonParameterType.PathParameter], alwaysSerialize: true }
        ];
    }
}
const parameterTypes = [
    { value: JsonParameterType[JsonParameterType.PathParameter], displayValue: 'Path Parameter', localizationId: 'AnalyticsCoreStringId.JsonDSWizard_ChooseJsonSourcePage_PathParameter' },
    { value: JsonParameterType[JsonParameterType.QueryParameter], displayValue: 'Query Parameter', localizationId: 'AnalyticsCoreStringId.JsonDSWizard_ChooseJsonSourcePage_QueryParameter' },
    { value: JsonParameterType[JsonParameterType.Header], displayValue: 'Header', localizationId: 'AnalyticsCoreStringId.JsonDSWizard_ChooseJsonSourcePage_Header' }
];
