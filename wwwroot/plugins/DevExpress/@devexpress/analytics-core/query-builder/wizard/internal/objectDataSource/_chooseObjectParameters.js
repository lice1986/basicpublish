﻿/**
* DevExpress Analytics (query-builder\wizard\internal\objectDataSource\_chooseObjectParameters.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ExpressionType, getEditorType, IsDataAccessExpression } from '../../../../core/internal/_editorTypeMapper';
import { ObjectProperties } from '../../../../property-grid/propertygrid';
import { unwrapEditor } from '../../../../property-grid/widgets/editor';
import { ModelSerializer } from '../../../../serializer/serializer';
import { serializeDate } from '../../../../serializer/_date.utiles';
import { Disposable } from '../../../../serializer/disposable';
import { extend } from '../../../../serializer/_utils';
import { DataSourceParameter } from '../../../dataSource/dataSourceParameter';
export class ObjectDataSourceParameterProperty extends Disposable {
    constructor(_parameter, _itemsProvider) {
        super();
        this._parameter = _parameter;
        this._itemsProvider = _itemsProvider;
        this.type = ko.observable('');
        this.type(this._parameter.type);
        const typeValue = DataSourceParameter._getTypeValue(this._parameter.resultType);
        this._initGetInfo(typeValue);
        new ModelSerializer().deserialize(this, {});
        this._subscribeProperties();
        this._afterInitialize();
    }
    switchPropertyType() {
        if (this.isExpression()) {
            this.type(this._parameter.resultType);
            this._parameter.value = this.value();
        }
        else {
            this.type(ExpressionType);
            this._parameter.value = this.expression.value();
        }
    }
    isExpression() {
        return IsDataAccessExpression(this.type());
    }
    _generateInfo(info, propertyName = 'value') {
        return extend({}, {
            displayName: this._parameter.displayName,
            propertyName: propertyName,
            modelName: propertyName,
            editorOptions: {}
        }, info);
    }
    _initGetInfo(typeValue) {
        const info = [
            this._generateInfo({
                editor: getEditorType(this._parameter.resultType),
                from: (val) => ko.observable((typeValue.valueConverter || ((val) => val))(val)),
                defaultVal: !this.isExpression() && this._parameter.value || typeValue.defaultValue
            }),
            this._generateInfo({
                editor: { header: 'dx-objectdatasource-expression-popup' },
                from: (val) => {
                    return { value: ko.observable(val), itemsProvider: this._itemsProvider };
                },
                defaultVal: this.isExpression() && this._parameter.value || ''
            }, 'expression')
        ];
        this._disposables.push({ dispose: () => this.getInfo = undefined });
        this.getInfo = () => info;
    }
    _isDateTimeParamerterType() {
        return this._parameter.resultType === 'System.DateTime';
    }
    _patchOriginalParameterValue(value) {
        if (value && this._isDateTimeParamerterType() && value instanceof Date)
            this._parameter.value = serializeDate(value);
        else
            this._parameter.value = value;
    }
    _afterInitialize() {
        if (!this.isExpression()) {
            this._patchOriginalParameterValue(this.value());
        }
    }
    _subscribeProperties() {
        this._disposables.push(this.type.subscribe((newVal) => {
            this._parameter.type = newVal;
        }), this.expression.value.subscribe((newVal) => {
            this.isExpression() && (this._patchOriginalParameterValue(newVal));
        }), this.value.subscribe((newVal) => {
            !this.isExpression() && (this._patchOriginalParameterValue(newVal));
        }));
    }
    isPropertyVisible(propertyName) {
        return this.isExpression() ? propertyName === 'expression' : propertyName === 'value';
    }
}
class ObjectDataSourceParameterEditorAddon {
    constructor(_editor) {
        this._editor = _editor;
        this.imageTemplateName = 'dx-objectdatasource-expression';
    }
    _doWithModel(action) {
        const model = this._editor._get('_model');
        if (model instanceof ObjectDataSourceParameterProperty) {
            return action(model);
        }
    }
    switchEditors() {
        this._doWithModel((model) => model.switchPropertyType());
    }
    isExpression() {
        return this._doWithModel((model) => model.isExpression());
    }
}
class ObjectDataSourceParameterGrid extends ObjectProperties {
    constructor(x) {
        super(ko.observable(x));
        this.createEditorAddOn = (_editor) => {
            const editor = unwrapEditor(_editor);
            const addon = new ObjectDataSourceParameterEditorAddon(editor);
            return {
                data: addon,
                templateName: 'dx-wizard-menu-box-editorswitch'
            };
        };
    }
}
export class ObjectDataSourceParametersModel extends Disposable {
    constructor(parametersMethod, itemsProvider) {
        super();
        this.displayName = parametersMethod.displayName;
        this._grids = parametersMethod.parameters.map(x => {
            const param = new ObjectDataSourceParameterProperty(x, itemsProvider);
            const grid = new ObjectDataSourceParameterGrid(param);
            this._disposables.push(param);
            this._disposables.push(grid);
            return grid;
        });
    }
}
export class ChooseObjectMemberParameters extends Disposable {
    constructor(_itemsProvider) {
        super();
        this._itemsProvider = _itemsProvider;
        this._ctorParametersObject = ko.observable();
        this._dataMemberParametersObject = ko.observable();
        this.hasParameters = () => {
            return this._dataMemberParametersObject() || this._ctorParametersObject();
        };
    }
    _updateParameters(propertyName, method) {
        this[propertyName]() && this[propertyName]().dispose();
        if (method && method.parameters.length > 0)
            this[propertyName](new ObjectDataSourceParametersModel(method, this._itemsProvider));
        else
            this[propertyName](null);
    }
    updateCtorParameters(method) {
        this._updateParameters('_ctorParametersObject', method);
    }
    updateMethodParameters(method) {
        this._updateParameters('_dataMemberParametersObject', method);
    }
}
export class ChooseObjectParameters extends ChooseObjectMemberParameters {
    constructor(selectedCtor, selectedDataMembers, itemsProvider) {
        super(itemsProvider);
        this._disposables.push(selectedCtor.subscribe((ctor) => {
            this.updateCtorParameters(ctor);
        }));
        this._disposables.push(selectedDataMembers.subscribe(a => {
            this.updateMethodParameters(a[0]);
        }));
    }
}