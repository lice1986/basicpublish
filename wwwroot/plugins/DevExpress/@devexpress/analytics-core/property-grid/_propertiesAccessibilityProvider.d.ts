﻿/**
* DevExpress Analytics (property-grid\_propertiesAccessibilityProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from './widgets/editor';
export interface IPropertiesAccessibilityProvider {
    isPropertyVisible(editor: Editor): any;
    isPropertyDisabled(editor: Editor): any;
}
export declare class PropertiesAccessibilityProvider implements IPropertiesAccessibilityProvider {
    isPropertyVisible(editor: Editor): boolean;
    isPropertyDisabled(editor: Editor): any;
    private _calculateAccessibilityByPropertyInfo;
}
export declare const defaultAccessibilityProvider: PropertiesAccessibilityProvider;
