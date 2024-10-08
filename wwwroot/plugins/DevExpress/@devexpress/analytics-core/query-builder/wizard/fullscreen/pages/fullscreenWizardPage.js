﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\fullscreenWizardPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { getSectionStyle } from '../../internal/_utils';
import { WizardPageSectionFactory } from '../../internal/_wizardPageSectionFactory';
import { WizardPageProcessor } from '../../internal/_wizardPageProcessor';
import { EventManager } from '../../../../serializer/eventManager';
import { extend } from '../../../../serializer/_utils';
import { WizardPageBase } from '../../pages/wizardPageBase';
import { __loadingStateFunctionName, __nextActionFunctionName } from '../../internal/_constants';
export class FullscreenWizardPage extends WizardPageBase {
    constructor() {
        super();
        this._sectionsToUnregister = [];
        this._sectionsToRegister = [];
        this._sectionPositions = [];
        this._initInProgress = ko.observable(false);
        this._defaultMargin = 24;
        this._parentMarginOffset = this._defaultMargin + this._defaultMargin / 2;
        this._className = '';
        this._pageCss = {};
        this.events = new EventManager();
        this._factory = new WizardPageSectionFactory();
        this._sectionsProcessor = new WizardPageProcessor(this._factory, (state) => {
            this[__loadingStateFunctionName] && this[__loadingStateFunctionName](state);
        }, () => this[__nextActionFunctionName] && this[__nextActionFunctionName]());
        this._sectionsProcessor.events.addHandler('beforeStart', () => {
            this._sections = this._sectionsProcessor.sections;
            this._beforeStart();
            this._patchOnChange();
        });
        this._sectionsProcessor.events.addHandler('beforePageInitialize', (args) => {
            this.events.call('beforeSectionInitialize', {
                section: args.page,
                sectionId: args.pageId,
                page: this,
                state: args.state
            });
        });
        this._sectionsProcessor.events.addHandler('afterPageInitialize', (args) => {
            this.events.call('afterSectionInitialize', {
                section: args.page,
                sectionId: args.pageId,
                page: this
            });
        });
    }
    dispose() {
        this._sectionsProcessor.dispose();
        this._factory.reset();
        this._sections = [];
    }
    _patchOnChange() {
        Object.keys(this._factory.metadata).forEach(key => {
            this._factory.metadata[key].onChange = () => this._onChange();
        });
    }
    _getPageStyle(position, isVisible = true) {
        return getSectionStyle(position, this._defaultMargin, isVisible);
    }
    _applyCustomizations() {
        this._sectionsToUnregister.forEach(x => x());
        this._sectionsToUnregister = [];
        this._sectionPositions.forEach(x => x());
        this._sectionPositions = [];
        this._sectionsToRegister.forEach(x => x());
        this._sectionsToRegister = [];
    }
    _setSectionPosition(pageId, position) {
        this._pageCss[pageId] = ko.observable(this._getPageStyle(position));
    }
    registerSections() { }
    canNext() {
        return this._sectionsProcessor.sections.every(this._sectionCondition);
    }
    _sectionCondition(section) {
        if (section.metadata.required)
            return section.page() && section.metadata.canNext(section.page().page);
        else {
            return !section.page() || section.metadata.canNext(section.page().page);
        }
    }
    canFinish() {
        for (let i = this._sections.length - 1; i >= 0; i--) {
            if (this._sections[i].page() && this._sections[i].metadata.canFinish(this._sections[i].page().page))
                return true;
        }
        return false;
    }
    setSectionPosition(sectionId, position) {
        this._sectionPositions.push(() => {
            this._setSectionPosition(sectionId, position);
        });
    }
    registerSection(sectionId, metadata) {
        this._sectionsToRegister.push(() => {
            this._factory.registerMetadata(sectionId, metadata);
        });
    }
    unregisterSection(sectionId) {
        this._sectionsToUnregister.push(() => this._factory.unregisterMetadata(sectionId));
    }
    _loadPanelViewModel(element) {
        return false;
    }
    getNextSectionId(sectionId) { return undefined; }
    initialize(state, stateChanged) {
        this.registerSections();
        this._applyCustomizations();
        this._sectionsProcessor.initialize(extend(true, {}, state));
        this._stateManager = this._sectionsProcessor.stateManager;
        this._sectionsProcessor.iterator.getNextPageId = (pageId) => this.getNextSectionId(pageId);
        this._sectionsProcessor.start();
        return $.Deferred().resolve().promise();
    }
    _beforeStart() { }
    commit() {
        const deferred = $.Deferred();
        this._sectionsProcessor.finishAction().done(() => {
            deferred.resolve(extend(true, {}, this._stateManager.getCurrentState()));
        });
        return deferred.promise();
    }
    _getPageDescription(index, page) {
        return (index + 1) + '. ' + page.metadata.description;
    }
    _showPageDescription(page) {
        var _a;
        return ((_a = page === null || page === void 0 ? void 0 : page.metadata) === null || _a === void 0 ? void 0 : _a.alwaysShowTitle) || this._sections.length > 1;
    }
}
