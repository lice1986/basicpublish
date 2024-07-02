﻿/**
* DevExpress Analytics (core\internal\_processTextEditorHotKeys.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { KeyboardEnum } from '../../property-grid/widgets/internal/_utils';
export function processTextEditorHotKeys(event, delegates) {
    if (!event || !delegates)
        return;
    if (event.key === KeyboardEnum.Esc && !!delegates['esc']) {
        delegates['esc']();
    }
    if (event.key === KeyboardEnum.Enter && event.ctrlKey && !!delegates['ctrlEnter']) {
        delegates['ctrlEnter']();
    }
}
