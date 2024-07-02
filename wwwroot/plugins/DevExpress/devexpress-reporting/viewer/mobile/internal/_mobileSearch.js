﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobileSearch.js)
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
import { SearchViewModel } from '../../search/_searchViewModel';
import { SearchAvailable } from '../../settings';
import { Disposable } from '@devexpress/analytics-core/analytics-utils-native';
import { getLocalization } from '@devexpress/analytics-core/analytics-internal-native';
import dxTextBox from 'devextreme/ui/text_box';
import * as $ from 'jquery';
import { mutable, createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
export class MobileSearchViewModel extends SearchViewModel {
    constructor(reportPreview, gallery) {
        super(reportPreview);
        this.gallery = gallery;
        this['_resultNavigator']['_disposables'].forEach((x) => { x.dispose(); });
        let _galleryCurrentItemBlocksSubscriptionDispose;
        const currentBlocksSubscribe = (selectedIndex) => {
            _galleryCurrentItemBlocksSubscriptionDispose && _galleryCurrentItemBlocksSubscriptionDispose();
            _galleryCurrentItemBlocksSubscriptionDispose = gallery.items[selectedIndex].events.on('blocksChanged', (args) => {
                this.updatePagesInBlocks(args.newValue);
            });
            this.updatePagesInBlocks(gallery.items[selectedIndex].blocks);
        };
        let _gallerySelectedIndexSubscriptionDispose;
        const currentIndexSubscribe = () => {
            _gallerySelectedIndexSubscriptionDispose && _gallerySelectedIndexSubscriptionDispose();
            _gallerySelectedIndexSubscriptionDispose = gallery.events.on('selectedIndexChanged', (args) => {
                currentBlocksSubscribe(args.newValue);
            });
            currentBlocksSubscribe(gallery.selectedIndex);
        };
        this.addDisposable(gallery.events.on('itemsChanged', (args) => {
            currentIndexSubscribe();
        }));
        currentIndexSubscribe();
        this.searchPanelVisible = reportPreview.searchPanelVisible;
        this.addDisposable(reportPreview.events.on('searchPanelVisibleChanged', (args) => {
            if (args.newValue !== this.searchPanelVisible)
                this.searchPanelVisible = args.newValue;
        }));
        this.enabled = SearchAvailable();
        this.addDisposable(SearchAvailable.subscribe(x => this.enabled = x));
    }
    focusEditor(event) {
        if (this.searchPanelVisible) {
            this.editorVisible = true;
            const previewSearch = $.fn.constructor('.dxrdp-search-editor');
            const searchEditor = dxTextBox['getInstance'](previewSearch.get(0));
            searchEditor.focus();
            setTimeout(() => {
                event.currentTarget.blur();
                searchEditor.focus();
            }, 1);
        }
    }
    _updateBricks(page, searchResult) {
        if (page.brick && searchResult && searchResult.length > 0) {
            const results = searchResult.filter((x) => { return x.pageIndex === page.pageIndex; });
            for (let i = 0; i < results.length; i++) {
                page.selectBrick(results[i].indexes, true);
            }
        }
        else {
            const subscriptionDispose = page.events.on('brickChanged', (args) => {
                subscriptionDispose();
                this._updateBricks(page, this.searchResult);
            });
        }
    }
    onPropertyChanged(args) {
        var _a;
        super.onPropertyChanged(args);
        if (args.propertyName === 'searchResult') {
            const newResult = this.searchResult;
            if (!newResult || newResult.length === 0) {
                this.reportPreview.availablePages = null;
                this.reportPreview.pages.forEach(page => page.resetBrickRecusive(page.brick));
            }
            else {
                this.reportPreview.availablePages = newResult.map(x => x.pageIndex);
            }
            const blocks = (_a = this.gallery) === null || _a === void 0 ? void 0 : _a.items[this.gallery.selectedIndex].blocks;
            blocks === null || blocks === void 0 ? void 0 : blocks.forEach(block => {
                block.page && block.page.resetBrickRecusive(block.page.brick);
                this._updateBricks(block.page, this.searchResult);
            });
        }
        else if (args.propertyName === 'searchPanelVisible') {
            const newVal = args.newValue;
            if (newVal !== this.reportPreview.searchPanelVisible)
                this.reportPreview.searchPanelVisible = newVal;
            if (!newVal || !SearchAvailable()) {
                this.stopSearching();
            }
            else {
                this.height = MobileSearchViewModel.maxHeight;
            }
        }
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('enabled', this.enabled)
            .generateProperty('height', this.height)
            .generateProperty('editorVisible', this.editorVisible)
            .generateProperty('focusEditor', (_, event) => this.focusEditor(event))
            .generateProperty('startSearch', () => this.startSearch())
            .generateProperty('onSearchTextChanged', (event) => this.onSearchTextChanged(event))
            .generateProperty('tapToSearchText', getLocalization('Tap here to Search', 'ASPxReportsStringId.WebDocumentViewer_Mobile_TapHereToSearch'))
            .getViewModel();
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        const viewModel = this.getViewModel();
        if (args.propertyName === 'height') {
            viewModel.height = this.height;
        }
        if (args.propertyName === 'editorVisible') {
            viewModel.editorVisible = this.editorVisible;
            viewModel.height = this.height;
            viewModel.enabled = this.enabled;
        }
    }
    updatePagesInBlocks(blocks) {
        blocks.forEach(block => {
            var _a;
            if (block.page && ((_a = this.searchResult) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                this._updateBricks(block.page, this.searchResult);
            }
        });
    }
    stopSearching() {
        this.height = 0;
        this.editorVisible = false;
        this.searchResult = null;
    }
    startSearch() {
        if (this.searchResult === null)
            this.findNext();
    }
}
MobileSearchViewModel.maxHeight = 80;
__decorate([
    mutable(false)
], MobileSearchViewModel.prototype, "editorVisible", void 0);
__decorate([
    mutable(0)
], MobileSearchViewModel.prototype, "height", void 0);
__decorate([
    mutable(false)
], MobileSearchViewModel.prototype, "searchPanelVisible", void 0);
__decorate([
    mutable(false)
], MobileSearchViewModel.prototype, "enabled", void 0);
export class SearchBarModel extends Disposable {
    constructor(viewModel, element, $searchText) {
        super();
        this.viewModel = viewModel;
        this.addDisposable(viewModel.events.on('heightChanged', (args) => {
            const newValue = args.newValue;
            if (!newValue) {
                element.style.display = 'none';
            }
            else {
                element.style.display = 'block';
            }
            $searchText.css({
                'opacity': Math.min((newValue / MobileSearchViewModel.maxHeight), 1)
            });
        }));
    }
    dispose() {
        super.dispose();
        this.viewModel.stopSearching();
    }
}
