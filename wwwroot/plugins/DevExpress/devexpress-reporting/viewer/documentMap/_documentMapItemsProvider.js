﻿/**
* DevExpress HTML/JS Reporting (viewer\documentMap\_documentMapItemsProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
export class DocumentMapItemsProvider {
    constructor(bookmark) {
        this.bookmarkDict = {};
        this.getItems = (pathRequest) => {
            const result = $.Deferred();
            if (bookmark) {
                if (pathRequest.fullPath) {
                    const nodes = this._selectNode(bookmark, pathRequest.fullPath);
                    result.resolve(nodes);
                }
                else {
                    const root = this._getRootNode(bookmark);
                    result.resolve(root);
                }
            }
            else {
                result.reject();
            }
            return result.promise();
        };
    }
    _selectNode(root, path) {
        if (!!this.bookmarkDict[path]) {
            return this.bookmarkDict[path];
        }
        const pathComponents = path.split('.');
        let currentNode = root;
        if (pathComponents[0] !== '0') {
            return null;
        }
        for (let i = 1, index = pathComponents[i]; i < pathComponents.length; i++, index = pathComponents[i]) {
            if (currentNode && currentNode.nodes && currentNode.nodes[index]) {
                currentNode = currentNode.nodes[index];
            }
            else {
                return null;
            }
        }
        const result = DocumentMapItemsProvider.fillNode(currentNode);
        if (result && result.length !== 0) {
            this.bookmarkDict[path] = result;
        }
        return result;
    }
    static fillNode(bookmark) {
        if (!bookmark || !bookmark.nodes || bookmark.nodes.length <= 0) {
            return null;
        }
        return bookmark.nodes.map((node, i) => { return { name: i + '', displayName: node.text, isList: node.nodes && node.nodes.length > 0, bookmark: node, specifics: 'node' }; });
    }
    _getRootNode(bookmark) {
        return [{ name: '0', displayName: bookmark.text, isList: bookmark.nodes && bookmark.nodes.length > 0, bookmark: bookmark, specifics: 'node' }];
    }
}
