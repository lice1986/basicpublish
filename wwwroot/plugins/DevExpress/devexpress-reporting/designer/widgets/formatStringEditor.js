﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\formatStringEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import { FormatStringService } from '../services/_formatStringService';
import { formatStringEditorCustomSet } from '../utils/settings';
export class FormatStringEditor extends Editor {
    get actions() { return FormatStringService.actions; }
    get customPatterns() { return formatStringEditorCustomSet(); }
}
