﻿/**
* DevExpress Analytics (core\dragDrop\_dragDropHandler.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { ISurfaceContext } from '../elements/baseSurface';
import { SurfaceSelection } from '../selection/_selection';
import { SnapLinesHelper } from '../snapLines/_snapLinesHelper';
import { DragHelperContent } from './_dragHelperContent';
import { Size } from '../elements/size';
import { UndoEngine } from '../../undo-engine/undoengine';
export declare class DragDropHandler extends Disposable {
    dispose(): void;
    static started: ko.Observable<boolean>;
    protected getTarget(event: MouseEvent): HTMLElement;
    protected _snapDisabled: boolean;
    surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>;
    selection: SurfaceSelection;
    snapHelper: SnapLinesHelper;
    dragHelperContent: DragHelperContent;
    _size: Size;
    _getAbsoluteSurfacePosition(uiElement: any): {
        left: number;
        top: number;
    };
    constructor(surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, snapHelper?: SnapLinesHelper, dragHelperContent?: DragHelperContent);
    addControl(control: any, dropTargetSurface: any, size: any): void;
    recalculateSize(size: any): void;
    helper(draggable: any, event?: any): void;
    canDrop(dropTarget: any, controlModel: any, metaData: any): boolean;
    startDrag(_: any): void;
    drag(event: MouseEvent, uiElement: any, draggableModel: any): void;
    stopDrag: (uiElement: any, draggableModel: any, event?: any) => void;
    doStopDrag(uiElement: any, draggableModel: any, event?: any): void;
    parent: () => JQuery<any>;
    cursor: string;
    containment: string;
    alwaysAlt: boolean;
}