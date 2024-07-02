﻿/**
* DevExpress Analytics (core\internal\_objectStructureProviders.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { Disposable } from '../../serializer/disposable';
import { getLocalization } from '../../property-grid/localization/localization_utils';
export class ObjectStructureProviderBase extends Disposable {
    constructor() {
        super(...arguments);
        this.selectedPath = ko.observable('');
        this.selectedMember = ko.observable();
    }
    getClassName(instance) {
        if (instance.className && instance.className()) {
            return instance.className();
        }
        const funcNameRegex = /function (.{1,})\(/;
        const results = (funcNameRegex).exec((instance).constructor.toString());
        return (results && results.length > 1) ? results[1] : '';
    }
    createItem(currentTarget, propertyName, propertyValue, result) {
        const targetInfo = currentTarget.getInfo && currentTarget.getInfo();
        const propertyInfo = targetInfo && targetInfo.filter(propertyInfo => { return propertyInfo.propertyName === propertyName; })[0], unwrapPropertyValue = ko.unwrap(propertyValue);
        if (propertyInfo && unwrapPropertyValue !== null && typeof unwrapPropertyValue === 'object') {
            result.push({
                name: propertyName,
                displayName: getLocalization(propertyInfo.displayName, propertyInfo.localizationId),
                specifics: propertyName,
                innerActions: unwrapPropertyValue['innerActions'],
                isList: !!unwrapPropertyValue.push
            });
        }
    }
    getMemberByPath(target, path) {
        const pathComponents = path.split('.');
        let currentTarget = target;
        pathComponents.splice(0, 1);
        pathComponents.forEach((member) => {
            if (currentTarget && currentTarget[member]) {
                currentTarget = ko.unwrap(currentTarget[member]);
            }
        });
        return currentTarget;
    }
    getObjectPropertiesForPath(target, path, propertyName) {
        const currentTarget = this.getMemberByPath(target, path), result = [];
        if (currentTarget) {
            if (currentTarget.push) {
                this.createArrayItem(currentTarget, result, propertyName);
            }
            else {
                for (const name in currentTarget) {
                    this.createItem(currentTarget, name, currentTarget[name], result);
                }
            }
        }
        return result;
    }
    createArrayItem(currentTarget, result, propertyName) {
        for (let i = 0; i < currentTarget.length; i++) {
            const unwrapArrayValue = ko.unwrap(currentTarget[i]);
            result.push({
                name: propertyName ? propertyName + '.' + i.toString() : i.toString(),
                displayName: ko.unwrap(unwrapArrayValue['displayName'] || unwrapArrayValue['name']),
                specifics: this.getClassName(unwrapArrayValue),
                innerActions: unwrapArrayValue['innerActions'],
                isList: !!unwrapArrayValue.push
            });
        }
    }
}
export class ObjectExplorerProvider extends ObjectStructureProviderBase {
    constructor(rootITems, listPropertyNames, member, getPathByMember) {
        super();
        this.path = ko.observable('');
        this.getPathByMember = getPathByMember;
        this.listPropertyNames = listPropertyNames || [];
        this.getItems = (pathRequest) => {
            const result = $.Deferred();
            if (!pathRequest.fullPath) {
                result.resolve((rootITems || []).map((item) => {
                    return { name: item.name, displayName: getLocalization(item.displayName) || item.name, isList: true, specifics: item.className, dragData: { noDragable: true }, data: ko.unwrap(item.data), cssRule: { ['dxrd-context-menu-container']: item.hasContextMenu } };
                }));
            }
            else {
                const target = rootITems.filter((item) => { return item.name === pathRequest.fullPath.split('.')[0]; })[0];
                const objectProperties = this.getObjectPropertiesForPath(ko.unwrap(target.model), pathRequest.fullPath, target.name);
                const dataMembers = objectProperties.map(dataMember => { dataMember.cssRule = { ['dxrd-context-menu-container']: !!target.hasContextMenu }; return dataMember; });
                result.resolve(dataMembers);
            }
            return result.promise();
        };
        this._disposables.push(this.selectedPath = ko.computed({
            read: () => {
                if (member()) {
                    if (this.path.peek()) {
                        return this.getPathByMember && this.getPathByMember(member()).substr(this.path.peek().length + 1);
                    }
                    else {
                        return this.getPathByMember && this.getPathByMember(member());
                    }
                }
                else {
                    return null;
                }
            },
            write: (newVal) => {
                if (!!newVal) {
                    const root = !!this.path() ? this.path().split('.')[0] : newVal.split('.')[0];
                    const rootItem = rootITems.filter(x => x.name === root)[0];
                    if (!!rootItem) {
                        member(this.getMemberByPath(ko.unwrap(rootItem.model), this.path() ? [this.path(), newVal].join('.') : newVal));
                    }
                }
                else {
                    member(null);
                }
            }
        }));
    }
    createArrayItem(currentTarget, result, propertyName) {
        for (let i = 0; i < currentTarget.length; i++) {
            const unwrapArrayValue = ko.unwrap(currentTarget[i]);
            let isList = false;
            this.listPropertyNames.forEach((name) => {
                if (!isList && unwrapArrayValue[name] && ko.unwrap(unwrapArrayValue[name]).length > 0) {
                    isList = true;
                }
            });
            const specifics = this.getClassName(unwrapArrayValue);
            result.push({
                name: propertyName ? propertyName + '.' + i.toString() : i.toString(),
                displayName: ko.unwrap(unwrapArrayValue['displayName'] || unwrapArrayValue['name']),
                specifics: specifics,
                isList: isList,
                data: unwrapArrayValue,
                dragData: {
                    noDragable: !((propertyName === 'bands' && (specifics === 'groupheaderband' || specifics === 'groupfooterband' || specifics === 'detailreportband' || specifics === 'subband')) ||
                        propertyName === 'controls' ||
                        propertyName === 'rows' ||
                        (propertyName === 'cells' && specifics !== 'xrcrosstabcell') ||
                        propertyName === 'subBands' ||
                        propertyName === 'Styles' ||
                        propertyName === 'Formatting Rules')
                }
            });
        }
    }
    createItem(currentTarget, propertyName, propertyValue, result) {
        const isAvailableListProperty = this.listPropertyNames.length > 0 ? this.listPropertyNames.indexOf(propertyName) > -1 : true;
        if (isAvailableListProperty && propertyValue && propertyValue.push) {
            this.createArrayItem(ko.unwrap(propertyValue), result, propertyName);
        }
    }
}
export class ObjectStructureProvider extends ObjectStructureProviderBase {
    constructor(target, displayName, localizationId) {
        super();
        this.getItems = (pathRequest) => {
            const result = $.Deferred();
            if (!pathRequest.fullPath) {
                result.resolve([{ name: displayName || ko.unwrap(target['name']), displayName: getLocalization(displayName || ko.unwrap(target['name']), localizationId), isList: true, specifics: target.className && target.className(), dragData: { noDragable: true } }]);
            }
            else {
                result.resolve(this.getObjectPropertiesForPath(ko.unwrap(target), pathRequest.fullPath));
            }
            return result.promise();
        };
        this._disposables.push(this.selectedPath.subscribe((path) => {
            this.selectedMember(ko.unwrap(this.getMemberByPath(ko.unwrap(target), path)));
        }));
    }
}
