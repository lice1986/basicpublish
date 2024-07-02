﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_jsonSourceSettings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { Disposable } from '../../../serializer/disposable';
import { parameterTypeToPropertyMap } from './jsonSourceSettings';
import { ObjectProperties } from '../../../property-grid/propertygrid';
import { JsonDataSource } from '../../dataSource/json/jsonDataSource';
import { getLocalizedValidationErrorMessage, JsonStringEditor } from './_jsonDataSourceWidgets';
import { JsonAuthenticationInfo } from '../../dataSource/json/jsonAuthenticationInfo';
import { editorTemplates } from '../../../property-grid/widgets/editorsInfo';
import { getUniqueNameForNamedObjectsArray } from '../../../core/internal/_getNameHelpers';
import { JsonParameter } from '../../dataSource/json/jsonParameter';
import { subscribeProperties, subscribeArray } from './_utils';
import { createPasswordSerializationInfo } from '../../../core/utils/_utils.createPasswordSerializationInfo';
export class JsonDataSourceJsonSourcePageSettingsBase extends Disposable {
    constructor() {
        super();
        this._validationGroup = null;
        this._validationSummary = null;
        this.validationGroup = {
            onInitialized: (args) => this._onValidationGroupInitialized(args),
            onDisposing: (args) => this._onValidationGroupDisposing(args),
            validate: () => this._validate()
        };
        this.validationSummary = {
            onInitialized: (args) => this._onValidationSummaryInitialized(args),
            onDisposing: (args) => this._onValidationSummaryDisposing(args)
        };
        this._disposables.push(this.grid = new ObjectProperties(ko.observable(this)));
    }
    dispose() {
        this._validationSummary && this._validationSummary.dispose();
        this._validationGroup && this._validationGroup.dispose();
        this._validationSummary = null;
        this._validationGroup = null;
        super.dispose();
    }
    _onValidationGroupInitialized(args) {
        this._validationGroup = args.component;
    }
    _onValidationGroupDisposing(args) {
        this._validationGroup = null;
    }
    _onValidationSummaryInitialized(args) {
        this._validationSummary = args.component;
    }
    _onValidationSummaryDisposing(args) {
        this._validationSummary = null;
    }
    _repaintSummary() {
        this._validationSummary && this._validationSummary.repaint();
    }
    _validate() {
        this._validationSummary && this._validationGroup && this._validationGroup.validate();
    }
}
export class JsonDataSourceJsonSourcePageStringSettings extends JsonDataSourceJsonSourcePageSettingsBase {
    constructor() {
        super();
        this._validatorsReady = ko.observable(false);
        this.isValid = ko.pureComputed(() => {
            const isJsonValid = this._isJsonSourceValid(this.stringSource());
            const aceHasErrors = this.aceEditorHasErrors();
            return isJsonValid && !aceHasErrors;
        });
        this.validationGroup = null;
        this.validationSummary = null;
        this.stringSource = ko.observable('');
        this.aceEditorHasErrors = ko.observable(false);
        this.cssClass = { 'dxrd-wizard-json-string-source-grid': true };
        this._disposables.push(this.grid = new ObjectProperties(ko.observable(this)));
    }
    onChange(_onChange) {
        let timeoutId = null;
        const localOnChange = () => {
            _onChange();
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => this._validate(), 1);
        };
        this._disposables.push(this.stringSource.subscribe((newVal) => localOnChange()));
    }
    _isJsonSourceValid(jsonString) {
        if (!jsonString)
            return false;
        let isJsonSourceValid = true;
        try {
            JSON.parse(jsonString);
        }
        catch (ex) {
            isJsonSourceValid = false;
        }
        return isJsonSourceValid;
    }
    isEmpty() {
        return !this.stringSource();
    }
    reset() {
        this.stringSource('');
    }
    setValue(dataSource) {
        this.stringSource(dataSource.source.json());
    }
    getInfo() {
        return [
            {
                propertyName: 'stringSource', defaultVal: '', displayName: 'JSON String', editor: {
                    header: 'dx-jsonwizard-jsonstring-editor', editorType: JsonStringEditor, custom: 'dx-property-json-string-editor'
                }
            }
        ];
    }
    applySettings(jsonDataSource) {
        jsonDataSource.source.uri(undefined);
        jsonDataSource.source.json(this.stringSource());
        jsonDataSource.source.authenticationInfo = new JsonAuthenticationInfo({});
        jsonDataSource.source.headers([]);
        jsonDataSource.source.queryParameters([]);
        jsonDataSource.source.pathParameters([]);
    }
}
export class JsonDataSourceJsonSourcePageUriSettings extends JsonDataSourceJsonSourcePageSettingsBase {
    constructor(_requestWrapper, _itemsProvider) {
        super();
        this._requestWrapper = _requestWrapper;
        this._itemsProvider = _itemsProvider;
        this._isUriValid = ko.observable(false);
        this._lastValidatedJsonSourceJSON = '';
        this._authNameValidatorInstance = null;
        this._isInitUri = true;
        this._collectionItemNamePlaceholder = getLocalization('Name', 'AnalyticsCoreStringId.CollectionEditor_Name_Placeholder');
        this._lastValidateDeferred = null;
        this._sourceUriValidatorsReady = ko.observable(true);
        this._basicAuthValidatorsReady = ko.observable(false);
        this._validationRequested = ko.observable(false).extend({ deferred: true });
        this._noEmptyProperties = ko.pureComputed(() => {
            const isBasicHttpAuthValid = this._isBasicHttpAuthValid();
            const isParametersValid = this._isParametersValid();
            const sourceUriNotEmpty = !!this.sourceUri();
            return isBasicHttpAuthValid && isParametersValid && sourceUriNotEmpty;
        });
        this._lastValidationMessage = ko.observable();
        this._getSerializedUriSource = (jsonDataSource = new JsonDataSource({})) => {
            this.applySettings(jsonDataSource);
            return JSON.stringify(jsonDataSource.source.serialize(true));
        };
        this._sourceUriValidationCallback = (params) => {
            if (!this.sourceUri()) {
                if (this._isInitUri) {
                    this._isInitUri = false;
                    return true;
                }
                params.rule.message = getLocalizedValidationErrorMessage(null, getLocalization('Web Service Endpoint (URI):', 'DataAccessUIStringId.WizardPageChooseJsonSource_URI'));
                return false;
            }
            let serverValidationResult = false;
            this._isInitUri = false;
            const serializedJsonSource = this._getSerializedUriSource();
            if (serializedJsonSource != this._lastValidatedJsonSourceJSON) {
                if (!this._lastValidationMessage())
                    this._lastValidationMessage(getLocalization('Validation...', 'AnalyticsCoreStringId.Validation'));
                this._validateUriSource().done((result) => {
                    serverValidationResult = params.rule.isValid = result.isUriValid;
                    result.faultMessage && (params.rule.message = result.faultMessage);
                    this._lastValidationMessage(serverValidationResult ? null : result.faultMessage);
                    params.validator.validate();
                    setTimeout(() => this._repaintSummary(), 1);
                });
            }
            else {
                return !this._lastValidationMessage();
            }
            return serverValidationResult;
        };
        this.isValid = ko.pureComputed(() => {
            const isPropertiesNotEmpty = this._noEmptyProperties();
            const isUriValid = this._isUriValid();
            return isPropertiesNotEmpty && isUriValid;
        });
        this._validatorsReady = ko.pureComputed({
            read: () => {
                const sourceUriValidatorReady = this._sourceUriValidatorsReady();
                const authIsEmpty = !this.basicHttpAuth.password() && !this.basicHttpAuth.userName();
                const authInitialized = this._basicAuthValidatorsReady();
                return sourceUriValidatorReady && (authInitialized || authIsEmpty);
            },
            write: (newVal) => {
                this._basicAuthValidatorsReady(newVal);
            }
        });
        this.sourceUri = ko.observable('');
        this.basicHttpAuth = {
            password: ko.observable(''),
            userName: ko.observable(''),
        };
        this.parameters = ko.observableArray([]);
        this._disposables.push(this.resultUri = ko.pureComputed(() => {
            return this._getResultUri();
        }));
        this._disposables.push(this.grid = new ObjectProperties(ko.observable(this)));
        this._disposables.push(ko.computed(() => {
            const editorsInitialized = this._validatorsReady();
            const validationRequested = this._validationRequested();
            if (editorsInitialized && validationRequested) {
                this._validate();
            }
        }));
        this._disposables.push(this._validatorsReady);
    }
    _getPatchedParameter(parameter) {
        parameter.nameValidationRules = [{
                type: 'required',
                get message() {
                    return getLocalizedValidationErrorMessage(null, getLocalization('Parameters', 'AnalyticsCoreStringId.QueryBuilder_Parameters'), this._collectionItemNamePlaceholder);
                }
            }];
        parameter.itemsProvider = this._itemsProvider;
        return parameter;
    }
    _validateUriSource() {
        const defaultValidationErrorMessage = getLocalization('Invalid URI.', 'AnalyticsCoreStringId.ReportDesigner_Wizard_JsonSource_UriValidationError');
        const endpointUriDisplayName = getLocalization('Web Service Endpoint (URI):', 'DataAccessUIStringId.WizardPageChooseJsonSource_URI');
        this._isUriValid(false);
        if (this._lastValidateDeferred) {
            this._lastValidateDeferred.reject();
        }
        const resultDeferred = $.Deferred();
        this._lastValidateDeferred = resultDeferred;
        try {
            const jsonDataSource = new JsonDataSource({});
            const serializedJsonSource = this._getSerializedUriSource(jsonDataSource);
            this._lastValidatedJsonSourceJSON = serializedJsonSource;
            const validationResultHandler = (data) => {
                if (resultDeferred.state && resultDeferred.state() === 'rejected')
                    return;
                this._isUriValid(data.isUriValid);
                const faultMessage = getLocalizedValidationErrorMessage((data.isUriValid ? '' : data && data.faultMessage) || defaultValidationErrorMessage, endpointUriDisplayName);
                resultDeferred.resolve({
                    isUriValid: data.isUriValid,
                    faultMessage: faultMessage
                });
            };
            this._requestWrapper.validateJsonUri(jsonDataSource)
                .done(validationResultHandler)
                .fail((data = {}) => {
                data.isValid = false;
                validationResultHandler(data);
            });
        }
        catch (ex) {
            this._isUriValid(false);
        }
        return resultDeferred.promise();
    }
    _isCollectionValid(collectionName) {
        return !this[collectionName]().length || this[collectionName]().every(x => x.name());
    }
    _isParametersValid() {
        return this._isCollectionValid('parameters');
    }
    _isBasicHttpAuthValid() {
        return !this.basicHttpAuth.password() || !!this.basicHttpAuth.userName();
    }
    _getSourceUriInfo() {
        const sourceUri = {
            propertyName: 'sourceUri',
            displayName: 'Web Service Endpoint (URI):',
            localizationId: 'DataAccessUIStringId.WizardPageChooseJsonSource_URI',
            defaultVal: '',
            editor: editorTemplates.getEditor('text'),
            validatorOptions: null,
            isRequired: true,
            editorOptions: {
                elementAttr: {
                    title: this.sourceUri
                }
            }
        };
        const _self = this;
        sourceUri.validatorOptions = {
            onInitialized: (e) => {
                this._sourceUriValidatorsReady(true);
            },
            onDisposed: () => {
                this._sourceUriValidatorsReady(false);
            },
            validationRules: [
                {
                    type: 'custom',
                    assignValueFirst: true,
                    isDeferred: ko.pureComputed(() => this._noEmptyProperties()),
                    get message() {
                        return _self._lastValidationMessage();
                    },
                    validationCallback: this._sourceUriValidationCallback
                }
            ]
        };
        return sourceUri;
    }
    _getBasicHttpAuthInfo() {
        const basicHttpAuthName = {
            propertyName: 'userName', displayName: 'Username:', localizationId: 'DataAccessUIStringId.WizardPageConfigureJsonConnection_UsernameText', editor: editorTemplates.getEditor('text'),
            validatorOptions: undefined,
        };
        const basicHttpAuth = {
            propertyName: 'basicHttpAuth', displayName: 'Basic HTTP Authentication', localizationId: 'DataAccessUIStringId.WizardPageConfigureJsonConnection_BasicHttpAuthText', info: [
                basicHttpAuthName,
                createPasswordSerializationInfo({ propertyName: 'password', displayName: 'Password:', localizationId: 'DataAccessUIStringId.WizardPageConfigureJsonConnection_PasswordText' }, false),
            ], editor: editorTemplates.getEditor('objecteditor')
        };
        const onValidatorInitialied = (e) => {
            const authNmeValidatorInstance = e && e.component;
            if (this._authNameValidatorInstance && this._authNameValidatorInstance != authNmeValidatorInstance) {
                this._authNameValidatorInstance.dispose();
            }
            this._authNameValidatorInstance = authNmeValidatorInstance;
            this._basicAuthValidatorsReady(true);
        };
        const authNameValidatorDisposed = () => {
            this._authNameValidatorInstance = null;
        };
        basicHttpAuthName.validatorOptions = {
            onInitialized: onValidatorInitialied,
            onDisposed: authNameValidatorDisposed,
            validationRules: [{
                    type: 'custom',
                    reevaluate: true,
                    assignValueFirst: true,
                    get message() {
                        return getLocalizedValidationErrorMessage(null, getLocalization(basicHttpAuth.displayName, basicHttpAuth.localizationId), getLocalization(basicHttpAuthName.displayName, basicHttpAuthName.localizationId));
                    },
                    validationCallback: (params) => {
                        return this._isBasicHttpAuthValid();
                    }
                }]
        };
        return basicHttpAuth;
    }
    _getParametersInfo() {
        const parameters = {
            propertyName: 'parameters', displayName: 'Parameters', localizationId: 'AnalyticsCoreStringId.QueryBuilder_Parameters',
            array: true,
            addHandler: () => {
                const newName = getUniqueNameForNamedObjectsArray(this.parameters(), 'parameter');
                return this._getPatchedParameter(JsonParameter.from({ '@Name': newName }));
            },
            editor: editorTemplates.getEditor('commonCollection'),
            editorOptions: null,
            template: '#dx-jsonwizard-parametercollection'
        };
        return parameters;
    }
    _getResultUriInfo() {
        const _resultUri = {
            propertyName: 'resultUri',
            displayName: 'Resulting URI:',
            localizationId: 'DataAccessUIStringId.WizardPageChooseJsonSource_ResultingUri',
            defaultVal: '',
            editor: editorTemplates.getEditor('text'),
            editorOptions: {
                readOnly: true,
                elementAttr: {
                    title: this.resultUri
                }
            }
        };
        return _resultUri;
    }
    _getResultUri() {
        if (!this.sourceUri() || !this._isUriValid() || !this._isParametersValid())
            return null;
        if (this.sourceUri() && this.parameters().length === 0)
            return this.sourceUri();
        const uriParts = this.sourceUri().split('?');
        let url = uriParts[0];
        const query = uriParts[1];
        url = this._appendPathSegmentsToUri(uriParts[0]);
        return this._appendQuerySegmentsToUri(url, query);
    }
    _appendPathSegmentsToUri(uri) {
        const segments = this.parameters()
            .filter(p => p.itemType() === 'PathParameter')
            .map(p => '{' + p.name() + '}');
        segments.forEach(segment => {
            uri = uri.replace(/[\/]+$/g, '') + '/' + segment.replace(/^[\/]+/g, '');
        });
        return uri;
    }
    _appendQuerySegmentsToUri(uri, originalQuery) {
        const separator = '';
        let uriArguments = originalQuery || '';
        const querySegments = this.parameters()
            .filter(p => p.itemType() === 'QueryParameter')
            .map(p => p.name() + '={?}');
        querySegments.forEach(q => {
            if (!!uriArguments)
                uriArguments += '&';
            uriArguments += q;
        });
        if (uriArguments.length > 0)
            uri += '?' + uriArguments;
        return uri;
    }
    _onValidationSummaryInitialized(args) {
        super._onValidationSummaryInitialized(args);
        this._isInitUri = true;
        setTimeout(() => {
            this._validate();
        }, 1);
    }
    _applyParametersToSource(jsonDataSource) {
        const parametersByType = this.parameters().reduce((result, parameter) => (Object.assign(Object.assign({}, result), { [parameter.itemType()]: [...(result[parameter.itemType()] || []), parameter] })), {});
        ['PathParameter', 'QueryParameter', 'Header'].forEach(type => {
            if (parametersByType[type])
                jsonDataSource.source[parameterTypeToPropertyMap[type]](parametersByType[type]);
        });
    }
    applySettings(jsonDataSource) {
        jsonDataSource.source.uri(this.sourceUri());
        jsonDataSource.source.json(undefined);
        jsonDataSource.source.authenticationInfo.password(this.basicHttpAuth.password());
        jsonDataSource.source.authenticationInfo.userName(this.basicHttpAuth.userName());
        this._applyParametersToSource(jsonDataSource);
    }
    getInfo() {
        const sourceUri = this._getSourceUriInfo();
        const basicHttpAuth = this._getBasicHttpAuthInfo();
        const parameters = this._getParametersInfo();
        const resultUriInfo = this._getResultUriInfo();
        return [sourceUri, basicHttpAuth, parameters, resultUriInfo];
    }
    reset() {
        this.sourceUri('');
        this.basicHttpAuth.password('');
        this.basicHttpAuth.userName('');
        this.parameters([]);
    }
    setValue(dataSource) {
        this.sourceUri(dataSource.source.uri());
        this.basicHttpAuth.userName(dataSource.source.authenticationInfo.userName());
        this.basicHttpAuth.password(dataSource.source.authenticationInfo.password());
        const sourceParameters = [].concat.apply([], [dataSource.source.pathParameters(), dataSource.source.queryParameters(), dataSource.source.headers()]);
        this.parameters(sourceParameters.map(x => this._getPatchedParameter(x)));
    }
    dispose() {
        this._authNameValidatorInstance && this._authNameValidatorInstance.dispose();
        if (this._lastValidateDeferred) {
            this._lastValidateDeferred.reject();
            this._lastValidateDeferred = null;
        }
        super.dispose();
        this.disposeObservableArray(this.parameters);
    }
    onChange(_onChange) {
        let timeoutId = null;
        const localOnChange = () => {
            _onChange();
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => this._validate(), 1);
        };
        this._disposables.push(...subscribeProperties([this.sourceUri, this.basicHttpAuth.password, this.basicHttpAuth.userName, this.resultUri], localOnChange));
        this._disposables.push(subscribeArray(this.parameters, (item) => {
            item._disposables.push(...subscribeProperties([item.name, item.itemType, item.value], localOnChange));
        }, localOnChange));
    }
    isEmpty() {
        return !this.sourceUri();
    }
    _validate() {
        if (this._validationSummary && this._validationGroup) {
            if (this._validatorsReady()) {
                this._validationGroup.validate();
                this._validationRequested(false);
            }
            else {
                this._validationRequested(true);
            }
        }
    }
}