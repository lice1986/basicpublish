﻿/**
* DevExpress Analytics (core\snapLines\_snapLinesHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SnapLinesCollector } from './_snapLinesCollector';
import { SnapLineSurface } from './_snapLineSurface';
import { binaryIndexOf } from '../utils/_arrayutils';
export class SnapLinesHelper {
    constructor(surface = null, snapTolerance = SnapLinesHelper.snapTolerance, snapLinesCollector = new SnapLinesCollector()) {
        this.snapLineSurfaces = [new SnapLineSurface(), new SnapLineSurface(), new SnapLineSurface(), new SnapLineSurface()];
        this.verticalSnapLines = [];
        this.horizontalSnapLines = [];
        this._surfaceContext = surface;
        this._snapTolerance = snapTolerance;
        this._snapLinesCollector = snapLinesCollector;
    }
    _findClosestSnapLine(position, snapLines) {
        const line = {
            position: position,
            limitInf: 0,
            limSup: 0
        };
        let index = binaryIndexOf(snapLines, line, (a, b) => a.position - b.position);
        let snapLineCandidate;
        if (index > -1) {
            snapLineCandidate = {
                snapLine: snapLines[index],
                distance: position - snapLines[index].position
            };
        }
        else {
            index = ~index;
            const delta1 = snapLines[index] ? (position - snapLines[index].position) : Number.MAX_VALUE;
            const delta2 = snapLines[index - 1] ? (position - snapLines[index - 1].position) : Number.MAX_VALUE;
            snapLineCandidate = Math.abs(delta1) > Math.abs(delta2) ?
                { snapLine: snapLines[index - 1], distance: delta2 } :
                { snapLine: snapLines[index], distance: delta1 };
        }
        return snapLineCandidate;
    }
    _getActiveSnapLines(position1, position2, snapLines) {
        const line1 = this._findClosestSnapLine(position1, snapLines);
        const line2 = this._findClosestSnapLine(position2, snapLines);
        const result = {
            lines: [],
            distance: 0
        };
        if (Math.abs(line1.distance - line2.distance) >= 1) {
            const line = Math.abs(line1.distance) < Math.abs(line2.distance) ? line1 : line2;
            if (Math.abs(line.distance) <= this._snapTolerance) {
                result.lines = [line];
                result.distance = line.distance;
            }
        }
        else if (Math.abs(line1.distance) <= this._snapTolerance) {
            result.lines = [line1, line2];
            result.distance = line1.distance;
        }
        return result;
    }
    updateSnapLines(snapTargetToIgnore = null) {
        this.verticalSnapLines.splice(0);
        this.horizontalSnapLines.splice(0);
        const result = this._snapLinesCollector.collectSnaplines(this._surfaceContext(), snapTargetToIgnore);
        this.verticalSnapLines.push.apply(this.verticalSnapLines, result.vertical);
        this.horizontalSnapLines.push.apply(this.horizontalSnapLines, result.horizontal);
    }
    deactivateSnapLines() {
        this.snapLineSurfaces[0].reset();
        this.snapLineSurfaces[1].reset();
        this.snapLineSurfaces[2].reset();
        this.snapLineSurfaces[3].reset();
    }
    activateSnapLines(position) {
        const vertical = this._getActiveSnapLines(position.left, position.right, this.verticalSnapLines);
        const horizontal = this._getActiveSnapLines(position.top, position.bottom, this.horizontalSnapLines);
        for (let i = 0; i < 2; i++) {
            const line = vertical.lines[i];
            if (!line) {
                this.snapLineSurfaces[i].reset();
            }
            else {
                let top = Math.min(line.snapLine.limitInf, position.top);
                let bottom = Math.max(line.snapLine.limSup, position.bottom);
                if (position.top < line.snapLine.limitInf) {
                    top -= horizontal.distance;
                }
                if (position.bottom > line.snapLine.limSup) {
                    bottom -= horizontal.distance;
                }
                this.snapLineSurfaces[i].updatePosition({
                    top: top,
                    left: line.snapLine.position,
                    height: bottom - top,
                    width: 1
                });
            }
        }
        for (let i = 0; i < 2; i++) {
            const line = horizontal.lines[i];
            if (!line) {
                this.snapLineSurfaces[i + 2].reset();
            }
            else {
                let left = Math.min(line.snapLine.limitInf, position.left);
                let right = Math.max(line.snapLine.limSup, position.right);
                if (position.left < line.snapLine.limitInf) {
                    left -= vertical.distance;
                }
                if (position.right > line.snapLine.limSup) {
                    right -= vertical.distance;
                }
                this.snapLineSurfaces[i + 2].updatePosition({
                    top: line.snapLine.position,
                    left: left,
                    width: right - left,
                    height: 1
                });
            }
        }
        return {
            left: vertical.distance,
            top: horizontal.distance
        };
    }
    snapPosition(position, horizontal) {
        const line = this._findClosestSnapLine(position, horizontal ? this.horizontalSnapLines : this.verticalSnapLines);
        return (line && Math.abs(line.distance) <= this._snapTolerance) ? line.snapLine.position : position;
    }
}
SnapLinesHelper.snapTolerance = 10;
