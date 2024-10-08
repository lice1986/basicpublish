﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_tableComponentSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRTextControlSurfaceBase } from '../xrTextControl';
export var TableActionDirection;
(function (TableActionDirection) {
    TableActionDirection[TableActionDirection["vertical"] = 0] = "vertical";
    TableActionDirection[TableActionDirection["horizontal"] = 1] = "horizontal";
})(TableActionDirection || (TableActionDirection = {}));
export class TableComponentSurface extends XRTextControlSurfaceBase {
    _getNeededProperties(rect) {
        if (this.direction === TableActionDirection.vertical) {
            return {
                positionProperty: rect.top === undefined ? this.rect().top : rect.top,
                secondaryPositionProperty: rect.bottom,
                sizeProperty: rect.height
            };
        }
        else {
            return {
                positionProperty: rect.left === undefined ? this.rect().left : rect.left,
                secondaryPositionProperty: rect.right,
                sizeProperty: rect.width
            };
        }
    }
    _generateRect(rect, result) {
        if (this.direction === TableActionDirection.vertical) {
            rect.top = result.positionProperty === undefined ? rect.top : result.positionProperty;
            rect.bottom = result.secondaryPositionProperty === undefined ? rect.bottom : result.secondaryPositionProperty;
            rect.height = result.sizeProperty === undefined ? rect.height : result.sizeProperty;
        }
        else {
            rect.left = result.positionProperty === undefined ? rect.left : result.positionProperty;
            rect.right = result.secondaryPositionProperty === undefined ? rect.right : result.secondaryPositionProperty;
            rect.width = result.sizeProperty === undefined ? rect.width : result.sizeProperty;
            delete rect.height;
        }
        return rect;
    }
    beforeRectUpdated(rect) {
        const incomingRect = this._getNeededProperties(rect);
        const currentRect = this._getNeededProperties(this.rect());
        const model = this.getControlModel();
        const parentModel = this.parent.getControlModel();
        if (incomingRect.secondaryPositionProperty !== undefined) {
            incomingRect.positionProperty = currentRect.positionProperty;
            incomingRect.sizeProperty = incomingRect.secondaryPositionProperty < incomingRect.positionProperty ? 0
                : incomingRect.secondaryPositionProperty - incomingRect.positionProperty;
        }
        if (incomingRect.positionProperty > currentRect.secondaryPositionProperty) {
            incomingRect.positionProperty = currentRect.secondaryPositionProperty;
            return this._generateRect(rect, incomingRect);
        }
        if (incomingRect.sizeProperty === undefined) {
            incomingRect.sizeProperty = currentRect.sizeProperty + currentRect.positionProperty - incomingRect.positionProperty;
        }
        const childCollectionName = this.parent._getChildrenHolderName();
        const positionRedused = parseInt(currentRect.positionProperty) > incomingRect.positionProperty;
        const sizeIncreased = parseInt(currentRect.sizeProperty) < incomingRect.sizeProperty && !positionRedused;
        const position = parentModel[childCollectionName]().indexOf(model);
        if (position !== 0 && positionRedused) {
            const prevElementRect = this._getNeededProperties(parentModel[childCollectionName]()[position - 1].surface.rect());
            if (prevElementRect.positionProperty > incomingRect.positionProperty) {
                incomingRect.sizeProperty -= (prevElementRect.positionProperty - incomingRect.positionProperty);
                incomingRect.positionProperty = prevElementRect.positionProperty;
            }
        }
        if (sizeIncreased && position !== parentModel[childCollectionName]().length - 1) {
            const nextElementRect = this._getNeededProperties(parentModel[childCollectionName]()[position + 1].surface.rect());
            if (nextElementRect.secondaryPositionProperty < incomingRect.positionProperty + incomingRect.sizeProperty) {
                incomingRect.sizeProperty = nextElementRect.secondaryPositionProperty - incomingRect.positionProperty;
            }
        }
        return this._generateRect(rect, incomingRect);
    }
}
