﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\controlParameter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataBindingBase } from '../../dataObjects/dataBinding';
import { controlParameterInfos } from '../metadata/properties/controlParameter';
export class ControlParameter extends DataBindingBase {
    constructor(model, serializer, _dataSourceHelper, _dataBindingsProvider) {
        super(model, serializer);
        this._dataSourceHelper = _dataSourceHelper;
        this._dataBindingsProvider = _dataBindingsProvider;
        this.visible = ko.observable(true);
        this.dataMemberInfo = ko.observable();
        this.fakeBinding = this;
    }
    static createNew() {
        return new ControlParameter({}, null);
    }
    getInfo() {
        return controlParameterInfos;
    }
    isEmpty() {
        return false;
    }
    setDataMemberInfo(dataMemberInfo) {
        this.dataMemberInfo(dataMemberInfo);
    }
    get dataType() {
        var _a;
        return (_a = this.dataMemberInfo()) === null || _a === void 0 ? void 0 : _a.dataType;
    }
    get specifics() {
        var _a;
        if (this.parameter())
            return this.parameter().specifics;
        return (_a = this.dataMemberInfo()) === null || _a === void 0 ? void 0 : _a.specifics;
    }
    get name() {
        return this.parameterName();
    }
    generateValue(undoEngine, dataSourceHelper, dataSources, dataBindingsProvider) {
        const value = super.generateValue(undoEngine, dataSourceHelper, dataSources);
        this.initDataMemberInfo(dataSourceHelper, dataBindingsProvider);
        return value;
    }
    initDataMemberInfo(dataSourceHelper, dataBindingsProvider) {
        dataSourceHelper = dataSourceHelper || this._dataSourceHelper();
        dataBindingsProvider = dataBindingsProvider || this._dataBindingsProvider();
        if (dataSourceHelper && dataBindingsProvider && this.dataSource() && !this.dataMemberInfo()) {
            const dataSourcePath = dataSourceHelper.getDataSourcePath(this.dataSource());
            const dataMemberParts = (this.dataMember() || '').split('.');
            const valueMember = dataMemberParts.pop();
            const dataMember = dataMemberParts.join('.');
            const request = new PathRequest(dataSourcePath + (dataMember ? '.' + dataMember : ''));
            dataBindingsProvider.getItems(request).done(result => {
                this.dataMemberInfo(result.filter(x => x.name === valueMember)[0]);
            });
        }
    }
}
