﻿/**
* DevExpress Analytics (query-builder\elements\queryElementModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '../../core/elements/elementViewModel';
import { IModelSerializer } from '../../serializer/serializer';
import { Size } from '../../core/elements/size';
import { Point } from '../../core/elements/point';
import { ControlsFactory } from '../../core/utils/controlsFactory';
export declare class QueryElementBaseViewModel extends ElementViewModel {
    getControlFactory(): ControlsFactory;
    constructor(control: any, parent: ElementViewModel, serializer?: IModelSerializer);
    size: Size;
    location: Point;
}
