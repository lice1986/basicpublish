﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_groupFilterEditorSerializer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FilterEditorSerializer } from '../../../widgets/filtereditor/helpers/_serializer';
import { ColumnExpression } from '../../elements/columnExpression';
import { OperandProperty } from '../../../widgets/criteria/operators/property';
import { CriteriaOperator } from '../../../widgets/criteria/operators/criteriaOperator';
export declare class GroupFilterEditorSerializer extends FilterEditorSerializer {
    private _columns;
    private _columnDisplayName;
    private _findAggregatedColumn;
    private _aggregatePropertyName;
    constructor(_columns: () => ColumnExpression[]);
    serializeOperandProperty(operand: OperandProperty): string;
    deserialize(stringCriteria: string): CriteriaOperator;
}
