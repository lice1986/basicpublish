﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_signaturePainter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, BaseModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
export declare class SignaturePainter extends BaseModel {
    dispose(): void;
    _points: Array<any>;
    private _lastX;
    private _lastY;
    private _drawPath;
    private _drawCircle;
    private _drawAllPoints;
    onPropertyChanged(args: PropertyChangedEventArgs<SignaturePainter> | ArrayPropertyChangedEventArgs<SignaturePainter>): void;
    drawCircle(context: CanvasRenderingContext2D, x: number, y: number, color: string, width: number): void;
    drawPath(context: CanvasRenderingContext2D, x: number, y: number, color: string, width: number): void;
    resetLastPosition(): void;
    resetPoints(): void;
    reset(): void;
    refresh(context: CanvasRenderingContext2D): void;
    hasPoints: boolean;
}
