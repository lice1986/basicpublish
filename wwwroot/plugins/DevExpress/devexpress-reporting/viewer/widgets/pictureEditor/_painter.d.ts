﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_painter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ImageSizeMode, ImageAlignment } from '../../editing/editingField';
import { ImagePainter } from './_imagePainter';
import { SignaturePainter } from './_signaturePainter';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IPictureEditorFieldModel, PictureEditorModel } from './_pictureEditorModel';
import { ValueChangedEvent } from 'devextreme/ui/slider';
export interface IPainterOptions {
    imageSource: string;
    imageType: string;
    sizeMode: ImageSizeMode;
    alignment: ImageAlignment;
    pictureEditorModel?: PictureEditorModel;
    setPainter?: (painter: Painter) => void;
    editingFieldModel: IPictureEditorFieldModel;
}
export interface IPainterColorOptionViewModel {
    value: string;
    isSelected: boolean;
    action: () => void;
}
export interface IPainterSizingOptionViewModel extends IPainterColorOptionViewModel {
    attrTitle: string;
    iconTemplate: string;
}
export interface IPainterBrushOptions {
    lineWidth: number;
    lineColor: string;
    onLineWidthChanged: (event: ValueChangedEvent) => void;
    colors: IPainterColorOptionViewModel[];
    brushWidthText: string;
    brushColorText: string;
}
export interface IPainterSizeOptions {
    sizeMode: ImageSizeMode;
    sizeModeText: string;
    sizeModeValues: IPainterSizingOptionViewModel[];
    alignment: ImageAlignment;
    alignmentText: string;
    alignmentValues: IPainterSizingOptionViewModel[];
}
export interface IPainterViewModel extends IViewModel {
    scale: number;
    brushOptions: IPainterBrushOptions;
    sizingOptions: IPainterSizeOptions;
}
export declare class Painter extends BaseRenderingModel<IPainterViewModel> {
    private $element;
    private _context;
    private _getContextPoint;
    private _pointerDownHandler;
    private _pointerMoveHandler;
    private _pointerLeaveHandler;
    private _addEvents;
    private _removeEvents;
    private _setCanvasSize;
    private _cleanCanvas;
    private _updateScale;
    private _getColorValues;
    private _getEnumValues;
    constructor(element: HTMLElement, options: IPainterOptions, onResize?: () => void);
    onPropertyChanged(args: PropertyChangedEventArgs<Painter> | ArrayPropertyChangedEventArgs<Painter>): void;
    createViewModel(): IPainterViewModel;
    updateViewModel(args: PropertyChangedEventArgs<Painter> | ArrayPropertyChangedEventArgs<Painter>): void;
    clear(): void;
    refresh(): void;
    initSize(element: HTMLElement, zoom: number): void;
    initCanvas(zoom: number): void;
    imageFormatByType(imageType: string): string;
    getImage(): string;
    hasSignature(): boolean;
    dispose(): void;
    reset(initialImage: string, initialAlignment: ImageAlignment, initialSizeMode: ImageSizeMode, initialImageType: string): void;
    initialSize: {
        width: number;
        height: number;
    };
    height: number;
    format: (newVal?: string) => string;
    image: string;
    imageSizeMode: ImageSizeMode;
    imageAlignment: ImageAlignment;
    getZoom: () => number;
    scale: number;
    lineWidth: number;
    lineColor: string;
    imagePainter: ImagePainter;
    signaturePainter: SignaturePainter;
}