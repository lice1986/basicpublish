﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_brickUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function convertToPercent(childSize, parentSize) {
    return childSize * 100 / parentSize + '%';
}
export function getBrickValueForKey(brick, key = 'text') {
    const brickTextProperty = brick.content && brick.content.filter(x => x.Key === key)[0];
    return brickTextProperty && brickTextProperty.Value;
}
export function brickText(brick, editingFieldsProvider) {
    const fields = editingFieldsProvider ? editingFieldsProvider() : [];
    if (brick.efIndex && brick.efIndex > 0 && brick.efIndex <= fields.length && fields[brick.efIndex - 1].type() === 'text') {
        return fields[brick.efIndex - 1].getEditValue();
    }
    else {
        return getBrickValueForKey(brick);
    }
}
export function updateBricksPosition(brick, height, width) {
    if (!brick) {
        return;
    }
    brick[brick.rtl ? 'rightP' : 'leftP'] = convertToPercent(brick.left, width);
    brick.widthP = convertToPercent(brick.width, width);
    brick.topP = convertToPercent(brick.top, height);
    brick.heightP = convertToPercent(brick.height, height);
    brick.bricks && brick.bricks.forEach((childBrick) => {
        updateBricksPosition(childBrick, height, width);
    });
}
export function initializeBrick(brick, processClick, editingFieldBricks) {
    if (!brick) {
        return;
    }
    brick.active = false;
    brick['onClick'] = (e) => { processClick && processClick(brick, e); };
    brick.bricks && brick.bricks.forEach(childBrick => {
        if (!childBrick)
            return;
        childBrick.top += brick.top;
        childBrick.left += brick.left;
        initializeBrick(childBrick, processClick, editingFieldBricks);
    });
    if (brick.efIndex > 0) {
        editingFieldBricks.push(brick);
    }
    brick.text = () => brickText(brick);
    brick.accessibleDescription = getBrickValueForKey(brick, 'AccessibleDescription');
}
