﻿/**
* DevExpress HTML/JS Reporting (rich-edit\registrator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getRichEditSurface, registerRichEditInline } from '../designer/controls/richEdit';
import { XRRichSurface } from '../designer/controls/xrRichTextSurface';
import { getRichEditInstance } from './instance';
import { XRRichModernSurface } from './surface';
import { InlineRichEditControl } from './utils/_inlineControl';
getRichEditSurface(() => {
    const RichEdit = getRichEditInstance();
    return !!RichEdit ? XRRichModernSurface : XRRichSurface;
});
registerRichEditInline((selection) => {
    const RichEdit = getRichEditInstance();
    return !!RichEdit && new InlineRichEditControl(selection);
});
