﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\lookupSettings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getFullPath } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray } from '@devexpress/analytics-core/analytics-utils';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { filterString, filterStringEditable } from '../../controls/metadata/properties/metadata';
import { dynamicListLookUpSettingsInfoBase, editedStaticListLookUpSettingsInfo, readonlyStaticListLookUpSettingsInfo } from '../metadata/parameters/lookUpSettings';
import { collectAvailableParameters } from '../metadata/_parameterUtils';
import { ObjectItem } from '../objectStorageItem';
import { LookUpValue } from './lookUpValue';
export class LookUpSettings extends ObjectItem {
    constructor(model, dsHelperProvider, serializer) {
        super(model, dsHelperProvider, serializer);
    }
    getInfo() {
        return super.getInfo().concat([filterString, filterStringEditable]);
    }
    updateFilter(parameter, report) {
        this.filterString.helper.parameters = ko.pureComputed({
            read: () => {
                const currentIndex = report.parameters().indexOf(parameter);
                const filteredParameters = currentIndex > 0 ? report.parameters().filter((_, index) => { return index < currentIndex; }) : report.parameters();
                return collectAvailableParameters(filteredParameters);
            },
            deferEvaluation: true
        });
        this._disposables.push(this.filterString.helper.parameters);
    }
}
export class StaticListLookUpSettings extends LookUpSettings {
    constructor(model, dsHelperProvider, serializer) {
        super($.extend({ '@ObjectType': 'DevExpress.XtraReports.Parameters.StaticListLookUpSettings' }, model), dsHelperProvider, serializer);
        this.filterString = new FilterStringOptions(this._filterString);
        this.filterString.helper.canChoiceParameters = true;
        this.filterString.itemsProvider = ko.observable(null);
    }
    getInfo() {
        return super.getInfo().concat(this._isEditing() ? editedStaticListLookUpSettingsInfo : readonlyStaticListLookUpSettingsInfo);
    }
    preInitProperties(model, helper, serializer) {
        super.preInitProperties(model, helper, serializer);
        this._isEditing = ko.observable(false);
    }
    afterDeserialization(model, serializer) {
        this.lookUpValues = deserializeArray(model.LookUpValues || [], (item) => { return new LookUpValue(item, serializer); });
        super.afterDeserialization(model, serializer);
    }
    updateFilter(parameter, report) {
        this.filterString.itemsProvider({
            getItems(pathRequest) {
                const result = $.Deferred();
                result.resolve([
                    {
                        displayName: 'Description',
                        isList: false,
                        name: 'Description',
                        specifics: 'String'
                    },
                    {
                        displayName: 'Value',
                        isList: false,
                        name: 'Value',
                        specifics: parameter.specifics
                    }
                ]);
                return result.promise();
            }
        });
        super.updateFilter(parameter, report);
    }
}
export class DynamicListLookUpSettings extends LookUpSettings {
    constructor(model, dsHelperProvider, serializer) {
        super($.extend({ '@ObjectType': 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings' }, model), dsHelperProvider, serializer);
        this.dsHelperProvider = dsHelperProvider;
        this.filterString = new FilterStringOptions(this._filterString, ko.pureComputed(() => { return this.getPath('valueMember'); }), ko.pureComputed(() => !this.dataSource()));
    }
    getInfo() {
        return super.getInfo().concat(dynamicListLookUpSettingsInfoBase);
    }
    getPath(propertyName) {
        if (propertyName === 'dataMember') {
            return this.dsHelperProvider() && this.dsHelperProvider().getDataSourcePath(this.dataSource());
        }
        else if (propertyName === 'displayMember' || propertyName === 'valueMember' || propertyName === 'sortMember') {
            return getFullPath(this.getPath('dataMember'), this.dataMember());
        }
        return '';
    }
    isPropertyDisabled(name) {
        if (name != 'dataSource')
            return this.dataSource() === null;
    }
}