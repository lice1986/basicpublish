﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobileSearch.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISearchViewModel, SearchViewModel } from '../../search/_searchViewModel';
import { MobileReportPreview } from '../mobilePreview';
import { GalleryModel } from './gallery/_galleryModel';
import { Disposable } from '@devexpress/analytics-core/analytics-utils-native';
import { IJQueryWrapper } from '@devexpress/analytics-core/analytics-internal-native';
import { ValueChangedEvent } from 'devextreme/ui/text_box';
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { GalleryItemBlock } from './gallery/_galleryItem';
export interface IMobileSearchViewModel extends ISearchViewModel {
    enabled: boolean;
    editorVisible: boolean;
    tapToSearchText: string;
    height: number;
    searchText: string;
    focusEditor: (sender: any, event: any) => void;
    startSearch: () => void;
    onSearchTextChanged: (event: ValueChangedEvent) => void;
}
export declare class MobileSearchViewModel extends SearchViewModel {
    gallery: GalleryModel;
    static maxHeight: number;
    focusEditor(event: any): void;
    private _updateBricks;
    onPropertyChanged(args: PropertyChangedEventArgs<MobileSearchViewModel> | ArrayPropertyChangedEventArgs<MobileSearchViewModel>): void;
    createViewModel(): IMobileSearchViewModel;
    updateViewModel(args: PropertyChangedEventArgs<MobileSearchViewModel> | ArrayPropertyChangedEventArgs<MobileSearchViewModel>): void;
    constructor(reportPreview: MobileReportPreview, gallery: GalleryModel);
    updatePagesInBlocks(blocks: Array<GalleryItemBlock>): void;
    stopSearching(): void;
    startSearch(): void;
    editorVisible: boolean;
    height: number;
    searchPanelVisible: boolean;
    enabled: boolean;
    reportPreview: MobileReportPreview;
}
export declare class SearchBarModel extends Disposable {
    private viewModel;
    constructor(viewModel: MobileSearchViewModel, element: HTMLDivElement, $searchText: IJQueryWrapper);
    dispose(): void;
}
