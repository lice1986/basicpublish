﻿/**
* DevExpress HTML/JS Reporting (designer\bands\groupfield.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, IModelSerializer, ISerializableModel, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class GroupFieldModel extends Disposable implements ISerializableModel {
    static createNew: () => GroupFieldModel;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    sortOrder: ko.Observable<string> | ko.Computed<string>;
    sortOrderClass: ko.Computed<{
        class: string;
        template: string;
    }>;
    changeSortOrder: () => void;
    fieldName: ko.Observable<string> | ko.Computed<string>;
}
