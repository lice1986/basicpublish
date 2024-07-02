﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_tableComponentSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, IArea } from '@devexpress/analytics-core/analytics-elements';
import { XRTextControlSurfaceBase } from '../xrTextControl';
import { ControlType } from './_controlTypes';
export declare enum TableActionDirection {
    vertical = 0,
    horizontal = 1
}
export declare class TableComponentSurface<T extends ElementViewModel<ControlType>> extends XRTextControlSurfaceBase<T> {
    private _getNeededProperties;
    private _generateRect;
    beforeRectUpdated(rect: IArea): IArea;
    direction: TableActionDirection;
}
