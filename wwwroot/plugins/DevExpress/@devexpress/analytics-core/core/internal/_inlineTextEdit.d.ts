﻿/**
* DevExpress Analytics (core\internal\_inlineTextEdit.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { ISelectionProvider } from '../selection/_selection';
export declare class InlineTextEdit extends Disposable {
    private _showInline;
    text: ko.Observable<string> | ko.Computed<string>;
    visible: ko.Observable<boolean> | ko.Computed<boolean>;
    element: HTMLElement;
    keypressAction: any;
    show: any;
    constructor(selection: ISelectionProvider);
}
