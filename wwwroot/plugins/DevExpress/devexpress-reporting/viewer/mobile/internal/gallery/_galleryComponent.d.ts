﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\gallery\_galleryComponent.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import 'devextreme/ui/gallery';
import dxGallery from 'devextreme/ui/gallery';
import { ISlideOptions } from '../../mobilePreview';
import { GalleryModel } from './_galleryModel';
export interface BlockItem {
    element: JQuery;
    left: number;
}
export interface dxGalleryExtenderType {
    _animationClassName: string;
    blockItems: BlockItem[];
    currentBlockItem: BlockItem;
    gallery: GalleryModel;
    slideOptions: ISlideOptions;
    nextBlockItem: BlockItem;
    initializeBlockItems: () => void;
    _blockItemsHaveExpired: () => boolean;
    _getNextIndex: (index: number) => number;
    _setSwipeAnimation: (element: BlockItem, difference: any, offset: any, right: boolean) => void;
    _addAnimation: (item: any) => void;
    _restoreDefault: (item: BlockItem) => void;
    _getItem: (index: number, loopTest: boolean) => BlockItem;
    swipeEnabled: boolean;
}
export declare class dxGalleryExtender {
    private _gallery;
    constructor(_gallery: dxGalleryReportPreview);
    extend(element: Element): void;
    private _extendCtor;
    private _extendRepaint;
    private _extend_blockItemsHaveExpired;
    private _extend_swipeStartHandler;
    private _extend_getNextIndex;
    private _extend_setSwipeAnimation;
    private _extend_addAnimation;
    private _extend_restoreDefault;
    private _extend_getItem;
    private _extend_swipeUpdateHandler;
    private _extend_swipeEndHandler;
    private _extend_endSwipe;
}
export declare class dxGalleryReportPreview extends dxGallery implements dxGalleryExtenderType {
    constructor(element: any, options: any);
    _getItem: (index: number, loopTest: boolean) => BlockItem;
    _restoreDefault: (item: BlockItem) => void;
    _addAnimation: (item: any) => void;
    _blockItemsHaveExpired: () => boolean;
    _setSwipeAnimation: (element: BlockItem, difference: any, offset: any, right: boolean) => void;
    _getNextIndex: (index: number) => number;
    _animationClassName: string;
    blockItems: BlockItem[];
    currentBlockItem: BlockItem;
    gallery: GalleryModel;
    slideOptions: ISlideOptions;
    nextBlockItem: BlockItem;
    initializeBlockItems: () => void;
    swipeEnabled: boolean;
}