﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrSubreportParameterBinding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { DataBindingBase } from '../dataObjects/dataBinding';
import { parameterBindingSerializationInfo } from './metadata/xrSubreportParameterBinding';
export class ParameterBinding extends DataBindingBase {
    constructor(model, parent, serializer) {
        super(model, serializer);
        this._dataSourceCallback = ko.observable(() => null);
        this._parametersCallback = ko.observable(() => []);
        this._reportDataSource = ko.computed(() => this._dataSourceCallback()());
        this.visible = ko.observable(true);
        this.subreportParameters = ko.computed(() => this._parametersCallback()());
        this._disposables.push(this._reportDataSource);
        this._disposables.push(this.subreportParameters);
        this.fakeBinding = this;
        const _dataSource = ko.observable(this.dataSource());
        this._disposables.push(this.dataSource = ko.pureComputed({
            read: () => {
                return _dataSource() || this._reportDataSource();
            },
            write: (newValue) => {
                _dataSource(newValue);
            }
        }));
        this._disposables.push(this.dataSource.subscribe((newValue) => {
            if (!newValue) {
                this.dataMember(null);
            }
        }));
    }
    static createNew() {
        return new ParameterBinding({}, null);
    }
    dispose() {
        super.dispose();
    }
    getInfo() {
        if (this.subreportParameters && this.subreportParameters().length > 0) {
            const serializationInfo = extend(true, [], parameterBindingSerializationInfo);
            const parameterNameInfo = serializationInfo.filter((info) => { return info.propertyName === 'parameterName'; })[0];
            parameterNameInfo.valuesArray = this.subreportParameters().map((parameter) => { return { value: parameter, displayValue: parameter }; });
            const dataSourceInfo = serializationInfo.filter((info) => { return info.propertyName === 'dataSource'; })[0];
            dataSourceInfo.defaultVal = this._reportDataSource();
            return serializationInfo;
        }
        return parameterBindingSerializationInfo;
    }
    updateParameter(pathRequest, dataSources) {
        super.updateParameter(pathRequest, dataSources);
        this.dataMember(null);
    }
    refresh() {
        if (!this.subreportParameters().some((parameter) => { return parameter === this.parameterName(); })) {
            this.parameterName('');
        }
    }
    initReportDataSource(dataSourceCallback) {
        this._dataSourceCallback(dataSourceCallback);
    }
    initSubreportParameters(parametersCallback) {
        this._parametersCallback(parametersCallback);
    }
}