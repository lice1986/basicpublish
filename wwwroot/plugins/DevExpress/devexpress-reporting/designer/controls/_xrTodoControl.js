﻿/**
* DevExpress HTML/JS Reporting (designer\controls\_xrTodoControl.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export class UnknownViewModel extends XRControlViewModel {
    constructor(model, parent, serializer = new ModelSerializer()) {
        super(model, parent, serializer);
        serializer._collectLinksAndEnumRefs(this._model);
    }
}
export class TodoControlSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this['controlTypeClass'] = 'dxrd-image-todo-' + control.controlType.slice(2).toLowerCase();
        this['controlTypeIconTemplate'] = 'dxrd-svg-todo-' + control.controlType.slice(2).toLowerCase();
        this.template = 'dxrd-todocontrol';
    }
}