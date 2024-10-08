﻿/**
* DevExpress Analytics (core\snapLines\_snapLinesCollector.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { binaryIndexOf } from '../utils/_arrayutils';
export class SnapLinesCollector {
    constructor() {
        this._verticalSnapLines = [];
        this._horizontalSnapLines = [];
        this._snapTargetToIgnore = null;
    }
    _appendSnapLine(position, limitInf, limitSup, snapLines) {
        const line = {
            position: position,
            limitInf: limitInf,
            limSup: limitSup
        };
        const index = binaryIndexOf(snapLines, line, (a, b) => a.position - b.position);
        if (index > -1) {
            snapLines[index].limitInf = Math.min(snapLines[index].limitInf, limitInf);
            snapLines[index].limSup = Math.max(snapLines[index].limSup, limitSup);
        }
        else {
            snapLines.splice(~index, 0, line);
        }
    }
    _collectSnaplines(parent, parentAbsoluteProsition) {
        this._enumerateCollection(parent, parentAbsoluteProsition, (item, itemAbsoluteRect) => {
            if (item !== this._snapTargetToIgnore) {
                this._appendSnapLine(itemAbsoluteRect.left, itemAbsoluteRect.top, itemAbsoluteRect.bottom, this._verticalSnapLines);
                this._appendSnapLine(itemAbsoluteRect.right, itemAbsoluteRect.top, itemAbsoluteRect.bottom, this._verticalSnapLines);
                this._appendSnapLine(itemAbsoluteRect.top, itemAbsoluteRect.left, itemAbsoluteRect.right, this._horizontalSnapLines);
                this._appendSnapLine(itemAbsoluteRect.bottom, itemAbsoluteRect.left, itemAbsoluteRect.right, this._horizontalSnapLines);
                this._collectSnaplines(item, itemAbsoluteRect);
            }
        });
    }
    _getCollection(parent) {
        return parent['controls'] && parent['controls']();
    }
    _enumerateCollection(parent, parentAbsoluteProsition, callback) {
        const collection = this._getCollection(parent);
        if (!collection)
            return;
        for (let i = 0; i < collection.length; i++) {
            const itemRect = collection[i].rect && collection[i].rect();
            if (itemRect) {
                callback(collection[i], {
                    top: itemRect.top + parentAbsoluteProsition.top,
                    bottom: itemRect.bottom + parentAbsoluteProsition.top,
                    left: itemRect.left + parentAbsoluteProsition.left,
                    right: itemRect.right + parentAbsoluteProsition.left
                });
            }
        }
    }
    collectSnaplines(root, snapTargetToIgnore) {
        this._snapTargetToIgnore = snapTargetToIgnore;
        this._verticalSnapLines.splice(0);
        this._horizontalSnapLines.splice(0);
        this._collectSnaplines(root, { top: 0, left: 0 });
        return {
            vertical: this._verticalSnapLines,
            horizontal: this._horizontalSnapLines
        };
    }
}
