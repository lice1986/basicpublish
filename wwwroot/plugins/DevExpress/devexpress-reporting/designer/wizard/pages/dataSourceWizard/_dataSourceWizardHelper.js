﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\_dataSourceWizardHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { createNewObjectItem } from '../../../dataObjects/objectItemCreation';
import { _convertToStateDataSource } from '../chooseAvailableDataSourcePage';
function overrideDataSourceWizardPage(factory, pageId, meta) {
    const oldMetadata = factory.getMetadata(pageId);
    factory.registerMetadata(pageId, {
        canNext: (page) => page.canFinish() || page.canNext(),
        create: () => meta.create(),
        resetState: (state, defaultState) => {
            state.newDataSource = defaultState.newDataSource;
            meta.resetState && meta.resetState(state, defaultState);
        },
        getState: (state) => state,
        setState: (data, state) => {
            meta.setState && meta.setState(data, state);
            state.newDataSource = data.newDataSource;
        },
        description: oldMetadata.description,
        template: oldMetadata.template
    });
}
export function overrideJsonDataSourceWizardPage(factory, pageId, meta) {
    overrideDataSourceWizardPage(factory, pageId, $.extend({}, meta, {
        setState: (data, state) => {
            $.extend(state.jsonDataSourceWizard, data.result);
        }
    }));
}
export function overrideSqlDataSourceWizardPage(factory, pageId, meta) {
    overrideDataSourceWizardPage(factory, pageId, $.extend({}, meta, {
        setState: (data, state) => {
            state.sqlDataSourceWizard = data.result;
        }
    }));
}
export class DataSourceWizardHelper {
    constructor(_page, _callback) {
        this._page = _page;
        this._callback = _callback;
    }
    commit(superCommit, createDataSource) {
        const deferred = $.Deferred();
        if (!this._page.canNext() && this._page.canFinish()) {
            superCommit().done((commitResult) => {
                const dataSourcePromise = this._callback(createDataSource(commitResult));
                dataSourcePromise.done((result) => {
                    result.data = createNewObjectItem(result.data);
                    deferred.resolve({
                        result: commitResult,
                        newDataSource: _convertToStateDataSource(result)
                    });
                }).fail(deferred.reject);
            });
        }
        else
            superCommit().done((commitResult) => {
                deferred.resolve({
                    result: commitResult
                });
            });
        return deferred.promise();
    }
}
