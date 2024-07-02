﻿/**
* DevExpress HTML/JS Reporting (rich-edit\customizeToolbarActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createGlobalModuleVariableFunc } from '@devexpress/analytics-core/analytics-internal';
import { EventManager } from '@devexpress/analytics-core/analytics-utils';
export const ToolbarActionId = {
    ParagraphAlignmentButtonGroup: 'dxxrta-buttongroup-paragraph-alignment',
    HyperlinkButton: 'dxxrta-button-hyperlink',
    ClearFormattingButton: 'dxxrta-button-clear-formatting',
    FontStyleButtonGroup: 'dxxrta-buttongroup-toggle-font',
    ToggleCaseButton: 'dxxrta-button-text-case',
    FontSizeComboBox: 'dxxrta-combobox-text-size',
    FontComboBox: 'dxxrta-combobox-font',
    FontColorBox: 'dxxrta-colorbox-font',
    BackgroundColorBox: 'dxxrta-colorbox-background',
};
export const ToolbarGroupId = {
    AlignmentAndFormatting: 'dxxrtg-buttons-first',
    FontStyleAndCase: 'dxxrtg-buttons-second',
    FontSize: 'dxxrtg-font-size',
    Font: 'dxxrtg-font-family',
    FontColor: 'dxxrtg-text-color',
    BackgroundColor: 'dxxrtg-back-color',
};
export const events = createGlobalModuleVariableFunc(new EventManager());
