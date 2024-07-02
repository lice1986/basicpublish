﻿/**
* DevExpress Analytics (diagram\elements\diagramModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DiagramElementBaseViewModel } from './diagramElementBaseViewModel';
import { Margins } from '../../core/elements/margins';
import { ISerializationInfo, ISerializationInfoArray } from '../../serializer/serializationInfo';
export declare class DiagramViewModel extends DiagramElementBaseViewModel {
    getInfo(): ISerializationInfoArray;
    constructor(diagramSource: any);
    controls: ko.ObservableArray<DiagramElementBaseViewModel>;
    name: ko.Observable<string> | ko.Computed<string>;
    pageWidth: ko.Observable<number> | ko.Computed<number>;
    pageHeight: ko.Observable<number> | ko.Computed<number>;
    margins: Margins;
}
export declare const margins: ISerializationInfo;
export declare const pageWidth: ISerializationInfo;
export declare const pageHeight: ISerializationInfo;
export declare const diagramSerializationsInfo: ISerializationInfoArray;