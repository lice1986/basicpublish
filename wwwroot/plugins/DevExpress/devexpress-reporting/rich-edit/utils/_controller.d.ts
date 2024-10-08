﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_controller.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { Locker } from '../../common/utils/_locker';
import { XRRichModernSurface } from '../surface';
import { XRRichViewModel } from '../../designer/controls/xrRichText';
import { RichEditFontModel, RichEditPaddingModelWrapper, RichLoader, XRRichEditControlModel } from './_model';
export declare class XRRichController extends Disposable {
    element: HTMLElement;
    fontModel: RichEditFontModel;
    paddingModel: RichEditPaddingModelWrapper;
    surface: XRRichModernSurface;
    richLoader: RichLoader;
    locker: Locker;
    richEdit: XRRichEditControlModel;
    private _oldValidState;
    get controlModel(): XRRichViewModel;
    createSubscribtions(): void;
    dispose(): void;
    init(): void;
    constructor(richEdit: XRRichEditControlModel, xrRichSurfaceModel: XRRichModernSurface);
    setRtfString(newRtf: string): void;
    private rtfStringChanged;
    checkValidationState(): boolean;
    onVisibilityChanged(newVisibility: boolean): void;
    onDocumentDataChanged(newDocument: string): void;
}
