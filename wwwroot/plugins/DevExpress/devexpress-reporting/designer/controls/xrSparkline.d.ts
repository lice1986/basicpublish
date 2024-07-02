﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrSparkline.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ControlType } from './utils/_controlTypes';
import { XRControlViewModel } from './xrControl';
import { TodoControlSurface } from './_xrTodoControl';
export declare class XRSparklineViewModel extends XRControlViewModel {
    createView(model: any, serializer?: any): {
        type: ko.Observable<any>;
        getInfo: () => any;
    };
    constructor(model: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    getPath(propertyName: any): any;
    view: any;
    dataSource: ko.Observable<any>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    sparklineFake: any;
    valueMember: ko.Observable<string> | ko.Computed<string>;
}
export declare class XRSparkLineSurface extends TodoControlSurface {
    constructor(control: XRControlViewModel, context: ISurfaceContext);
}