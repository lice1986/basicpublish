﻿/**
* DevExpress Analytics (query-builder\elements\relationSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase, ISurfaceContext } from '../../core/elements/baseSurface';
import { RelationViewModel } from './relationModel';
import { JoinConditionSurface } from './joinConditionSurface';
export declare class RelationSurface extends SurfaceElementBase<RelationViewModel> {
    constructor(control: RelationViewModel, context: ISurfaceContext);
    conditions: ko.ObservableArray<JoinConditionSurface>;
    template: string;
    _getChildrenHolderName(): string;
}
