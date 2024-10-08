﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\dataBinding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { deserializeArray, Disposable, ModelSerializer, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { dataBindingBaseSerializationInfo, dataBindingSerializationInfo } from './metadata/dataBindingInfo';
import { collectAvailableParameters } from './metadata/_parameterUtils';
export class DataBindingBase extends Disposable {
    constructor(model, serializer) {
        super();
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this._disposables.push(this.displayExpr = ko.pureComputed(() => {
            const parameter = this.parameter();
            return parameter ? parameter.name : this.dataMember();
        }));
    }
    getInfo() {
        return dataBindingBaseSerializationInfo;
    }
    _findDataSourceFromPath(path, dataSources) {
        const dataSourceId = path.split('.')[0];
        const dataSourceInfo = (dataSources || []).filter((dataSource) => { return dataSource.ref === dataSourceId || dataSource.id === dataSourceId; })[0];
        if (dataSourceInfo) {
            return dataSourceInfo.data;
        }
        return null;
    }
    updateParameter(pathRequest, dataSources) {
        const parameterName = pathRequest.fullPath.split('.').pop();
        this.parameter(collectAvailableParameters(this._findDataSourceFromPath(pathRequest.fullPath, dataSources)() || [])
            .filter((item) => { return item.name === parameterName; })[0]);
        this.dataSource(null);
    }
    updateBinding(path, dataSources) {
        if (!!path) {
            const pathRequest = new PathRequest(path);
            if (path.indexOf('Parameters.') === 0) {
                this.updateParameter(pathRequest, dataSources);
            }
            else {
                this.dataMember(pathRequest.path);
                this.dataSource(this._findDataSourceFromPath(path, dataSources));
                this.parameter(null);
            }
        }
        else {
            this.resetValue();
        }
    }
    getValuePath(dataSourceHelper) {
        if (this.parameter()) {
            return 'Parameters.' + this.parameter().name;
        }
        let dataSourceName = '';
        if (this.dataSource()) {
            const ds = dataSourceHelper.findDataSourceInfo(this.dataSource());
            dataSourceName = ds && (ds.id || ds.ref);
        }
        return dataSourceName && this.dataMember() ? (dataSourceName + '.' + this.dataMember()) : '';
    }
    generateValue(undoEngine, dataSourceHelper, dataSources) {
        if (!this.generatedValue) {
            this._disposables.push(this.generatedValue = ko.computed({
                read: () => {
                    return this.getValuePath(dataSourceHelper);
                },
                write: (val) => {
                    undoEngine.start();
                    this.updateBinding(val, dataSources);
                    undoEngine.end();
                }
            }));
        }
        return this.generatedValue;
    }
    resetValue() {
        this.parameter(null);
        this.dataSource(null);
        this.dataMember(null);
    }
    isEmpty() {
        return !(this.dataMember() || this.dataSource() || this.parameter());
    }
}
export class DataBinding extends DataBindingBase {
    constructor(model, serializer) {
        super(model, serializer);
        this.visible = ko.observable(true);
        this.disabled = ko.pureComputed(() => {
            const dataMember = this.dataMember();
            return !(this.parameter() || dataMember);
        });
        this._disposables.push(this.disabled.subscribe((newVal) => {
            newVal && this.formatString('');
        }));
        this._disposables.push(this.disabled);
    }
    static initialize(model, serializer) {
        const currentDataBindings = deserializeArray(model, (item) => { return new DataBinding(item, serializer); });
        (this['allDataBindings'] || []).forEach((value) => {
            if (currentDataBindings().filter((databinding) => { return databinding.propertyName() === value; }).length === 0)
                currentDataBindings.push(new DataBinding({ '@PropertyName': value }, serializer));
        });
        currentDataBindings()['findBinding'] = (bindingName) => {
            return currentDataBindings().filter((binding) => { return binding.propertyName() === bindingName; })[0];
        };
        return currentDataBindings;
    }
    getInfo() {
        return dataBindingSerializationInfo;
    }
    updateParameter(pathRequest, dataSources) {
        super.updateParameter(pathRequest, dataSources);
        this.dataMember(pathRequest.path);
    }
    resetValue() {
        super.resetValue();
        this.formatString('');
    }
}
