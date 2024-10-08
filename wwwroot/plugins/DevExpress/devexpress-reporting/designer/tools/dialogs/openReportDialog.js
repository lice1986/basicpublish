﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\openReportDialog.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { noDataText, searchPlaceholder } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportStorageWeb } from '../../services/reportStorageWeb';
import { ReportDialogBase } from './reportDialogBase';
export class OpenReportDialogModelBase {
    constructor(popup, urls) {
        this.urls = urls;
        this.searchValue = ko.observable('');
        this.searchPlaceholder = () => searchPlaceholder();
        this.reportUrl = ko.observable('');
        this.noDataText = noDataText();
        const self = this;
        this.onDblClick = url => popup.open(url);
        this.popupButtons = [
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: getLocalization('Open', 'ASPxReportsStringId.SidePanel_Open'), type: 'default', stylingMode: 'contained', disabled: popup.disabled, onClick: function () {
                        popup.open(self.reportUrl());
                    }
                }, disabled: ko.pureComputed(() => !this.reportUrl())
            },
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), type: 'normal', stylingMode: 'contained', disabled: popup.disabled, onClick: function () {
                        popup.cancel();
                    }
                }
            }
        ];
    }
    onShow(tab) {
        const self = this;
        this.searchValue('');
        ReportStorageWeb.getUrls().done((result) => { self.urls(result); });
    }
    getUrl() {
        return this.reportUrl();
    }
    setUrl(url) {
        this.reportUrl(url);
    }
}
export class OpenReportDialog extends ReportDialogBase {
    constructor(subreports, navigateByReports, callbacks) {
        super();
        this.title = 'Open Report';
        this.onOpening = (e) => { callbacks.reportOpening && callbacks.reportOpening(e); };
        this.onOpened = (e) => { callbacks.reportOpened && callbacks.reportOpened(e); };
        this.navigateByReports = navigateByReports;
        this.customize('dxrd-openreport-dialog-content', new OpenReportDialogModelBase(this, subreports));
        this.title = getLocalization('Open Report', 'ReportStringId.RibbonXRDesign_OpenFile_STipTitle');
    }
    open(url) {
        this.disabled(true);
        this.navigateByReports.addTab(null, ko.observable(url)).done((x) => {
            this.disabled(false);
            this.visible(false);
        }).fail(() => this.disabled(false));
    }
}
