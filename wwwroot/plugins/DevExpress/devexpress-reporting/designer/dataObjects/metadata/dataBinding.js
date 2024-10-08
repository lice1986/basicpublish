﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\dataBinding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { DataBinding } from '../dataBinding';
import { dataBindingSerializationInfo } from './dataBindingInfo';
export const dataBindings = (dataBindingsArray) => {
    return {
        propertyName: 'dataBindings',
        modelName: 'DataBindings',
        array: true,
        info: dataBindingSerializationInfo,
        displayName: 'Data Bindings', localizationId: 'DevExpress.XtraReports.UI.XRControl.DataBindings',
        editor: designerEditorTemplates.getEditor('dataBindings'),
        allDataBindings: dataBindingsArray,
        from: DataBinding.initialize
    };
};
