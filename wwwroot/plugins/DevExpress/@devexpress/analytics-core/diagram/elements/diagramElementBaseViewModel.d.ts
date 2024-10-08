﻿/**
* DevExpress Analytics (diagram\elements\diagramElementBaseViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '../../core/elements/elementViewModel';
import { ModelSerializer } from '../../serializer/serializer';
import { Size } from '../../core/elements/size';
import { Point } from '../../core/elements/point';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
import { ControlsFactory } from '../../core/utils/controlsFactory';
export declare class DiagramElementBaseViewModel extends ElementViewModel {
    getControlFactory(): ControlsFactory;
    constructor(control: any, parent: ElementViewModel, serializer?: ModelSerializer);
    size: Size;
    location: Point;
}
export declare const diagramElementSerializationInfo: ISerializationInfoArray;
