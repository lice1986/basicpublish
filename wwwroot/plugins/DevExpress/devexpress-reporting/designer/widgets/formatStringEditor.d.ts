﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\formatStringEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class FormatStringEditor extends Editor {
    get actions(): import("@devexpress/analytics-core/analytics-widgets").IFormatStringEditorActions;
    get customPatterns(): {
        [key: string]: string[];
    };
}
