﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_eventProcessor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils-native';
import { ISlideOptions } from '../mobilePreview';
export declare const slowdownDisctanceFactor = 2.5;
export declare const minScale = 0.92;
export declare class EventProcessor extends Disposable {
    element: any;
    slideOptions: ISlideOptions;
    private _direction;
    private _startingPositionX;
    private _startingPositionY;
    private _getFirstPageOffset;
    getDirection(x?: any, y?: any): {
        vertical: boolean;
        horizontal: boolean;
        scrollDown: boolean;
    };
    setPosition(x: any, y: any): void;
    initialize(x: number, y: number): void;
    start(e: JQueryEventObject): void;
    move(e: JQueryEventObject): void;
    end(e: JQueryEventObject): void;
    constructor(element: any, slideOptions: ISlideOptions);
    applySearchAnimation(value: any): void;
    isLeftMove: boolean;
    isRightMove: boolean;
    latestY: number;
    latestX: number;
    $window: any;
    $element: JQuery;
    $gallery: JQuery<Element>;
    $galleryblocks: JQuery<Element>;
    $body: JQuery;
    firstMobilePageOffset: {
        left: number;
        top: number;
    };
}
