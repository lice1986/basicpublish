﻿/**
* DevExpress Analytics (property-grid\widgets\fonteditor\editor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { FontModel } from './_model';
import { ObjectProperties, PropertyGridEditor } from '../../propertygrid';
import { fontInfo } from './metadata';
export class FontEditor extends PropertyGridEditor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
    }
    createObjectProperties() {
        const model = new FontModel(this.value);
        this._disposables.push(model);
        return new ObjectProperties(ko.observable(model), { editors: fontInfo }, this.level + 1, this._get('disabled', 'wrapped'), undefined, this.textToSearch);
    }
}
