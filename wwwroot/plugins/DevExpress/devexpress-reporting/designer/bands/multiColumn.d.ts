﻿/**
* DevExpress HTML/JS Reporting (designer\bands\multiColumn.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext, Margins, SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { Disposable, IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class MultiColumn extends SerializableModel {
    static unitProperties: string[];
    constructor(model: any, pageWidth: ko.Observable<number> | ko.Computed<number>, margins: Margins, serializer?: IModelSerializer);
    mode: ko.Observable<string> | ko.Computed<string>;
    realColumnWidth: ko.Observable<number> | ko.Computed<number>;
    grayAreaWidth: ko.Observable<number>;
    columnWidth: ko.Observable<number> | ko.Computed<number>;
    columnCount: ko.Observable<number> | ko.Computed<number>;
    columnSpacing: any;
}
export declare const multiColumnSerializationsInfo: ISerializationInfoArray;
export declare class MultiColumnSurface extends Disposable {
    constructor(multiColumn: MultiColumn, context: ISurfaceContext);
    grayAreaWidth: ko.Computed<number>;
    columnWidth: ko.Computed<number>;
    columnSpacing: ko.Computed<number>;
    columnSpacingLeft: ko.Computed<number>;
    grayAreaLeft: ko.Computed<number>;
    haveColumns: ko.Computed<boolean>;
}
