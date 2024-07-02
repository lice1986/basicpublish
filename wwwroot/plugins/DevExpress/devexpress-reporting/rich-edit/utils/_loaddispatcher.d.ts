﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_loaddispatcher.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { XRRichEditControlModel } from './_model';
import { RichAction } from './_utils';
interface DispatcherData {
    queueAction: RichAction;
    ready: () => void;
    documentConverted: (result: string) => void;
    documentFormat: any;
    base64: any;
    errorCallBack: () => void;
}
export declare class RichEditLoadDispatcher extends Disposable {
    protected richEdit: XRRichEditControlModel;
    constructor(richEdit: XRRichEditControlModel);
    process(element: DispatcherData): void;
}
export {};