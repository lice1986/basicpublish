﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_signaturePainter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseModel, mutable, mutableArray } from '@devexpress/analytics-core/analytics-serializer-native';
export class SignaturePainter extends BaseModel {
    dispose() {
        super.dispose();
        this.reset();
    }
    _drawPath(context, x, y, lastX, lastY, color, lineWidth) {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.lineJoin = 'round';
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.closePath();
        context.stroke();
    }
    _drawCircle(context, x, y, color, lineWidth) {
        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y, lineWidth / 2, 0, 2 * Math.PI, false);
        context.fill();
    }
    _drawAllPoints(context) {
        this._points.forEach((point) => {
            if (point.isStart) {
                this._drawCircle(context, point.x, point.y, point.color, point.width);
            }
            else {
                this._drawPath(context, point.x, point.y, point.lastX, point.lastY, point.color, point.width);
            }
        });
    }
    onPropertyChanged(args) {
        if (args.propertyName === '_points')
            this.hasPoints = this._points.length > 0;
    }
    drawCircle(context, x, y, color, width) {
        this._lastX = x;
        this._lastY = y;
        this._drawCircle(context, x, y, color, width);
        this._points.push({ x: this._lastX, y: this._lastY, color: color, width: width, isStart: true });
    }
    drawPath(context, x, y, color, width) {
        this._drawPath(context, x, y, this._lastX, this._lastY, color, width);
        this._points.push({ x: x, y: y, lastX: this._lastX, lastY: this._lastY, color: color, width: width });
        this._lastX = x;
        this._lastY = y;
    }
    resetLastPosition() {
        this._lastX = undefined;
        this._lastY = undefined;
    }
    resetPoints() {
        this._points = [];
    }
    reset() {
        this.resetLastPosition();
        this.resetPoints();
    }
    refresh(context) {
        this._drawAllPoints(context);
    }
}
__decorate([
    mutableArray(() => [])
], SignaturePainter.prototype, "_points", void 0);
__decorate([
    mutable(false)
], SignaturePainter.prototype, "hasPoints", void 0);
