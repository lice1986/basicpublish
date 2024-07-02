﻿/**
* DevExpress HTML/JS Reporting (designer\actions\chartActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { XRChartViewModel } from '../controls/xrChart';
export class ChartActions extends BaseActionsProvider {
    constructor(_buildingModel) {
        super();
        this._buildingModel = _buildingModel;
        this.initActions([
            {
                text: 'Run Designer',
                displayText: () => getLocalization('Run Designer', 'ReportStringId.Verb_RunDesigner'),
                disabled: ko.observable(false),
                clickAction: () => { if (this._context.surface)
                    _buildingModel === null || _buildingModel === void 0 ? void 0 : _buildingModel.runChartDesigner(this._context.surface); },
                isContextMenuAction: true
            }
        ]);
    }
    condition(context) {
        if (context instanceof XRChartViewModel) {
            this._context = context;
            return true;
        }
        return false;
    }
}
