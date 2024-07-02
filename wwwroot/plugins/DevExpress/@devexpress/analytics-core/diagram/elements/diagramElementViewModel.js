﻿/**
* DevExpress Analytics (diagram\elements\diagramElementViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { deserializeArray } from '../../serializer/utils';
import { extend } from '../../serializer/_utils';
import { ConnectingPointViewModel } from './connectingPointModel';
import { DiagramElementBaseViewModel } from './diagramElementBaseViewModel';
export class DiagramElementViewModel extends DiagramElementBaseViewModel {
    constructor(control, parent, serializer) {
        super(extend({ '@ControlType': 'DiagramElement' }, control), parent, serializer);
        this.connectingPoints = deserializeArray(control && control.ConnectingPoints || [], (item) => { return new ConnectingPointViewModel(item, this, serializer); });
        if (this.text() === undefined) {
            this.text(this.name());
        }
    }
}