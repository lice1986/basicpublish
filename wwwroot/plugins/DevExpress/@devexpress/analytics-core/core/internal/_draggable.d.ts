﻿/**
* DevExpress Analytics (core\internal\_draggable.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../serializer/disposable';
import { IArea } from '../elements/area';
interface IDraggable {
    start: (event: MouseEvent, uiElement?: any) => void;
    stop: (event: any, uiElement: any) => void;
    drag: (event: MouseEvent, element: Element, boundsDiff?: IArea) => void;
    containment: any;
    helper: any;
    initDrag: any;
    boundary: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    disabled: () => boolean;
}
export declare class Draggable extends Disposable {
    private _element;
    private _options;
    static inProcess: boolean;
    private _bodyEvents;
    private _windowEvents;
    private _originalDragStartCoordinates;
    private _originalElementPosition;
    private _startRect;
    private _dragInitialized;
    private _scrollableContainer;
    private readonly _draggableElementClass;
    private readonly _minDragDistance;
    private _initScrollContainer;
    private _initDrag;
    private _addClassToElement;
    private _calculateElementPosition;
    private _mouseMove;
    private shouldStartDrag;
    private _mouseUp;
    private _ghostContainer;
    private _mouseDown;
    private _canDrag;
    constructor(_element: any, _options: IDraggable);
}
export {};
