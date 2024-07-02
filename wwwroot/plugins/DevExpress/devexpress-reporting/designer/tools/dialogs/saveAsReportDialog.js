﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\saveAsReportDialog.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { noDataText, NotifyType, ShowMessage } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { reportStorageWebIsRegister } from '../../internal/_settings';
import { ReportStorageWeb } from '../../services/reportStorageWeb';
import { ReportDialogBase } from './reportDialogBase';
export class SaveAsReportDialogModelBase {
    constructor(popup, urls) {
        this.noDataText = noDataText();
        this.reportNamePlaceholder = () => getLocalization('Enter a report name to save...', 'ASPxReportsStringId.ReportDesigner_SaveAs_NamePlaceholder');
        this.urls = urls;
        this.reportUrl = ko.observable('');
        this.reportName = ko.observable('');
        this.onDblClick = url => popup.save(url);
        const self = this;
        this.popupButtons = [
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: getLocalization('Save', 'AnalyticsCoreStringId.MenuButtons_Save'), type: 'default', stylingMode: 'contained', disabled: ko.computed(() => { return !self.reportName() || popup.disabled(); }), onClick: function () {
                        popup.save(self.reportName());
                    }
                }
            },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { disabled: popup.disabled, text: getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), type: 'normal', stylingMode: 'contained', onClick: function () { popup.cancel(); } } }
        ];
    }
    onShow(tab) {
        const self = this;
        ReportStorageWeb.getUrls().done((result) => { self.urls(result); });
        const displayName = (this.urls() || []).filter((item) => { return item.Key === this.reportUrl(); })[0];
        this.reportName(displayName && displayName['Value'] || tab.displayName());
    }
    getUrl() {
        return this.reportUrl();
    }
    setUrl(url) {
        this.reportUrl(url);
    }
}
export class SaveAsReportDialog extends ReportDialogBase {
    constructor(subreports, callbacks) {
        super();
        this.closeAfterSave = ko.observable(false);
        this.title = 'Save Report';
        this.onSaving = (e) => { callbacks.reportSaving && callbacks.reportSaving(e); };
        this.onSaved = (e) => { callbacks.reportSaved && callbacks.reportSaved(e); };
        this.template('dxrd-savereport-dialog-content');
        this.customize('dxrd-savereport-dialog-content', new SaveAsReportDialogModelBase(this, subreports));
        this.title = getLocalization('Save Report', 'ReportStringId.RibbonXRDesign_SaveFile_STipTitle');
    }
    show(tab) {
        this.closeAfterSave(false);
        super.show(tab);
    }
    save(url) {
        const self = this;
        if (reportStorageWebIsRegister()) {
            self.tab().context().report.displayNameObject(url);
            const data = self.tab().context().report.serialize();
            const args = { report: self.tab().context().report, url: url, cancel: false, dialog: this };
            self.onSaving(args);
            if (args.cancel) {
                return;
            }
            self.disabled(true);
            ReportStorageWeb.setNewData(data, url)
                .done(function (result) {
                self.onSaved({ report: self.tab().context().report, url: result });
                const url = result;
                self.tab().context().url(result);
                self.tab().isDirty(false);
                ShowMessage(getLocalization('The report has been successfully saved.', 'ASPxReportsStringId.ReportDesigner_SaveReport_Message_OK'), NotifyType.success);
                if (self.closeAfterSave()) {
                    self.tab().close.resolve();
                }
                ReportStorageWeb.getUrls().done((result) => { self.model()['urls'] && self.model()['urls'](result); });
                self.disabled(false);
                self.visible(false);
            }).fail(() => {
                self.disabled(false);
            });
        }
        else {
            self.tab().context().report.save();
            if (self.closeAfterSave()) {
                self.tab().close.resolve();
            }
            else {
                self.tab().close && self.tab().close.reject();
            }
            this.visible(false);
        }
    }
}