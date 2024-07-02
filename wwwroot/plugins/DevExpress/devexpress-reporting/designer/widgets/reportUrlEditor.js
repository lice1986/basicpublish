﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\reportUrlEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import DataSource from 'devextreme/data/data_source';
import * as ko from 'knockout';
import { reportStorageWebIsRegister } from '../internal/_settings';
import { ReportStorageWeb } from '../services/reportStorageWeb';
export class ReportUrlEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
    }
    _initUrls(urls, tab) {
        if (!this.urls) {
            if (reportStorageWebIsRegister()) {
                this.urls = urls;
                this.updateUrls();
            }
            else {
                this.urls = ko.computed(() => {
                    return tab() ? (urls() || []).filter(x => x.Key !== tab().url()) : urls();
                });
                this._disposables.push(this.urls);
            }
        }
    }
    getValues(urls, tab) {
        if (!this.dataSource) {
            this._initUrls(urls, tab);
            this._disposables.push(this.dataSource = ko.computed(() => {
                const dataSource = new DataSource({
                    store: this.urls(),
                    paginate: true,
                    filter: (url) => { return url.Key !== tab().url(); },
                    pageSize: 100
                });
                return dataSource;
            }));
        }
        return this.dataSource;
    }
    updateUrls() {
        if (reportStorageWebIsRegister()) {
            ReportStorageWeb.getUrls().done((result) => { this.urls(result); });
        }
    }
}
