﻿/**
* DevExpress HTML/JS Reporting (viewer\documentMap\_documentMapModel.js)
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
import { TreeListKeyboardHelper } from '@devexpress/analytics-core/analytics-internal-native';
import { BaseRenderingModel, createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { TabInfo } from '@devexpress/analytics-core/analytics-utils-native';
import { DocumentMapItemsProvider } from './_documentMapItemsProvider';
import { DocumentMapTreeListController } from './_documentMapTreeListController';
export class DocumentMapModel extends BaseRenderingModel {
    constructor(reportPreview) {
        super();
        this._setSelectedPathByNavigationNode = (nodes, brickNavigation, path = '0') => {
            nodes.forEach((item, index) => {
                if (item.indexes === brickNavigation.indexes && item.pageIndex === brickNavigation.pageIndex) {
                    this.selectedPath = path + '.' + index.toString();
                }
                else if (item.nodes) {
                    this.selectedPath = this._setSelectedPathByNavigationNode(item.nodes, brickNavigation, path + '.' + index.toString());
                }
            });
            return this.selectedPath;
        };
        this.treeListOptions = this.getTreeListModel(reportPreview.documentMap);
        this.treeListController = new DocumentMapTreeListController();
        this.treeListController.clickHandler = (item) => {
            const bookmark = item.data.bookmark;
            if (bookmark) {
                const pageIndex = bookmark.pageIndex < 0 ? 0 : bookmark.pageIndex;
                reportPreview.pages[pageIndex].selectBrick(bookmark.indexes);
            }
        };
        reportPreview.brickClickDocumentMapHandler = (brickNavigation) => {
            if (reportPreview.documentMap)
                this._setSelectedPathByNavigationNode(reportPreview.documentMap.nodes, brickNavigation);
        };
        this._disposables.push({
            dispose: reportPreview.events.on('documentMapChanged', (args) => {
                var _a, _b;
                this.treeListOptions = this.getTreeListModel(reportPreview.documentMap);
                this.isEmpty = !(((_b = (_a = reportPreview.documentMap) === null || _a === void 0 ? void 0 : _a.nodes) === null || _b === void 0 ? void 0 : _b.length) > 0);
            })
        });
        this._disposables.push({ dispose: () => delete reportPreview.brickClickDocumentMapHandler });
        this._disposables.push(this.tabInfo = new TabInfo({
            text: 'Document Map',
            template: 'dxrd-preview-document-map',
            model: this,
            keyboardHelper: new TreeListKeyboardHelper(this.treeListController),
            localizationId: 'DevExpress.XtraPrinting.PrintingSystemCommand.DocumentMap',
            imageClassName: 'reportexplorer',
            imageTemplateName: 'dxrd-svg-tabs-reportexplorer',
            visible: !this.isEmpty
        }));
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'isEmpty') {
            this.tabInfo.visible = !this.isEmpty;
        }
        else if (args.propertyName === 'selectedPath') {
            this._selectedPathChangedEvent && this._selectedPathChangedEvent(this.selectedPath);
        }
        else if (args.propertyName === 'treeListOptions') {
            this._treeListChangedEvent && this._treeListChangedEvent(this.treeListOptions);
        }
    }
    getTreeListModel(documentMap) {
        return {
            itemsProvider: new DocumentMapItemsProvider(documentMap),
            expandRootItems: true,
            selectedPath: this.selectedPath,
            treeListController: this.treeListController,
            onItemsVisibilityChanged: () => { var _a, _b; return (_b = (_a = this.tabInfo) === null || _a === void 0 ? void 0 : _a.keyboardHelper) === null || _b === void 0 ? void 0 : _b.initialize(); },
            setSelectedPathChangedEvent: (callback) => {
                this._selectedPathChangedEvent = callback;
                return () => this._selectedPathChangedEvent = undefined;
            },
            setTreeListChangedEvent: (callback) => {
                this._treeListChangedEvent = callback;
                return () => this._treeListChangedEvent = undefined;
            },
            getSelectedPath: () => this.selectedPath,
            setSelectedPath: (newPath) => this.selectedPath = newPath
        };
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        viewModel.treeListOptions = this.treeListOptions;
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('treeListOptions', this.treeListOptions)
            .generateProperty('onInitialized', (event) => event.component.option('useKeyboard', false))
            .generateProperty('keyboardHelper', this.tabInfo.keyboardHelper)
            .getViewModel();
    }
    dispose() {
        super.dispose();
        this.removeProperties();
    }
}
__decorate([
    mutable('0')
], DocumentMapModel.prototype, "selectedPath", void 0);
__decorate([
    mutable(null)
], DocumentMapModel.prototype, "treeListOptions", void 0);
__decorate([
    mutable(true)
], DocumentMapModel.prototype, "isEmpty", void 0);
