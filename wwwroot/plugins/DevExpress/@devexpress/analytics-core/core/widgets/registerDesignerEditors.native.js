﻿/**
* DevExpress Analytics (core\widgets\registerDesignerEditors.native.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../../property-grid/widgets/editorsInfo';
import { GuidEditor } from '../../property-grid/widgets/guideditor';
import { RequiredNullableEditor, createNumericEditor } from './_requiredNullableEditor';
import { ColorPickerEditor } from './colorPickerEditor';
let isRegistered = false;
export function registerNativeDesignerEditors() {
    if (!isRegistered) {
        isRegistered = true;
        editorTemplates.registerEditors({
            guid: { header: 'dxrd-guid', editorType: GuidEditor },
            date: { header: 'dx-date', editorType: RequiredNullableEditor },
            customColorEditor: { header: 'dxrd-colorpicker', editorType: ColorPickerEditor },
            sbyte: createNumericEditor('System.SByte', 'integer'),
            decimal: createNumericEditor('System.Decimal', 'float'),
            int64: createNumericEditor('System.Int64', 'integer'),
            int32: createNumericEditor('System.Int32', 'integer'),
            int16: createNumericEditor('System.Int16', 'integer'),
            single: createNumericEditor('System.Single', 'float'),
            double: createNumericEditor('System.Double', 'float'),
            byte: createNumericEditor('System.Byte', 'integer'),
            uint16: createNumericEditor('System.UInt16', 'integer'),
            uint32: createNumericEditor('System.UInt32', 'integer'),
            uint64: createNumericEditor('System.UInt64', 'integer')
        });
    }
}
