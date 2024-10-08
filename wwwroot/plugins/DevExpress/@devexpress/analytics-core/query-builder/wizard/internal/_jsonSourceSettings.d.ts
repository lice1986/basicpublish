﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_jsonSourceSettings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { IJsonDataSourceJsonSourceValidatable, IJsonDataSourceJsonSourcePageSettings } from './jsonSourceSettings';
import { ObjectProperties } from '../../../property-grid/propertygrid';
import { JsonDataSource } from '../../dataSource/json/jsonDataSource';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { RequestWrapper } from '../../utils/requestwrapper';
import { JsonParameter } from '../../dataSource/json/jsonParameter';
import { IItemsProvider } from '../../../widgets/utils';
export interface IJSONSourcePagePropertyDescriptor {
    value: ko.Observable<any>;
    displayName: () => string;
}
export declare abstract class JsonDataSourceJsonSourcePageSettingsBase extends Disposable implements IJsonDataSourceJsonSourceValidatable {
    dispose(): void;
    protected _validationGroup: any;
    protected _validationSummary: any;
    private _onValidationGroupInitialized;
    private _onValidationGroupDisposing;
    protected _onValidationSummaryInitialized(args: any): void;
    private _onValidationSummaryDisposing;
    protected _repaintSummary(): void;
    abstract _validatorsReady: ko.Observable<boolean> | ko.Computed<boolean>;
    _validate(): void;
    constructor();
    validationGroup: {
        onInitialized: (args: any) => void;
        onDisposing: (args: any) => void;
        validate: () => void;
    };
    validationSummary: {
        onInitialized: (args: any) => void;
        onDisposing: (args: any) => void;
    };
    isValid: ko.Observable<boolean> | ko.Computed<boolean>;
    grid: ObjectProperties;
}
export declare class JsonDataSourceJsonSourcePageStringSettings extends JsonDataSourceJsonSourcePageSettingsBase implements IJsonDataSourceJsonSourcePageSettings {
    onChange(_onChange: () => void): any;
    _validatorsReady: ko.Observable<boolean>;
    private _isJsonSourceValid;
    isEmpty(): boolean;
    reset(): void;
    setValue(dataSource: JsonDataSource): void;
    getInfo(): ISerializationInfoArray;
    applySettings(jsonDataSource: JsonDataSource): void;
    constructor();
    isValid: ko.Observable<boolean> | ko.Computed<boolean>;
    validationGroup: any;
    validationSummary: any;
    stringSource: ko.Observable<string> | ko.Computed<string>;
    aceEditorHasErrors: ko.Observable<boolean>;
    grid: ObjectProperties;
    cssClass: {
        'dxrd-wizard-json-string-source-grid': boolean;
    };
}
export declare class JsonDataSourceJsonSourcePageUriSettings extends JsonDataSourceJsonSourcePageSettingsBase implements IJsonDataSourceJsonSourcePageSettings {
    private _requestWrapper;
    private _itemsProvider?;
    private _isUriValid;
    private _lastValidatedJsonSourceJSON;
    private _authNameValidatorInstance;
    private _isInitUri;
    private _collectionItemNamePlaceholder;
    private _lastValidateDeferred;
    private _sourceUriValidatorsReady;
    private _basicAuthValidatorsReady;
    private _validationRequested;
    private _getPatchedParameter;
    private _validateUriSource;
    private _isCollectionValid;
    private _isParametersValid;
    private _isBasicHttpAuthValid;
    private _noEmptyProperties;
    private _lastValidationMessage;
    private _getSerializedUriSource;
    _sourceUriValidationCallback: (params: any) => boolean;
    private _getSourceUriInfo;
    private _getBasicHttpAuthInfo;
    private _getParametersInfo;
    private _getResultUriInfo;
    private _getResultUri;
    private _appendPathSegmentsToUri;
    private _appendQuerySegmentsToUri;
    constructor(_requestWrapper: RequestWrapper, _itemsProvider?: IItemsProvider);
    protected _onValidationSummaryInitialized(args: any): void;
    _applyParametersToSource(jsonDataSource: JsonDataSource): void;
    applySettings(jsonDataSource: JsonDataSource): void;
    getInfo(): ISerializationInfoArray;
    reset(): void;
    setValue(dataSource: JsonDataSource): void;
    dispose(): void;
    onChange(_onChange: () => void): any;
    isEmpty(): boolean;
    isValid: ko.PureComputed<boolean>;
    _validate(): void;
    _validatorsReady: ko.PureComputed<boolean>;
    sourceUri: ko.Observable<string>;
    basicHttpAuth: {
        password: ko.Observable<string>;
        userName: ko.Observable<string>;
    };
    parameters: ko.ObservableArray<JsonParameter>;
    resultUri: ko.Computed<string>;
}
