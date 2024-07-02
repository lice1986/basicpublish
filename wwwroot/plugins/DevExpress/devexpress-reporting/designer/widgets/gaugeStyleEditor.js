﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\gaugeStyleEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { circularValues, linearValues } from '../controls/xrGauge';
export class GaugeStyleEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, 0, parentDisabled, textToSearch);
        this._viewModel = ko.observable();
        this.viewmodel = {
            items: ko.pureComputed(() => {
                if (this._viewModel() && this._viewModel().viewType) {
                    return this._viewModel().viewType() === 'Circular' ? circularValues : linearValues;
                }
                else {
                    return [];
                }
            })
        };
        this._disposables.push(this.viewmodel.items);
    }
    update(viewModel) {
        super.update(viewModel);
        this._viewModel(viewModel);
    }
}