﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\_addon.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { searchPlaceholder } from '../../../property-grid/localization/_localization';
export class FilterEditorAddOn extends Disposable {
    constructor(criteria, popupService, action, propertyName, templateName) {
        super();
        this._filterPlaceHolder = searchPlaceholder();
        this.showPopup = (_, element) => {
            this.dispose();
            this._disposables.splice(0);
            this._popupService.title('');
            this.target.isSelected(true);
            this._updateActions(this.target);
            this._popupService.target(element);
            setTimeout(() => {
                this._popupService.visible(true);
            }, 10);
        };
        this.popupContentTemplate = 'dx-filtereditor-popup-common';
        this.filterString = ko.observable('');
        this.isFiltered = ko.observable(false);
        this.target = criteria;
        this._action = action;
        this.propertyName = propertyName;
        this._popupService = popupService;
        this.popupContentTemplate = templateName || this.popupContentTemplate;
    }
    _updateActions(viewModel) {
        this._popupService.data(null);
        if (viewModel) {
            this._disposables.push(this._popupService.visible.subscribe((newVal) => {
                this.target.isSelected(newVal);
                this.filterString('');
            }));
            this._popupService['viewModel'] = viewModel;
            let data = viewModel[this.propertyName];
            this.isFiltered(false);
            if (data && data.length > 10) {
                this.isFiltered(true);
                this._disposables.push(data = ko.pureComputed(() => {
                    if (!this.filterString())
                        return viewModel[this.propertyName];
                    return viewModel[this.propertyName].filter(x => (x.displayText || x.name).toLocaleLowerCase().indexOf(this.filterString().toLocaleLowerCase()) != -1);
                }));
            }
            this._popupService.data({
                data: data,
                template: this.popupContentTemplate,
                click: (data) => {
                    viewModel[this._action](data);
                    this._popupService.visible(false);
                },
                isFiltered: this.isFiltered,
                filterString: this.filterString,
                searchPlaceholder: () => searchPlaceholder()
            });
        }
    }
}
