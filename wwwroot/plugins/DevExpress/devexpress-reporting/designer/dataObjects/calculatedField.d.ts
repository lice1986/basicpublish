﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\calculatedField.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, IDataMemberInfo, IModelSerializer, IPathRequest, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { IExpressionOptions, ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { IScriptingControl } from '../internal/scripting/_scriptsEditor';
import { ObjectStorageItem } from './objectStorageItem';
export declare class CalculatedField extends Disposable implements IDataMemberInfo, IScriptingControl {
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    scripts: any;
    isSelected?: boolean;
    dataType?: string;
    innerActions?: any;
    relationPath?: string;
    noDragable?: any;
    dragData?: any;
    icon?: string;
    items?: IDataMemberInfo[];
    get displayName(): string;
    get name(): string;
    get specifics(): string;
    get type(): string;
    lockedInUserDesigner(): boolean;
    displayType(): any;
    templateName: string;
    contenttemplate: string;
    isList: boolean;
    isCalculated: boolean;
    calculatedFieldName: ko.Observable<string> | ko.Computed<string>;
    nameEditable: ko.Computed<string>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    dataSource: ko.Observable<ObjectStorageItem>;
    fieldType: ko.Observable<string> | ko.Computed<string>;
    calcExpressionObj: IExpressionOptions;
    propertyGrid: ObjectProperties;
    pathRequest: IPathRequest;
}
