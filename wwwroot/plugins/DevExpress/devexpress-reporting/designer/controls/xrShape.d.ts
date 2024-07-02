﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrShape.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ControlType } from './utils/_controlTypes';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export declare class XRShapeViewModel extends XRControlViewModel {
    static timeout: number;
    static shapes: ({
        displayName: string;
        type: string;
        angle?: undefined;
        val?: undefined;
    } | {
        displayName: string;
        type?: undefined;
        angle?: undefined;
        val?: undefined;
    } | {
        displayName: string;
        angle: number;
        type: string;
        val?: undefined;
    } | {
        displayName: string;
        val: {
            '@NumberOfSides': number;
            '@StarPointCount'?: undefined;
        };
        type: string;
        angle?: undefined;
    } | {
        displayName: string;
        val: {
            '@StarPointCount': number;
            '@NumberOfSides'?: undefined;
        };
        type: string;
        angle?: undefined;
    })[];
    static createShape(model: any, serializer?: any): {
        shapeType: ko.Observable<any>;
        getInfo: () => any;
    };
    constructor(model: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    Shape: any;
    shapeFake: any;
}
export declare class ImageBase64Model {
    imageBase64: string;
}
export declare class XRShapeControlSurface extends XRControlSurface {
    private _lastUpdateImageDeferred;
    private _updateImage;
    constructor(control: XRControlViewModel, context: ISurfaceContext);
    imageSrc: ko.Observable<string>;
    isLoading: ko.Observable<boolean>;
    error: ko.Observable<string>;
}
