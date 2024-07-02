﻿/**
* DevExpress Analytics (core\selection\_selectionHelpers.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { UndoEngine } from '../../undo-engine/undoengine';
export function deleteSelection(selection, selectedObject) {
    const focused = selection.focused();
    if (!selectedObject) {
        selectedObject = focused.getControlModel();
        selection.selectedItems.forEach((item) => {
            const itemModel = item.getControlModel(), parent = itemModel.parentModel();
            if (!item.getControlModel().getMetaData().isDeleteDeny && parent && item !== focused) {
                parent.removeChild(itemModel);
            }
        });
    }
    const undo = UndoEngine.tryGetUndoEngine(selectedObject.parentModel());
    undo && undo.start();
    selectedObject.parentModel().removeChild(selectedObject);
    undo && undo.end();
    selection.focused(focused.findNextSelection());
}
