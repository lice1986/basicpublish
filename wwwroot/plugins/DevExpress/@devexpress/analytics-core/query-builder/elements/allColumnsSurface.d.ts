﻿/**
* DevExpress Analytics (query-builder\elements\allColumnsSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase, ISurfaceContext } from '../../core/elements/baseSurface';
import { AllColumnsViewModel } from './allColumnsModel';
export declare class AllColumnsSurface extends SurfaceElementBase<AllColumnsViewModel> {
    constructor(control: AllColumnsViewModel, context: ISurfaceContext);
    template: string;
    toggleSelected: () => void;
    selectedWrapper: ko.PureComputed<boolean>;
    isOverAsterisk: ko.PureComputed<boolean>;
    cssClasses: () => {
        'dxd-state-active': ko.Observable<boolean> | ko.Computed<boolean>;
        'dxd-state-hovered': boolean;
    };
}
