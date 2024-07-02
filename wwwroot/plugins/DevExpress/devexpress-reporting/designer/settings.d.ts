﻿/**
* DevExpress HTML/JS Reporting (designer\settings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IGlobalSubscribableValue } from '@devexpress/analytics-core/analytics-internal';
export interface IPropertyGridSettings {
    QuickActionsVisible: IGlobalSubscribableValue<boolean>;
    TaskGroupVisible: IGlobalSubscribableValue<boolean>;
}
export declare const PropertyGrid: IPropertyGridSettings;
export declare const SmartTagsEnabled: IGlobalSubscribableValue<boolean>;
export declare const ContextMenusEnabled: IGlobalSubscribableValue<boolean>;
