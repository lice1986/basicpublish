﻿/**
* DevExpress Analytics (query-builder\elements\joinConditionSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { RoutedConnectorSurface } from '../../diagram/elements/connectors/routedConnectorSurface';
export class JoinConditionSurface extends RoutedConnectorSurface {
    constructor(control, context) {
        super(control, context);
        this._disposables.push(this.showArrow = ko.pureComputed(() => {
            return control.joinType() === 'LeftOuter' || control.joinType() === 'FullOuter';
        }));
        this._disposables.push(this.showRightArrow = ko.pureComputed(() => {
            return control.joinType() === 'RightOuter' || control.joinType() === 'FullOuter';
        }));
    }
    container() {
        return this.getRoot();
    }
}