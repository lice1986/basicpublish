﻿/**
* DevExpress Analytics (core\internal\selectable.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../serializer/disposable';
import { IArea } from '../elements/area';
interface ISelectableOptions {
    filter: string;
    distance: number;
    selecting: (event: MouseEvent, element: Element) => void;
    start: (event: MouseEvent) => void;
    stop: () => void;
    unselecting: (event: MouseEvent, element: Element) => void;
    disabled: boolean;
    zoom: number;
}
export declare class SelectableElement extends Disposable {
    private _element;
    private _options;
    updateSelection(currentRect: IArea, event: MouseEvent): void;
    constructor(_element: Element, _options: ISelectableOptions);
    bounds: IArea;
    isSelected: boolean;
}
export declare class Selectable extends Disposable {
    private _element;
    private _options;
    static inProcess: boolean;
    static disabled: boolean;
    private _elements;
    private _$window;
    private _$selectionContent;
    private _bodyEvents;
    private _clearElements;
    private _collectElements;
    private _startRect;
    readonly _minSelectDistance = 2;
    private _updateSelectionContent;
    private _initStartRect;
    private _mouseMove;
    private shouldStartSelect;
    private _mouseUp;
    private _mouseDown;
    constructor(_element: Element, _options: ISelectableOptions);
}
export {};
