﻿/**
* DevExpress Analytics (query-builder\elements\parameterModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceParameter } from '../dataSource/dataSourceParameter';
import { IsDataAccessExpression, getEditorType } from '../../core/internal/_editorTypeMapper';
export class ParameterViewModel extends DataSourceParameter {
    getEditorType(type) {
        if (IsDataAccessExpression(type))
            return { header: 'dxqb-expressionstring' };
        return getEditorType(type);
    }
}
