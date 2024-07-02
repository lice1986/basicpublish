﻿/**
* DevExpress Analytics (widgets\filtereditor\filtereditoroptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DefaultFilterEditorHelper } from './helpers/helper';
import { getLocalization } from '../../property-grid/localization/localization_utils';
export class FilterStringOptions {
    constructor(filterString, dataMember, disabled, title) {
        this.popupContainer = '.dx-designer-viewport';
        this.itemsProvider = null;
        this.resetValue = () => {
            this.value('');
        };
        this.title = ko.pureComputed({
            read: () => {
                const title = this._title();
                return getLocalization(title.text, title.localizationId);
            },
            write: (value) => {
                this._title({ text: value });
            }
        });
        this.value = filterString;
        this.path = dataMember || ko.observable('');
        this.disabled = disabled || ko.observable(false);
        const filterEditorHelperType = DefaultFilterEditorHelper();
        this.helper = new filterEditorHelperType();
        this._title = ko.observable(title || { text: getLocalization('Filter Editor', 'DataAccessUIStringId.FiltersView') });
    }
}
export class FilterStringPlainOptions extends FilterStringOptions {
    constructor() {
        super(...arguments);
        this.realTimeUpdate = true;
        this.advancedModePosition = 'TopRight';
    }
}