﻿/**
* DevExpress HTML/JS Reporting (designer\actions\pivotGridActions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { BaseConverter } from '../internal/_baseConverter';
export declare class PivotGridActions extends BaseActionsProvider {
    private _converters;
    get _converter(): BaseConverter;
    constructor(_converters: BaseConverter[], isDisabled?: () => boolean);
    condition(context: any): boolean;
}
