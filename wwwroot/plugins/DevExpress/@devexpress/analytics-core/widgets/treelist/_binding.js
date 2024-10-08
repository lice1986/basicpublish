﻿/**
* DevExpress Analytics (widgets\treelist\_binding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DefaultTreeListItemFactory, TreeListItemStore } from './_treelistItem';
import { TreeListController } from './_treelistController';
import { TreeListSearchOptions } from './_treeListSearchOptions';
import dxScrollView from 'devextreme/ui/scroll_view';
import { extend } from '../../serializer/_utils';
import { koUtils } from '../../core/utils/_koUtils';
export function initTreeListBinding(bindingOptions) {
    const values = bindingOptions.values;
    const element = bindingOptions.element;
    const options = koUtils.unwrap(values);
    let treeListViewModel = null;
    const updateScrollBar = () => {
        const options = koUtils.unwrap(values);
        const scrollViewElt = bindingOptions.element.closest('.dx-scrollview');
        const scrollView = scrollViewElt && dxScrollView.getInstance(scrollViewElt);
        scrollView && scrollView['update']();
        if (options.onItemsVisibilityChanged) {
            options.onItemsVisibilityChanged();
        }
    };
    const updateTreeList = (options) => {
        const treeListController = options.treeListController || new TreeListController();
        options.treeListController = treeListController;
        treeListController.dragDropHandler = treeListController.dragDropHandler || bindingOptions.dragDropHandler;
        options.factory = options.factory || new DefaultTreeListItemFactory();
        options.store = new TreeListItemStore();
        options.itemsProvider = koUtils.unwrap(options.itemsProvider);
        options.pageSize = options.pageSize || -1;
        if (!options || !options.itemsProvider)
            return;
        if (!options.rtl) {
            options.rtl = !!bindingOptions.element.closest('.dx-rtl');
        }
        treeListViewModel && treeListViewModel.dispose();
        treeListViewModel = options.factory.createRootItem(options, options.path, updateScrollBar, options.rtl);
        if (koUtils.isSubscribable(treeListController.root)) {
            treeListController.searchEnabled = true;
            treeListController.searchOptions = treeListController.searchOptions || new TreeListSearchOptions();
            treeListController.root(treeListViewModel);
        }
        else {
            treeListController.root = treeListViewModel;
        }
        bindingOptions.createChildContext(treeListViewModel.getViewModel());
    };
    updateTreeList(extend({}, options));
    let subscription = null;
    const onTreeListChanged = (newValue) => {
        newValue && updateTreeList(extend({}, newValue));
    };
    if (koUtils.isSubscribable(values)) {
        subscription = values.subscribe((newValue) => onTreeListChanged(newValue));
    }
    else if (koUtils.isSubscribable(values.itemsProvider)) {
        subscription = values.itemsProvider.subscribe((newValue) => newValue && onTreeListChanged(values));
    }
    else if (values.setTreeListChangedEvent) {
        subscription = { dispose: values.setTreeListChangedEvent(onTreeListChanged) };
    }
    return () => {
        treeListViewModel && treeListViewModel.dispose();
        treeListViewModel = null;
        subscription && subscription.dispose();
    };
}
