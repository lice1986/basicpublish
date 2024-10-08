﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\editOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { EditOptions, TextEditOptions } from '../../properties/editOptions';
export const editOptions = {
    propertyName: 'editOptions',
    modelName: 'EditOptions',
    displayName: 'Edit Options', localizationId: 'DevExpress.XtraReports.UI.XRLabel.EditOptions',
    editor: editorTemplates.getEditor('objecteditor'),
    from: (model, serializer) => new EditOptions(model, serializer),
    toJsonObject: (value, serializer) => serializer.serialize(value)
};
export const textEditOptions = extend({}, editOptions, {
    propertyName: 'textEditOptions',
    from: (model, serializer) => new TextEditOptions(model, serializer)
});
