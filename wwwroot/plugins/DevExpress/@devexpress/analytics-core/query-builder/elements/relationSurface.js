﻿/**
* DevExpress Analytics (query-builder\elements\relationSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase } from '../../core/elements/baseSurface';
import { createObservableArrayMapCollection } from '../../core/utils/_arrayutils';
export class RelationSurface extends SurfaceElementBase {
    constructor(control, context) {
        super(control, context, null);
        this.conditions = ko.observableArray();
        this.template = 'dxqb-relation';
        createObservableArrayMapCollection(control.conditions, this.conditions, this._createSurface);
    }
    _getChildrenHolderName() {
        return 'conditions';
    }
}
