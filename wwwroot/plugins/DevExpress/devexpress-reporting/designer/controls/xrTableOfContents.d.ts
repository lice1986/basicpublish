﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableOfContents.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { BandViewModel } from '../bands/xrBand';
import { TableOfContentLocalizationProvider } from './utils/_localizationUtils';
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { TableOfContentsLevel, TableOfContentsLevelSurface } from './xrTableOfContentsLevel';
export declare class XRTableOfContentsViewModel extends XRControlViewModel {
    static unitProperties: any[];
    dispose(): void;
    createLocalizationProvider(): TableOfContentLocalizationProvider;
    constructor(control: any, parent: BandViewModel, serializer?: ModelSerializer);
    get textEditableProperty(): ko.Observable<string> | ko.Computed<string>;
    levels: ko.ObservableArray<TableOfContentsLevel>;
    levelDefault: TableOfContentsLevel;
    levelTitle: TableOfContentsLevel;
    maxNestingLevel: ko.Observable<number> | ko.Computed<number>;
    levelTitleText: ko.Observable<string> | ko.Computed<string>;
    allLevels: ko.Observable<TableOfContentsLevel[]> | ko.Computed<TableOfContentsLevel[]>;
    borderWidth: ko.Observable | ko.Computed;
    borderColor: ko.Observable | ko.Computed;
    borders: ko.Observable | ko.Computed;
    borderDashStyle: ko.Observable | ko.Computed;
    borderDefault: ko.PureComputed<string>;
    parentModel: ko.Observable<BandViewModel>;
}
export declare class XRTableOfContentsSurface extends XRControlSurface {
    constructor(control: XRTableOfContentsViewModel, context: ISurfaceContext);
    isThereIntersectionWithChildCollection(): boolean;
    isThereIntersectionWithUsefulArea(): boolean;
    isThereIntersectionWithParentCollection(): boolean;
    levelTitle: TableOfContentsLevelSurface;
    levelDefault: TableOfContentsLevelSurface;
    levels: ko.ObservableArray<TableOfContentsLevelSurface>;
}
