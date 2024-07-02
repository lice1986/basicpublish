﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\saveReportDialog.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { reportStorageWebIsRegister } from '../../internal/_settings';
import { ReportStorageWeb } from '../../services/reportStorageWeb';
import { ReportDialogBase } from './reportDialogBase';
export class SaveReportDialogModelBase {
    constructor(popup) {
        this.reportUrl = ko.observable('');
        this.saveText = ko.observable('');
        const self = this;
        this.popupButtons = [
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    disabled: popup.disabled,
                    text: getLocalization('Yes', 'AnalyticsCoreStringId.ParametersPanel_True'), type: 'default', stylingMode: 'contained', onClick: function () {
                        popup.save(self.reportUrl());
                    }
                }
            },
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', disabled: popup.disabled, options: {
                    disabled: popup.disabled,
                    text: getLocalization('No', 'AnalyticsCoreStringId.ParametersPanel_False'), type: 'normal', stylingMode: 'contained', onClick: function () {
                        popup.notSave();
                    }
                }
            },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { disabled: popup.disabled, type: 'normal', stylingMode: 'contained', text: getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), onClick: function () { popup.cancel(); } } }
        ];
    }
    onShow(tab) {
        this.saveText(getLocalization('"{0}" has been changed. Do you want to save changes ?', 'ReportStringId.UD_Msg_MdiReportChanged').replace('{0}', tab.displayName()));
    }
    getUrl() {
        return this.reportUrl();
    }
    setUrl(url) {
        this.reportUrl(url);
    }
}
export class SaveReportDialog extends ReportDialogBase {
    constructor(saveReportDialog, callbacks) {
        super();
        this.title = 'Save Report';
        this.saveReportDialog = saveReportDialog;
        this.onSaving = (e) => { callbacks.reportSaving && callbacks.reportSaving(e); };
        this.onSaved = (e) => { callbacks.reportSaved && callbacks.reportSaved(e); };
        this.width('auto');
        this.height(260);
        this.customize('dxrd-savereport-dialog-content-light', new SaveReportDialogModelBase(this));
        this.title = getLocalization('Save Report', 'ReportStringId.RibbonXRDesign_SaveFile_STipTitle');
    }
    save(url) {
        const self = this;
        if (reportStorageWebIsRegister()) {
            if (url) {
                const args = { report: self.tab().context().report, url: url, cancel: false };
                self.onSaving(args);
                if (args.cancel) {
                    self.tab().close && self.tab().close.reject();
                    return;
                }
                this.disabled(true);
                ReportStorageWeb.setData(self.tab().context().report.serialize(), url)
                    .done(function (jsonResult) {
                    self.onSaved({ report: self.tab().context().report, url: url });
                    self.tab().undoEngine.clearHistory();
                    self.tab().close && self.tab().close.resolve();
                    self.disabled(false);
                    self.visible(false);
                }).fail(() => {
                    self.disabled(false);
                });
            }
            else {
                self.saveReportDialog.show(self.tab());
                self.saveReportDialog.closeAfterSave(true);
                self.visible(false);
            }
        }
        else {
            self.tab().context().report.save();
            self.tab().close && self.tab().close.resolve();
        }
    }
    notSave() {
        this.tab().close.resolve();
        this.visible(false);
    }
    cancel() {
        this.tab().close && this.tab().close.reject();
        super.cancel();
    }
}