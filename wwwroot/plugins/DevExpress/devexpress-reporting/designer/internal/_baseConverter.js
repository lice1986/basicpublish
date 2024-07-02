﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_baseConverter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export class BaseConverter {
    constructor() {
        this._model = null;
        this.popupOptions = {
            height: 250,
            visible: ko.observable(false),
            title: getLocalization('Convert', 'ReportStringId.UD_Msg_ConvertBindingsCaption'),
            confirmMessage: '',
            infoMessage: '',
            linkText: '',
            linkUrl: '',
            container: (element) => getParentContainer(element),
            buttons: [
                {
                    toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                        text: getLocalization('Yes', 'AnalyticsCoreStringId.ParametersPanel_True'), type: 'default', stylingMode: 'contained', onClick: () => {
                            this._applyChanges();
                        }
                    }
                },
                {
                    toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                        text: getLocalization('No', 'ASPxReportsStringId.ParametersPanel_No'), type: 'normal', stylingMode: 'contained', onClick: () => {
                            this._cancel();
                        }
                    }
                }
            ]
        };
    }
    convert(model) {
        if (!model)
            return;
        this._model = model;
        this.popupOptions.visible(true);
    }
    _applyChanges() {
        this.popupOptions.visible(false);
    }
    _cancel() {
        this.popupOptions.visible(false);
    }
}