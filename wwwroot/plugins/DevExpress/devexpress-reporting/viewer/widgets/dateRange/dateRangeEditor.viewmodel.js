﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\dateRange\dateRangeEditor.viewmodel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
import { calculateWithZoomFactor, getLocalization, getParentContainer } from '@devexpress/analytics-core/analytics-internal-native';
import { predefinedDateRanges, predefinedDateRangesModel } from './dateRangeEditor.ranges';
export function createDateRangeEditorViewModel(baseViewModel) {
    let popupSettings = null;
    const inRange = (date) => {
        const _end = new Date(viewModel.endRange.value.getTime());
        const _start = new Date(viewModel.startRange.value.getTime());
        return date <= new Date(_end.setHours(0, 0, 0, 0)) &&
            date >= new Date(_start.setHours(0, 0, 0, 0));
    };
    const createPredefinedItemsViewModel = () => predefinedDateRanges.map(x => {
        return createViewModelGenerator(Object.assign(Object.assign({}, x), { click: () => this.applyDate(x.range(), true) }))
            .generateProperty('selected', this._isSelected(x))
            .getViewModel();
    });
    const viewModel = createViewModelGenerator(Object.assign(Object.assign({}, baseViewModel), { showPopup: () => this._showPopup(), popupTemplate: this.popupTemplate, items: this.items, cacheElement: ($element) => this._$element = $.fn.constructor($element), scrollViewOptions: {
            showScrollbar: 'always',
            direction: 'horizontal',
            useNative: false,
            onInitialized: function (e) { e.component.option('useKeyboard', false); }
        }, _editorInputId: this._editorInputId, _displayName: this._displayName }))
        .generateProperty('getPopupSettings', () => {
        if (!popupSettings) {
            popupSettings = createViewModelGenerator({
                width: 'max-content',
                height: calculateWithZoomFactor(362),
                wrapperAttr: { class: 'dxrv-daterange-editor-popup-wrapper' },
                position: { my: 'right top', at: 'right bottom', of: this._$element[0], collision: 'fit fit', offset: '1 -1' },
                container: getParentContainer(this._$element[0]),
                showTitle: false,
                showCloseButton: false,
                hideOnOutsideClick: true,
                onHidden: (e) => this._popupVisible = false,
                animation: {},
                shading: false,
            })
                .generateProperty('visible', this._popupVisible)
                .getViewModel();
        }
        return popupSettings;
    })
        .generateProperty('dialogKeyboardHelper', this.dialogKeyboardHelper)
        .generateProperty('predefinedRanges', createViewModelGenerator({
        attr: { 'aria-label': getLocalization('Predefined periods', 'ASPxReportsStringId.WebDocumentViewer_AriaLabelPredefinedPeriods') },
        accessibilityKeyboardHelper: this.dialogKeyboardHelper.predefinedDateRangesKeyboardHelper,
        scrollViewOptions: {
            showScrollbar: 'onHover',
            scrollByContent: false,
            bounceEnabled: false,
            useNative: false,
            scrollByThumb: true,
            onInitialized: function (e) { e.component.option('useKeyboard', false); }
        }
    })
        .generateProperty('items', createPredefinedItemsViewModel())
        .getViewModel())
        .generateProperty('startRange', createViewModelGenerator({
        height: this.calendarHeight,
        inRange: (date) => inRange(date),
        onValueChanged: (e) => this.startDate = e.value
    })
        .generateProperty('value', this.startDate)
        .getViewModel())
        .generateProperty('endRange', createViewModelGenerator({
        height: this.calendarHeight,
        inRange: (date) => inRange(date),
        onValueChanged: (e) => this.endDate = e.value
    })
        .generateProperty('value', this.endDate)
        .generateProperty('min', this.startDate)
        .getViewModel())
        .generateProperty('displayValue', this._displayText)
        .getViewModel();
    this.addDisposable(predefinedDateRangesModel.events.on('rangesChanged', (e) => {
        viewModel.predefinedRanges.items = createPredefinedItemsViewModel();
    }));
    viewModel.popupModel = this['_options'].isMobile ? this.popupModel.getViewModel() : viewModel;
    return viewModel;
}
