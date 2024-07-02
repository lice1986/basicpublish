﻿/**
* DevExpress Analytics (query-builder\widgets\_undoEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '../../property-grid/widgets/editor';
export class UndoEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
    }
    generateValue(undoEngine) {
        if (!this.undoValue) {
            this._disposables.push(this.undoValue = ko.computed({
                read: () => {
                    return this.value();
                },
                write: (val) => {
                    undoEngine().start();
                    this.value(val);
                    undoEngine().end();
                }
            }));
        }
        return this.undoValue;
    }
}
