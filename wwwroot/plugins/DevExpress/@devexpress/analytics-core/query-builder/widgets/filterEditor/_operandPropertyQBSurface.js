﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_operandPropertyQBSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { OperandPropertySurface } from '../../../widgets/filtereditor/operators/operandPropertySurface';
export class OperandPropertyQBSurface extends OperandPropertySurface {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
    }
    _updateSpecifics() {
        OperandPropertyQBSurface.updateSpecifics(this);
    }
    static updateSpecifics(propertySurface) {
        const fieldList = ko.unwrap(propertySurface.fieldListProvider);
        if (fieldList && fieldList.getColumnInfo) {
            const item = fieldList.getColumnInfo(propertySurface.propertyName());
            if (item) {
                propertySurface.specifics(item.specifics.toLowerCase());
                propertySurface.dataType(item.dataType);
                const _fieldsOptions = ko.unwrap(propertySurface.fieldsOptions);
                if (_fieldsOptions)
                    _fieldsOptions.selected(item);
            }
        }
    }
}
