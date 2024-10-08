﻿/**
* DevExpress Analytics (widgets\expressioneditor\tools\_tools.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { searchPlaceholder } from '../../../property-grid/localization/_localization';
import { findMatchesInString } from '../../../property-grid/widgets/internal/_utils';
import { Disposable } from '../../../serializer/disposable';
import { createExpressionEditorCollectionToolOptions } from '../_expressioneditor';
import { functionDisplay } from './_functions';
import { operatorNames } from './_operatorNames';
export class Tools extends Disposable {
    constructor(onClick, parametersOptions, options, fieldListOptions) {
        super();
        this.searchPlaceholder = () => searchPlaceholder();
        this._categories = ko.observableArray([]);
        this.toolBox = [];
        this.description = ko.observable();
        this._defaultClick = onClick;
        operatorNames.filter((item) => { return !!item.descriptionStringId; }).forEach(item => this._initDescription(item));
        const functionGroups = ko.computed(() => {
            return options() && ko.unwrap(options().functions) || functionDisplay();
        }), functions = ko.computed(() => {
            return functionGroups().map((funtionGroup) => {
                return this._createFunctionsCategoryItem(funtionGroup.items, getLocalization(funtionGroup.display, funtionGroup.localizationId));
            });
        }), createDefaultCategories = () => {
            return [
                this._createFieldsCategory(fieldListOptions, parametersOptions),
                this._createConstantCategory(),
                this._createFunctionsCategory(functions),
                this._createOperatorsCategory(operatorNames)
            ];
        }, selectedContent = ko.observable(null), resetCategoriesSelection = () => {
            const firstItem = this._categories()[0].content;
            selectedContent() && selectedContent().isSelected(false);
            selectedContent(firstItem);
            firstItem.isSelected(true);
        }, updateCategories = (newOptions) => {
            this._disposeCategories();
            const defaultCategories = createDefaultCategories();
            newOptions && newOptions.customizeCategories && newOptions.customizeCategories(this, defaultCategories, onClick);
            this._categories(defaultCategories);
            resetCategoriesSelection();
        };
        this.resetCategoriesSelection = resetCategoriesSelection;
        [functionGroups, functions].forEach(x => this._disposables.push(x));
        this._disposables.push(options.subscribe((newOptions) => {
            updateCategories(newOptions);
        }));
        updateCategories(options());
        this._disposables.push(this.showDescription = ko.computed(() => { return selectedContent() && selectedContent().showDescription; }));
        this.toolBox = [
            this._generateTab(this._categories, 'dx-expressioneditor-categories', (item) => {
                if (item.data && item.data.selectedItem && item.data.selectedItem() && item.data.items.indexOf(item.data.selectedItem()) !== -1) {
                    const contentItem = item.data.selectedItem();
                    this.description(this._localizedExpressionEditorItem(contentItem));
                }
                else {
                    this.description(undefined);
                }
                if (selectedContent() === item)
                    return;
                selectedContent().isSelected(false);
                item.isSelected(true);
                selectedContent(item);
            }),
            this._generateTab(selectedContent, 'dx-expressioneditor-selectedcontent', (item) => { this.description(this._localizedExpressionEditorItem(item)); }, this._defaultClick),
            this._generateTab(this.description, 'dx-expressioneditor-description', undefined, undefined, this.showDescription)
        ];
    }
    _generateTab(content, templateName = null, click, dblclick, visible) {
        return {
            templateName,
            content,
            click,
            dblclick,
            visible: visible || true
        };
    }
    _localizedExpressionEditorItem(item) {
        return item.descriptionStringId ? getLocalization(item.text, item.descriptionStringId) : item.description ? item.description : item.text;
    }
    _initDescription(expressionEditorItem) {
        expressionEditorItem.description = this._localizedExpressionEditorItem(expressionEditorItem);
    }
    _createFieldsCategory(fields, parameters) {
        const category = {
            displayName: getLocalization('Fields', 'AnalyticsCoreStringId.ExpressionEditor_ItemInfo_Fields'),
            content: {
                showDescription: false,
                isSelected: ko.observable(false),
                data: { fields, parameters },
                name: 'dx-expressioneditor-fields'
            },
            dispose: () => void 0
        };
        return category;
    }
    _createConstantCategory() {
        const items = [
            { text: '?', descriptionStringId: 'ExpressionEditorStringId.Constant_Null' },
            { text: 'False', descriptionStringId: 'ExpressionEditorStringId.Constant_False' },
            { text: 'True', descriptionStringId: 'ExpressionEditorStringId.Constant_True' }
        ];
        return createExpressionEditorCollectionToolOptions(items, 'Constants', 'DataAccessStringId.ExpressionEditor_DocumentationCategory_Constants', true);
    }
    _createOperatorsCategory(data) {
        return createExpressionEditorCollectionToolOptions(data, 'Operators', 'DataAccessStringId.ExpressionEditor_DocumentationCategory_Operators', true);
    }
    _createFunctionsCategoryContent(textToSearch, isSelected, items) {
        return {
            showDescription: true,
            isSelected,
            data: {
                textToSearch,
                items,
                availableItems: ko.observableArray(items),
                selectedItem: ko.observable(null)
            },
            name: 'dx-expressioneditor-collection-function',
        };
    }
    _createFunctionsCategoryItem(functions, display) {
        const result = {
            display,
            isSelected: ko.observable(false),
            data: [],
            name: 'dx-expressioneditor-collection-function',
        };
        $.map(functions, (item => {
            if (item) {
                item.forEach((functionItem) => {
                    this._initDescription(functionItem);
                    result.data.push(functionItem);
                });
            }
        }));
        return result;
    }
    _createFunctionsCategory(items) {
        let timeout = null;
        const textToSearch = ko.observable(''), disposables = [], isSelected = ko.observable(false), allItems = ko.computed(() => [].concat(...items().map(x => x.data))), content = this._createFunctionsCategoryContent(textToSearch, isSelected, allItems()), category = {
            displayName: getLocalization('Functions', 'DataAccessStringId.ExpressionEditor_DocumentationCategory_Functions'),
            items, allItems, isSelected, content,
            collapsed: ko.observable(true),
            updateContent: (items, isSelected) => {
                content.isSelected && content.isSelected(false);
                content.isSelected = isSelected;
                content.isSelected(true);
                content.data.items = items;
                content.data.availableItems(content.data.items.filter(x => !!findMatchesInString(x.text, textToSearch())));
            },
            templateName: 'dx-expressioneditor-category-accordion',
            dispose: () => {
                disposables.forEach(x => x.dispose());
                disposables.splice(0, disposables.length);
            }
        };
        disposables.push(allItems);
        disposables.push(textToSearch.subscribe((newVal) => {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => {
                category.content.data.availableItems(category.content.data.items.filter(x => !!findMatchesInString(x.text, newVal)));
            }, 150);
        }));
        return category;
    }
    _disposeCategories() {
        this._categories().forEach(category => category.dispose && category.dispose());
    }
    dispose() {
        super.dispose();
        this._disposeCategories();
    }
}
