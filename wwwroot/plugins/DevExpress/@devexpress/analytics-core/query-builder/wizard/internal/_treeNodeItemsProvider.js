﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_treeNodeItemsProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { Disposable } from '../../../serializer/disposable';
import { DataMemberTreeNode, TreeNodeBase } from './_treeListNode';
import { PathRequest } from '../../../widgets/common/pathRequest';
import { isList } from '../../../widgets/_utils';
export class TreeNodeItemsProvider extends Disposable {
    constructor(fieldListProvider, rootItems, generateTreeNode, generateTreeLeafNode) {
        super();
        this._fullTreeLoaded = false;
        this._rootItems = ko.observableArray([]);
        this._checkedRootNodesCount = ko.computed(() => {
            if (!this._rootItems || this._rootItems().length === 0)
                return 0;
            let count = 0;
            for (let i = 0; i < this._rootItems().length && count < 1; i++) {
                count += this._rootItems()[i].unChecked() ? 0 : 1;
            }
            return count;
        });
        this.hasCheckedItems = ko.computed(() => {
            return !(this._checkedRootNodesCount() === 0);
        });
        this.getRootItems = () => this._rootItems();
        this.getItems = (pathRequest, collectChilds = false) => {
            const result = $.Deferred();
            if (!pathRequest.fullPath && pathRequest.pathParts.length === 0) {
                result.resolve(this._rootItems());
            }
            else {
                fieldListProvider.getItems(pathRequest).done((value) => {
                    const currentParentNode = this._getParentNode(pathRequest);
                    if (!currentParentNode || !currentParentNode.children)
                        return result.reject();
                    if (currentParentNode.children().length === 0) {
                        const array = [];
                        const listPath = [];
                        value.forEach(item => {
                            const isChecked = this._getDefaultTreeNodeCheckState(item);
                            if (this.isList(item, currentParentNode)) {
                                if (pathRequest.pathParts.length <= 5) {
                                    listPath.push([].concat(pathRequest.fullPath.split('.'), [item.name]));
                                    array.push(generateTreeNode(item, isChecked, [pathRequest.fullPath, item.name].join('.')));
                                }
                            }
                            else {
                                array.push(generateTreeLeafNode(item, isChecked, [pathRequest.fullPath, item.name].join('.')));
                            }
                        });
                        currentParentNode.initializeChildren(array);
                        if (collectChilds)
                            $.when(...listPath.map(x => this.getItems(new PathRequest(x.join('.'), x), collectChilds))).always(() => result.resolve(array));
                        else
                            result.resolve(array);
                    }
                    else {
                        result.resolve(currentParentNode.children());
                    }
                });
            }
            return result.promise();
        };
        this._disposables.push(rootItems.subscribe((newValue) => {
            this._fullTreeLoaded = false;
            this._rootItems(newValue.map(item => {
                const isChecked = this._getDefaultTreeNodeCheckState(item);
                return generateTreeNode(item, isChecked, item.name);
            }));
        }));
        this._disposables.push(this.hasCheckedItems);
    }
    _createTree() {
        if (!this._fullTreeLoaded)
            return $.when(...this._rootItems().map(item => this.getItems(new PathRequest(item.path), true))).always(() => this._fullTreeLoaded = true);
        else {
            return $.Deferred().resolve().promise();
        }
    }
    _createTreePart(pathParts, deferred = $.Deferred(), checkedPath) {
        if (this._fullTreeLoaded)
            return deferred.resolve().promise();
        if (pathParts.length === 0)
            return deferred.resolve();
        if (!checkedPath) {
            const deferred = $.Deferred();
            if (pathParts.length === 1) {
                this.getItems(new PathRequest(pathParts[0], pathParts)).done(() => deferred.resolve()).fail(() => deferred.reject());
            }
            else
                this._createTreePart(pathParts.slice(1), deferred, [pathParts[0]]);
            return deferred;
        }
        else {
            const newParentPath = [].concat([], checkedPath, pathParts[0]);
            const request = new PathRequest(newParentPath.join('.'), newParentPath);
            if (!this._getParentNode(request)) {
                this.getItems(new PathRequest(checkedPath.join('.'), checkedPath)).done((res) => {
                    this._createTreePart(pathParts.slice(1), deferred, newParentPath);
                }).fail(() => deferred.reject());
            }
            else {
                this._createTreePart(pathParts.slice(1), deferred, newParentPath);
            }
        }
    }
    _setChecked(item) {
        item.setChecked(true);
        if (item instanceof DataMemberTreeNode) {
            item.children().forEach(x => this._setChecked(x));
        }
    }
    selectAllItems(onlyRoot = true) {
        const deferred = $.Deferred();
        this._createTree().always(() => {
            if (onlyRoot) {
                this._rootItems().forEach(x => x.setChecked(true));
            }
            else {
                this._rootItems().forEach(x => this._setChecked(x));
            }
            deferred.resolve();
        });
        return deferred.promise();
    }
    selectItemsByPath(path) {
        const deferred = $.Deferred();
        const pathParts = path.split('.');
        this._createTreePart(pathParts).done(() => {
            this.getItems(new PathRequest(pathParts.join('.'), pathParts)).done((items) => {
                items.forEach(item => {
                    if (item instanceof TreeNodeBase) {
                        item.setChecked(true);
                    }
                });
            }).always(() => deferred.resolve());
        });
        return deferred.promise();
    }
    selectItemByPath(path) {
        const deferred = $.Deferred();
        const pathParts = path.split('.');
        this._createTreePart(pathParts).done(() => {
            const fieldName = pathParts.pop();
            this.getItems(new PathRequest(pathParts.join('.'), pathParts)).done((items) => {
                const item = items.filter(x => x.name === fieldName)[0];
                if (item instanceof TreeNodeBase) {
                    item.setChecked(true);
                }
            }).always(() => deferred.resolve());
        });
        return deferred.promise();
    }
    _getParentNode(pathRequest) {
        let parentNode = this._rootItems().filter(item => item.path === (pathRequest.id || pathRequest.ref))[0];
        if (!parentNode)
            return;
        let childPath = parentNode.path;
        for (let index = 1; index < pathRequest.pathParts.length; index++) {
            if (!parentNode)
                return;
            childPath += '.' + pathRequest.pathParts[index];
            parentNode = parentNode.children().filter(item => isList(item) && item.path == childPath)[0];
        }
        return parentNode;
    }
    _getDefaultTreeNodeCheckState(item) {
        return false;
    }
    isList(dataMember, parentNode) {
        return isList(dataMember);
    }
}
