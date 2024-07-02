﻿/**
* DevExpress Analytics (query-builder\elements\queryModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Margins } from '../../core/elements/margins';
import { getUniqueName } from '../../core/internal/_getNameHelpers';
import { findFirstItemMatchesCondition, getFirstItemByPropertyValue } from '../../core/utils/_arrayutils';
import { NotifyAboutWarning, ShowMessage } from '../../core/utils/_infoMessageHelpers';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { formatUnicorn } from '../../property-grid/widgets/internal/_utils';
import { ModelSerializer } from '../../serializer/serializer';
import { deserializeArray } from '../../serializer/utils';
import { extend } from '../../serializer/_utils';
import { DBColumn } from '../dataSource/dbColumn';
import { GroupFilterEditorSerializer } from '../widgets/filterEditor/_groupFilterEditorSerializer';
import { QBFilterStringOptions } from '../widgets/filterEditor/_qbFilterStringOptions';
import { isAggregatedExpression } from '../widgets/filterEditor/_queryBuilderObjectsProvider';
import { ColumnExpression } from './columnExpression';
import { ColumnType } from './columnExpressionMeta';
import { AggregationType } from './columnModelMeta';
import { ParameterViewModel } from './parameterModel';
import { ParametersMode } from './parameterModelMeta';
import { QueryElementBaseViewModel } from './queryElementModel';
import { querySerializationsInfo } from './queryModelMeta';
import { RelationViewModel } from './relationModel';
import { TableViewModel } from './tableModel';
export class QueryViewModelBase extends QueryElementBaseViewModel {
    constructor(querySource, dbSchemaProvider, parametersMode = ParametersMode.ReadWrite, beforeSaveCallback, serializer) {
        super(querySource, null, serializer);
        this.topOffset = 65;
        this._findAncestorsRelations = (table) => {
            const result = { inner: 0, outer: 0, relations: [] };
            this.relations().forEach((item) => {
                if (item.nestedTable() === table) {
                    result.relations.push(item);
                    item.joinType() === 'LeftOuter' ? result.outer++ : result.inner++;
                    const parentResult = this._findAncestorsRelations(item.parentTable());
                    result.inner += parentResult.inner;
                    result.outer += parentResult.outer;
                    result.relations.push.apply(result.relations, parentResult.relations);
                }
            });
            return result;
        };
        this.aggregatedColumnsCount = ko.observable(0);
        this.defaultPageHeight = 500;
        this.defaultPageWidth = 500;
        this.dbSchemaProvider = dbSchemaProvider;
        this.onSave = beforeSaveCallback;
        this.editableName = ko.observable(this.name());
        this._disposables.push(this.name = ko.pureComputed({
            read: this.editableName,
            write: val => { }
        }));
        const _pageWidth = ko.observable(0);
        this._disposables.push(this.pageWidth = ko.pureComputed({
            read: () => {
                let result = this.defaultPageWidth;
                this.tables().forEach((table) => {
                    const right = table.location.x() + table.size.width();
                    if (right > result) {
                        result = right;
                    }
                });
                return Math.max(_pageWidth(), result);
            },
            write: (value) => {
                _pageWidth(value);
            }
        }));
        this._disposables.push(this.pageHeight = ko.pureComputed(() => {
            let result = this.defaultPageHeight;
            this.tables().forEach((table) => {
                const bottom = table.location.y() + table.size.height();
                if (bottom > result) {
                    result = bottom + QueryViewModel.pageMargin;
                }
            });
            return result;
        }));
        this.margins = Margins.fromString();
        this._disposables.push(this.isValid = ko.pureComputed(() => this._validate()));
        const isAllColumnsAllTablesExpression = column => !column.table() && column.itemType() === ColumnType.AllColumns;
        this._disposables.push(this.allColumnsInTablesSelected = ko.pureComputed({
            read: () => this.columns().some(isAllColumnsAllTablesExpression),
            write: (value) => {
                if (value) {
                    this.columns.push(new ColumnExpression({ '@ItemType': 'AllColumns' }, this, serializer));
                }
                else {
                    this.columns.remove(isAllColumnsAllTablesExpression);
                }
            }
        }));
        if (!this.sorting)
            this.sorting = ko.observableArray([]);
        if (!this.grouping)
            this.grouping = ko.observableArray([]);
    }
    _initializeTable(table) {
        this.dbSchemaProvider.getDbTable(table.name())
            .done((dbTable) => {
            table.createColumns(dbTable);
        });
    }
    _addColumnsToTable(table, columns) {
        table._initColumns(columns.map(x => {
            return new DBColumn({
                Name: x.column()
            });
        }));
    }
    dispose() {
        super.dispose();
        this.onSave = null;
    }
    addChild(control) {
        if (control instanceof RelationViewModel) {
            if (this.relations.indexOf(control) > -1)
                return;
            control.parentModel(this);
            this.relations.push(control);
        }
        else if (control instanceof TableViewModel) {
            if (this.tables.indexOf(control) > -1)
                return;
            control.parentModel(this);
            if (getFirstItemByPropertyValue(this.tables(), 'actualName', control.name()) !== null) {
                control.alias(getUniqueName(this.tables().map((table) => { return table.actualName(); }), control.name() + '_'));
            }
            this.tables.push(control);
        }
        else {
            NotifyAboutWarning('Attempt to add wrong child control.');
        }
    }
    removeChild(control) {
        if (control instanceof RelationViewModel) {
            if (this.relations().length < 1)
                return;
            const relation = control;
            const indexRelation = this.relations().indexOf(relation);
            while (relation.conditions().length > 0)
                relation.conditions.pop();
            this.relations.splice(indexRelation, 1);
        }
        else if (control instanceof TableViewModel) {
            if (this.tables().length < 1)
                return;
            this.tables.splice(this.tables().indexOf(control), 1);
            const relations = this.relations();
            for (let i = relations.length - 1; i > -1; i--) {
                if (relations[i].parentTable() === control || relations[i].nestedTable() === control) {
                    this.removeChild(relations[i]);
                }
            }
            this.sorting.remove((item) => item.isDepended(control.actualName()));
            this.grouping.remove((item) => item.isDepended(control.actualName()));
            this.columns.remove((item) => item.isDepended(control.actualName()));
        }
        else {
            NotifyAboutWarning('Attempt to remove wrong child control.');
        }
    }
    validateRelations() {
        const tables = this.tables().map(table => table.actualName());
        this._validateTable(tables, tables[0]);
        return tables.length < 1;
    }
    _validate() {
        if (this.tables().length === 0)
            return false;
        if (!(this.allColumnsInTablesSelected() || this.columns().length > 0))
            return false;
        return this.validateRelations();
    }
    _validateTable(tables, tableName) {
        const index = tables.indexOf(tableName);
        if (index < 0)
            return;
        tables.splice(index, 1);
        const connectedTables = this.relations().map((relation) => {
            if (relation.parentTableName() === tableName)
                return relation.nestedTableName();
            if (relation.nestedTableName() === tableName)
                return relation.parentTableName();
            return null;
        });
        connectedTables.forEach((item) => this._validateTable(tables, item));
    }
    createChild(info, tableViewModel, path) {
        if (!tableViewModel)
            return super.createChild(info);
        this._initializeTable(tableViewModel);
        this.addChild(tableViewModel);
        return tableViewModel;
    }
    init() {
        this.tables().forEach((table) => {
            const columns = [];
            const sorting = this.sorting && this.sorting() || [];
            const grouping = this.grouping && this.grouping() || [];
            [this.columns(), sorting, grouping].forEach((currentColumns) => {
                currentColumns.forEach((column) => {
                    if (table.name() === column.table() && column.itemType() === ColumnType.Column &&
                        columns.every(x => x.column() !== column.column())) {
                        columns.push(column);
                    }
                });
            });
            this._addColumnsToTable(table, columns);
            this._initializeTable(table);
        });
        this.tables().reduce((posX, tableModel) => {
            tableModel.location.x(posX);
            tableModel.location.y(this.topOffset);
            return posX + tableModel.size.width() + tableModel.size.width() / 2;
        }, 30);
        let inProcess = false;
        this._disposables.push(ko.computed(() => {
            if (!inProcess) {
                inProcess = true;
                const allColumns = this.getAllColumns();
                const withoutAggregate = allColumns.filter(x => x.aggregate() === AggregationType.None);
                this.aggregatedColumnsCount(allColumns.length - withoutAggregate.length);
                if (allColumns.length !== withoutAggregate.length) {
                    withoutAggregate.filter(x => x.selected() && !x.groupBy.peek()).forEach(x => x.groupBy(true));
                }
                else {
                    if (!allColumns.every(x => !x.selected.peek() || x.groupBy.peek())) {
                        allColumns.forEach(x => { if (x.groupBy.peek()) {
                            x.groupBy(false);
                        } });
                    }
                }
                inProcess = false;
            }
        }));
    }
    getTable(name) {
        return findFirstItemMatchesCondition(this.tables(), item => item.actualName() === name);
    }
    canSave(showMessage = true) {
        const message = [];
        this.tables().forEach((t) => {
            t.getInvalidColumns().forEach((column) => {
                message.push(formatUnicorn(getLocalization('The schema does not contain the following column: "{0}"."{1}".', 'DataAccessStringId.ColumnNotInSchemaValidationException'), t.actualName(), column.actualName()));
            });
        });
        if (message.length > 0) {
            showMessage && ShowMessage(message.join('\n'), 'error');
            return false;
        }
        return true;
    }
    save() {
        if (!this.canSave())
            return;
        const data = this.serialize(true);
        if (this.onSave) {
            this.onSave(data);
        }
        return data;
    }
    serialize(includeRootTag = false) {
        return includeRootTag ? { 'Query': this.serialize() } : (new ModelSerializer()).serialize(this);
    }
    _findTableInAncestors(child, probablyAncestor) {
        return this.relations().some((relation) => {
            return relation.nestedTable() === child && (relation.parentTable() === probablyAncestor || this._findTableInAncestors(relation.parentTable(), probablyAncestor));
        });
    }
    _findHead(table) {
        let result = null;
        this.relations().some((relation) => {
            if (relation.nestedTable() === table)
                result = relation;
            return !!result;
        });
        return result ? this._findHead(result.parentTable()) : table;
    }
    _isHead(table) {
        return !this.relations().some(relation => relation.nestedTable() === table);
    }
    _reverseRelations(table, relationsToReverse) {
        relationsToReverse.forEach((item) => {
            const tempTable = item.parentTable();
            item.parentTable(item.nestedTable());
            item.nestedTable(tempTable);
            item.conditions().forEach((condition) => {
                const tempColumn = condition.parentColumnName();
                condition.parentColumnName(condition.nestedColumnName());
                condition.nestedColumnName(tempColumn);
            });
        });
    }
    getAllColumns() {
        return [].concat.apply([], this.tables().map(x => x.columns()));
    }
    cerateJoinCondition(parentColumn, nestedColumn) {
        let parentTable = parentColumn.parentModel();
        let nestedTable = nestedColumn.parentModel();
        if (parentTable === nestedTable)
            return null;
        let isColumnsReplaced = false;
        let relation = findFirstItemMatchesCondition(this.relations(), (relation) => {
            isColumnsReplaced = relation.parentTable() === nestedTable && relation.nestedTable() === parentTable;
            return relation.parentTable() === parentTable && relation.nestedTable() === nestedTable || isColumnsReplaced;
        });
        if (relation) {
        }
        else if (this._findTableInAncestors(parentTable, nestedTable)) {
            isColumnsReplaced = true;
        }
        else if (this._findHead(parentTable) !== this._findHead(nestedTable) && !this._isHead(nestedTable)) {
            const parentRelations = this._findAncestorsRelations(parentTable);
            const nestedRelations = this._findAncestorsRelations(nestedTable);
            if (parentRelations.outer > nestedRelations.outer) {
                this._reverseRelations(nestedTable, nestedRelations.relations);
            }
            else if (parentRelations.outer < nestedRelations.outer) {
                this._reverseRelations(parentTable, parentRelations.relations);
                isColumnsReplaced = true;
            }
            else if (parentRelations.inner >= nestedRelations.inner) {
                this._reverseRelations(nestedTable, nestedRelations.relations);
            }
            else if (parentRelations.inner < nestedRelations.inner) {
                this._reverseRelations(parentTable, parentRelations.relations);
                isColumnsReplaced = true;
            }
        }
        if (isColumnsReplaced) {
            const tempTable = parentTable;
            parentTable = nestedTable;
            nestedTable = tempTable;
            const tempColumn = parentColumn;
            parentColumn = nestedColumn;
            nestedColumn = tempColumn;
        }
        relation = relation || this.createChild({
            '@ControlType': 'Relation',
            '@Parent': parentTable.actualName(),
            '@Nested': nestedTable.actualName(),
            '@Type': 'Inner'
        });
        let joinCondition = findFirstItemMatchesCondition(relation.conditions(), (condition) => {
            return condition.parentColumn() === parentColumn && condition.nestedColumn() === nestedColumn;
        });
        if (!joinCondition) {
            joinCondition = relation.createChild({ '@ControlType': 'JoinCondition', '@Parent': parentColumn.name(), '@Nested': nestedColumn.name() });
        }
        return joinCondition;
    }
    tryToCreateRelationsByFK(sourceTable) { }
}
QueryViewModelBase.pageMargin = 20;
export class QueryViewModel extends QueryViewModelBase {
    constructor(querySource, dbSchemaProvider, parametersMode = ParametersMode.ReadWrite, beforeSaveCallback, serializer) {
        super(extend(true, querySource, QueryViewModel.emptyModel, querySource), dbSchemaProvider, parametersMode, beforeSaveCallback, serializer);
        this.controlType = 'Query';
        this['type']('SelectQuery');
        this.tables = deserializeArray(querySource['Tables']['SelectedTables'], item => new TableViewModel(item, this, serializer));
        this.columns = deserializeArray(querySource['Columns'], item => new ColumnExpression(item, this, serializer));
        this.sorting = deserializeArray(querySource['Sorting'], item => new ColumnExpression(item, this, serializer));
        this.grouping = deserializeArray(querySource['Grouping'], item => new ColumnExpression(item, this, serializer));
        this.relations = deserializeArray(querySource['Tables']['Relations'], item => new RelationViewModel(item, this, serializer));
        this.init();
        this['_tablesObject']['tables'] = this.tables;
        this['_tablesObject']['relations'] = this.relations;
        const parameters = deserializeArray(querySource['Parameters'], item => new ParameterViewModel(item, serializer));
        if (parametersMode === ParametersMode.ReadWrite) {
            this.parameters = parameters;
            this._disposables.push(this.parameters.subscribe((changes) => {
                changes.forEach((change) => {
                    if (change.status === 'added' && !change.value.name())
                        change.value.name(getUniqueName(this.parameters().filter(x => x !== change.value).map(x => x.name()), 'parameter'));
                });
            }, null, 'arrayChange'));
        }
        else {
            this._disposables.push(this.parameters = ko.computed(() => { return parameters(); }));
        }
        this.filterString = new QBFilterStringOptions(this._filterString, null, ko.pureComputed(() => (this.tables().length === 0) && (this.filterString && this.filterString.value().length === 0)));
        this.filterString.initializeFilterStringHelper(this.parameters, parametersMode);
        this.groupFilterString = new QBFilterStringOptions(this._groupFilterString, null, ko.pureComputed(() => !this.columns().some(isAggregatedExpression) && (this.groupFilterString && (this.groupFilterString.value() || '').length === 0)));
        this.groupFilterString.initializeFilterStringHelper(this.parameters, parametersMode, new GroupFilterEditorSerializer(this.columns));
    }
    isPropertyDisabled(name) {
        if (name === 'skip')
            return this.skip() === 0 && !this.sorting().length;
        return false;
    }
    getInfo() {
        return querySerializationsInfo;
    }
    createChild(info) {
        return super.createChild(info, info['@ControlType'] === 'Table' ? new TableViewModel(info, this) : undefined);
    }
    tryToCreateRelationsByFK(sourceTable) {
        this.dbSchemaProvider.getDbSchema().done((dbSchema) => {
            const dbSourceTable = dbSchema.tables.filter((item) => { return item.name === sourceTable.name(); })[0];
            if (dbSourceTable) {
                dbSourceTable.foreignKeys.forEach((fk) => {
                    const pkTable = getFirstItemByPropertyValue(this.tables.peek(), 'name', fk.primaryKeyTable);
                    if (pkTable) {
                        for (let i = 0; i < fk.primaryKeyColumns.length; i++) {
                            const column1 = getFirstItemByPropertyValue(sourceTable.columns(), 'name', fk.columns[i]);
                            const column2 = getFirstItemByPropertyValue(pkTable.columns(), 'name', fk.primaryKeyColumns[i]);
                            if (column1 && column2) {
                                this.cerateJoinCondition(column2, column1);
                            }
                        }
                    }
                });
            }
            this.tables.peek().forEach((table) => {
                const dbTable = dbSchema.tables.filter((item) => { return item.name === table.name(); })[0];
                if (dbTable) {
                    dbTable.foreignKeys.forEach((fk) => {
                        if (fk.primaryKeyTable === sourceTable.name()) {
                            for (let i = 0; i < fk.primaryKeyColumns.length; i++) {
                                const column1 = getFirstItemByPropertyValue(sourceTable.columns(), 'name', fk.primaryKeyColumns[i]);
                                const column2 = getFirstItemByPropertyValue(table.columns(), 'name', fk.columns[i]);
                                if (column1 && column2) {
                                    this.cerateJoinCondition(column2, column1);
                                }
                            }
                        }
                    });
                }
            });
        });
    }
}
QueryViewModel.emptyModel = { '@ItemType': 'Query', 'Tables': { 'SelectedTables': {}, 'Relations': {} }, 'Columns': {}, 'Sorting': {}, 'Grouping': {} };