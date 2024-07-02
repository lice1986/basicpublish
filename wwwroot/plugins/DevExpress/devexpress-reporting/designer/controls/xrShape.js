﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrShape.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ReportRenderingService } from '../services/_reportRenderingService';
import { shapesMap } from './metadata/xrShape';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export class XRShapeViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this.Shape(XRShapeViewModel.createShape(this.Shape() || {}, serializer));
        this.shapeFake = {
            type: ko.pureComputed({
                read: () => {
                    return this.Shape()['shapeType']();
                },
                write: (val) => {
                    const selectedShape = XRShapeViewModel.shapes.filter((shape) => { return shape['displayName'] === val; })[0];
                    const shape = XRShapeViewModel.createShape($.extend({ '@ShapeName': selectedShape['type'] }, selectedShape['val']), serializer);
                    if (selectedShape['angle'] !== void 0) {
                        this['angle'](selectedShape['angle']);
                    }
                    if (XRShapeViewModel.timeout === 0) {
                        this.Shape(shape);
                    }
                    else {
                        setTimeout(() => {
                            this.Shape(shape);
                        }, XRShapeViewModel.timeout);
                    }
                }
            }),
            content: this.Shape
        };
        this._disposables.push(this.shapeFake.type);
    }
    static createShape(model, serializer = null) {
        const type = model && model['@ShapeName'] || 'Ellipse';
        const shapeInfo = shapesMap[type];
        const newShape = { 'shapeType': ko.observable(type), 'getInfo': () => { return shapeInfo; } };
        (serializer || new ModelSerializer()).deserialize(newShape, model);
        return newShape;
    }
}
XRShapeViewModel.timeout = 1;
XRShapeViewModel.shapes = [
    {
        displayName: 'Rectangle',
        type: 'Rectangle'
    },
    {
        displayName: 'Ellipse'
    },
    {
        displayName: 'Top Arrow',
        angle: 0,
        type: 'Arrow'
    },
    {
        displayName: 'Right Arrow',
        angle: 270,
        type: 'Arrow'
    },
    {
        displayName: 'Bottom Arrow',
        angle: 180,
        type: 'Arrow'
    },
    {
        displayName: 'Left Arrow',
        angle: 90,
        type: 'Arrow'
    },
    {
        displayName: 'Triangle',
        type: 'Polygon'
    },
    {
        displayName: 'Square',
        val: {
            '@NumberOfSides': 4
        },
        type: 'Polygon'
    },
    {
        displayName: 'Pentagon',
        val: {
            '@NumberOfSides': 5
        },
        type: 'Polygon'
    },
    {
        displayName: 'Hexagon',
        val: {
            '@NumberOfSides': 6
        },
        type: 'Polygon'
    },
    {
        displayName: 'Octagon',
        val: {
            '@NumberOfSides': 8
        },
        type: 'Polygon'
    },
    {
        displayName: '3-Point Star',
        type: 'Star'
    },
    {
        displayName: '4-Point Star',
        val: {
            '@StarPointCount': 4
        },
        type: 'Star'
    },
    {
        displayName: '5-Point Star',
        val: {
            '@StarPointCount': 5
        },
        type: 'Star'
    },
    {
        displayName: '6-Point Star',
        val: {
            '@StarPointCount': 6
        },
        type: 'Star'
    },
    {
        displayName: '8-Point Star',
        val: {
            '@StarPointCount': 8
        },
        type: 'Star'
    },
    {
        displayName: 'Vertical Line',
        angle: 0,
        type: 'Line'
    },
    {
        displayName: 'Horizontal Line',
        angle: 270,
        type: 'Line'
    },
    {
        displayName: 'Slant Line',
        angle: 135,
        type: 'Line'
    },
    {
        displayName: 'Backslant Line',
        angle: 225,
        type: 'Line'
    },
    {
        displayName: 'Cross',
        type: 'Cross'
    },
    {
        displayName: 'Bracket',
        type: 'Bracket'
    },
    {
        displayName: 'Brace',
        type: 'Brace'
    }
];
export class ImageBase64Model {
}
export class XRShapeControlSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this._lastUpdateImageDeferred = null;
        this.imageSrc = ko.observable('');
        this.isLoading = ko.observable(false);
        this.error = ko.observable('');
        this._disposables.push(ko.computed(() => {
            this._updateImage();
        }));
        this.template = 'dxrd-shape';
        this.contenttemplate = 'dxrd-server-rendered-control-content';
    }
    _updateImage() {
        this.isLoading(true);
        if (this._lastUpdateImageDeferred) {
            this._lastUpdateImageDeferred.reject();
        }
        const resultDeferred = $.Deferred();
        this._lastUpdateImageDeferred = resultDeferred;
        ReportRenderingService.getShapeImage(this)
            .done((result) => {
            resultDeferred.resolve(result);
        })
            .fail((xhr) => {
            resultDeferred.resolve(null);
            this.error('An error occurred during an attempt to load data');
        });
        resultDeferred.done((result) => {
            this.isLoading(false);
            const imageSrc = (result === null || result === void 0 ? void 0 : result.imageBase64) ? 'data:image/png;base64,' + result.imageBase64 : null;
            this.imageSrc(imageSrc);
        });
    }
}
