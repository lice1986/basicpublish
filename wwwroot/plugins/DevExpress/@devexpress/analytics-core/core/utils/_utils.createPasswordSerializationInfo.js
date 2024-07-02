﻿/**
* DevExpress Analytics (core\utils\_utils.createPasswordSerializationInfo.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../../property-grid/widgets/editorsInfo';
export function createPasswordSerializationInfo(info, isNew = true) {
    info.editor = editorTemplates.getEditor('text');
    info.editorOptions = { mode: 'password' };
    if (isNew)
        info.editorOptions.inputAttr = { autocomplete: 'new-password' };
    return info;
}
