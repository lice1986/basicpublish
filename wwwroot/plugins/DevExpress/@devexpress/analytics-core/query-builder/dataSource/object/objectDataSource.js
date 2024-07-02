﻿/**
* DevExpress Analytics (query-builder\dataSource\object\objectDataSource.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { guid } from '../../../undo-engine/_utils';
export class ObjectDataSource extends Disposable {
    constructor() {
        super(...arguments);
        this.name = ko.observable();
    }
    setState(state) {
        this.ctor = state.ctor;
        this.dataMember = state.dataMember;
        this.selectedType = state.selectedType;
        this.id = guid().replace(/-/g, '');
        this.name(state.dataSourceName);
    }
}
