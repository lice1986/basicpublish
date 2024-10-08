﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_configureParametersUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { editorTemplates } from '../../../property-grid/widgets/editorsInfo';
import { SqlQueryType } from '../../dataSource/utils';
import { TreeListController } from '../../../widgets/treelist/_treelistController';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { treeListEditAction } from '../../../widgets/treelist/_treelistItem.viewModel';
export class ParametersTreeListItemBase extends Disposable {
    constructor(parameter) {
        super();
        this.editor = editorTemplates.getEditor('commonCollection');
        this.isList = false;
        this.contenttemplate = 'dx-treelist-accordion-contenttemplate-custom-with-actions';
        this.actionsTemplate = 'dx-treelist-item-actions';
        this.dataSourceParameter = ko.observable(parameter);
        this._name = parameter.name;
        this._displayName = parameter.displayName;
    }
    get name() {
        return this._name();
    }
    get displayName() {
        return this._displayName || this.name;
    }
}
export class ParametersTreeListItem extends ParametersTreeListItemBase {
    constructor(parameter, parent) {
        super(parameter);
        this.parent = parent;
    }
    query() {
        return this.parent.query();
    }
}
export class ParametersTreeListRootItemBase {
    constructor(name) {
        this.isList = true;
        this.specifics = 'List';
        this.visible = ko.observable(true);
        this.name = this.displayName = name;
        this.parameters = ko.observableArray([]);
    }
    removeChild(parameter) {
        this.parameters.remove(parameter);
    }
}
export class ParametersTreeListRootItem extends ParametersTreeListRootItemBase {
    constructor(query) {
        super(query.name());
        this._query = query;
    }
    query() {
        return this._query;
    }
}
export class ParametersTreeListController extends TreeListController {
    constructor(rootItems, createNewParameter) {
        super();
        this._createNewParameter = createNewParameter;
        this._rootItems = rootItems;
    }
    hasItems(item) {
        return item.isList;
    }
    getActions(treeListItem) {
        const actions = [];
        if (!treeListItem.data)
            return actions;
        if (treeListItem.data.query().type() === SqlQueryType.storedProcQuery) {
            return treeListItem.data.isList ? [] : [treeListEditAction];
        }
        if (treeListItem.data.isList) {
            const item = treeListItem.data;
            actions.push({
                clickAction: () => {
                    return item.parameters.push(new ParametersTreeListItem(this._createNewParameter(item.name, item.parameters()), item));
                },
                imageClassName: 'dxrd-image-add',
                imageTemplateName: 'dxrd-svg-operations-add',
                text: getLocalization('Add parameter', 'AnalyticsCoreStringId.FieldListActions_AddParameter')
            });
        }
        else {
            const parameter = treeListItem.data;
            actions.push({
                clickAction: () => {
                    parameter.parent.removeChild(parameter);
                },
                imageClassName: 'dxrd-image-recycle-bin',
                imageTemplateName: 'dxrd-svg-operations-recycle_bin',
                text: getLocalization('Remove parameter', 'DataAccessUIStringId.Button_Remove'),
            });
            actions.push(treeListEditAction);
        }
        return actions;
    }
    canSelect(value) {
        return true;
    }
}
