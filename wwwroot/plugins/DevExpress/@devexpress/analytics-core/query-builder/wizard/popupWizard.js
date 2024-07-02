﻿/**
* DevExpress Analytics (query-builder\wizard\popupWizard.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { BaseWizard } from './wizard';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { getParentContainer } from '../../widgets/_utils';
import { getTemplate } from '../../property-grid/widgets/templateUtils';
export class PopupWizard extends BaseWizard {
    constructor(pageFactory, finishCallback) {
        super(pageFactory, finishCallback);
        this.height = ko.observable(520);
        this.width = ko.observable(690);
        this._extendCssClass = '';
        this._container = getParentContainer;
        this.itemsProvider = ko.observable();
        this.nextButton = {
            text: getLocalization('Next', 'AnalyticsCoreStringId.Wizard_Next'),
            disabled: ko.computed(() => !this.canNext()),
            onClick: () => this.nextAction()
        };
        this.cancelButton = {
            text: getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'),
            onClick: () => {
                this.iterator.dispose();
                this.isVisible(false);
            }
        };
        this.previousButton = {
            text: getLocalization('Previous', 'AnalyticsCoreStringId.Wizard_Previous'),
            disabled: ko.computed(() => this.isFirstPage()),
            onClick: () => this.previousAction()
        };
        this.finishButton = {
            text: getLocalization('Finish', 'AnalyticsCoreStringId.Wizard_Finish'),
            type: 'default',
            disabled: ko.computed(() => {
                return !this.canFinish();
            }),
            onClick: () => this.finishAction()
        };
        this._titleTemplate = getTemplate('dx-wizard-headerNew');
        this.title = 'Popup Wizard';
    }
    static _getLoadPanelViewModel(element, observableVisible) {
        const $container = $.fn.constructor(element).closest('.dxrd-wizard-content');
        return {
            animation: {
                show: { type: 'fade', from: 0, to: 1, duration: 700 },
                hide: { type: 'fade', from: 1, to: 0, duration: 700 }
            },
            deferRendering: false,
            message: getLocalization('Loading...', 'AnalyticsCoreStringId.Loading'),
            visible: observableVisible,
            shading: true,
            shadingColor: 'transparent',
            position: { of: $container },
            container: $container
        };
    }
    start() {
        super.start();
        this.isVisible(true);
    }
    _wizardPopupPosition(element) {
        return {
            of: getParentContainer(element)
        };
    }
    _loadPanelViewModel(element) {
        return this._getLoadPanelViewModel(element, this.isLoading);
    }
    _getLoadPanelViewModel(element, observableVisible) {
        return PopupWizard._getLoadPanelViewModel(element, observableVisible);
    }
}