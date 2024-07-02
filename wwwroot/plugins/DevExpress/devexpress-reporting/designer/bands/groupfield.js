﻿/**
* DevExpress HTML/JS Reporting (designer\bands\groupfield.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { groupFieldSerializationInfo } from './metadata/groupfieldMetaData';
export class GroupFieldModel extends Disposable {
    constructor(model, serializer) {
        super();
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this.changeSortOrder = () => {
            const sortOrderValue = this.sortOrder();
            if (sortOrderValue === 'Ascending') {
                this.sortOrder('Descending');
            }
            else if (sortOrderValue === 'None') {
                this.sortOrder('Ascending');
            }
            else {
                this.sortOrder('None');
            }
        };
        this._disposables.push(this.sortOrderClass = ko.pureComputed(() => {
            let orderString = this.sortOrder().toLowerCase();
            orderString = orderString === 'none' ? 'unsorted' : orderString;
            return { class: 'dxrd-image-' + orderString, template: 'dxrd-svg-operations-' + orderString };
        }));
    }
    getInfo() {
        return groupFieldSerializationInfo;
    }
}
GroupFieldModel.createNew = () => {
    return new GroupFieldModel({});
};
