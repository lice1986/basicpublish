﻿/**
* DevExpress Analytics (query-builder\wizard\pages\multiQueryWizard\masterDetailRelationshipsPageBase.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { ResultSet } from '../../../dataSource/resultSet';
import { subscribeArray, subscribeProperties } from '../../internal/_utils';
import { MasterDetailEditor } from '../../../widgets/masterdetaileditor/_masterDetailEditor';
import { getErrorMessage, ShowMessage } from '../../../../core/utils/_infoMessageHelpers';
import { WizardPageBase } from '../wizardPageBase';
export class MasterDetailRelationshipsPageBase extends WizardPageBase {
    constructor(_getResultSchema) {
        super();
        this._getResultSchema = _getResultSchema;
        this._relations = ko.observableArray([]);
        this._customResetOptions = $.noop;
        this._relationsEditor = ko.observable(null);
        const callback = () => this._onChange();
        this._disposables.push(subscribeArray(this._relations, (relation) => {
            relation._disposables.push(...subscribeProperties([relation.detailQuery, relation.name, relation.masterQuery], callback));
            relation._disposables.push(subscribeArray(relation.keyColumns, (column) => {
                relation._disposables.push(...subscribeProperties([column.detailColumn, column.masterColumn], callback));
            }, callback));
        }, callback));
    }
    _getResultSet(dataSource) {
        const deferred = $.Deferred();
        if (dataSource.resultSet) {
            deferred.resolve((dataSource.resultSet));
        }
        else {
            this._getResultSchema(dataSource).done(((result) => {
                deferred.resolve(new ResultSet(JSON.parse(result.resultSchemaJSON)));
            })).fail(result => {
                deferred.reject(result);
            });
        }
        return deferred.promise();
    }
    _dataSource() {
        return null;
    }
    _restoreDataSource(state) {
    }
    _updateRelations() {
        const relations = this._relations();
        relations.forEach((relation, index) => {
            const detailTable = this._resultSet.tables().filter(table => table.tableName() === relation.detailQuery())[0];
            const masterTable = this._resultSet.tables().filter(table => table.tableName() === relation.masterQuery())[0];
            if (!detailTable || !masterTable) {
                relations.splice(index, 1);
                return;
            }
            const keyColumns = relation.keyColumns();
            keyColumns.forEach((keyColumn, index) => {
                if (detailTable.columns().every(x => x.name() !== keyColumn.detailColumn()) ||
                    masterTable.columns().every(x => x.name() !== keyColumn.masterColumn()))
                    keyColumns.splice(index, 1);
            });
            if (keyColumns.length === 0)
                relations.splice(index, 1);
        });
        this._relations.valueHasMutated();
    }
    canNext() {
        return false;
    }
    canFinish() {
        return this._relations().every(relation => relation.keyColumns()
            .every(keyColumn => !!keyColumn.detailColumn() && !!keyColumn.masterColumn()));
    }
    initialize(state) {
        this.relationsSubscription && this.relationsSubscription.dispose();
        this._restoreDataSource(state);
        this._disposables.push(this.relationsSubscription = this._relations.subscribe((changes) => {
            const isRelationsChanged = changes.some(change => {
                return !change['moved'] && change['moved'] !== 0;
            });
            if (isRelationsChanged) {
                this._customResetOptions();
            }
        }, null, 'arrayChange'));
        return this._getResultSet(this._dataSource())
            .done((result) => {
            this._resultSet = result;
            this._updateRelations();
            this._relationsEditor(new MasterDetailEditor(this._relations, this._resultSet, $.noop));
        })
            .fail(result => {
            if (getErrorMessage(result))
                ShowMessage(getErrorMessage(result));
        });
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this._relations);
    }
}