﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewBreadcrumbs.js)
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
import { BaseRenderingModel, createViewModelGenerator, mutable, mutableArray } from '@devexpress/analytics-core/analytics-serializer-native';
import { PreviewElements } from '../constants';
export class BreadcrumbItem extends BaseRenderingModel {
    constructor(position, previewInitData, onItemClick) {
        super();
        this.previewInitData = previewInitData;
        this.onItemClick = onItemClick;
        this.position = position;
    }
    getModel() {
        return this;
    }
    onPropertyChanged(args) {
        this.updateViewModel(args);
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        if (args.propertyName === 'displayText') {
            viewModel.displayText = this.displayText;
        }
        else if (args.propertyName === 'previewInitData') {
            viewModel.previewInitData = this.previewInitData;
        }
        else if (args.propertyName === 'parameterValues') {
            viewModel.parameterValues = this.parameterValues;
        }
        else if (args.propertyName === 'position') {
            viewModel.position = this.position;
        }
        else if (args.propertyName === 'pageIndex') {
            viewModel.pageIndex = this.pageIndex;
        }
        else if (args.propertyName === 'indexes') {
            viewModel.indexes = this.indexes;
        }
    }
    createViewModel() {
        const viewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('displayText', this.displayText)
            .generateProperty('position', this.position)
            .generateProperty('onItemClick', this.onItemClick)
            .generateProperty('previewInitData', this.previewInitData)
            .generateProperty('parameterValues', this.parameterValues)
            .generateProperty('pageIndex', this.pageIndex)
            .generateProperty('indexes', this.indexes)
            .getViewModel();
        return viewModel;
    }
}
__decorate([
    mutable(0)
], BreadcrumbItem.prototype, "pageIndex", void 0);
__decorate([
    mutable('')
], BreadcrumbItem.prototype, "indexes", void 0);
__decorate([
    mutable('')
], BreadcrumbItem.prototype, "displayText", void 0);
__decorate([
    mutable(0)
], BreadcrumbItem.prototype, "position", void 0);
__decorate([
    mutable()
], BreadcrumbItem.prototype, "parameterValues", void 0);
export class BreadcrumbModel extends BaseRenderingModel {
    constructor() {
        super();
        this.templateName = PreviewElements.Breadcrumb;
        this.listItems = [];
    }
    addItem(previewInitData, itemClick, displayText) {
        const position = this.listItems.length;
        this.listItems.push(new BreadcrumbItem(position, previewInitData, itemClick));
    }
    reset() {
        const model = this.getModel();
        model.listItems = [];
        this.listItems = model.listItems;
    }
    updateCurrentParameters(parametersViewModel) {
        const currentItem = this._currentIndex() !== -1 && this.listItems[this._currentIndex()];
        const parameterValues = {};
        if (currentItem) {
            parametersViewModel['_parameters'].forEach(parameter => {
                if (!parameter.visible)
                    return;
                const getValue = (parameter) => parameter.value ? [...parameter.value] : parameter;
                const searchForValue = (groupLayoutItem, parameterPath) => {
                    var _a;
                    let parameterValue;
                    if (groupLayoutItem[parameterPath])
                        return getValue(groupLayoutItem[parameterPath]);
                    (_a = groupLayoutItem.groupLayoutItems) === null || _a === void 0 ? void 0 : _a.forEach(groupLayoutItem => {
                        const valueFound = searchForValue(groupLayoutItem, parameterPath);
                        if (valueFound)
                            parameterValue = valueFound;
                    });
                    return parameterValue;
                };
                parameterValues[parameter.path] = searchForValue(parametersViewModel, parameter.path);
            });
            this.listItems[this._currentIndex()].parameterValues = parameterValues;
        }
    }
    updateCurrentItem(previewInitData, itemClick, displayText) {
        const newItemData = new BreadcrumbItem(0, previewInitData, itemClick);
        newItemData.setProperty('displayText', displayText);
        if (this._currentIndex() === -1) {
            this.listItems.push(newItemData);
        }
        else {
            this.listItems[this._currentIndex()] = newItemData;
            this.listItems[this._currentIndex()].position = this._currentIndex();
        }
    }
    updateCurrentDocumentId(documentId) {
        if (!documentId)
            return;
        if (this.listItems[this._currentIndex()] && this.listItems[this._currentIndex()].previewInitData)
            this.listItems[this._currentIndex()].previewInitData.documentId = documentId;
    }
    updateCurrentPosition(pageIndex, indexes) {
        const currentItemIndex = this._currentIndex();
        this.listItems[currentItemIndex].pageIndex = pageIndex;
        this.listItems[currentItemIndex].indexes = indexes;
    }
    updateCurrentReportName(displayText) {
        if (displayText && displayText.length)
            this.listItems[this._currentIndex()].displayText = displayText;
        this.updatePreviewSize && this.updatePreviewSize();
    }
    getCurrentPageInfo() {
        const index = this._currentIndex();
        return index < 0 ? {} : { pageIndex: this.listItems[index].pageIndex, indexes: this.listItems[index].indexes };
    }
    _currentIndex() {
        return this.listItems.length - 1;
    }
    onClick(itemIndex) {
        if (this.listItems.length > itemIndex + 1) {
            this.listItems = this.listItems.slice(0, itemIndex + 1);
            const model = this.getModel();
            model.listItems = this.listItems.map(item => item.getModel());
        }
        const activeItem = this.listItems[itemIndex];
        activeItem.onItemClick(activeItem.previewInitData, activeItem.parameterValues, activeItem.pageIndex);
    }
    dispose() {
        super.dispose();
        this.listItems.splice(0);
    }
    getModel() {
        return this;
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'listItems') {
            this.visible = args.newValue.length > 0;
            const viewModel = this.getViewModel();
            viewModel.listItems = this.listItems.map(item => (item.getViewModel && item.getViewModel())).filter(item => item);
        }
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        viewModel.listItems = this.listItems.map(item => (item.getViewModel && item.getViewModel())).filter(item => item);
    }
    createViewModel() {
        const viewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('visible', this.visible)
            .generateProperty('listItems', this.listItems.map(item => item.getViewModel()))
            .generateProperty('templateName', this.templateName)
            .generateProperty('onClick', this.onClick)
            .getViewModel();
        return viewModel;
    }
}
__decorate([
    mutable(false)
], BreadcrumbModel.prototype, "visible", void 0);
__decorate([
    mutableArray(() => [])
], BreadcrumbModel.prototype, "listItems", void 0);
