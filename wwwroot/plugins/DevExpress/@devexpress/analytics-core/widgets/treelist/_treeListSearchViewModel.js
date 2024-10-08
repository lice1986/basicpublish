﻿/**
* DevExpress Analytics (widgets\treelist\_treeListSearchViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { findMatchesInString } from '../../property-grid/widgets/internal/_utils';
import { Disposable } from '../../serializer/disposable';
import { searchPlaceholder } from '../../property-grid/localization/_localization';
import { getTemplate } from '../../property-grid/widgets/templateUtils';
export class TreeListSearchViewModel extends Disposable {
    constructor() {
        super();
        this._processedNodes = [];
        this._currentProcess = [];
        this.searchTimeout = 500;
        this._roots = [];
        this.searchPlaceholder = () => searchPlaceholder();
        const _textToSearch = ko.observable('');
        let timeout = null;
        this._disposables.push(this.value = ko.computed({
            read: () => _textToSearch(),
            write: (newVal) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    _textToSearch(newVal);
                }, this.searchTimeout);
            }
        }));
        this._disposables.push(this.value.subscribe((newValue) => this.valueChanged(newValue)));
    }
    static createController(element, controllers, modelType = TreeListSearchViewModel, templateName = 'dx-treelist-search-panel') {
        const model = new modelType();
        const $element = $.fn.constructor(element);
        const subscriptions = [];
        controllers.forEach((controller) => {
            if (!controller)
                return;
            controller.root = controller.root || ko.observable();
            subscriptions.push(controller.root.subscribe((newRoot) => {
                model.addController(newRoot);
                model.valueChanged('');
            }));
        });
        model._disposables.push({
            dispose: () => {
                controllers.forEach(controller => {
                    if (controller && ko.isSubscribable(controller.root)) {
                        controller.root(null);
                        delete controller.root;
                    }
                });
            }
        });
        const template = getTemplate(templateName);
        $element.addClass('dxrd-treelist-search-panel-container').addClass('dxd-border-primary');
        $element.children().remove();
        $element.append(template);
        ko.cleanNode($element.children()[0]);
        ko.applyBindings(model, $element.children()[0]);
        const disposeCallback = () => {
            subscriptions.forEach(x => x.dispose());
            model && model.dispose();
            ko.utils.domNodeDisposal.removeDisposeCallback(element, disposeCallback);
        };
        ko.utils.domNodeDisposal.addDisposeCallback(element, disposeCallback);
    }
    dispose() {
        super.dispose();
        this.clearProcess();
    }
    clearProcess() {
        this._currentProcess.forEach(x => x.stop && x.stop());
        this._currentProcess = [];
        this._processedNodes = [];
    }
    valueChanged(newValue) {
        if (!newValue)
            this._processedNodes.forEach(x => x.visible = true);
        this.clearProcess();
        this._roots.forEach((root) => {
            root.treeListController.textToSearch(newValue);
            if (newValue) {
                this._currentProcess.push(root.walkOnTree((node) => {
                    const regexResult = findMatchesInString(node.data[root.treeListController.searchOptions.searchExpr], newValue, root.treeListController.searchOptions);
                    this._processedNodes.push(node);
                    node.visible = !!regexResult;
                    regexResult && this._collapseTreeBranch(node);
                }));
            }
            else {
                root.itemsCollectionHasMutated();
            }
        });
    }
    _collapseTreeBranch(node) {
        if (node.parent) {
            if (node.parent.collapsed)
                node.parent.toggleCollapsed();
            this._collapseTreeBranch(node.parent);
        }
    }
    addController(root) {
        this._roots = this._roots.filter((a) => !a.isDisposing);
        root.treeListController.textToSearch = root.treeListController.textToSearch || ko.observable('');
        if (this._roots.indexOf(root) === -1)
            this._roots.push(root);
        this.searchTimeout = Math.max.apply(Math, this._roots.map(x => x.treeListController.searchOptions.searchTimeout)) || 500;
    }
}
