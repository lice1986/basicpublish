﻿/**
* DevExpress Analytics (widgets\internal\_resizeHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISize } from '../../core/elements/size';
import * as ko from 'knockout';
export declare type ResizeHandlerOptions = {
    resultSize?: ko.Observable<number>;
    disabled?: ko.Observable<boolean>;
    onResize?: () => void;
};
export declare class ResizeHelper {
    options: ResizeHandlerOptions;
    private _resize;
    constructor(options?: ResizeHandlerOptions);
    resizable(resizeHandler: object, handles: string): any;
    stopResize: () => void;
    resize: (params: {
        size: ISize;
        delta: {
            dx: number;
            dy: number;
            dw: number;
            dh: number;
        };
        element: HTMLDivElement;
    }) => void;
}