﻿/**
* DevExpress Analytics (diagram\elements\diagramElementSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '../../core/elements/baseSurface';
import { DiagramElementBaseSurface } from './diagramElementBaseSurface';
import { DiagramElementViewModel } from './diagramElementViewModel';
export declare class DiagramElementSurface extends DiagramElementBaseSurface<DiagramElementViewModel> {
    constructor(control: DiagramElementViewModel, context: ISurfaceContext);
    _getChildrenHolderName(): string;
    contenttemplate: string;
}