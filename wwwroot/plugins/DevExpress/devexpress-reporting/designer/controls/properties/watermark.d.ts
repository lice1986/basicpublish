﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\watermark.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IStyleContainer } from '@devexpress/analytics-core/analytics-internal';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ImageSource } from '../../../common/imageSource';
import * as ko from 'knockout';
export declare class WatermarkModel extends SerializableModel implements IStyleContainer {
    constructor(model: any, serializer?: IModelSerializer);
    get displayName(): string;
    get name(): string;
    displayType(): string;
    shouldDrawWatermarkImage(): boolean;
    watermarkId: ko.Observable<string> | ko.Computed<string>;
    text: ko.Observable<string>;
    textDirection: ko.Observable<string>;
    foreColor: ko.Observable<string>;
    imageSource: ko.Observable<ImageSource>;
    rtl: () => undefined;
}
