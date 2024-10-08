﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPicturebox.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { IResizeHandler } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ImageSource } from '../../common/imageSource';
import { ControlType } from './utils/_controlTypes';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export declare class XRPictureBoxViewModel extends XRControlViewModel {
    constructor(model: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    isAlignmentDisabled(): boolean;
    isPropertyDisabled(propertyName: string): any;
    imageAlignment: ko.Observable<string> | ko.Computed<string>;
    imageUrl: ko.Observable<string> | ko.Computed<string>;
    imageSource: ko.Observable<ImageSource>;
    _sizing: ko.Observable<string> | ko.Computed<string>;
    sizing: ko.Observable<string> | ko.Computed<string>;
    isSmallerImage: ko.Observable<boolean> | ko.Computed<boolean>;
    get isAutoSize(): boolean;
    imageRatio: {
        x: number;
        y: number;
    };
    originalImageWidth: ko.Observable<number>;
    originalImageHeight: ko.Observable<number>;
}
export declare class XRPictureBoxSurface extends XRControlSurface {
    private _createBackgroundPosition;
    private _createBackimage;
    private _createBackgroundOrigin;
    constructor(model: XRPictureBoxViewModel, context: ISurfaceContext);
    getResizeOptions(resizeHandler: IResizeHandler): IResizeHandler;
    selectiontemplate: string;
    getAdornTemplate(): string;
    _control: XRPictureBoxViewModel;
    resizeDisabled: ko.Computed<boolean>;
    resizeOptions: IResizeHandler;
}
