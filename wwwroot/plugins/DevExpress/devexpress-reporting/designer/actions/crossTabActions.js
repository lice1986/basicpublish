﻿/**
* DevExpress HTML/JS Reporting (designer\actions\crossTabActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { XRCrossTabViewModel } from '../controls/xrCrossTab';
import { PivotGridConverter } from '../internal/_crossTabConverter';
import { DefaultCrossTabControlEnum } from '../internal/_defaultCrossTabControl';
import { DefaultCrossTabControl } from '../utils/settings';
export class CrossTabActions extends BaseActionsProvider {
    constructor(_converters, isDisabled = () => false) {
        super();
        this._converters = _converters;
        super.initActions(DefaultCrossTabControl() == DefaultCrossTabControlEnum.XRCrossTab ? [
            {
                text: 'Revert to Original Pivot Grid',
                group: () => getLocalization('Cross Tab', 'ReportStringId.RibbonXRDesign_PageGroup_CrossTab'),
                displayText: () => getLocalization('Revert to Original Pivot Grid', 'ReportStringId.Verb_RevertCrossTabToPivotGrid'),
                imageClassName: 'dxrd-image-actions-convertation',
                imageTemplateName: 'dxrd-svg-actions-convertation',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: (model) => {
                    const converter = this._converter;
                    converter && converter.convert(model);
                }
            }
        ] : []);
    }
    get _converter() {
        return this._converters.filter(x => x instanceof PivotGridConverter)[0];
    }
    condition(context) {
        return context instanceof XRCrossTabViewModel && !!context.originalPivotGridLayout();
    }
}
