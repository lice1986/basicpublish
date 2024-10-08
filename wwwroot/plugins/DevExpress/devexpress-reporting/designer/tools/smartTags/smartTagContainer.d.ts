﻿/**
* DevExpress HTML/JS Reporting (designer\tools\smartTags\smartTagContainer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Point } from '@devexpress/analytics-core/analytics-elements';
import { SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, IDisposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportSurface } from '../../controls/xrReport';
import { SmartTagFactory } from '../../utils/settings';
export interface ISmartTag extends IDisposable {
    onClick: () => void;
    imageTemplateName: string;
    templateName?: string;
    visible: ko.Observable<boolean>;
}
export declare class SmartTagModel extends Disposable {
    constructor(selection: SurfaceSelection, reportSurface: ko.Observable<ReportSurface>, offset: ko.Observable<number> | ko.Computed<number>, smartTagFactory: SmartTagFactory, rtl: boolean);
    private _getMargin;
    position: Point;
    smartTags: ko.ObservableArray<ISmartTag>;
    visible: ko.Observable<boolean>;
    width: number;
}
