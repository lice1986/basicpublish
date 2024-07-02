﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\calculatedField.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { nameValidationRules } from '@devexpress/analytics-core/analytics-internal';
import { fromEnum } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { dataMember, dataSource, displayName } from '../../controls/metadata/properties/metadata';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
const calculatedFieldScriptsInfo = [
    { propertyName: 'onGetValue', modelName: '@OnGetValue', displayName: 'Get a Value', localizationId: 'DevExpress.XtraReports.UI.CalculatedFieldScripts.OnGetValue', editor: designerEditorTemplates.getEditor('scriptsBox') }
];
export const calculatedFieldScripts = { propertyName: 'scripts', modelName: 'Scripts', displayName: 'Scripts', localizationId: 'DevExpress.XtraReports.UI.CalculatedField.Scripts', info: calculatedFieldScriptsInfo, editor: editorTemplates.getEditor('objecteditor') };
export const calculatedFieldExpression = { propertyName: 'calcExpressionObj', displayName: 'Expression', localizationId: 'DevExpress.XtraReports.UI.CalculatedField.Expression', editor: editorTemplates.getEditor('expressionEditor') };
export const calculatedFieldSerializationInfo = [
    { propertyName: 'calculatedFieldName', modelName: '@Name' },
    { propertyName: 'nameEditable', displayName: 'Name', validationRules: nameValidationRules, editor: designerEditorTemplates.getEditor('name'), localizationId: 'DevExpress.XtraReports.UI.XRControl.Name' },
    displayName,
    {
        propertyName: 'fieldType', modelName: '@FieldType', displayName: 'Field Type', localizationId: 'DevExpress.XtraReports.UI.CalculatedField.FieldType', editor: editorTemplates.getEditor('combobox'), defaultVal: 'None', from: fromEnum,
        valuesArray: [
            { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.FieldType.None' },
            { value: 'String', displayValue: 'String', localizationId: 'DevExpress.XtraReports.UI.FieldType.String' },
            { value: 'DateTime', displayValue: 'DateTime', localizationId: 'DevExpress.XtraReports.UI.FieldType.DateTime' },
            { value: 'TimeSpan', displayValue: 'TimeSpan', localizationId: 'DevExpress.XtraReports.UI.FieldType.TimeSpan' },
            { value: 'Byte', displayValue: 'Byte', localizationId: 'DevExpress.XtraReports.UI.FieldType.Byte' },
            { value: 'Int16', displayValue: 'Int16', localizationId: 'DevExpress.XtraReports.UI.FieldType.Int16' },
            { value: 'Int32', displayValue: 'Int32', localizationId: 'DevExpress.XtraReports.UI.FieldType.Int32' },
            { value: 'Float', displayValue: 'Float', localizationId: 'DevExpress.XtraReports.UI.FieldType.Float' },
            { value: 'Double', displayValue: 'Double', localizationId: 'DevExpress.XtraReports.UI.FieldType.Double' },
            { value: 'Decimal', displayValue: 'Decimal', localizationId: 'DevExpress.XtraReports.UI.FieldType.Decimal' },
            { value: 'Boolean', displayValue: 'Boolean', localizationId: 'DevExpress.XtraReports.UI.FieldType.Boolean' }
        ]
    },
    dataSource,
    dataMember,
    { propertyName: 'expression', modelName: '@Expression', displayName: 'Expression', localizationId: 'DevExpress.XtraReports.UI.CalculatedField.Expression', defaultVal: '' },
    calculatedFieldExpression,
    calculatedFieldScripts
];