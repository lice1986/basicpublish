﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_queryBuilderPopup.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { findFirstItemMatchesCondition } from '../../../core/utils/_arrayutils';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { ModelSerializer } from '../../../serializer/serializer';
import { Disposable } from '../../../serializer/disposable';
import { getParentContainer } from '../../../widgets/_utils';
import { TableQuery } from '../../dataSource/sql/tableQuery';
import { ColumnExpressionCollectionHelper } from '../../utils/_columnExpressionCollectionHelper';
export class QueryBuilderPopupBase extends Disposable {
    constructor(applyNewQuery, rtl = false, customizeQBInitializationData = (options) => options) {
        super();
        this.customizeQBInitializationData = customizeQBInitializationData;
        this._querySource = ko.observable(null);
        this._dbSchemaProvider = ko.observable(null);
        this.designer = ko.observable();
        this.qbOptions = ko.observable(null);
        this.okButtonDisabled = ko.pureComputed(() => { return this.designer() && !this.designer().model().isValid(); });
        this.isVisible = ko.observable(false);
        this.showLoadIndicator = ko.observable(false);
        this.localizationIdMap = {
            'title': { text: 'Query Builder', localizationId: 'DataAccessUIStringId.QueryBuilder' },
            'loading': { text: 'Loading...', localizationId: 'AnalyticsCoreStringId.Loading' },
            'previewResults': { text: 'Preview Results...', localizationId: 'DataAccessUIStringId.QueryBuilderButtons_PreviewResults' },
            'cancel': { text: 'Cancel', localizationId: 'AnalyticsCoreStringId.SearchDialog_Cancel' },
            'ok': { text: 'OK', localizationId: 'DataAccessUIStringId.Button_OK' }
        };
        this._rtl = rtl;
        this._applyQuery = applyNewQuery;
        this.qbOptions(this.qbOptions() || this.customizeQBInitializationData({
            queryBuilderModel: this.designer,
            dbSchemaProvider: this._dbSchemaProvider,
            querySource: this._querySource,
            callbacks: { CustomizeMenuActions: QueryBuilderPopup.customizeQueryBuilderActions },
            rtl: this._rtl
        }));
    }
    show(query, dataSource) {
        this._dataSource = dataSource;
        this._dbSchemaProvider(dataSource.dbSchemaProvider);
        this._querySource(new ModelSerializer().serialize(query));
        this.isVisible(true);
        this.designer().updateSurface();
    }
    cancelHandler() {
        ColumnExpressionCollectionHelper.clearCache();
        this.isVisible(false);
    }
    previewHandler() {
        this.designer().showPreview();
    }
    okHandler() {
        if (this.designer().model().canSave()) {
            ColumnExpressionCollectionHelper.clearCache();
            this._applyQuery(this.createQuery(), this.showLoadIndicator)
                .done(() => {
                this.isVisible(false);
            });
        }
    }
    onHiddingHandler() {
        this.designer().dataPreview.isVisible(false);
    }
    popupViewModel(element) {
        const $container = getParentContainer(element);
        return {
            visible: this.isVisible,
            title: this.getDisplayText('title'),
            showTitle: true,
            shading: true,
            fullScreen: false,
            width: '95%',
            height: '95%',
            container: $container,
            wrapperAttr: { class: 'dxrd-querybuilder-popup' },
            position: { of: $container },
            onHidding: this.onHiddingHandler
        };
    }
    getDisplayText(key) {
        return getLocalization(this.localizationIdMap[key].text, this.localizationIdMap[key].localizationId);
    }
}
QueryBuilderPopupBase.customizeQueryBuilderActions = (sender, args) => {
    const actions = args.Actions;
    const del = findFirstItemMatchesCondition(actions, action => action.text === 'Delete'), undo = findFirstItemMatchesCondition(actions, action => action.text === 'Undo'), redo = findFirstItemMatchesCondition(actions, action => action.text === 'Redo');
    actions.splice(0, actions.length, del, undo, redo);
};
export class QueryBuilderPopup extends QueryBuilderPopupBase {
    constructor(applyNewQuery, rtl = false, customizeQBInitializationData = (options) => options) {
        super(applyNewQuery, rtl, customizeQBInitializationData);
        this.customizeQBInitializationData = customizeQBInitializationData;
    }
    getDataSource() {
        return this._dataSource;
    }
    createQuery() {
        return new TableQuery(this.designer().model().serialize(), this.getDataSource());
    }
}