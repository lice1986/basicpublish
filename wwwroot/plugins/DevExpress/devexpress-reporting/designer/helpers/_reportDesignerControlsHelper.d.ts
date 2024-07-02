﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_reportDesignerControlsHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDesignControlsHelper, IDisplayedObject } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DesignControlsHelper } from './_designControlsHelper';
export declare class ReportDesignerControlsHelper extends Disposable implements IDesignControlsHelper {
    constructor(helper: ko.Computed<DesignControlsHelper>);
    getControls: (target: any) => ko.ObservableArray<IDisplayedObject>;
    allControls: any;
    getControlByName: (name: string) => IDisplayedObject;
}