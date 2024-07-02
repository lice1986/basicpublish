﻿/**
* DevExpress Analytics (diagram\elements\diagramElementBaseViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '../../core/elements/elementViewModel';
import { size, location, name, text } from '../metadata';
import { diagramControlsFactory } from '../controlsFactory';
export class DiagramElementBaseViewModel extends ElementViewModel {
    constructor(control, parent, serializer) {
        super(control, parent, serializer);
    }
    getControlFactory() {
        return diagramControlsFactory;
    }
}
export const diagramElementSerializationInfo = [size, location, name, text, { propertyName: 'type', modelName: '@Type' }];