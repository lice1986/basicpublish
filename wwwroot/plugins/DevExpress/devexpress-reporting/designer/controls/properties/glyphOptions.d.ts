﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\glyphOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Size } from '@devexpress/analytics-core/analytics-elements';
import { Disposable, IModelSerializer, ISerializableModel, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ImageSource } from '../../../common/imageSource';
export interface ICheckBoxCustomGlyphs {
    Checked: ko.Observable<ImageSource>;
    Unchecked: ko.Observable<ImageSource>;
    Indeterminate: ko.Observable<ImageSource>;
}
export declare class GlyphOptions extends Disposable implements ISerializableModel {
    static unitProperties: string[];
    constructor(model: {}, serializer?: IModelSerializer);
    getInfo: ko.Observable<ISerializationInfoArray>;
    alignment: ko.Observable<string> | ko.Computed<string>;
    size: Size;
    style: ko.Observable<string> | ko.Computed<string>;
    customGlyphs: ICheckBoxCustomGlyphs;
}
