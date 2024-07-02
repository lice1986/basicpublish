﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\rangeSettings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { rangeBoundaryParameterInfos, rangeEditor, rangeSettingsInfos } from '../metadata/parameters/rangeSettings';
import { ObjectItem } from '../objectStorageItem';
import { createExpressionProperty } from './parameterExpressionBinding';
export class RangeParametersSettings extends ObjectItem {
    constructor(model, dsHelperProvider, serializer) {
        super($.extend({ '@ObjectType': 'DevExpress.XtraReports.Parameters.RangeParametersSettings' }, model), dsHelperProvider, serializer);
    }
    _updateInfo(info) {
        if (this._isEditing())
            info.forEach(x => {
                if (x.editor && x.editor === editorTemplates.getEditor('objecteditor'))
                    x.editor = rangeEditor;
            });
    }
    preInitProperties(model, helper, serializer) {
        super.preInitProperties(model, helper, serializer);
        this._isEditing = ko.observable(false);
    }
    getInfo() {
        const info = super.getInfo().concat(rangeSettingsInfos);
        this._updateInfo(info);
        return info;
    }
    initalizeRangeParameter(rangeParameter, parameter, namePostfix = '_Start') {
        rangeParameter.parameterName(parameter.name + namePostfix);
        rangeParameter.value(parameter.defaultValue);
    }
    assingParameterInfo(parameter) {
        [this.startParameter(), this.endParameter()].forEach((rangeParameter) => {
            rangeParameter.valueInfo = parameter.valueInfo;
            rangeParameter.type = parameter.type;
            rangeParameter._specifics(parameter.parameterTypesHelper.getSpecifics(parameter.type()));
            createExpressionProperty(rangeParameter, 'Value');
        });
    }
    initializeParameters(parameter) {
        this.assingParameterInfo(parameter);
        this.initalizeRangeParameter(this.startParameter(), parameter);
        this.initalizeRangeParameter(this.endParameter(), parameter, '_End');
    }
}
export class RangeBoundaryParameter extends ObjectItem {
    constructor(model, dsHelperProvider, serializer) {
        super(model, dsHelperProvider, serializer);
        this._specifics = ko.observable('date');
        this.templateName = 'dx-treelist-item';
    }
    getInfo() {
        if (this.valueInfo) {
            const info = $.extend(true, [], rangeBoundaryParameterInfos);
            const valueInfo = this.type() === 'System.DateTime' ? extend({}, this.valueInfo(), { editorOptions: { type: 'date' } }) : this.valueInfo();
            info.splice(info.indexOf(info.filter((prop) => { return prop.propertyName === 'value'; })[0]), 1, valueInfo);
            return info;
        }
        return rangeBoundaryParameterInfos;
    }
    get name() {
        return this.parameterName();
    }
    get displayName() {
        return this.parameterName();
    }
    get specifics() {
        return this._specifics();
    }
}
export class RangeStartParameter extends RangeBoundaryParameter {
    constructor(model, dsHelperProvider, serializer) {
        super($.extend({ '@ObjectType': 'DevExpress.XtraReports.Parameters.RangeStartParameter' }, model), dsHelperProvider, serializer);
    }
}
export class RangeEndParameter extends RangeBoundaryParameter {
    constructor(model, dsHelperProvider, serializer) {
        super($.extend({ '@ObjectType': 'DevExpress.XtraReports.Parameters.RangeEndParameter' }, model), dsHelperProvider, serializer);
    }
}