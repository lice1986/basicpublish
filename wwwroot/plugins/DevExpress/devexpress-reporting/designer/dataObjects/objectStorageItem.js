﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectStorageItem.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { cutRefs } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import { parameterLookUpSettingsSerializationInfo } from './metadata/parameters/parameter';
export class ObjectItem extends Disposable {
    constructor(model, dsHelperProvider, serializer) {
        super();
        this.dsHelperProvider = dsHelperProvider;
        this.preInitProperties(model, dsHelperProvider, serializer);
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this.afterDeserialization(model, serializer);
    }
    dispose() {
        super.dispose();
        this.dsHelperProvider = null;
    }
    getInfo() {
        return [{ propertyName: 'objectType', modelName: '@ObjectType' }];
    }
    afterDeserialization(model, serializer) {
        cutRefs(model);
    }
    preInitProperties(model, dsHelperProvider, serializer) { }
}
export class ObjectStorageItem extends ObjectItem {
    constructor(model, dsHelperProvider, serializer) {
        super($.extend({ '@ObjectType': 'DevExpress.XtraReports.Serialization.ObjectStorageInfo' }, model), dsHelperProvider, serializer);
    }
    _getInfo() {
        return super.getInfo().concat([{ propertyName: 'content', modelName: '@Content' }, { propertyName: 'type', modelName: '@Type' },
            { propertyName: 'name', modelName: '@Name', defaultVal: '' }]);
    }
    preInitProperties(model) {
        this.getInfo = (model && model['@Base64']) ? () => {
            return this._getInfo().concat({ propertyName: 'base64', modelName: '@Base64' });
        } : () => { return this._getInfo(); };
    }
    isEmpty() {
        return this.type && this.type() === 'System.DateTime'
            && this.content && (this.content() === undefined || this.content() === null);
    }
}
export class ObjectStorageParameter extends SerializableModel {
    constructor(model, serializer) {
        super(model, serializer, [{ propertyName: '_type', modelName: '@Type', link: true }, parameterLookUpSettingsSerializationInfo]);
    }
}