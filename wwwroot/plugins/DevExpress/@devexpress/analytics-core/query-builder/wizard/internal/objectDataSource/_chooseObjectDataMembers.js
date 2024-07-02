﻿/**
* DevExpress Analytics (query-builder\wizard\internal\objectDataSource\_chooseObjectDataMembers.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../../serializer/disposable';
export class ChooseObjectDataMembers extends Disposable {
    constructor(type, ctor) {
        super();
        this.dataMembers = ko.observableArray([]);
        this.selectedDataMembers = ko.observableArray([]);
        let oldType = type() && type().name;
        this._disposables.push(ctor.subscribe(newVal => {
            type().updateMembers(newVal);
            if (oldType != type().name) {
                this.dataMembers(type().members);
                this.selectedDataMembers([]);
                oldType = type().name;
            }
            this.coerceSelection();
        }));
    }
    coerceSelection() {
        const selectedMember = this.selectedDataMembers()[0];
        const bestItem = selectedMember && selectedMember.isAvailable() ? selectedMember : this.dataMembers().filter(a => a.isAvailable())[0];
        this.selectedDataMembers([bestItem]);
    }
}
