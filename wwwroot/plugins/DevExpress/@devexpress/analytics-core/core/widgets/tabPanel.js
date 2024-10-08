﻿/**
* DevExpress Analytics (core\widgets\tabPanel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getResizableOptions } from '../utils/_utils.getResizableOptions';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { accessibilityFontSizeZoomFactor } from '../../accessibility/_internal';
import { BaseRenderingModel, mutable, mutableArray } from '../../serializer/native/models/base.model';
import { RightPanelKeyboardHelperNative } from '../../accessibility/_rightPanelKeyboardHelperNative';
import { createViewModelGenerator } from '../../serializer/native/viewModels/viewModelGenerator';
export class TabPanel extends BaseRenderingModel {
    constructor(options) {
        super();
        this.cssClasses = (extendedClass = '') => {
            const result = [extendedClass];
            if (this.position === TabPanel.Position.Left)
                result.push('dxrd-tab-panel-left');
            if (this.position === TabPanel.Position.Right)
                result.push('dxrd-tab-panel-right');
            if (this.isEmpty)
                result.push('dxrd-tab-panel-empty');
            return result.join(' ');
        };
        const tabs = options.tabs;
        this._autoSelectTab = options.autoSelectTab;
        let defaultPosition = TabPanel.Position.Right;
        if (options.rtl)
            defaultPosition = TabPanel.Position.Left;
        this.position = defaultPosition;
        const zoomFactor = accessibilityFontSizeZoomFactor();
        this.zoomFactor = zoomFactor;
        const _self = this;
        this.tabs = tabs;
        this.toggleTabVisibility = (e) => {
            const selectedTab = e.model;
            const activeTab = this.tabs.filter((tab) => tab.active)[0];
            if (selectedTab === activeTab) {
                this.collapsed = !this.collapsed;
            }
            else {
                this.selectTab(e);
            }
        };
        this.selectTab = (e) => {
            const selectedTab = e.model;
            if (!selectedTab.disabled) {
                this.tabs.forEach(function (tab) {
                    tab.active = tab === selectedTab;
                });
                this.collapsed = false;
            }
        };
        if (tabs && tabs.length) {
            this.isEmpty = this.tabs.every(tab => !tab.visible);
            this.tabs.forEach(tab => {
                tab.collapsed = this.collapsed;
            });
        }
        this._onVisibilityChanged();
        this._onDisabledChanged();
        this._disposables.push(...tabs.map((tab) => ({
            dispose: this._subscribeTab(tab)
        })));
        this._width = options.width || 370 * zoomFactor;
        this.width = this.collapsed ? 0 : this._width;
        this.headerWidth = this.isEmpty ? 0 : (50 * zoomFactor + this.width);
        this.getResizableOptions = ($element, panelOffset, minWidth) => {
            if (!this._resizableOptions || this._resizableOptions.$element !== $element) {
                const widthFunc = function (newVal) {
                    if (arguments.length === 0)
                        return _self.width;
                    else {
                        _self.width = newVal;
                    }
                };
                this._resizableOptions = getResizableOptions($element, zoomFactor * panelOffset, minWidth, _self.position, TabPanel.Position.Left, widthFunc, _self.collapsed);
                _self.addDisposable(_self.events.on('positionChanged', (args) => {
                    this._resizableOptions.handles(_self.position === TabPanel.Position.Left ? 'e' : 'w');
                }), _self.events.on('collapsedChanged', (args) => {
                    if (typeof this._resizableOptions.minimumWidth === 'function')
                        this._resizableOptions.minimumWidth(_self.collapsed ? 0 : minWidth);
                    else
                        this._resizableOptions.minimumWidth = _self.collapsed ? 0 : minWidth;
                    if (typeof this._resizableOptions.disabled === 'function')
                        this._resizableOptions.disabled(this.collapsed);
                    else
                        this._resizableOptions.disabled = this.collapsed;
                }));
            }
            return this._resizableOptions;
        };
        this._disposables.push({
            dispose: () => {
                this._resizableOptions = null;
                this.getResizableOptions = null;
            }
        });
        const postfix = this.collapsed ? '-expand' : '-collapse';
        this.toggleCollapsedImage = { class: 'dxrd-image-propertygrid' + postfix, template: 'dxrd-svg-tabs' + postfix };
        this.toggleCollapsedText = (() => {
            const actionString = this.collapsed ? 'Open' : 'Collapse';
            return getLocalization(actionString, 'ASPxReportsStringId.SidePanel_' + actionString);
        })();
        this.keyboardHelper = new RightPanelKeyboardHelperNative(this);
        this._disposables.push(this.keyboardHelper);
    }
    mapToTabsCollection() {
        return this.tabs.map(x => {
            const viewModel = x.getViewModel();
            viewModel.click = () => this.toggleTabVisibility({ model: x });
            return viewModel;
        });
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('width', this.headerWidth)
            .generateProperty('class', this.cssClasses(this.collapsed ? 'dx-tab-panel-collapsed' : ''))
            .generateProperty('tabs', this.mapToTabsCollection())
            .generateProperty('tabsElement', createViewModelGenerator()
            .generateProperty('class', this.cssClasses())
            .getViewModel())
            .generateProperty('contentElement', createViewModelGenerator()
            .generateProperty('class', this.cssClasses())
            .generateProperty('width', this.width)
            .getViewModel())
            .generateProperty('keyboardHelper', this.keyboardHelper)
            .generateProperty('getResizableOptions', this.getResizableOptions)
            .getViewModel();
    }
    dispose() {
        super.dispose();
        this.disposeArray(this.tabs);
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        if (args.propertyName === 'width') {
            viewModel.contentElement.width = this.width;
        }
        if (args.propertyName === 'headerWidth') {
            viewModel.width = this.headerWidth;
        }
        if (args.propertyName === 'isEmpty' || args.propertyName === 'position') {
            viewModel.class = this.cssClasses(this.collapsed ? 'dx-tab-panel-collapsed' : '');
            viewModel.tabsElement.class = this.cssClasses();
            viewModel.contentElement.class = this.cssClasses();
        }
        if (args.propertyName === 'collapsed') {
            viewModel.class = this.cssClasses(this.collapsed ? 'dx-tab-panel-collapsed' : '');
        }
        if (args.propertyName === 'tabs') {
            viewModel.tabs = this.mapToTabsCollection();
        }
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'isEmpty' || args.propertyName === 'width') {
            this.headerWidth = this.isEmpty ? 0 : (50 * this.zoomFactor + this.width);
        }
        if (args.propertyName === 'collapsed') {
            if (this.collapsed)
                this.width = 0;
            else
                this.width = this._width;
            this.tabs.forEach((x) => {
                x.collapsed = this.collapsed;
            });
            const postfix = this.collapsed ? '-expand' : '-collapse';
            this.toggleCollapsedImage = { class: 'dxrd-image-propertygrid' + postfix, template: 'dxrd-svg-tabs' + postfix };
            const actionString = this.collapsed ? 'Open' : 'Collapse';
            this.toggleCollapsedText = getLocalization(actionString, 'ASPxReportsStringId.SidePanel_' + actionString);
        }
        if (args.propertyName === 'width' && this.width) {
            this._width = this.width;
            if (this.collapsed)
                this.width = 0;
        }
    }
    _onDisabledChanged() {
        const disabledTabs = this.tabs.filter((tab) => { return tab.disabled; });
        if (disabledTabs.length !== 0) {
            if (disabledTabs.filter((tab) => { return tab.active; }).length !== 0) {
                disabledTabs.forEach(t => t.active = false);
                const nextSelectedTab = this.tabs.filter((tab) => { return !tab.disabled && tab.visible; })[0];
                if (nextSelectedTab) {
                    this.selectTab({ model: nextSelectedTab });
                }
            }
        }
    }
    _onVisibilityChanged() {
        const visibleTabs = this.tabs.filter((tab) => { return tab.visible; });
        this.isEmpty = this.tabs.every(tab => !tab.visible);
        if (visibleTabs.length !== 0) {
            if (visibleTabs.filter((tab) => { return tab.active; }).length === 0) {
                visibleTabs[0].active = true;
                if (this._autoSelectTab)
                    this.collapsed = true;
            }
        }
        else {
            this.collapsed = true;
        }
    }
    _subscribeTab(tab) {
        const subscriptions = [
            tab.events.on('visibleChanged', (args) => {
                this._onVisibilityChanged();
            }),
            tab.events.on('disabledChanged', (args) => {
                this._onDisabledChanged();
            }),
            tab.events.on('activeChanged', (args) => {
                if (this._autoSelectTab && tab.active) {
                    this.selectTab({ model: tab });
                }
            }),
            tab.events.on('collapsedChanged', (args) => {
                this.collapsed = tab.collapsed;
            })
        ];
        return () => subscriptions.forEach(x => x());
    }
    getTabByName(tabName) {
        return this.tabs.filter(x => x.name === tabName)[0];
    }
    removeTabs() {
        this.tabs.forEach(x => x.events.dispose());
        this.tabs.length = 0;
    }
    addTab(tab) {
        tab.collapsed = this.collapsed;
        this.tabs.push(tab);
        this._onVisibilityChanged();
        this._onDisabledChanged();
        this.addDisposable(this._subscribeTab(tab));
    }
}
TabPanel.Position = {
    Left: 'Left',
    Right: 'Right'
};
__decorate([
    mutableArray(() => [])
], TabPanel.prototype, "tabs", void 0);
__decorate([
    mutable(true)
], TabPanel.prototype, "isEmpty", void 0);
__decorate([
    mutable(false)
], TabPanel.prototype, "collapsed", void 0);
__decorate([
    mutable(0)
], TabPanel.prototype, "width", void 0);
__decorate([
    mutable(0)
], TabPanel.prototype, "headerWidth", void 0);
__decorate([
    mutable(TabPanel.Position.Right)
], TabPanel.prototype, "position", void 0);
__decorate([
    mutable(null)
], TabPanel.prototype, "toggleCollapsedImage", void 0);
__decorate([
    mutable('')
], TabPanel.prototype, "toggleCollapsedText", void 0);
