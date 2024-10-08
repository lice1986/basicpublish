﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrSparkline.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getFullPath } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { sparklineViewMap } from './metadata/xrSparkline';
import { XRControlViewModel } from './xrControl';
import { TodoControlSurface } from './_xrTodoControl';
export class XRSparklineViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this.view(this.createView(this.view() || {}, serializer));
        this.sparklineFake = {
            type: ko.pureComputed({
                read: () => {
                    return this.view().type();
                },
                write: (val) => {
                    this.view(this.createView({ '@Type': val }, serializer));
                }
            }),
            content: this.view
        };
        this._disposables.push(this.sparklineFake.type);
    }
    createView(model, serializer = null) {
        const type = model && model['@Type'] || 'Line';
        const viewTypeSerialization = sparklineViewMap[type];
        const newView = { 'type': ko.observable(type), 'getInfo': () => { return viewTypeSerialization; } };
        (serializer || new ModelSerializer()).deserialize(newView, model);
        return newView;
    }
    getPath(propertyName) {
        if (propertyName === 'dataMember') {
            return this.dsHelperProvider() && this.dsHelperProvider().getDataSourcePath(this.dataSource());
        }
        else if (propertyName === 'valueMember') {
            return getFullPath(this.getPath('dataMember'), this.dataMember());
        }
        return super.getPath(propertyName);
    }
}
export class XRSparkLineSurface extends TodoControlSurface {
    constructor(control, context) {
        super(control, context);
    }
}
