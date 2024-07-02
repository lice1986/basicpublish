﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\selectLabelTypePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { ILabelDetails, ILabelProduct, IPaperKind } from '../internal/labelWizardUtils';
import { IReportWizardState } from '../reportWizardState';
export declare class SelectLabelTypePage extends WizardPageBase {
    constructor();
    initialize(state: IReportWizardState): JQueryPromise<{
        labelProducts: ILabelProduct[];
        paperKinds: IPaperKind[];
        labelDetails: ILabelDetails[];
    }>;
    canNext(): boolean;
    canFinish(): boolean;
    commit(): JQuery.Promise<{
        labelDetails: ILabelDetails;
    }, any, any>;
    _selectedPaperSize: ko.Computed<IPaperKind>;
    _labelData: {
        labelProducts: ILabelProduct[];
        paperKinds: IPaperKind[];
        labelDetails: ILabelDetails[];
    };
    _selectedLabelProduct: ko.Observable<ILabelProduct>;
    _selectedLabelDetails: ko.Observable<ILabelDetails>;
    _labelDetails: ko.Observable<any>;
    _width: ko.PureComputed<string>;
    _height: ko.PureComputed<string>;
    _paperType: ko.PureComputed<string>;
    _pageSizeText: ko.PureComputed<string>;
}
export declare function _registerSelectLabelTypePage(factory: PageFactory): void;
