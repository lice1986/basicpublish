﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_chartDataSourceEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export class ChartDataSourceEditor extends Editor {
    constructor() {
        super(...arguments);
        this.options = null;
    }
    generateOptions(dataSources, popupContainer) {
        if (!this.options) {
            const disabled = ko.computed(() => {
                return this._get('disabled') || !dataSources() || dataSources().length === 0;
            });
            const value = ko.computed({
                read: () => {
                    const unwrappedDataSources = dataSources();
                    const dataSource = unwrappedDataSources.filter(x => !!x && (x.value === this.value()))[0];
                    return ko.unwrap(dataSource && dataSource.displayName);
                },
                write: (newVal) => {
                    const unwrappedDataSources = dataSources();
                    const dataSource = unwrappedDataSources.filter(x => !!x && (ko.unwrap(x.displayName) === newVal))[0];
                    this.value(dataSource && dataSource.value);
                }
            });
            this._disposables.push(value);
            this._disposables.push(disabled);
            this.options = {
                displayExpr: 'displayName',
                dataSource: dataSources,
                disabled: disabled,
                value: value,
                valueExpr: 'displayName',
                displayCustomValue: true,
                dropDownOptions: { container: popupContainer }
            };
        }
        return this.options;
    }
}