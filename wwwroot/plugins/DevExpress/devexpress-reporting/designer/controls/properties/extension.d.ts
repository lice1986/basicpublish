﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\extension.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare class ExtensionModel {
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    key: ko.Observable<string> | ko.Computed<string>;
    value: ko.Observable<string> | ko.Computed<string>;
}
