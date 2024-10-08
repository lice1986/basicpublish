﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableOfContentsLevel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, ISurfaceContext, PaddingModel } from '@devexpress/analytics-core/analytics-elements';
import { IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ControlType } from './utils/_controlTypes';
import { XRControlSurfaceBase } from './xrControl';
import { XRTableOfContentsViewModel } from './xrTableOfContents';
export declare class TableOfContentsLevel extends ElementViewModel<ControlType> {
    dispose(): void;
    static createNew(parent: XRTableOfContentsViewModel): TableOfContentsLevel;
    static unitProperties: string[];
    private _levelIndex;
    private _indentFactor;
    preInitProperties(model: any): void;
    constructor(model: any, parent: XRTableOfContentsViewModel, serializer?: ModelSerializer, isTitle?: boolean);
    isTitle: boolean;
    name: ko.Observable<string> | ko.Computed<string>;
    height: ko.Observable<number> | ko.Computed<number>;
    width: ko.Observable<number> | ko.Computed<number>;
    top: ko.Observable<number> | ko.Computed<number>;
    levelsHeightUnder: ko.Observable<number> | ko.Computed<number>;
    indent: ko.Observable<number> | ko.Computed<number>;
    left: ko.Computed<number>;
    leaderSymbol: ko.Observable<string> | ko.Computed<string>;
    font: ko.Observable<string> | ko.Computed<string>;
    foreColor: ko.Observable<string> | ko.Computed<string>;
    backColor: ko.Observable<string> | ko.Computed<string>;
    padding: ko.Observable<string> | ko.Computed<string>;
    paddingObj: PaddingModel;
    textAlignment: ko.Observable<string> | ko.Computed<string>;
    text: ko.Observable<string> | ko.Computed<string>;
    dpi: ko.Observable<number> | ko.Computed<number>;
    parentModel: ko.Observable<XRTableOfContentsViewModel>;
    borderWidth: ko.Observable | ko.Computed;
    borderColor: ko.Observable | ko.Computed;
    borders: ko.Observable | ko.Computed;
    borderDefault: ko.Observable<string> | ko.Computed<string>;
    borderDashStyle: ko.Observable | ko.Computed;
    lockedInUserDesigner: ko.Observable<boolean> | ko.Computed<boolean>;
    getInfo(): import("@devexpress/analytics-core/analytics-utils").ISerializationInfoArray;
    isPropertyModified(name: string): boolean;
    getControlFactory(): import("./utils/controlsFactory").ControlsFactory;
    rtl(): boolean;
}
export declare class TableOfContentsLevelSurface extends XRControlSurfaceBase<TableOfContentsLevel> {
    static _$leaderSymbol: JQuery;
    static _unitProperties: IUnitProperties<TableOfContentsLevel>;
    private _leaderSymbolWidth;
    constructor(control: TableOfContentsLevel, context: ISurfaceContext);
    text: ko.Observable<string> | ko.Computed<string>;
    resizable(resizeHandler: any, element: HTMLElement): any;
    leaderSymbols: ko.PureComputed<string>;
    rtlLayout(): boolean;
}
