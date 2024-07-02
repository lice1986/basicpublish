﻿/**
* DevExpress Analytics (core\internal\_globalize.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Globalize } from '../../property-grid/localization/_localization';
import * as localization from 'devextreme/localization';
export function initGlobalize(settings) {
    const globalize = Globalize;
    if (globalize && settings) {
        settings.cldrSupplemental && globalize.load(settings.cldrSupplemental);
        settings.cldrData && globalize.load(settings.cldrData);
        if (settings.currentCulture) {
            globalize.locale(settings.currentCulture);
            localization['locale'] && localization['locale'](settings.currentCulture);
        }
    }
}