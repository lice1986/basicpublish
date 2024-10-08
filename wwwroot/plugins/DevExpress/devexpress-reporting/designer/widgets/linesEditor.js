﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\linesEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export class LinesEditor extends Editor {
    constructor() {
        super(...arguments);
        this.collapsed = ko.observable(false);
    }
    _shouldSkipHighlighting(propertyName) {
        return false;
    }
}
