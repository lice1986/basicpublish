﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\action.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, ModelSerializer, deserializeArray } from '@devexpress/analytics-core/analytics-utils';
import { ParameterBinding } from '../xrSubreportParameterBinding';
import * as ko from 'knockout';
import { collectAvailableParameters } from '../../dataObjects/metadata/_parameterUtils';
import { actionSerializationInfo, ActionType, actionKind } from '../metadata/properties/action';
import { reportStorageWebIsRegister } from '../../internal/_settings';
import { sendRequest } from '@devexpress/analytics-core/analytics-internal';
import { HandlerUri } from '../../utils/settings';
import * as $ from 'jquery';
export class ActionTypeBase extends Disposable {
    constructor(control, key, addSubcsription) {
        super();
        this.key = ko.observable('');
        this.getInfo = () => [actionKind];
        this.key(key);
        this.name = ko.observable(ActionType.None);
        this._control = control;
        addSubcsription && this.subscribeToObjectType();
    }
    updateActionType(objectType) {
        if (objectType === ActionType.None) {
            this._control.action(new ActionTypeBase(this._control, this.key(), true));
        }
        else if (objectType === ActionType.NavigateToReport) {
            this._control.action(new NavigateToReportAction(this.key(), {}, this._control, undefined, (report, serializer) => this._control.root.createReportViewModel(report, serializer)));
        }
    }
    subscribeToObjectType() {
        this._disposables.push(this.name.subscribe(newValue => this.updateActionType(newValue)));
    }
    isPropertyVisible(name) {
        return true;
    }
}
export class NavigateToReportAction extends ActionTypeBase {
    constructor(key, model, control, serializer, drillThroughReportViewModel) {
        super(control, key, false);
        this.subreportParameters = ko.observableArray();
        this.getInfo = () => {
            const reportSourceInfo = actionSerializationInfo.find(info => info.propertyName === 'reportSource');
            if (reportSourceInfo) {
                reportSourceInfo.from = (value, serializer) => {
                    return value ? this.drillThroughReportViewModel && this.drillThroughReportViewModel(value, serializer) : null;
                };
                reportSourceInfo.toJsonObject = (value, serializer, refs) => {
                    var _a;
                    (_a = value.parameterHelper) === null || _a === void 0 ? void 0 : _a.clearLayoutItems();
                    return serializer.serialize(value, serializer, refs);
                };
            }
            return actionSerializationInfo;
        };
        this.drillThroughReportViewModel = drillThroughReportViewModel;
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        if (!this.name)
            this.name = ko.observable(ActionType.NavigateToReport);
        else
            this.name(ActionType.NavigateToReport);
        this.subscribeToObjectType();
        if (!this.parameterBindings)
            this.parameterBindings = ko.observableArray([]);
        if (!this.reportSourceUrl)
            this.reportSourceUrl = ko.observable();
        if (model && model.ParameterBindings)
            this.parameterBindings = deserializeArray(model.ParameterBindings, (item) => {
                const binding = new ParameterBinding(item, this, serializer);
                return binding;
            });
        this._disposables.push(this.reportSourceUrl.subscribe((newVal) => {
            this.reportSource && this.reportSource.dispose && this.reportSource.dispose();
            this.updateParameters();
        }));
        this.parameterBindings = deserializeArray(model.ParameterBindings, (item) => {
            const binding = new ParameterBinding(item, this, serializer);
            this._initParameter(binding);
            return binding;
        });
        this.updateParameters();
        this._disposables.push(this.parameterBindings.subscribe((changes) => {
            for (let index = 0; index < changes.length; index++) {
                if (changes[index].status === 'added') {
                    this._initParameter(changes[index].value);
                }
            }
        }, null, 'arrayChange'));
    }
    getParameters(reportSourceUrl) {
        if (reportStorageWebIsRegister()) {
            return sendRequest(HandlerUri(), 'getData', JSON.stringify({
                reportUrl: reportSourceUrl
            }));
        }
        else {
            return $.Deferred().reject().promise();
        }
    }
    _assignParameters(parameters) {
        this.subreportParameters(collectAvailableParameters(parameters).map(x => x.name));
        this.refreshParameterBindings();
    }
    _initParameter(parameter) {
        parameter.initSubreportParameters(() => this.subreportParameters());
    }
    refreshParameterBindings() {
        this.parameterBindings().forEach((x) => x.refresh());
    }
    updateParameters() {
        if (this.reportSourceUrl()) {
            this.getParameters(this.reportSourceUrl()).done(result => {
                var _a;
                const reportJSONModel = JSON.parse(result.reportLayout);
                const parametersModel = deserializeArray((_a = reportJSONModel === null || reportJSONModel === void 0 ? void 0 : reportJSONModel.XtraReportsLayoutSerializer) === null || _a === void 0 ? void 0 : _a.Parameters, (item) => item['@Name']);
                this.subreportParameters(parametersModel());
                this.refreshParameterBindings();
            });
        }
        else if (this.reportSource && this.reportSource.parameters) {
            this._assignParameters(this.reportSource.parameters());
        }
    }
    isPropertyVisible(name) {
        if (this.name() !== ActionType.NavigateToReport && name !== 'name')
            return false;
        return true;
    }
}