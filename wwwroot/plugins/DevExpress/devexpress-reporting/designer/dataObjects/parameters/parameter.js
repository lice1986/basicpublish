﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { formatUnicorn, getLocalization } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates, ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import { RangeSpecific } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { viewerEditorTemplates } from '../../../viewer/widgets/editorTemplates';
import { DefaultLocalizationProvider } from '../../controls/utils/_localizationUtils';
import { createExpressionEditorAction } from '../../internal/_expressionEditorAction';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { ReportExpressionEditorWrapper } from '../../widgets/expressioneditor/reportExpressionEditorWrapper';
import { labelOrientation } from '../metadata/parameters/layoutItems';
import { extendValueSourceSettingsTypes, parameterExpressionSerializationInfo, parameterSerializationInfo, parameterValueSerializationInfo } from '../metadata/parameters/parameter';
import { DynamicListLookUpSettings, StaticListLookUpSettings } from './lookupSettings';
import { createExpressionProperty, ParameterExpressionBinding } from './parameterExpressionBinding';
import { parameterSeparator } from './parameterSettings';
import { ParameterTypesHelper } from './parameterTypesHelper';
import { PropertyExpressionMapper } from './propertyExpressionMapper';
import { RangeParametersSettings } from './rangeSettings';
import { ValueSourceSettingsHelper } from './valueSourceSettingsHelper';
const EditableParameterMode = {
    _ignoreEditors: ['valueSourceSettings', 'valueSourceSettingsType'],
    _displayNamePatcher: {
        'isMultiValue': (info) => {
            info.displayName = 'Allow multiple values';
            info.localizationId = 'ASPxReportsStringId.ReportDesigner_ParametersDialog_AllowMultipleValues';
        },
        'allowNull': (info) => {
            info.displayName = 'Allow null value';
            info.localizationId = 'ASPxReportsStringId.ReportDesigner_ParametersDialog_AllowNull';
        },
        'selectAllValues': (info) => {
            info.displayName = 'Select all values';
            info.localizationId = 'ASPxReportsStringId.ReportDesigner_ParametersDialog_SelectAllValues';
        },
        'valueSourceSettingsType': (info) => info.displayName = 'Value Source'
    }
};
export class Parameter extends Disposable {
    constructor(model, _report, serializer) {
        super();
        this._report = _report;
        this.templateName = 'dx-treelist-item';
        this.labelOrientation = ko.observable('Horizontal');
        this.actionProviders = [];
        this._expressionActions = {};
        this.expressionObj = {};
        this.info = $.extend(true, [], parameterSerializationInfo);
        this.propertyExpressionMapper = new PropertyExpressionMapper();
        this._isEditing = ko.observable(false);
        this._showLayoutProperties = ko.observable(false);
        this.collapsed = ko.observable(false);
        this.valueSourceSettingsType = ko.observable('None');
        this.valueInfo = ko.observable();
        this.multiValueInfo = ko.observable();
        this.parameterTypesHelper = new ParameterTypesHelper();
        this.appendExpressionObjInfo(this.info);
        this.actionProviders.push({ getActions: (name) => this._getExpressionActions(name) });
        this._disposables.push(this._localizationProvider);
        const objectsStorage = _report.objectsStorageHelper;
        const parameterHelper = _report.parameterHelper;
        this._preDeserialize(model);
        this.parameterTypesHelper = new ParameterTypesHelper(_report.knownEnums);
        this._updateTypeValues();
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this.valueSourceSettingsHelper = new ValueSourceSettingsHelper(this);
        this.objectsStorage = objectsStorage;
        this._parameterHelper = parameterHelper;
        this['_name'] = ko.observable(this.parameterName());
        this['change'] = (e, parameters) => {
            if (parameters.filter(x => x.parameterName() === e.value).length === 1) {
                this['_name'](e.value);
            }
            else {
                this.parameterName(this['_name']());
            }
        };
        if (!this._type()) {
            this._type(objectsStorage.getType('System.String'));
        }
        this._processObsoleteProperties();
        this.type = ko.pureComputed({
            read: () => {
                return this._type().content();
            },
            write: (val) => {
                const oldVal = this._type().content();
                if (val !== oldVal) {
                    const editorValue = this.value();
                    if (this.isMultiValue())
                        this.value([]);
                    else
                        this.value(null);
                    this.valueSourceSettingsHelper.updateSettingValues(undefined, null);
                    setTimeout(() => {
                        this._type(objectsStorage.getType(val));
                        if (this.isMultiValue())
                            return;
                        if (val === 'System.DateTime') {
                            this.value(this.defaultValue);
                        }
                        else {
                            this.value(this.parameterTypesHelper.convertSingleValue(editorValue, this.type()));
                        }
                        this.valueSourceSettingsHelper.updateSettingValues(this._type().content(), this.defaultValue);
                    }, 1);
                }
            }
        });
        this.expressionObj = {
            getInfo: () => {
                const info = this.getInfo().filter(x => x.propertyName.indexOf(ParameterExpressionBinding.expressionSuff) != -1);
                info.filter(x => x.propertyName == 'ValueExpressionObj')[0].displayName = 'Value';
                return info;
            }
        };
        this.info.forEach(property => {
            const index = property.propertyName.indexOf(ParameterExpressionBinding.expressionSuff);
            if (index !== -1) {
                this.expressionObj[property.propertyName] = createExpressionProperty(this, property.propertyName.substr(0, index));
            }
        });
        this._initializeValue();
        this._disposables.push(this.isMultiValue.subscribe((newMultiValue) => {
            if (newMultiValue) {
                this.value = ko.observableArray([this._parameterHelper.createMultiValue(this, this.value())]);
            }
            else {
                this.value = ko.observable(this.defaultValue);
                this.selectAllValues(false);
            }
        }));
        this._disposables.push(this.selectAllValues.subscribe((newValue) => {
            if (newValue) {
                this.value = ko.observableArray([]);
            }
            else if (this.isMultiValue()) {
                this.value = ko.observableArray([this._parameterHelper.createMultiValue(this, this.value())]);
            }
            else {
                this.value = ko.observable(this.defaultValue);
            }
            this[parameterExpressionSerializationInfo.propertyName].value('');
        }));
        this._disposables.push(this.valueSourceSettingsType.subscribe((newVal) => {
            if (newVal === 'None') {
                this.selectAllValues(false);
            }
        }));
        this._disposables.push(this._isEditing.subscribe((newVal) => {
            const settigns = this.valueSourceSettings();
            if (settigns instanceof RangeParametersSettings || settigns instanceof StaticListLookUpSettings) {
                settigns._isEditing(newVal);
            }
        }));
        this.valueInfo = ko.pureComputed(() => {
            const result = $.extend(true, {}, parameterValueSerializationInfo, parameterHelper.getParameterInfo(this));
            result.propertyName = 'value';
            if (this.type() === 'System.String' || this.isMultiValue()) {
                result.defaultVal = '';
            }
            return result;
        });
        this.valueSourceSettingsHelper.initializeParameterSettingsType();
        this.valueSourceSettingsHelper.initializeLookupValueSubscribe(_report);
        this.viewmodel = new ObjectProperties(ko.observable(this));
    }
    get _localizationProvider() {
        if (!this.__localizationProvider) {
            this.__localizationProvider = new DefaultLocalizationProvider(this);
        }
        return this.__localizationProvider;
    }
    getLocalizationProperty(propertyName) {
        return this._localizationProvider.getLocalizationProperty(propertyName);
    }
    getLocalizationProperties() {
        return this._localizationProvider.getLocalizationProperties();
    }
    applyLocalization(propertyName, propertyValue) {
        this._localizationProvider.applyLocalization(propertyName, propertyValue);
    }
    _initializeValue() {
        const value = this.value();
        if (this.isMultiValue()) {
            typeof value === 'string'
                ? this.value = ko.observableArray(this._parameterHelper.createMultiValueArray(value.split(parameterSeparator), this, (part) => { return this.parameterTypesHelper.convertSingleValue(part, this.type()); }))
                : this.value = ko.observableArray();
        }
        else if (this.allowNull() && !value) {
            this.value(null);
        }
        else {
            this.value(this.parameterTypesHelper.convertSingleValue(value, this.type()));
        }
    }
    _preDeserialize(model) {
        if (model['@LookUpSettings']) {
            model['@ValueSourceSettings'] = model['@LookUpSettings'];
            delete model['@LookUpSettings'];
        }
    }
    _processObsoleteProperties() {
        if (this._obsoleteValue()) {
            this.value(this._obsoleteValue().content());
            this._obsoleteValue(null);
        }
        delete this._obsoleteValue;
    }
    _getExpressionActions(name) {
        if (Parameter.propertiesWithExpressions.indexOf(name) === -1)
            return;
        const propertyInfo = this.info.filter(x => x.propertyName === name)[0];
        const expression = this[this.propertyExpressionMapper.getExpressionPropertyName(name)];
        const expressionLocalizedName = getLocalization(propertyInfo.displayName, propertyInfo.localizationId);
        const expressionForLocalizedString = getLocalization('{0} Expression', 'ReportStringId.UD_PropertyGrid_Menu_ItemExpression');
        const expressionHint = ko.pureComputed(() => { return expression.value(); });
        this._disposables.push(expressionHint);
        if (!this._expressionActions[name]) {
            const expressionEditor = new ReportExpressionEditorWrapper(ko.observable(this), ko.observable(expression));
            this._disposables.push(expressionEditor);
            this._expressionActions[name] = [createExpressionEditorAction({
                    expressionEditor,
                    hint: expressionHint,
                    title: formatUnicorn(expressionForLocalizedString, expressionLocalizedName)
                })];
        }
        return this._expressionActions[name];
    }
    _updateTypeValues() {
        const types = this.info.filter(info => info.propertyName == 'type')[0];
        const knownEnumValues = this.parameterTypesHelper.getEnumTypeValues();
        if (!!(knownEnumValues === null || knownEnumValues === void 0 ? void 0 : knownEnumValues.length))
            types.valuesArray = types.valuesArray.concat(knownEnumValues);
    }
    preprocessInfo(info) {
        if (this._isEditing()) {
            info.forEach(x => {
                if (EditableParameterMode._ignoreEditors.indexOf(x.propertyName) !== -1) {
                    x.editor = undefined;
                }
                else if (x.editor && x.editor.header === editorTemplates.getEditor('bool').header) {
                    x.editor = designerEditorTemplates.getEditor('parametersCheckbox');
                }
                else if (x.editor && x.editor.custom === viewerEditorTemplates.multiValueEditable.custom) {
                    x.editor = { custom: 'dxrd-multivalue-editing' };
                }
                EditableParameterMode._displayNamePatcher[x.propertyName] && EditableParameterMode._displayNamePatcher[x.propertyName](x);
            });
        }
    }
    getInfo() {
        let info = this.info;
        if (this.type) {
            const newInfo = $.extend(true, [], this.info);
            newInfo.splice(newInfo.indexOf(newInfo.filter((prop) => { return prop.propertyName === 'value'; })[0]), 1, this.valueInfo());
            newInfo.splice(newInfo.indexOf(newInfo.filter((prop) => { return prop.propertyName === 'description'; })[0]) + 1, 0, labelOrientation);
            if (Parameter.availableRangeSettingTypes.indexOf(this.type()) !== -1) {
                const parameterSettingsTypeInfo = newInfo.filter((prop) => { return prop.propertyName === 'valueSourceSettingsType'; })[0];
                if (parameterSettingsTypeInfo)
                    parameterSettingsTypeInfo.valuesArray = extendValueSourceSettingsTypes;
            }
            if (this.valueSourceSettings() && this.valueSourceSettings() instanceof RangeParametersSettings) {
                const typeInfo = newInfo.filter((prop) => { return prop.propertyName === 'type'; })[0];
                if (typeInfo) {
                    typeInfo.valuesArray = ParameterTypesHelper.typeValues.filter(typeValue => Parameter.availableRangeSettingTypes.indexOf(typeValue.value) !== -1);
                }
            }
            info = newInfo;
        }
        this.preprocessInfo(info);
        return info;
    }
    appendExpressionObjInfo(info) {
        for (let i = 0; i < info.length; i++) {
            if (info[i].propertyName == 'value')
                continue;
            const property = info[i];
            if (Parameter.propertiesWithExpressions.indexOf(property.propertyName) != -1) {
                const newProperty = this.propertyExpressionMapper.registerExpressionProperty(property);
                info.splice(i + 1, 0, newProperty);
                i++;
            }
        }
    }
    getActionClassName(propertyName) {
        const expressionPropertyName = this.propertyExpressionMapper.getExpressionPropertyName(propertyName);
        const hasExpressions = !!this[expressionPropertyName].value();
        return {
            'dxrd-editormenu-expressions': hasExpressions,
            'dxd-icon-accented': hasExpressions
        };
    }
    isPropertyVisible(name) {
        if (name === 'valueSourceSettings') {
            return !!this.valueSourceSettings();
        }
        else if (name === parameterValueSerializationInfo.propertyName) {
            return !(this.valueSourceSettings() instanceof RangeParametersSettings);
        }
        else if (name == parameterExpressionSerializationInfo.propertyName) {
            return this._isEditing() || this.isMultiValue();
        }
        else if (name == labelOrientation.propertyName) {
            return this._showLayoutProperties();
        }
        return this.propertyExpressionMapper.isPropertyVisible(name, this._isEditing());
    }
    getParameterDescriptor() {
        return {
            description: this.description.peek(),
            displayName: 'Value',
            localizationId: 'DevExpress.XtraReports.Parameters.Parameter.Value',
            name: this.parameterName.peek(),
            type: this.type.peek(),
            value: this.value.peek(),
            visible: this.visible.peek(),
            enabled: this.enabled.peek(),
            multiValue: this.isMultiValue.peek(),
            allowNull: this.allowNull.peek(),
            selectAllValues: this.selectAllValues.peek(),
            tag: this.tag.peek()
        };
    }
    assign(parameter) {
        this.getInfo().forEach((info) => {
            if (this[info.propertyName] && ko.isWritableObservable(this[info.propertyName]))
                this[info.propertyName](parameter[info.propertyName]());
        });
    }
    getRangeParameters() {
        let result = [];
        if (this.isList) {
            const settings = (this.valueSourceSettings());
            result = [
                settings.startParameter(),
                settings.endParameter()
            ];
        }
        return result;
    }
    get name() {
        return this.parameterName();
    }
    get specifics() {
        return this.isList ? RangeSpecific : this.parameterTypesHelper.getSpecifics(this.type());
    }
    get icon() {
        return this.parameterTypesHelper.getIcon(this.type());
    }
    get defaultValue() {
        return this.parameterTypesHelper.getDefaultValue(this.type());
    }
    get displayName() {
        return this.parameterName();
    }
    get isList() {
        return this.valueSourceSettings() instanceof RangeParametersSettings;
    }
    get dragData() {
        return { noDragable: this.isList };
    }
    isPropertyDisabled(propertyName) {
        if (propertyName === 'allowNull' || propertyName === 'isMultiValue') {
            return this.valueSourceSettings() instanceof RangeParametersSettings;
        }
        if (propertyName === 'selectAllValues') {
            return !(this.isMultiValue() && (this.valueSourceSettings() instanceof StaticListLookUpSettings ||
                this.valueSourceSettings() instanceof DynamicListLookUpSettings));
        }
        if (propertyName === parameterValueSerializationInfo.propertyName || propertyName === parameterExpressionSerializationInfo.propertyName)
            return this.selectAllValues() && !this.isPropertyDisabled('selectAllValues');
        return false;
    }
}
Parameter.propertiesWithExpressions = ['visible', 'enabled', 'value'];
Parameter.ParametersRefString = 'Parameters';
Parameter.defaultGuidValue = ParameterTypesHelper.defaultGuidValue;
Parameter.availableRangeSettingTypes = ['System.DateTime'];