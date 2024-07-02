﻿/**
* DevExpress HTML/JS Reporting (chart\_surface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISize } from '@devexpress/analytics-core/analytics-elements';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ChartControlViewModel } from './_control';
export declare class ChartControlSurface extends Disposable {
    constructor(control: ChartControlViewModel, zoom?: ko.Observable<number>, size?: ISize);
    width: ko.Computed<number>;
    height: ko.Computed<number>;
    imageSrc: ko.Observable<string>;
    zoom: ko.Observable<number> | ko.Computed<number>;
    templateName: string;
}
