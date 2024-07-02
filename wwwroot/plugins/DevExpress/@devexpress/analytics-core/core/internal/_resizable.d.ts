﻿/**
* DevExpress Analytics (core\internal\_resizable.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { IArea } from '../elements/area';
import { SnapLinesHelper } from '../snapLines/_snapLinesHelper';
export interface IResizable {
    handles?: string;
    filter?: string;
    distance?: number;
    minimumHeight?: number;
    minimumWidth?: number;
    selecting?: (event: MouseEvent, element: Element) => void;
    start: (event: MouseEvent, ui?: any) => void;
    stop: () => void;
    resize: (event: MouseEvent, element: Element, boundsDiff: IArea) => void;
}
export declare type IResizableOptions = IResizable & {
    starting?: (ev: any) => void;
    $element?: Element;
    stopped?: () => void;
    zoom?: number;
    disabled?: boolean | ko.Observable<boolean>;
    handles?: string | ko.Observable<string>;
    minimumWidth?: ko.Observable<number> | number;
    maximumWidth?: ko.Observable<number> | number;
    started?: boolean;
    $selectedNodes?: any;
    snapHelper?: SnapLinesHelper;
};
export declare function initializeBaseResizableOptions(values: IResizableOptions): IResizableOptions;
export declare function initializeResize(element: HTMLElement, options: IResizableOptions): () => void;
export declare class Resizable extends Disposable {
    private _element;
    private _options;
    static inProcess: boolean;
    readonly handleClass: string;
    readonly handleClassSelector: string;
    readonly resizableElementClass = "ui-resizable";
    readonly _defaultMinSize = 1;
    private _bodyEvents;
    private _startResizeMousePosition;
    private _resizeDirection;
    private _resizeHandles;
    private _initResize;
    private _mouseMove;
    private _mouseUp;
    private _mouseDown;
    private _initResizeHandle;
    private _addClassToElement;
    private _removeClassFromElement;
    private _getBoundsDiff;
    constructor(_element: HTMLElement, _options: IResizable);
    initialize(): Resizable;
}
export declare function getResizeDirection(currentClassList: DOMTokenList): string;
