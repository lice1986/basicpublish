﻿/**
* DevExpress Analytics (widgets\ace\_ace_theme.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { isDarkTheme } from '../_utils';
export function defineAceThemes(ace) {
    ace.define('ace/theme/dreamweaver', ['require', 'exports', 'module'], function (require, exports, module) {
        'use strict';
        module.isDark = false;
        module.cssClass = 'ace-dreamweaver';
        return module;
    });
    ace.define('ace/theme/ambiance', ['require', 'exports', 'module'], function (require, exports, module) {
        'use strict';
        module.isDark = true;
        module.cssClass = 'ace-ambiance';
        return module;
    });
}
export function getAceThemeName(theme) {
    if (theme && theme.indexOf('/') !== -1) {
        return theme.split('/').pop();
    }
    return isDarkTheme() ? 'ambiance' : 'dreamweaver';
}
