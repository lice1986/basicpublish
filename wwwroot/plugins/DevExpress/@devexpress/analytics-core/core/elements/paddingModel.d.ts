﻿/**
* DevExpress Analytics (core\elements\paddingModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
import { BaseRenderingMultiplatformModel } from '../../serializer/native/models/base.model';
import { IViewModel } from '../../serializer/native/models/interfaces.model';
import { MultiPlatformObservable } from '../../serializer/native/multiplatformEngine';
export declare class PaddingModel extends BaseRenderingMultiplatformModel<IViewModel> {
    left: MultiPlatformObservable<number>;
    right: MultiPlatformObservable<number>;
    top: MultiPlatformObservable<number>;
    bottom: MultiPlatformObservable<number>;
    dpi: MultiPlatformObservable<number>;
    static defaultVal: string;
    static unitProperties: string[];
    getInfo(): ISerializationInfoArray;
    resetValue(): void;
    isEmpty(): boolean;
    applyFromString(value: string): this;
    static from(val: any): PaddingModel;
    toString(): string;
    _toString(inner?: boolean): string;
    constructor(left?: MultiPlatformObservable<number>, right?: MultiPlatformObservable<number>, top?: MultiPlatformObservable<number>, bottom?: MultiPlatformObservable<number>, dpi?: MultiPlatformObservable<number>);
    _isUpdating: MultiPlatformObservable<boolean>;
    _left: MultiPlatformObservable<number>;
    _top: MultiPlatformObservable<number>;
    _right: MultiPlatformObservable<number>;
    _bottom: MultiPlatformObservable<number>;
    all: MultiPlatformObservable<number>;
}
