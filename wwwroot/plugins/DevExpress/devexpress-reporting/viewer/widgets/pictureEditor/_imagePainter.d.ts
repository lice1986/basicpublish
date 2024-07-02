﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_imagePainter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { INumericSize } from '@devexpress/analytics-core/analytics-elements-native';
import { ImageAlignment, ImageSizeMode } from '../../editing/editingField';
export declare class ImagePainter {
    private _drawImage;
    private _getImageSize;
    private _getImageCoordinate;
    constructor(options: {
        imageSource: () => string;
        sizeMode: () => ImageSizeMode;
        alignment: () => ImageAlignment;
    });
    refresh(context: CanvasRenderingContext2D, scale?: number, contentSize?: INumericSize): Promise<void>;
    format: string;
    image: () => string;
    sizeMode: () => ImageSizeMode;
    alignment: () => ImageAlignment;
}