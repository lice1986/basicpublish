﻿/**
* DevExpress Analytics (diagram\elements\diagramElementViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '../../core/elements/elementViewModel';
import { ModelSerializer } from '../../serializer/serializer';
import { ConnectingPointViewModel } from './connectingPointModel';
import { DiagramElementBaseViewModel } from './diagramElementBaseViewModel';
export declare class DiagramElementViewModel extends DiagramElementBaseViewModel {
    constructor(control: any, parent: ElementViewModel, serializer?: ModelSerializer);
    connectingPoints: ko.ObservableArray<ConnectingPointViewModel>;
    text: ko.Observable<string> | ko.Computed<string>;
    type: ko.Observable<string> | ko.Computed<string>;
}
