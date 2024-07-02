﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\components.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { name } from '../metadata/properties/metadata';
export class ComponentsModel extends Disposable {
    constructor(model, renameComponentStrategy) {
        super();
        this.renameComponentStrategy = renameComponentStrategy;
        this.className = () => {
            return 'component';
        };
        this.controlType = 'XRComponent';
        const _name = ko.observable(model.name);
        this.data = model.data;
        this._disposables.push(this.name = ko.pureComputed({
            read: () => { return _name(); },
            write: (value) => {
                if (value !== _name() && renameComponentStrategy.validateName(value) && renameComponentStrategy.validateUnique(value, _name())) {
                    if (renameComponentStrategy.tryRename(value, this.data)) {
                        _name(value);
                    }
                }
            }
        }));
    }
    getInfo() {
        return [name];
    }
}
