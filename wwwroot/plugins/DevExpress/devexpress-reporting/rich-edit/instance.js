﻿/**
* DevExpress HTML/JS Reporting (rich-edit\instance.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createGlobalModuleVariableFunc } from '@devexpress/analytics-core/analytics-internal';
import * as richEditInstanceImported from 'devexpress-richedit';
let richEditInstance = richEditInstanceImported;
export const getRichEditInstance = () => richEditInstance;
export function setRichEditInstance(instance) {
    richEditInstance = instance;
}
export const createRichEdit = createGlobalModuleVariableFunc((element, options) => getRichEditInstance().create(element, options));
export const createRichEditOptions = createGlobalModuleVariableFunc(() => getRichEditInstance().createOptions());