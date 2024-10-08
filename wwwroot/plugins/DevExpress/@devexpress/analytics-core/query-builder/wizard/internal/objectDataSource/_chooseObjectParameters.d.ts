﻿/**
* DevExpress Analytics (query-builder\wizard\internal\objectDataSource\_chooseObjectParameters.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ObjectProperties } from '../../../../property-grid/propertygrid';
import { IModelAction, IModelActionProvider } from '../../../../property-grid/widgets/internal/_utils';
import { ISerializationInfoArray } from '../../../../serializer/serializationInfo';
import { Disposable } from '../../../../serializer/disposable';
import { IExpressionOptions } from '../../../../widgets/expressioneditor/expressioneditor';
import { IItemsProvider } from '../../../../widgets/utils';
import { ObjectCtor, ObjectDataMember, ObjectDataSourceMethodBase, ObjectParameter } from '../../../dataSource/object/objectSchema';
export declare class ObjectDataSourceParameterProperty extends Disposable {
    private _parameter;
    private _itemsProvider;
    switchPropertyType(): void;
    isExpression(): boolean;
    private _generateInfo;
    private _initGetInfo;
    private _isDateTimeParamerterType;
    private _patchOriginalParameterValue;
    private _afterInitialize;
    private _subscribeProperties;
    isPropertyVisible(propertyName: string): boolean;
    constructor(_parameter: ObjectParameter, _itemsProvider: IItemsProvider);
    actions: IModelAction[];
    actionProviders: IModelActionProvider[];
    reset: () => void;
    getInfo: () => ISerializationInfoArray;
    type: ko.Observable<string>;
    value: ko.Observable<any>;
    expression: IExpressionOptions;
}
declare class ObjectDataSourceParameterGrid extends ObjectProperties {
    constructor(x: ObjectDataSourceParameterProperty);
}
export declare class ObjectDataSourceParametersModel extends Disposable {
    _grids: ObjectDataSourceParameterGrid[];
    displayName: string;
    constructor(parametersMethod: ObjectDataSourceMethodBase, itemsProvider: IItemsProvider);
}
export declare class ChooseObjectMemberParameters extends Disposable {
    private _itemsProvider;
    private _ctorParametersObject;
    private _dataMemberParametersObject;
    private _updateParameters;
    constructor(_itemsProvider: IItemsProvider);
    updateCtorParameters(method: ObjectDataSourceMethodBase): void;
    updateMethodParameters(method: ObjectDataSourceMethodBase): void;
    hasParameters: () => ObjectDataSourceParametersModel;
}
export declare class ChooseObjectParameters extends ChooseObjectMemberParameters {
    constructor(selectedCtor: ko.Observable<ObjectCtor>, selectedDataMembers: ko.ObservableArray<ObjectDataMember>, itemsProvider: IItemsProvider);
}
export {};
