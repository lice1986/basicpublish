﻿/**
* DevExpress Analytics (query-builder\elements\joinConditionModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { RoutedConnectorViewModel } from '../../diagram/elements/connectors/routedConnectorModel';
import { RelationViewModel } from './relationModel';
import { ModelSerializer } from '../../serializer/serializer';
import { ColumnViewModel } from './columnModel';
import { ControlsFactory } from '../../core/utils/controlsFactory';
export declare class JoinConditionViewModel extends RoutedConnectorViewModel {
    getControlFactory(): ControlsFactory;
    preInitProperties(): void;
    constructor(control: any, relation: RelationViewModel, serializer?: ModelSerializer);
    parentColumn: ko.Computed<ColumnViewModel>;
    nestedColumn: ko.Computed<ColumnViewModel>;
    parentColumnName: ko.Observable<string> | ko.Computed<string>;
    nestedColumnName: ko.Observable<string> | ko.Computed<string>;
    operator: ko.Observable<string> | ko.Computed<string>;
    joinType: ko.Observable<string> | ko.Computed<string>;
    left: ko.Computed<string>;
    right: ko.Computed<string>;
}
