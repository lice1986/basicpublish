﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_chartUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPropertiesAccessibilityProvider } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { IChartDesignerOptions } from '../../../chart/_initializer';
import { XRChartSurface } from '../xrChart';
export declare const createChartDesignerOptions: (designerModel: any, dataSourceHelper: any, model: any, parameters: any, chartValueBindingProvider: any, accessibilityProvider: IPropertiesAccessibilityProvider) => {
    dispose: () => void;
    options: IChartDesignerOptions;
    visible: ko.Observable<boolean>;
    buttons: {
        toolbar: string;
        location: string;
        widget: string;
        options: {
            text: any;
            type: string;
            stylingMode: string;
            onClick: () => void;
        };
    }[];
    run: (chartSurface: XRChartSurface) => void;
    container: (element: HTMLElement) => any;
};