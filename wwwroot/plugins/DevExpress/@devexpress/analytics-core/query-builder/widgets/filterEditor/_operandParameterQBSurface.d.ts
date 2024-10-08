﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_operandParameterQBSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { OperandParameterSurface } from '../../../widgets/filtereditor/operators/operandParameterSurface';
import { OperandParameter } from '../../../widgets/criteria/operators/parameter';
import { QueryBuilderObjectsProvider } from './_queryBuilderObjectsProvider';
import { QBFilterEditorHelper } from './_qbFilterEditorHelper';
export declare class OperandParameterQBSurface extends OperandParameterSurface {
    static defaultDisplay: () => any;
    private get _parameterType();
    constructor(operator: OperandParameter, parent: any, fieldListProvider?: any, path?: any);
    _createParameter(name: string, dataType: string): void;
    createParameter: () => void;
    fieldListProvider: ko.Observable<QueryBuilderObjectsProvider>;
    _parameterName: ko.Observable<string>;
    isEditable: ko.Observable<boolean> | ko.Computed<boolean>;
    fieldsOptions: any;
    helper: QBFilterEditorHelper;
    canCreateParameters: boolean;
    isDefaultTextDisplayed(): boolean;
    defaultDisplay: () => any;
}
