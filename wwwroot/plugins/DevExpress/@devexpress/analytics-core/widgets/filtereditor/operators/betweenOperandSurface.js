﻿/**
* DevExpress Analytics (widgets\filtereditor\operators\betweenOperandSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CriteriaOperatorSurface } from './criteriaOperatorSurface';
export class BetweenOperandSurface extends CriteriaOperatorSurface {
    constructor(operator, parent, fieldListProvider, path) {
        super(operator, parent, fieldListProvider, path);
        this.property = ko.observable(null);
        this.end = ko.observable(null);
        this.begin = ko.observable(null);
        this.contentTemplateName = 'dx-filtereditor-between';
        this.property(this._createLeftPartProperty(operator.property));
        this.begin(this.createChildSurface(operator.begin));
        this.end(this.createChildSurface(operator.end));
    }
    get leftPart() {
        return this.property && this.property();
    }
    get rightPart() {
        return [this.begin(), this.end()];
    }
    dispose() {
        this.property().dispose();
        this.begin().dispose();
        this.end().dispose();
        super.dispose();
    }
}