﻿/**
* DevExpress Analytics (query-builder\elements\joinConditionModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { RoutedConnectorViewModel } from '../../diagram/elements/connectors/routedConnectorModel';
import { controlsFactory } from '../utils/controlsFactory';
import { determineConnectingPoints } from '../../diagram/utils';
import { extend } from '../../serializer/_utils';
export class JoinConditionViewModel extends RoutedConnectorViewModel {
    constructor(control, relation, serializer) {
        super(extend(control, { '@ControlType': 'JoinCondition', '@ItemType': 'KeyColumn' }), relation, serializer);
        this.parentColumn = ko.pureComputed(() => relation.parentTable().getColumn(this.parentColumnName()));
        this.nestedColumn = ko.pureComputed(() => relation.nestedTable().getColumn(this.nestedColumnName()));
        this.joinType = relation.joinType;
        this.left = ko.pureComputed(() => relation.parentTableName() + '.' + this.parentColumnName());
        this.right = ko.pureComputed(() => relation.nestedTableName() + '.' + this.nestedColumnName());
        this._disposables.push(ko.computed(() => {
            if (this.parentColumn() && this.nestedColumn()) {
                const result = determineConnectingPoints(this.parentColumn(), this.nestedColumn());
                this.startPoint().connectingPoint(result.start);
                this.endPoint().connectingPoint(result.end);
            }
        }));
    }
    getControlFactory() {
        return controlsFactory;
    }
    preInitProperties() {
        this.startPoint = ko.observable();
        this.endPoint = ko.observable();
    }
}
