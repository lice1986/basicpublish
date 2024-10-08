﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_calculatedFieldsSource.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getFirstItemByPropertyValue, getFullPath } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, getLocalization, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { CalculatedField } from '../../dataObjects/calculatedField';
import { WrappedExpressionOptions } from '../../dataObjects/expressions/_wrappedExpressionOptions';
import { Parameter } from '../../dataObjects/parameters/parameter';
import { reportFunctionDisplay } from '../../widgets/customFunctions';
import { FieldListController } from './_fieldListController';
export class CalculatedFieldsSource extends Disposable {
    constructor(calculatedFields, reportDataSource, dataSourceHelper) {
        super();
        this._calculatedFieldsInfo = {};
        this._ordinaryFieldsInfo = {};
        this._fieldsDataMembersInfo = {};
        this.addAction = {
            clickAction: (item) => {
                return this.addCalculatedField(item.path);
            },
            imageClassName: 'dxrd-image-add-calcfield',
            imageTemplateName: 'dxrd-svg-operations-add_calcfield',
            text: 'Add calculated field',
            displayText: () => getLocalization('Add calculated field', 'ASPxReportsStringId.ReportDesigner_FieldListActions_AddCalculatedField')
        };
        this.removeAction = {
            clickAction: (item) => {
                this.removeCalculatedField(item.path);
            },
            position: 50,
            imageClassName: 'dxrd-image-recycle-bin',
            imageTemplateName: 'dxrd-svg-operations-recycle_bin',
            text: 'Remove calculated field',
            displayText: () => getLocalization('Remove calculated field', 'ASPxReportsStringId.ReportDesigner_FieldListActions_RemoveCalculatedField')
        };
        this._calculatedFieldsInfo = {};
        this._calculatedFields = calculatedFields;
        this._dataSourceHelper = ko.observable(dataSourceHelper);
        this._reportDataSource = reportDataSource;
        for (let index = 0; index < calculatedFields().length; index++) {
            this._initializeCalculatedField(calculatedFields()[index]);
        }
        const self = this;
        this._disposables.push(this._calculatedFields.subscribe(function (changes) {
            for (let index = 0; index < changes.length; index++) {
                if (changes[index].status === 'added') {
                    self._initializeCalculatedField(changes[index].value);
                }
                else if (changes[index].status === 'deleted') {
                    const fullPath = self._getFieldPathRequest(changes[index].value).fullPath;
                    self._getDataMembersInfoByPath(fullPath).remove(function (item) {
                        return changes[index].value.name === item.name;
                    });
                    changes[index].value.dispose();
                }
            }
        }, null, 'arrayChange'));
        this._disposables.push(this._reportDataSource.subscribe((newValue) => {
            for (let index = 0; index < calculatedFields().length; index++) {
                if (!calculatedFields()[index].dataSource()) {
                    this._updateFieldPathRequest(calculatedFields()[index]);
                }
            }
        }));
        this.addCalculatedField = (fullPath) => {
            const pathRequest = new PathRequest(fullPath);
            const newField = this.createCalculatedField(pathRequest.path);
            const dataSourceInfo = this._dataSourceHelper().findDataSourceInfoByID(pathRequest.id) || this._dataSourceHelper().findDataSourceInfoByRef(pathRequest.ref);
            newField.dataSource(dataSourceInfo.data);
            calculatedFields.push(newField);
            return newField;
        };
        this.removeCalculatedField = (fullPath) => {
            const pathRequest = new PathRequest(fullPath);
            calculatedFields.remove(function (item) {
                const path = item.dataMember() ? (item.dataMember() + '.' + item.name) : item.name;
                return pathRequest.path === path;
            });
        };
    }
    dispose() {
        super.dispose();
        Object.keys(this._calculatedFieldsInfo).forEach((name) => {
            this.disposeObservableArray(this._calculatedFieldsInfo[name]);
            this.resetObservableArray(this._calculatedFieldsInfo[name]);
            delete this._calculatedFieldsInfo[name];
        });
        this.disposeObservableArray(this._calculatedFields);
        this.resetObservableArray(this._calculatedFields);
        this._dataSourceHelper(null);
        this._reportDataSource = null;
        this._fieldsDataMembersInfo = null;
        this._fieldsCallback = null;
    }
    _getDataMembersInfoByPath(fullPath) {
        this._calculatedFieldsInfo[fullPath] = this._calculatedFieldsInfo[fullPath] || ko.observableArray();
        return this._calculatedFieldsInfo[fullPath];
    }
    _subscribeFieldProperties(field) {
        field._disposables.push(field.dataMember.subscribe((newValue) => {
            this._getDataMembersInfoByPath(field.pathRequest.fullPath).remove(field);
            field.pathRequest = new PathRequest(getFullPath(field.pathRequest.id || field.pathRequest.ref, newValue));
            this._getDataMembersInfoByPath(field.pathRequest.fullPath).push(field);
        }));
        field._disposables.push(field.dataSource.subscribe((newValue) => {
            this._updateFieldPathRequest(field);
        }));
        field._disposables.push(field.calculatedFieldName.subscribe((newValue) => {
            this._getDataMembersInfoByPath(field.pathRequest.fullPath).notifySubscribers();
        }));
    }
    _getFieldPathRequest(field) {
        const dataSourceInfo = this._dataSourceHelper().findDataSourceInfo(field.dataSource() || this._reportDataSource());
        if (dataSourceInfo)
            return new PathRequest(getFullPath(dataSourceInfo.id || dataSourceInfo.ref, field.dataMember()));
        return new PathRequest('none');
    }
    _updateFieldPathRequest(field) {
        this._getDataMembersInfoByPath(field.pathRequest.fullPath).remove(field);
        field.pathRequest = this._getFieldPathRequest(field);
        if (field.pathRequest.ref !== 'none') {
            this._getDataMembersInfoByPath(field.pathRequest.fullPath).push(field);
        }
    }
    _initializeCalculatedField(field) {
        const pathRequest = this._getFieldPathRequest(field);
        field['getPath'] = (propertyName) => {
            const dataSourceInfo = this._dataSourceHelper().findDataSourceInfo(field.dataSource() || this._reportDataSource());
            return dataSourceInfo && (dataSourceInfo.id || dataSourceInfo.ref);
        };
        field._disposables.push(field.calcExpressionObj = new WrappedExpressionOptions({
            value: field['expression'],
            path: ko.pureComputed(() => {
                return this._getFieldPathRequest(field).fullPath;
            }),
            fieldName: field.calculatedFieldName,
            functions: reportFunctionDisplay.filter(cat => cat.category != 'Summary')
        }));
        field._disposables.push(field.calcExpressionObj.path);
        field.nameEditable = ko.pureComputed({
            read: function () {
                return field.calculatedFieldName();
            },
            write: function (value) {
                const fields = this._ordinaryFieldsInfo[field.pathRequest.fullPath];
                if (!!value && getFirstItemByPropertyValue(this._calculatedFields(), 'name', value) === null && getFirstItemByPropertyValue(fields || [], 'displayName', value) === null) {
                    field.calculatedFieldName(value);
                }
            },
            owner: this
        });
        field._disposables.push(field.nameEditable);
        field.pathRequest = pathRequest;
        field.propertyGrid = new ObjectProperties(ko.observable(field));
        field._disposables.push(field.propertyGrid);
        this._subscribeFieldProperties(field);
        this._getDataMembersInfoByPath(pathRequest.fullPath).push(field);
    }
    _generateNewFieldName() {
        let i = 1;
        let generatedName;
        do {
            generatedName = 'calculatedField' + i++;
        } while (getFirstItemByPropertyValue(this._calculatedFields(), 'name', generatedName) !== null);
        return generatedName;
    }
    createCalculatedField(dataMember) {
        return new CalculatedField({
            '@Name': this._generateNewFieldName(),
            '@DataMember': dataMember
        });
    }
    getActions(context) {
        const result = [];
        if (context.hasItems && context.data && (context.data.specifics === 'List' || context.data.specifics === 'ListSource') && context.path.indexOf(Parameter.ParametersRefString) !== 0) {
            result.push(this.addAction);
        }
        if (context.data && context.data.specifics && context.data.specifics.indexOf('calc') === 0) {
            result.push(this.removeAction);
        }
        return result;
    }
    beforeItemsFilled(request, items) {
        if (request.fullPath) {
            items.push.apply(items, this._getDataMembersInfoByPath(request.fullPath)());
        }
        return false;
    }
    afterItemsFilled(request, items) {
        if (request.fullPath) {
            this._ordinaryFieldsInfo[request.fullPath] = items;
            items.sort((a, b) => {
                const aIsList = FieldListController.isList(a) ? 1 : 0;
                const bIsList = FieldListController.isList(b) ? 1 : 0;
                if (aIsList !== bIsList) {
                    return bIsList - aIsList;
                }
                else {
                    return (a.displayName && b.displayName) ? a.displayName.localeCompare(b.displayName) : a.name.localeCompare(b.name);
                }
            });
        }
    }
}
