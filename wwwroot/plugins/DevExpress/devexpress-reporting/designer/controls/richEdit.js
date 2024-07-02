﻿/**
* DevExpress HTML/JS Reporting (designer\controls\richEdit.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createGlobalModuleVariableFunc } from '@devexpress/analytics-core/analytics-internal';
import { XRRichSurface } from './xrRichTextSurface';
export const getRichEditSurface = createGlobalModuleVariableFunc(() => XRRichSurface);
export const registerRichEditInline = createGlobalModuleVariableFunc((selection) => void 0);