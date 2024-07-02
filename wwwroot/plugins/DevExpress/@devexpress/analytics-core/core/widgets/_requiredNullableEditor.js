﻿/**
* DevExpress Analytics (core\widgets\_requiredNullableEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '../../property-grid/widgets/editor';
import { requiredValidationRules } from '../../property-grid/widgets/internal/_internal';
import { ValueEditorHelper } from '../../widgets/internal/_valueEditorHelper';
import { koUtils } from '../utils/_koUtils';
export class RequiredNullableEditor extends Editor {
    _getEditorValidationRules() {
        var _a;
        return (super._getEditorValidationRules() || []).concat(koUtils.unwrap((_a = this.editorOptions) === null || _a === void 0 ? void 0 : _a.showClearButton) ? [] : requiredValidationRules);
    }
}
export function createNumericEditor(dotNetTypeFullName, specifics) {
    class DynamicNumberEditor extends RequiredNullableEditor {
        getOptions(templateOptions) {
            const options = super.getOptions(templateOptions);
            return ValueEditorHelper.getNumberEditorOptions(dotNetTypeFullName, specifics, options);
        }
    }
    return {
        header: 'dx-number-editor',
        editorType: DynamicNumberEditor
    };
}