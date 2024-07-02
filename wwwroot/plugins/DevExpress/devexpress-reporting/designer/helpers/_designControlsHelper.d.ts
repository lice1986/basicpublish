﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_designControlsHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DesignControlsHelper as AnalyticDesignControlsHelper, IDisplayedObject, SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { ReportViewModel } from '../controls/xrReport';
export declare class DesignControlsHelper extends AnalyticDesignControlsHelper {
    private _xrPdfSignatureCollection;
    dispose(): void;
    getNameProperty(model: any): any;
    protected _setName(value: any): void;
    protected _setDefaultText(value: any): void;
    protected _getNamePrefix(value: any): any;
    processCollection(collection: IDisplayedObject[]): void;
    constructor(target: ReportViewModel, selection: SurfaceSelection);
}
