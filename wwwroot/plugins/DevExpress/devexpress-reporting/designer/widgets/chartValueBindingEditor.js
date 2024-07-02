﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\chartValueBindingEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import { TreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
export class ChartValueBindingEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
        this.treeListController = new TreeListController();
    }
    generateDisplayValue(reportDataSource) {
        if (!this.displayBinding) {
            this._disposables.push(this.displayBinding = ko.computed(() => {
                const model = this._get('_model');
                return model && model['displayValue'](reportDataSource());
            }));
        }
        return this.displayBinding();
    }
    generateValue(undoEngine, reportParameters, reportDataSource) {
        if (!this.binding) {
            this._disposables.push(this.binding = ko.computed({
                read: () => {
                    const model = this._get('_model');
                    return model && model['calculatePath'](reportDataSource()) || '';
                },
                write: (path) => {
                    const pathRequest = new PathRequest(path);
                    undoEngine.start();
                    this._get('_model')['updateValue'](pathRequest, reportParameters());
                    undoEngine.end();
                }
            }));
        }
        return this.binding;
    }
}