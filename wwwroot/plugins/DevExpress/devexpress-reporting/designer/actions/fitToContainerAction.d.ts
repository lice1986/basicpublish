﻿/**
* DevExpress HTML/JS Reporting (designer\actions\fitToContainerAction.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, SurfaceElementBase } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
export declare class FitToContainerAction {
    private _control;
    private _container;
    constructor(_control: ko.Observable<SurfaceElementBase<ElementViewModel>>);
    doAction(): void;
    allowed(): boolean;
    visible(): boolean;
}
