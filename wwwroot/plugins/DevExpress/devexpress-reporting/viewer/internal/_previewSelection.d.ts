﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewSelection.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PreviewPage } from './_page';
export declare class PreviewSelection {
    private _element;
    private _page;
    private _click;
    static started: boolean;
    static disabled: boolean;
    private _$element;
    private _$selectionContent;
    private _$selectionContainer;
    private _bodyEvents;
    private _startRect;
    private _getBodyScrollTop;
    private _getBodyScrollLeft;
    private _updateSelectionContent;
    private _mouseMove;
    private _mouseUp;
    private _mouseDown;
    constructor(_element: HTMLElement, _page: PreviewPage, _click: (pageIndex: number) => void);
    private _dispose;
    dispose: () => void;
}
export interface IBrickSelectionOptions {
    page: PreviewPage;
    click: (pageIndex: number) => void;
}
export declare function initializeBrickSelectionProg(element: HTMLElement, options: IBrickSelectionOptions): () => void;