﻿/**
* DevExpress Analytics (analytics-widgets-native.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import './property-grid/widgets/editorsInfo';
import './property-grid/widgets/editor';
import './property-grid/propertygrid';
import { registerNativeDesignerEditors } from './core/widgets/registerDesignerEditors.native';
import { registerBaseEditorsNative } from './property-grid/widgets/registerBaseEdtior.native';
registerBaseEditorsNative();
registerNativeDesignerEditors();
export * from './property-grid/widgets/editorsInfo';
export * from './property-grid/widgets/editor';
export * from './property-grid/propertygrid';
