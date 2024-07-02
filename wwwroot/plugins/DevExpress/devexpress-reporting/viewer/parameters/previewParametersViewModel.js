﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParametersViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { PropertyGridKeyboardHelper, sendRequest } from '@devexpress/analytics-core/analytics-internal-native';
import { getLocalization, TabInfoWithPropertyGrid } from '@devexpress/analytics-core/analytics-utils-native';
import { HandlerUri } from '../settings';
import { ParameterPanelItemBase } from './parameterPanelItemBase';
import { PreviewParameter } from './previewParameter';
import * as $ from 'jquery';
import { mutable, subscribableProperty, nativeMultiPlatformEngine, BaseEmptyModel } from '@devexpress/analytics-core/analytics-serializer-native';
import { createPreviewParametersViewModel, updateViewModel } from './previewParametersViewModel.viewmodel';
export class PreviewParametersViewModel extends ParameterPanelItemBase {
    constructor(reportPreview, parameterHelper, enableKeyboardSupport) {
        super(parameterHelper);
        this._getParametersStateRequest = (argsObject) => {
            return sendRequest(HandlerUri(), 'getParametersState', JSON.stringify(argsObject), (message, jqXHR, textStatus) => this._reportPreview._processError(getLocalization('Cannot supply filtered lookup values to a report parameter editor', 'ASPxReportsStringId.WebDocumentViewer_GetLookUpValuesError'), jqXHR));
        };
        this._getDoneGetParametersStateHandler = (changedParameter) => {
            const parametersViewModel = this;
            return (response) => {
                try {
                    if (!response || !response.parameters) {
                        return;
                    }
                    response.parameters.forEach((parametersInfoCollection) => {
                        const matchedParameter = parametersViewModel._parameters.filter((p) => { return p.path === parametersInfoCollection.Key; })[0];
                        if (!parametersViewModel._shouldProcessParameter(matchedParameter))
                            return;
                        matchedParameter.visible = parametersInfoCollection.Value.visible;
                        matchedParameter.enabled = parametersInfoCollection.Value.enabled;
                        if (parametersViewModel._parameters.indexOf(changedParameter) < parametersViewModel._parameters.indexOf(matchedParameter) && parametersInfoCollection.Value.lookUpValues != null) {
                            parametersViewModel._setLookUpValues(matchedParameter, parametersInfoCollection.Value.lookUpValues);
                        }
                    });
                }
                finally {
                    parametersViewModel.parametersLoading = false;
                }
            };
        };
        this._getFailGetParametersStateHandler = () => {
            const parametersViewModel = this;
            return (jqXHRError) => {
                parametersViewModel.parametersLoading = false;
            };
        };
        this.restore = () => {
            if (this.parametersLoading) {
                return;
            }
            try {
                this.parametersLoading = true;
                this._parameters.forEach((parameter) => {
                    if (!this._shouldProcessParameter(parameter))
                        return;
                    parameter.lookUpValues = parameter._originalLookUpValues;
                    parameter.initialize(parameter._originalValue, this.parameterHelper);
                });
            }
            finally {
                this.parameterHelper.callbacks && this.parameterHelper.callbacks.parametersReset && this.parameterHelper.callbacks.parametersReset(this, this._parameters);
                this.parametersLoading = false;
            }
        };
        this.processInvisibleParameters = false;
        this.prevParametersStateRequest = $.Deferred();
        this._reportPreview = reportPreview;
        this.validateAndSubmit = (params) => {
            const result = params && params.validationGroup && params.validationGroup.validate && params.validationGroup.validate();
            if (!result || result.isValid)
                this.submit();
        };
        this.submit = () => {
            if (this.parametersLoading)
                return;
            this.parametersLoading = true;
            const promise = reportPreview.startBuild();
            promise && promise.done((val) => { this.parametersLoading = false; });
        };
        this.addDisposable(reportPreview.events.on('originalParametersInfoChanged', (args) => {
            this.initialize(args.newValue);
        }));
        this.initialize(reportPreview.originalParametersInfo);
        this._popupVisible = !this.isEmpty && this._popupVisibleSwitch;
        this.popupInfo = { visible: this._popupVisible, notEmpty: !this.isEmpty };
        const keyboardHelperViewModelAccessor = () => this.tabInfo.getViewModel().propertyGrid.editors;
        const keyboardHelper = enableKeyboardSupport ? new PropertyGridKeyboardHelper(keyboardHelperViewModelAccessor) : undefined;
        this.tabInfo = new TabInfoWithPropertyGrid({
            text: 'Parameters',
            template: 'dxrd-preview-parameters',
            model: this.getViewModel(),
            propertyGridModel: this,
            keyboardHelper,
            localizationId: 'PreviewStringId.RibbonPreview_Parameters_Caption',
            imageClassName: 'parameters',
            imageTemplateName: 'dxrd-svg-tabs-parameters',
            visible: !this.isEmpty,
            engineType: 'native'
        });
        this._disposables.push({
            dispose: () => {
                var _a;
                clearTimeout(this._updateParametersTimeOut);
                (_a = this.prevParametersStateRequest) === null || _a === void 0 ? void 0 : _a.reject();
            }
        });
    }
    createViewModel() {
        return createPreviewParametersViewModel.call(this, super.createViewModel());
    }
    updateViewModel(args) {
        updateViewModel.call(this);
    }
    get _visibleParameters() {
        return this._parameters.filter((p) => { return p.visible; });
    }
    _shouldProcessParameter(param) {
        return this.processInvisibleParameters || (param && (param.visible || param.hasVisibleExpression || param.isFilteredLookUpSettings));
    }
    subscribeParameter(parameter) {
        const needToUpdateParameter = this._needToUpdateParameter || (this._shouldProcessParameter(parameter)) &&
            (parameter.isFilteredLookUpSettings || parameter.hasBindedExpressions);
        this._needToUpdateParameter = needToUpdateParameter;
        if (this._shouldProcessParameter(parameter)) {
            this.addDisposable(parameter.events.on(`${parameter.isMultiValueWithLookUp ? '_value' : 'value'}Changed`, (newValue) => {
                if (this._needToUpdateParameter) {
                    this.updateParameters(parameter);
                }
            }));
        }
    }
    _setLookUpValues(parameter, lookUpValues) {
        if (!lookUpValues) {
            parameter.lookUpValues = [];
            return;
        }
        parameter.lookUpValues = this.parameterHelper.mapLookUpValues(parameter.type, lookUpValues);
        const _parameterValuesContainedInLookUps = this._getParameterValuesContainedInLookups(lookUpValues, parameter);
        if (parameter.isMultiValue) {
            parameter.initialize(_parameterValuesContainedInLookUps.length > 0 ? _parameterValuesContainedInLookUps : [], this.parameterHelper);
        }
        else {
            parameter.initialize(_parameterValuesContainedInLookUps[0] && _parameterValuesContainedInLookUps[0].Value || (lookUpValues.length > 0 ? lookUpValues[0].Value : null), this.parameterHelper);
        }
    }
    _getParameterValuesContainedInLookups(parameterLookUpValues, parameter) {
        if (parameterLookUpValues) {
            if (parameter.isMultiValue) {
                const selectedItems = parameter.value.value;
                return selectedItems.filter((item) => this._filterParameterValuesContainsInLookups(parameterLookUpValues, parameter.type, item).length > 0);
            }
            else {
                return this._filterParameterValuesContainsInLookups(parameterLookUpValues, parameter.type, parameter.value);
            }
        }
        return [];
    }
    _filterParameterValuesContainsInLookups(parameterLookUpValues, parameterType, value) {
        return parameterLookUpValues.filter((x) => PreviewParameter._compareValues(this.parameterHelper.getValueConverter(parameterType)(x.Value), value));
    }
    _setParameterValue(parameter, value) {
        const descriptor = parameter.getParameterDescriptor();
        if (descriptor.multiValue) {
            if (value && !Array.isArray(value))
                throw new Error(`The '${parameter.path}' parameter must be an array.`);
            if (descriptor.hasLookUpValues) {
                parameter.value.value = value;
            }
            else {
                const parameterValues = this.parameterHelper.createMultiValueArray(value, parameter);
                parameter.value = parameterValues;
            }
        }
        else {
            parameter.validateAndAssignValue(value);
        }
    }
    setParameterValue(parameterName, value) {
        const parameter = this._parameters.filter(x => x.path === parameterName)[0];
        if (!parameter)
            throw new Error(`The '${parameterName}' parameter is not found.`);
        this._setParameterValue(parameter, value);
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'isEmpty') {
            this.tabInfo.visible = !this.isEmpty;
            if (this.popupInfo)
                this.popupInfo.notEmpty = !this.isEmpty;
        }
        if (args.propertyName === '_popupVisible') {
            this._popupVisibleSwitch = this._popupVisible;
            if (this.popupInfo)
                this.popupInfo.visible = this._popupVisible;
        }
        if (args.propertyName == '_popupVisibleSwitch' || args.propertyName === 'isEmpty') {
            this._popupVisible = !this.isEmpty && this._popupVisibleSwitch;
        }
        if (args.propertyName == '_getInfo') {
            this.tabInfo && this.tabInfo.propertyGrid.updateEditorsInfo(this, this.getInfo());
        }
    }
    initialize(originalParametersInfo) {
        originalParametersInfo && this.parameterHelper.initialize(originalParametersInfo.knownEnums);
        super.initialize(originalParametersInfo);
        if (!originalParametersInfo)
            return;
        const layout = originalParametersInfo.parameterPanelLayout;
        if ((!layout || layout.layoutItems.length === 0) && originalParametersInfo.parameters) {
            this._parameters.forEach(x => this._add(x, {}));
        }
        this.isEmpty = this._visibleParameters.length === 0;
        const actualParametersInfo = [];
        this._parameters.forEach(x => {
            this.subscribeParameter(x);
            const model = new BaseEmptyModel();
            this.addDisposable(nativeMultiPlatformEngine.createComputedProperty(model, 'value', {
                read: () => {
                    return x.serialize().Value;
                },
                write: (newVal) => {
                    this._setParameterValue(x, newVal);
                }
            }, [
                subscribableProperty(x, '*')
            ]));
            this.addDisposable(nativeMultiPlatformEngine.createComputedProperty(model, 'selectAll', {
                read: () => {
                    const value = x.value;
                    return value === null || value === void 0 ? void 0 : value.isSelectedAll;
                },
                write: (newVal) => {
                    const value = x.value;
                    if (value === null || value === void 0 ? void 0 : value.isSelectedAll) {
                        value.isSelectedAll = newVal;
                    }
                }
            }, [
                subscribableProperty(x, [{
                        propertyName: 'value',
                        subscribables: ['isSelectedAll']
                    }
                ])
            ]));
            model['parameterDescriptor'] = x.getParameterDescriptor(),
                this.addDisposable(nativeMultiPlatformEngine.createComputedProperty(model, 'lookUpValues', {
                    read: () => x.lookUpValues,
                    write: (newVal) => x.lookUpValues = newVal
                }, [subscribableProperty(x, ['lookUpValues'])]));
            actualParametersInfo.push(model);
        });
        if (this.parameterHelper.callbacks && this.parameterHelper.callbacks.parametersInitialized) {
            this.parameterHelper.callbacks.parametersInitialized(this, actualParametersInfo, this.submit, originalParametersInfo.shouldRequestParameters);
        }
        if (this._reportPreview.documentId)
            return;
        if (!originalParametersInfo.shouldRequestParameters || this.isEmpty) {
            this.submit();
        }
        else {
            this._reportPreview.removeEmptyPages();
            this.tabInfo.active = true;
            if (this.tabInfo.visible && this.tabInfo.collapsed !== undefined)
                this.tabInfo.collapsed = false;
            this._popupVisible = true;
            this._reportPreview.pageLoading = false;
        }
    }
    getPathsAfterPath(parameterPath) {
        let startIndex = 0;
        for (let index = 0; index < this._parameters.length; index++) {
            if (this._parameters[index].path === parameterPath) {
                startIndex = index + 1;
                break;
            }
        }
        const paths = this._parameters
            .filter((param, index) => {
            return this._shouldProcessParameter(param) &&
                (param.hasBindedExpressions || param.isFilteredLookUpSettings && index >= startIndex);
        })
            .map((x) => x.path);
        return paths || [];
    }
    serializeParameters() {
        return this._parameters.map(x => x.serialize());
    }
    updateParameters(changedParameter) {
        const requiredParameterPaths = this.getPathsAfterPath(changedParameter.path);
        if (!requiredParameterPaths || requiredParameterPaths.length === 0) {
            return;
        }
        const changedParameterIndex = this._parameters.indexOf(changedParameter);
        const updateTopChangedParameter = (index, changedParameter, requiredParameterPaths) => {
            this._topChangedParameter = { index: index, changedParameter: changedParameter, requiredParameterPaths: requiredParameterPaths };
        };
        if (this._topChangedParameter && changedParameterIndex !== -1) {
            if (this._topChangedParameter.index > changedParameterIndex)
                updateTopChangedParameter(changedParameterIndex, changedParameter, requiredParameterPaths);
            return;
        }
        updateTopChangedParameter(changedParameterIndex, changedParameter, requiredParameterPaths);
        this.prevParametersStateRequest.reject();
        const deferred = $.Deferred();
        this._updateParametersTimeOut = setTimeout(() => {
            this.parametersLoading = true;
            const argsObject = {
                reportId: this._reportPreview.reportId,
                reportUrl: this._reportPreview.reportUrl,
                requiredParameterPaths: this._topChangedParameter.requiredParameterPaths,
                changedParameterPath: this._topChangedParameter.changedParameter.path,
                parameters: this.serializeParameters(),
                timeZoneOffset: 0 - new Date().getTimezoneOffset()
            };
            this._getParametersStateRequest(argsObject)
                .done((result) => deferred.resolve(result))
                .fail(() => deferred.resolve());
            deferred.done(this._getDoneGetParametersStateHandler(this._topChangedParameter.changedParameter));
            deferred.fail(this._getFailGetParametersStateHandler());
            this.prevParametersStateRequest = deferred;
            this._topChangedParameter = null;
        }, 20);
    }
}
__decorate([
    mutable(false)
], PreviewParametersViewModel.prototype, "_needToUpdateParameter", void 0);
__decorate([
    mutable(false)
], PreviewParametersViewModel.prototype, "parametersLoading", void 0);
__decorate([
    mutable(true)
], PreviewParametersViewModel.prototype, "_popupVisible", void 0);
__decorate([
    mutable(true)
], PreviewParametersViewModel.prototype, "_popupVisibleSwitch", void 0);
