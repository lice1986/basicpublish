﻿/**
* DevExpress Analytics (query-builder\widgets\_rightPanelSwitcher.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
interface IRightPanelSwitcher {
    visible: ko.PureComputed<boolean>;
    toogle: () => void;
    title: string;
    disabled: ko.Subscribable<boolean>;
}
export declare class RightPanelSwitcher extends Disposable implements IRightPanelSwitcher {
    private editableObj;
    private getDisplayName;
    private _collapsed;
    constructor(collapsed: ko.Subscribable<boolean>, editableObj: ko.Observable<any>, visibleCondition: (model: any) => boolean, getDisplayName: (editableObj: ko.Observable<any>) => string);
    visible: ko.PureComputed<boolean>;
    dispose(): void;
    toogle(): void;
    get title(): string;
    disabled: ko.Subscribable<boolean>;
}
export {};
