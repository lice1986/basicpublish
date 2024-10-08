﻿/**
* DevExpress HTML/JS Reporting (designer\controls\getNearestBand.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { isBand } from './utils/_controlTypes';
export function getNearestBand(target) {
    let bandModel = null;
    let model = target;
    do {
        if (isBand(model.controlType))
            bandModel = model;
        model = model.parentModel();
    } while (!bandModel && model);
    return bandModel;
}
