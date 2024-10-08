﻿/**
* DevExpress Analytics (diagram\elements\connectors\connectorModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DiagramElementBaseViewModel } from '../diagramElementBaseViewModel';
import { ElementViewModel } from '../../../core/elements/elementViewModel';
import { ModelSerializer } from '../../../serializer/serializer';
import { ConnectionPointViewModel } from './connectionPointModel';
export declare class ConnectorViewModel extends DiagramElementBaseViewModel {
    static MIN_LINE_THICKNESS: number;
    getX(): number;
    getY(): number;
    getWidth(): number;
    getHeight(): number;
    constructor(control: any, parent: ElementViewModel, serializer?: ModelSerializer);
    startPoint: ko.Observable<ConnectionPointViewModel> | ko.Computed<ConnectionPointViewModel>;
    endPoint: ko.Observable<ConnectionPointViewModel> | ko.Computed<ConnectionPointViewModel>;
}
