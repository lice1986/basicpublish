﻿/**
* DevExpress Analytics (property-grid\widgets\guideditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from './editor';
import { guidValidationRules, guidRequiredValidationRules } from './internal/_internal';
export class GuidEditor extends Editor {
    _getEditorValidationRules() {
        var _a;
        return (super._getEditorValidationRules() || []).concat(guidValidationRules).concat(((_a = this.editorOptions) === null || _a === void 0 ? void 0 : _a.isNullable) ? [] : guidRequiredValidationRules);
    }
}
