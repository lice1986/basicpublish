﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_loaddispatcher.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { RichAction } from './_utils';
export class RichEditLoadDispatcher extends Disposable {
    constructor(richEdit) {
        super();
        this.richEdit = richEdit;
    }
    process(element) {
        if (element.queueAction === RichAction.OpenDocument) {
            this.richEdit.openDocumentNative(element.base64, element.documentFormat, () => {
                element.ready();
            }, () => {
                if (element.errorCallBack)
                    element.errorCallBack();
            });
        }
        if (element.queueAction == RichAction.NewDocument) {
            this.richEdit.newDocumentNative(() => {
                element.ready();
            });
        }
        if (element.queueAction == RichAction.SaveDocument) {
            this.richEdit.saveDocumentNative(element.documentFormat, (result) => {
                if (element.documentConverted)
                    element.documentConverted(result);
            });
        }
    }
}
