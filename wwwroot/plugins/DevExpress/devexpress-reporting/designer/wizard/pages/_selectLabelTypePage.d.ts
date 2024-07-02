﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\_selectLabelTypePage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ILabelDetails, ILabelProduct, IPaperKind } from '../internal/labelWizardUtils';
export declare let labelReportWizardPromise: JQueryPromise<{
    labelProducts: ILabelProduct[];
    paperKinds: IPaperKind[];
    labelDetails: ILabelDetails[];
}>;
export declare function initializeLabelReportWizardPromise(): void;