﻿/**
* DevExpress Analytics (diagram\elements\diagramElementSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DiagramElementBaseSurface } from './diagramElementBaseSurface';
export class DiagramElementSurface extends DiagramElementBaseSurface {
    constructor(control, context) {
        super(control, context, null);
        this.contenttemplate = 'dxdd-element-content-with-connecting-points';
    }
    _getChildrenHolderName() { return 'connectingPoints'; }
}