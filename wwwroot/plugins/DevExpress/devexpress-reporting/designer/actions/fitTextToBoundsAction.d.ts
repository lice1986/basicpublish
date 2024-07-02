﻿/**
* DevExpress HTML/JS Reporting (designer\actions\fitTextToBoundsAction.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ControlType } from '../controls/utils/_controlTypes';
import { XRTextControlSurfaceBase } from '../controls/xrTextControl';
import { TextElementSizeHelper } from '../helpers/_textElementSizeHelper';
export declare class FitTextToBoundsAction {
    _control: XRTextControlSurfaceBase<ElementViewModel<ControlType>>;
    textElementHelper: TextElementSizeHelper;
    private _getTextSide;
    private _calculateFont;
    private _getAvailableFont;
    fit(): void;
    constructor(_control: XRTextControlSurfaceBase<ElementViewModel<ControlType>>, textElementHelper?: TextElementSizeHelper);
}