﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTextControl.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
import { FontModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { FitBoundsToTextAction } from '../actions/fitBoundsToTextAction';
import { FitTextToBoundsAction } from '../actions/fitTextToBoundsAction';
import { ControlType } from './utils/_controlTypes';
import { XRControlSurfaceBase } from './xrControl';
export declare class XRTextControlSurfaceBase<M extends ElementViewModel<ControlType>> extends XRControlSurfaceBase<M> {
    private _$element;
    private _font;
    characterHeight: ko.Computed<number>;
    contenttemplate: string;
    getAlignments(): {
        vertical: string;
        horizontal: string;
    };
    getWordWrap(): any;
    getCssContent(content?: Object): Object;
    getContentSize(): any;
    getText(): string;
    getFontModel(): FontModel;
    setFontSize(size: any): void;
    cacheElementContent($element: JQuery): void;
    fitTextToBounds(): void;
    fitWidthToText(): void;
    fitHeightToText(): void;
    fitBoundsToText(): void;
    constructor(control: M, context: ISurfaceContext, units?: IUnitProperties<any>);
    fitTextToBoundsAction: FitTextToBoundsAction;
    fitBoundsToTextAction: FitBoundsToTextAction;
}
