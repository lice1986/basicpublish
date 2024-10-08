﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\reportDialogBase.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export class ReportDialogBase extends Disposable {
    constructor() {
        super();
        this._visible = ko.observable(false);
        this.width = ko.observable(690);
        this.height = ko.observable(420);
        this.template = ko.observable('');
        this.model = ko.observable(null);
        this.tab = ko.observable(null);
        this.disabled = ko.observable(false);
        this.visible = ko.computed({
            read: () => {
                return this._visible();
            },
            write: (newVal) => {
                if (this.disabled())
                    return;
                this._visible(newVal);
                if (!newVal)
                    this.tab(null);
            }
        });
        this.container = (element) => getParentContainer(element);
        this._disposables.push(this.visible);
    }
    dispose() {
        super.dispose();
        this.tab(null);
    }
    show(tab) {
        if (tab) {
            this.tab(tab);
            this.model().setUrl(tab.context().url());
        }
        this.model().onShow(tab);
        this.visible(true);
    }
    customize(template, model) {
        this.template(template);
        this.model(model);
        this.buttons = model.popupButtons;
    }
    cancel() {
        this.visible(false);
    }
}
