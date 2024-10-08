﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_spaceCommandHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class SpaceCommandHandler {
    constructor(selectionProvider, surfaceContext) {
        this._selectionProvider = selectionProvider;
        this._surfaceContext = surfaceContext;
    }
    _comparer(propertyName) {
        return (a, b) => {
            return a.rect()[propertyName] - b.rect()[propertyName];
        };
    }
    _spaceIncrease(sign, isHoriz) {
        const sortedSelectedItems = this._selectionProvider.selectedItems.filter((item) => { return !item.locked; }), axisProperty = isHoriz ? 'left' : 'top', lengthProperty = isHoriz ? 'width' : 'height', margin = isHoriz ? this._surfaceContext().margins.left() : 0, snapGridSize = this._surfaceContext().snapGridSize(), focusedParent = this._selectionProvider.focused().getControlModel().parentModel(), focusedItem = this._selectionProvider.focused();
        sortedSelectedItems.sort(this._comparer(axisProperty));
        const focusedItemIndex = sortedSelectedItems.indexOf(this._selectionProvider.focused());
        this._selectionProvider.selectedItems.filter((item) => { return !item.locked; }).filter((item) => { return item !== focusedItem && item.getControlModel().parentModel() === focusedParent; }).forEach((item) => {
            const itemIndex = sortedSelectedItems.indexOf(item), spaceOffset = Math.abs(itemIndex - focusedItemIndex) * snapGridSize * sign, itemAxisProperty = item.rect()[axisProperty], itemLengthProperty = item.rect()[lengthProperty], parentLengthProperty = item.parent.rect()[lengthProperty] - margin;
            let newValue;
            if (itemIndex < focusedItemIndex) {
                newValue = itemAxisProperty - spaceOffset;
                if (newValue < 0) {
                    newValue = 0;
                }
            }
            else {
                newValue = itemAxisProperty + spaceOffset;
                if ((newValue + itemLengthProperty) > parentLengthProperty) {
                    newValue = parentLengthProperty - itemLengthProperty;
                }
            }
            const val = {};
            val[axisProperty] = newValue;
            item.rect(val);
        });
    }
    _spaceMakeEqual(isHoriz) {
        this._concatenateWithSpace(isHoriz, (sortedSelectedItems, axisProperty, lengthProperty) => {
            let averageSpace = 0;
            for (let i = 0; i < sortedSelectedItems.length - 1; i++) {
                const currentValue = sortedSelectedItems[i + 1].rect()[axisProperty] - (sortedSelectedItems[i].rect()[axisProperty] + sortedSelectedItems[i].rect()[lengthProperty]);
                averageSpace = (averageSpace * i + currentValue) / (i + 1);
            }
            return averageSpace;
        });
    }
    _concatenateWithSpace(isHoriz, getSpaceSize) {
        const sortedSelectedItems = this._selectionProvider.selectedItems.filter((item) => { return !item.locked; }), axisProperty = isHoriz ? 'left' : 'top', lengthProperty = isHoriz ? 'width' : 'height', focusedParent = this._selectionProvider.focused().getControlModel().parentModel();
        sortedSelectedItems.sort(this._comparer(axisProperty));
        const spaceSize = getSpaceSize(sortedSelectedItems, axisProperty, lengthProperty);
        this._selectionProvider.selectedItems.filter((item) => { return !item.locked; }).filter((item) => { return focusedParent === item.getControlModel().parentModel(); }).forEach((item) => {
            const itemIndex = sortedSelectedItems.indexOf(item);
            if (itemIndex > 0) {
                const prevControl = sortedSelectedItems[itemIndex - 1], val = {};
                val[axisProperty] = prevControl.rect()[axisProperty] + prevControl.rect()[lengthProperty] + spaceSize;
                item.rect(val);
            }
        });
    }
    horizSpaceConcatenate() {
        this._concatenateWithSpace(true, () => { return 0; });
    }
    vertSpaceConcatenate() {
        this._concatenateWithSpace(false, () => { return 0; });
    }
    horizSpaceMakeEqual() {
        this._spaceMakeEqual(true);
    }
    vertSpaceMakeEqual() {
        this._spaceMakeEqual(false);
    }
    horizSpaceDecrease() {
        this._spaceIncrease(-1, true);
    }
    horizSpaceIncrease() {
        this._spaceIncrease(1, true);
    }
    vertSpaceDecrease() {
        this._spaceIncrease(-1, false);
    }
    vertSpaceIncrease() {
        this._spaceIncrease(1, false);
    }
}
