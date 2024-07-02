﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelAction } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, IDataMemberInfo, IModelSerializer, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { IParameter, IParameterDescriptor } from '../../../viewer/parameters/parameterHelper';
import { DefaultLocalizationProvider, ILocalizedControl } from '../../controls/utils/_localizationUtils';
import { ReportViewModel } from '../../controls/xrReport';
import { ObjectsStorage } from '../objectStorage';
import { ObjectItem, ObjectStorageItem } from '../objectStorageItem';
import { ParameterTypesHelper } from './parameterTypesHelper';
import { PropertyExpressionMapper } from './propertyExpressionMapper';
import { ValueSourceSettingsHelper } from './valueSourceSettingsHelper';
export declare class Parameter extends Disposable implements IParameter, IDataMemberInfo, ILocalizedControl {
    _report: ReportViewModel;
    static propertiesWithExpressions: string[];
    static ParametersRefString: string;
    static defaultGuidValue: string;
    static availableRangeSettingTypes: string[];
    private _parameterHelper;
    __localizationProvider: DefaultLocalizationProvider<ILocalizedControl>;
    get _localizationProvider(): DefaultLocalizationProvider<ILocalizedControl>;
    getLocalizationProperty(propertyName: string): import("../../controls/utils/_localizationUtils").LocalizedProperty;
    getLocalizationProperties(): import("../../controls/utils/_localizationUtils").LocalizedProperty[];
    applyLocalization(propertyName: string, propertyValue: any): void;
    private _initializeValue;
    private _preDeserialize;
    private _processObsoleteProperties;
    private _getExpressionActions;
    private _updateTypeValues;
    preprocessInfo(info: ISerializationInfoArray): void;
    getInfo(): ISerializationInfoArray;
    appendExpressionObjInfo(info: ISerializationInfoArray): void;
    getActionClassName(propertyName: string): {
        'dxrd-editormenu-expressions': boolean;
        'dxd-icon-accented': boolean;
    };
    constructor(model: any, _report: ReportViewModel, serializer?: IModelSerializer);
    isPropertyVisible(name: string): boolean;
    getParameterDescriptor(): IParameterDescriptor;
    assign(parameter: Parameter): void;
    getRangeParameters(): IDataMemberInfo[];
    get name(): string;
    get specifics(): string;
    get icon(): string;
    get defaultValue(): any;
    get displayName(): string;
    get isList(): boolean;
    get dragData(): {
        noDragable: boolean;
    };
    isPropertyDisabled(propertyName: any): any;
    templateName: string;
    labelOrientation: ko.Observable<string>;
    actionProviders: any[];
    _expressionActions: {
        [key: string]: IModelAction[];
    };
    expressionObj: {};
    info: ISerializationInfoArray;
    propertyExpressionMapper: PropertyExpressionMapper;
    _type: ko.Observable<ObjectStorageItem> | ko.Computed<ObjectStorageItem>;
    _obsoleteValue: ko.Observable | ko.Computed;
    _isEditing: ko.Observable<boolean>;
    _showLayoutProperties: ko.Observable<boolean>;
    objectsStorage: ObjectsStorage;
    valueSourceSettings: ko.Observable<ObjectItem> | ko.Computed<ObjectItem>;
    parameterName: ko.Observable<string> | ko.Computed<string>;
    description: ko.Observable<string> | ko.Computed<string>;
    tag: ko.Observable | ko.Computed;
    type: ko.Computed<string>;
    collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
    valueSourceSettingsType: ko.Observable<string>;
    visible: ko.Observable<boolean> | ko.Computed<boolean>;
    enabled: ko.Observable<boolean>;
    value: ko.Observable;
    valueInfo: ko.Observable<ISerializationInfo> | ko.Computed<ISerializationInfo>;
    isMultiValue: ko.Observable<boolean> | ko.Computed<boolean>;
    selectAllValues: ko.Observable<boolean> | ko.Computed<boolean>;
    allowNull: ko.Observable<boolean> | ko.Computed<boolean>;
    multiValueInfo: ko.Observable<ISerializationInfo>;
    parameterTypesHelper: ParameterTypesHelper;
    valueSourceSettingsHelper: ValueSourceSettingsHelper;
    viewmodel: ObjectProperties;
}
