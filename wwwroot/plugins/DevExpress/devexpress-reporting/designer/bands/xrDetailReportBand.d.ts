﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrDetailReportBand.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, IElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { ControlType } from '../controls/utils/_controlTypes';
import { ObjectStorageItem } from '../dataObjects/objectStorageItem';
import { BandSurface, BandViewModel } from './xrBand';
import { VerticalBandsContainerSurface } from './_vericalBandContainer';
export declare class DetailReportBand extends BandViewModel {
    dispose(): void;
    initHeight(): void;
    createChildsArray(band: any, serializer: ModelSerializer): void;
    addChild(control: IElementViewModel): void;
    constructor(band: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    dataMember: ko.Observable<string> | ko.Computed<string>;
    dataSource: ko.Observable<ObjectStorageItem>;
    _filterString: ko.Observable<string> | ko.Computed<string>;
    filterString: FilterStringOptions;
}
export declare class DetailReportBandSurface extends BandSurface {
    dispose(): void;
    getChildrenCollection(): ko.ObservableArray<BandSurface>;
    createUnderCursor(): void;
    getTotalHeight(): number;
    getHeight(): number;
    getHasOwnRuler(): boolean;
    constructor(band: DetailReportBand, context: ISurfaceContext);
    verticalBandsContainer: VerticalBandsContainerSurface;
    templateName: string;
    selectionTemplate: string;
    leftMarginTemplate: string;
}