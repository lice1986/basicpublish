﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\calculatedField.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, getLocalization, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { calculatedFieldSerializationInfo } from './metadata/calculatedField';
export class CalculatedField extends Disposable {
    constructor(model, serializer) {
        super();
        this.templateName = 'dx-treelist-item';
        this.contenttemplate = 'dxrd-calculatedfield-content';
        this.isList = false;
        this.isCalculated = true;
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
    }
    getInfo() {
        return calculatedFieldSerializationInfo;
    }
    get displayName() {
        return this['displayNameObject']() || this.calculatedFieldName();
    }
    get name() {
        return this.calculatedFieldName();
    }
    get specifics() {
        const type = this.fieldType();
        if (['Byte', 'Int16', 'Int32'].indexOf(type) > -1) {
            return 'calcinteger';
        }
        else if (['Float', 'Double', 'Decimal'].indexOf(type) > -1) {
            return 'calcfloat';
        }
        else if (['DateTime', 'TimeSpan'].indexOf(type) > -1) {
            return 'calcdate';
        }
        else if (type === 'Boolean') {
            return 'calcbool';
        }
        return 'calc' + (type === 'None' ? 'default' : type.toLowerCase());
    }
    get type() {
        return this.fieldType();
    }
    lockedInUserDesigner() {
        return false;
    }
    displayType() {
        return getLocalization('Calculated Field', 'DevExpress.XtraReports.UI.CalculatedField');
    }
}
