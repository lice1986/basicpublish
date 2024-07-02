﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\symbology.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { PaddingModel, SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { ImageSource } from '../../../common/imageSource';
import { XRBarCodeViewModel } from '../xrBarcode';
declare class FrameOptionsModel extends SerializableModel {
    constructor(model: any, serializer: IModelSerializer, info: ISerializationInfoArray, barCode: XRBarCodeViewModel);
    padding: ko.Observable<string>;
    paddingObj: PaddingModel;
}
export declare class BarCodeSymbology extends SerializableModel {
    createFrameOptions(model: any, barCode: XRBarCodeViewModel, serializer?: IModelSerializer): FrameOptionsModel;
    constructor(model: any, serializer: IModelSerializer, info: ISerializationInfoArray, barCode: XRBarCodeViewModel);
    isPropertyDisabled(propertyName: any): boolean;
    dispose(): void;
    name: ko.Observable<string>;
    logo?: ko.Observable<ImageSource>;
    pharmacodeType?: ko.Observable<string>;
    startSymbol?: ko.Observable<string>;
    stopSymbol?: ko.Observable<string>;
    frameOptionsFake?: any;
    frameOptions?: ko.Observable<FrameOptionsModel>;
}
export {};
