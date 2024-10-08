﻿/**
* DevExpress Analytics (core\dragDrop\_dragHelperContent.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Rectangle } from '../elements/rectangle';
import { ISelectionProvider } from '../selection/_selection';
import { SurfaceElementBase } from '../elements/baseSurface';
export declare class DragHelperControlRectangle extends Rectangle {
    position: number;
    constructor(position: number, left?: number, top?: number, width?: number, height?: number);
}
export declare class DragHelperContent extends Rectangle {
    private _selectionProvider;
    private get _isEmpty();
    constructor(selectionProvider: ISelectionProvider);
    reset(): void;
    controls: ko.ObservableArray<Rectangle | DragHelperControlRectangle>;
    customData: ko.Observable<{}>;
    template: string;
    update(surface: SurfaceElementBase<any>): void;
    setContent(area: Rectangle, customData?: {
        template: string;
        data?: any;
    }): void;
    isLocked: ko.Observable<boolean>;
}
