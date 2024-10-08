﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_storedProceduresQueryControl.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { Disposable } from '../../../serializer/disposable';
import { StoredProcQuery } from '../../dataSource/sql/storedProcQuery';
import { DBStoredProcedureArgumentDirection } from '../../dataSource/dbStoredProcedure';
import { getFirstItemByPropertyValue } from '../../../core/utils/_arrayutils';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { DataSourceParameter } from '../../dataSource/dataSourceParameter';
import { DBColumn } from '../../dataSource/dbColumn';
import { storedProcParameterSerializationsInfo } from '../../dataSource/dataSourceParameterMeta';
export class StoredProceduresQueryControl extends Disposable {
    constructor() {
        super();
        this.template = 'dxrd-procedures-control';
        this.storedProcedures = ko.observableArray([]);
        this.selectedProcedure = ko.observableArray([]);
        this.caption = () => getLocalization('Select a stored procedure:', 'DataAccessUIStringId.StoredProcControl_Caption');
        this.generateStoredProcedureDisplayName = procedure => StoredProceduresQueryControl.generateStoredProcedureDisplayName(procedure);
        this.isNextDisabled = ko.pureComputed(() => {
            return !this._selectedProcedure || !this._needToProcessParameters(this._selectedProcedure);
        });
        this.isFinishDisabled = ko.pureComputed(() => {
            return !this._selectedProcedure || this._needToProcessParameters(this._selectedProcedure);
        });
        this.storedProcedures.subscribe((newProcedures) => {
            if (!newProcedures) {
                this._selectedProcedure = null;
            }
            else if (this._selectedProcedure) {
                this._selectedProcedure = getFirstItemByPropertyValue(this.storedProcedures(), 'name', this._selectedProcedure.name);
            }
            else if (this._query && this._query.procName()) {
                this._selectedProcedure = getFirstItemByPropertyValue(this.storedProcedures(), 'name', this._query.procName());
            }
            else {
                this._selectedProcedure = newProcedures[0];
            }
        });
    }
    _needToProcessParameters(procedure) {
        return procedure.arguments.some(StoredProceduresQueryControl._availableConvertToParameter);
    }
    static _availableConvertToParameter(arg) {
        return arg.direction !== DBStoredProcedureArgumentDirection.Out;
    }
    get _selectedProcedure() {
        return this.selectedProcedure()[0];
    }
    set _selectedProcedure(value) {
        this.selectedProcedure(value ? [value] : []);
    }
    scrollActiveItem(e) {
        const model = e.model;
        const procedure = model.selectedProcedure.peek();
        e.component.scrollToItem(procedure[0]);
    }
    static generateStoredProcedureDisplayName(procedure) {
        if (procedure.arguments.length === 0)
            return procedure.name;
        return procedure.arguments.reduce((value, item, index, array) => {
            return value += item.name + (index < array.length - 1 ? ', ' : ')');
        }, procedure.name + '(');
    }
    setQuery(query) {
        this._query = query;
        this._selectedProcedure = getFirstItemByPropertyValue(this.storedProcedures(), 'name', query.procName());
        return $.Deferred().resolve().promise();
    }
    getQuery() {
        if (!this._selectedProcedure)
            return null;
        const newQuery = new StoredProcQuery({ '@Name': this._query.name() || this._selectedProcedure.name, 'ProcName': this._selectedProcedure.name }, this._query.parent);
        this._selectedProcedure.arguments.forEach((arg) => {
            if (StoredProceduresQueryControl._availableConvertToParameter(arg)) {
                newQuery.parameters.push(getFirstItemByPropertyValue(this._query.parameters(), 'name', arg.name) || new DataSourceParameter({ '@Name': arg.name, '@Type': DBColumn.GetType(arg.type) }, null, storedProcParameterSerializationsInfo(DBColumn.GetType(arg.type))));
            }
        });
        return newQuery;
    }
    get runQueryBuilderDisabled() {
        return true;
    }
}
