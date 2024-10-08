﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CommandId } from 'devexpress-richedit';
import { XRRichTextStreamType } from '../../designer/controls/xrRichText';
import { IToolbarAction } from '../customizeToolbarActions';
export interface IToolbarComponent extends IToolbarAction {
    command?: CommandId;
    title?: string;
}
export declare enum RichAction {
    OpenDocument = 0,
    SaveDocument = 1,
    NewDocument = 2
}
export interface IRichCore {
    commandManager: any;
    model: any;
    viewManager: any;
}
export interface INativeRich {
    core: IRichCore;
}
export interface IRichLoadData {
    dataFormat: XRRichTextStreamType;
    data: string;
    oldText: string;
}
