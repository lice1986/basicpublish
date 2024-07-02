﻿/**
* DevExpress Analytics (query-builder\widgets\masterdetaileditor\_keyColumnSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
export class KeyColumnSurface {
    constructor(column, queryName, _isMaster = false) {
        this._isMaster = _isMaster;
        this.getTitle = () => this._isMaster ? getLocalization('Master Query', 'AnalyticsCoreStringId.Wizard_MasterDetailRelationship_MasterQuery') : getLocalization('Detail Query', 'AnalyticsCoreStringId.Wizard_MasterDetailRelationship_DetailQuery');
        this.isSelected = ko.observable(false);
        this.selectColumnText = () => getLocalization('<Select a Column>', 'DataAccessUIStringId.JoinEditorEmptyColumnText');
        this.column = column;
        this.queryName = queryName;
        this._setColumn = (resultColumn) => {
            this.column(ko.unwrap(resultColumn.name));
        };
    }
}
