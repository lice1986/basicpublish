﻿/**
* DevExpress Analytics (core\widgets\_popupEditorBase.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
export declare class PopupEditorBase extends Disposable {
    protected _disableSaveButton: ko.PureComputed<boolean>;
    protected _createMainPopupButtons(): void;
    constructor();
    canSave(): boolean;
    save(sender?: any): void;
    close(): void;
    get cancelLocalization(): any;
    get saveLocalization(): any;
    popupVisible: ko.Observable<boolean>;
    buttonItems: any[];
}
