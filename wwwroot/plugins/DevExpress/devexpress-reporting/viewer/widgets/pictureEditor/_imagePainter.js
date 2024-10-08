﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_imagePainter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ImageAlignment, ImageSizeMode } from '../../editing/editingField';
export class ImagePainter {
    constructor(options) {
        this.image = options.imageSource;
        this.sizeMode = options.sizeMode;
        this.alignment = options.alignment;
    }
    _drawImage(imageSource, context, scale, contentSize) {
        return new Promise((resolve, reject) => {
            if (!imageSource) {
                resolve();
                return;
            }
            const background = new Image();
            let prefix = 'data:image/' + (this.format || 'png') + ';base64,';
            if (this.format === 'svg') {
                prefix = 'data:image/svg+xml;charset=UTF-8;base64,';
            }
            const imageBase64 = imageSource.indexOf('base64,') !== -1 ? imageSource : prefix + imageSource;
            background.src = imageBase64;
            background.onload = () => {
                if (imageSource !== this.image()) {
                    reject();
                    return;
                }
                const size = this._getImageSize(background, scale, contentSize);
                const location = this._getImageCoordinate(size, contentSize);
                context.drawImage(background, location.x, location.y, size.width, size.height);
                resolve();
            };
            background.onerror = (error) => {
                reject(error);
            };
        });
    }
    _getImageSize(image, scale, contentSize) {
        const sizeMode = this.sizeMode();
        let width = image.width * scale, height = image.height * scale;
        if (sizeMode === ImageSizeMode.StretchImage) {
            width = contentSize.width;
            height = contentSize.height;
        }
        else if (sizeMode === ImageSizeMode.Cover || sizeMode === ImageSizeMode.ZoomImage || (sizeMode === ImageSizeMode.Squeeze && (contentSize.width < width || contentSize.height < height))) {
            const ratio = (sizeMode === ImageSizeMode.Cover ? Math.max : Math.min)(contentSize.width / width, contentSize.height / height);
            width *= ratio;
            height *= ratio;
        }
        return { width: width, height: height };
    }
    _getImageCoordinate(imageSize, contentSize) {
        let alignment = this.alignment();
        let x = 0, y = 0;
        if (!(alignment in ImageAlignment) && (this.sizeMode() === ImageSizeMode.Cover || this.sizeMode() === ImageSizeMode.ZoomImage || this.sizeMode() === ImageSizeMode.Squeeze)) {
            alignment = ImageAlignment.MiddleCenter;
        }
        if (alignment === ImageAlignment.MiddleLeft || alignment === ImageAlignment.MiddleCenter || alignment === ImageAlignment.MiddleRight) {
            y = (contentSize.height - imageSize.height) / 2;
        }
        else if (alignment === ImageAlignment.BottomLeft || alignment === ImageAlignment.BottomCenter || alignment === ImageAlignment.BottomRight) {
            y = contentSize.height - imageSize.height;
        }
        if (alignment === ImageAlignment.TopCenter || alignment === ImageAlignment.MiddleCenter || alignment === ImageAlignment.BottomCenter) {
            x = (contentSize.width - imageSize.width) / 2;
        }
        else if (alignment === ImageAlignment.TopRight || alignment === ImageAlignment.MiddleRight || alignment === ImageAlignment.BottomRight) {
            x = contentSize.width - imageSize.width;
        }
        return { x: x, y: y };
    }
    refresh(context, scale = 1, contentSize) {
        contentSize = contentSize || {
            width: context.canvas.width,
            height: context.canvas.height
        };
        return this._drawImage(this.image(), context, scale, contentSize)
            .catch((error) => { (error === null || error === void 0 ? void 0 : error.message) && console.warn(error.message); });
    }
}
