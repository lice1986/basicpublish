﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\watermarkIdEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { NameEditor } from './nameEditor';
import { WatermarkModel } from '../controls/properties/watermark';
export class WatermarkIdEditor extends NameEditor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
    }
    _filterControls(allControls) {
        return allControls.filter(x => x instanceof WatermarkModel);
    }
}
