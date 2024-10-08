﻿/**
* DevExpress HTML/JS Reporting (designer\actions\fitBoundsToTextAction.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ControlType } from '../controls/utils/_controlTypes';
import { XRTextControlSurfaceBase } from '../controls/xrTextControl';
import { TextElementSizeHelper } from '../helpers/_textElementSizeHelper';
export declare class FitBoundsToTextAction {
    _control: XRTextControlSurfaceBase<ElementViewModel<ControlType>>;
    textElementHelper: TextElementSizeHelper;
    private _getNewRectForVetical;
    private _findWidth;
    private _getNewRectForHorizontal;
    private _getTextContainerSize;
    private _getTextHeight;
    fitWidth(): void;
    fitHeight(): void;
    fitBounds(): void;
    constructor(_control: XRTextControlSurfaceBase<ElementViewModel<ControlType>>, textElementHelper?: TextElementSizeHelper);
}
