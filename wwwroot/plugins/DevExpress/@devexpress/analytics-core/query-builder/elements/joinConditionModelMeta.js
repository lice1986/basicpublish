﻿/**
* DevExpress Analytics (query-builder\elements\joinConditionModelMeta.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../widgets/editorTemplates';
export const ConditionType = {
    Equal: 'Equal',
    NotEqual: 'NotEqual',
    Greater: 'Greater',
    GreaterOrEqual: 'GreaterOrEqual',
    Less: 'Less',
    LessOrEqual: 'LessOrEqual'
};
export const joinConditionSerializationInfo = [
    { propertyName: 'left', displayName: 'Left', editor: editorTemplates.getEditor('text'), disabled: true, localizationId: 'AnalyticsCoreStringId.QueryBuilder_LeftOperand' },
    { propertyName: 'right', displayName: 'Right', editor: editorTemplates.getEditor('text'), disabled: true, localizationId: 'AnalyticsCoreStringId.QueryBuilder_RightOperand' },
    { propertyName: 'parentColumnName', modelName: '@Parent' },
    { propertyName: 'nestedColumnName', modelName: '@Nested' },
    {
        propertyName: 'joinType',
        displayName: 'Join Type',
        editor: editorTemplates.getEditor('combobox'),
        defaultVal: 'Inner',
        valuesArray: [
            { value: 'Inner', displayValue: 'Inner join', localizationId: 'DataAccessStringId.RelationEditorRelationTypeInnerJoin' },
            { value: 'LeftOuter', displayValue: 'Left outer join', localizationId: 'DataAccessStringId.RelationEditorRelationTypeLeftOuterJoin' },
            { value: 'RightOuter', displayValue: 'Right outer join', localizationId: 'DataAccessStringId.RelationEditorRelationTypeRightOuterJoin' },
            { value: 'FullOuter', displayValue: 'Full outer join', localizationId: 'DataAccessStringId.RelationEditorRelationTypeFullOuterJoin' },
        ],
        localizationId: 'AnalyticsCoreStringId.QueryBuilder_JoinType'
    },
    {
        propertyName: 'operator',
        modelName: '@Operator',
        displayName: 'Operator',
        editor: editorTemplates.getEditor('combobox'),
        defaultVal: ConditionType.Equal,
        valuesArray: [
            { value: 'Equal', displayValue: 'Equals to', localizationId: 'DataAccessUIStringId.JoinEditorEqualOperator' },
            { value: 'NotEqual', displayValue: 'Does not equal to', localizationId: 'DataAccessUIStringId.JoinEditorNotEqualOperator' },
            { value: 'Greater', displayValue: 'Is greater than', localizationId: 'DataAccessUIStringId.JoinEditorGreaterOperator' },
            { value: 'GreaterOrEqual', displayValue: 'Is greater than or equal to', localizationId: 'DataAccessUIStringId.JoinEditorGreaterOrEqualOperator' },
            { value: 'Less', displayValue: 'Is less than', localizationId: 'DataAccessUIStringId.JoinEditorLessOperator' },
            { value: 'LessOrEqual', displayValue: 'Is less than or equal to', localizationId: 'DataAccessUIStringId.JoinEditorLessOrEqualOperator' }
        ],
        localizationId: 'AnalyticsCoreStringId.QueryBuilder_Operator'
    },
    { propertyName: 'itemType', modelName: '@itemType' }
];
