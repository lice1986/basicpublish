﻿/**
* DevExpress Analytics (query-builder\wizard\pages\jsonDataSourceWizard\chooseJsonSchemaPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { _restoreJsonDataSourceFromState } from '../../dataSourceWizardState';
import { JsonTreeNodeItemsProvider } from '../../internal/_jsonTreeNodeItemsProvider';
import { JsonNode } from '../../../dataSource/json/jsonSchemaNode';
import { DataMemberTreeNode, FieldTreeNode } from '../../internal/_treeListNode';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { FieldListProvider } from '../../../../core/utils/_fieldListProvider';
import { ModelSerializer } from '../../../../serializer/serializer';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { JsonDataSourceWizardPageId } from '../../pageId';
import { WizardPageBase } from '../wizardPageBase';
export class ChooseJsonSchemaPage extends WizardPageBase {
    constructor(_requestWrapper = new RequestWrapper(), _allowObjectRootElements = true, _callbacks) {
        super();
        this._requestWrapper = _requestWrapper;
        this._allowObjectRootElements = _allowObjectRootElements;
        this._callbacks = _callbacks;
        this._rootItems = ko.observableArray([]);
        this._fieldListItemsProvider = ko.observable(null);
        this._fieldSelectedPath = ko.observable(null);
        this._cachedState = {
            connectionName: null,
            jsonSource: null
        };
        this._createTreeNode = (item, isChecked, path) => {
            const node = new DataMemberTreeNode(item.name, item.displayName, item.specifics, isChecked, path);
            this._disposables.push(node.checked.subscribe(() => this._onChange()));
            return node;
        };
        this._createLeafTreeNode = (item, isChecked, path) => {
            const node = new FieldTreeNode(item.name, item.displayName, item.specifics, isChecked, path);
            this._disposables.push(node.checked.subscribe(() => this._onChange()));
            return node;
        };
        this._rootElementTitle = getLocalization('Root element:', 'DataAccessUIStringId.WizardPageChooseJsonSchema_RootElement');
        this._rootElementList = ko.observable([]);
        this._selectedRootElement = ko.observable(null);
        let rootElementSubscription = null;
        this._disposables.push(this._rootElementList.subscribe((rootElements) => {
            rootElementSubscription && rootElementSubscription.dispose();
            rootElementSubscription = this._selectedRootElement.subscribe((selectedPath) => {
                if (!selectedPath)
                    return this._rootItems([]);
                const rootNode = this._getSchemaToDataMemberInfo(selectedPath);
                if (rootNode) {
                    this._rootItems([{
                            name: ko.unwrap(rootNode.name),
                            isSelected: ko.unwrap(rootNode.selected),
                            displayName: ko.unwrap(rootNode.displayName) || ko.unwrap(rootNode.name),
                            data: rootNode,
                            specifics: rootNode.nodes.length > 0 ? 'List' : 'Default'
                        }]);
                }
            });
            this._selectedRootElement(rootElements[0]);
        }));
        const fieldListProvider = new FieldListProvider(this._createFieldListCallback(), this._rootItems);
        this._fieldListItemsProvider(new JsonTreeNodeItemsProvider(fieldListProvider, this._rootItems, this._createTreeNode, this._createLeafTreeNode));
        this._disposables.push(this._fieldListItemsProvider());
        this._fieldListModel = {
            expandRootItems: true,
            itemsProvider: this._fieldListItemsProvider(),
            selectedPath: this._fieldSelectedPath,
            treeListController: null,
            templateName: 'dxrd-treelist-with-checkbox'
        };
    }
    _clear() {
        this._rootItems([]);
        this._fieldSelectedPath('');
        this._rootElementList([]);
        this._selectedRootElement(null);
        this._dataSource && this._dataSource.jsonSchemaProvider.reset();
        this._cachedState = {
            connectionName: null,
            jsonSource: null
        };
    }
    _createFieldListCallback() {
        return (pathRequest) => {
            const parentNode = new JsonNode({});
            parentNode.nodes = [this._rootItems()[0].data];
            const itemsByPath = this._getInnerItemsByPath(pathRequest, parentNode);
            return $.Deferred().resolve(itemsByPath).promise();
        };
    }
    _getSchemaToDataMemberInfo(path) {
        let nodeAcc = this._dataSource.schema;
        for (let i = 0; i < path.pathParts.length; i++) {
            nodeAcc = nodeAcc.nodes.filter(node => node.name() === path.pathParts[i])[0];
            if (!nodeAcc)
                return null;
        }
        return nodeAcc;
    }
    _mapJsonNodesToTreelistItems(nodes) {
        return $.map((nodes || []), (node) => {
            const dataMemberInfo = {
                name: node.name(),
                displayName: node.displayName || node.name(),
                isSelected: node.selected(),
                isList: node.nodes && node.nodes.length > 0,
                specifics: 'Default'
            };
            return dataMemberInfo;
        });
    }
    _getNodesByPath(pathRequest, parentNode) {
        if (!pathRequest.fullPath) {
            return parentNode.nodes;
        }
        else {
            let currentNodes = parentNode.nodes;
            for (let i = 0; i < pathRequest.pathParts.length; i++) {
                const pathPart = (currentNodes || []).filter((node) => node.name() == pathRequest.pathParts[i])[0];
                if (!pathPart)
                    return [];
                currentNodes = pathPart.nodes;
            }
            return currentNodes;
        }
    }
    _getInnerItemsByPath(pathRequest, parentNode) {
        const nodes = this._getNodesByPath(pathRequest, parentNode);
        return this._mapJsonNodesToTreelistItems(nodes);
    }
    _beginInternal(state) {
        if ((state.connectionName && this._cachedState.connectionName === state.connectionName) ||
            (state.jsonSource && this._cachedState.jsonSource === state.jsonSource))
            return $.Deferred().resolve().promise();
        this._clear();
        this._cachedState = {
            connectionName: state.connectionName,
            jsonSource: state.jsonSource
        };
        const oldDataSourceId = this._dataSource && this._dataSource.id;
        this._dataSource = _restoreJsonDataSourceFromState(state, this._requestWrapper);
        if ((oldDataSourceId && oldDataSourceId != this._dataSource.id) || !this._dataSource.schema.nodes.length) {
            return this._dataSource.getSchema(this._callbacks && this._callbacks.getParameters && this._callbacks.getParameters())
                .done((schema) => this._updatePage(schema));
        }
        return $.Deferred().done((schema) => this._updatePage(schema)).resolve(this._dataSource.schema).promise();
    }
    _updatePage(jsonSchema) {
        const rootElementList = jsonSchema.getRootElementPartList(this._allowObjectRootElements);
        if (this._rootElementList() !== rootElementList) {
            this._rootElementList(this._filterRootElementList(rootElementList, jsonSchema));
        }
        if (this._dataSource.rootElement()) {
            const dataSourceRootElementPath = ['root', this._dataSource.rootElement()].join('.');
            const rootElementToSelect = this._rootElementList().filter(item => item.fullPath === dataSourceRootElementPath)[0] || this._rootElementList()[0];
            this._selectedRootElement(rootElementToSelect);
        }
        this._onChange();
    }
    _resetSelectionRecursive(currentNode, selectedRootElement) {
        if (currentNode === selectedRootElement) {
            return;
        }
        currentNode.selected && currentNode.selected(false);
        (currentNode.nodes || []).forEach(node => this._resetSelectionRecursive(node, selectedRootElement));
    }
    _mapJsonSchema(jsonNode, path) {
        const treelistNode = this._fieldListItemsProvider().getNodeByPath(path);
        if (!treelistNode)
            return;
        jsonNode.selected(treelistNode.checked() !== false);
        (jsonNode.nodes || []).forEach(innerJsonNode => {
            const nextPathParts = path.pathParts.concat(innerJsonNode.name());
            const nextFullPath = nextPathParts.join('.');
            const nextPath = { fullPath: nextFullPath, path: innerJsonNode.name(), id: nextFullPath, pathParts: nextPathParts };
            this._mapJsonSchema(innerJsonNode, nextPath);
        });
        return jsonNode;
    }
    _filterRootElementList(rootElementList, jsonSchema) {
        return rootElementList;
    }
    canNext() {
        return false;
    }
    canFinish() {
        return this._fieldListItemsProvider().hasCheckedItems();
    }
    commit() {
        const rootItem = this._rootItems()[0];
        if (!rootItem)
            return;
        const currentRootNode = this._rootItems()[0].data;
        this._resetSelectionRecursive(this._dataSource.schema, currentRootNode);
        const currentRootPath = currentRootNode.name();
        const pathFromCurrentRoot = { fullPath: currentRootPath, path: '', id: currentRootPath, pathParts: [currentRootPath] };
        this._mapJsonSchema(this._rootItems()[0].data, pathFromCurrentRoot);
        const selectedRootElementPath = this._selectedRootElement().pathParts.slice(1).join('.');
        this._dataSource.rootElement(selectedRootElementPath);
        const serialized = new ModelSerializer().serialize(this._dataSource);
        return $.Deferred().resolve({
            connectionName: this._dataSource.connectionName(),
            dataSourceName: serialized['@Name'],
            jsonScheme: JSON.stringify(serialized.Schema),
            rootElement: serialized['@RootElement']
        }).promise();
    }
    initialize(state) {
        return this._beginInternal(state);
    }
    reset() {
        this._clear();
    }
}
export function _registerChooseJsonSchemaPage(factory, requestWrapper, callbacks) {
    factory.registerMetadata(JsonDataSourceWizardPageId.ChooseJsonSchemaPage, {
        setState: (data, state) => {
            state.dataSourceName = data.dataSourceName;
            state.jsonScheme = data.jsonScheme;
            state.rootElement = data.rootElement;
        },
        getState: (state) => {
            return state.jsonDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.dataSourceName = defaultState.dataSourceName;
            state.jsonScheme = defaultState.jsonScheme;
            state.rootElement = defaultState.rootElement;
        },
        create: () => {
            return new ChooseJsonSchemaPage(requestWrapper, undefined, callbacks);
        },
        description: getLocalization('Select data fields.', 'DataAccessUIStringId.WizardPageChooseJsonSchema'),
        template: 'dxrd-jsondatasource-fields-page'
    });
}
