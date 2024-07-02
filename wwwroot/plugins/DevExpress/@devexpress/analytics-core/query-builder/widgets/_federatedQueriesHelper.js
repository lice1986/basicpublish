﻿/**
* DevExpress Analytics (query-builder\widgets\_federatedQueriesHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getUniqueName } from '../../core/internal/_getNameHelpers';
import { findFirstItemMatchesCondition } from '../../core/utils/_arrayutils';
import { Disposable } from '../../serializer/disposable';
import { SelectQuery } from '../dataSource/federation/federatedQueries/selectQuery';
import { TransformQuery } from '../dataSource/federation/federatedQueries/transformQuery';
import { UnionQuery } from '../dataSource/federation/federatedQueries/unionQuery';
import { FederationQueryType } from '../dataSource/utils';
import { FederationSelectQueryBuilderPopup } from '../wizard/internal/federationDataSource/_federationSelectQueryBuilderPopup';
import { FederationTransformQueryBuilderPopup } from '../wizard/internal/federationDataSource/_federationTransformQueryBuilderPopup';
import { FederationUnionQueryBuilderPopup } from '../wizard/internal/federationDataSource/_federationUnionQueryBuilderPopup';
export class FederatedQueriesHelper extends Disposable {
    constructor(_dataSource, queries, callbacks, rtl = false) {
        super();
        this._dataSource = _dataSource;
        this.queries = queries;
        this._showSelectQbCallBack = (name = null) => {
            this._popupSelectQueryBuilder.show(this._getQuery(() => new SelectQuery({}), name));
        };
        this._showUnionQbCallBack = (name = null) => {
            this._popupUnionQueryBuilder.show(this._getQuery(() => new UnionQuery({}, this._dataSource.dataSources), name));
        };
        this._showTransformQbCallBack = (name = null) => {
            this._popupTransformQueryBuilder.show(this._getQuery(() => new TransformQuery({}), name));
        };
        this.template = 'dx-querybuilder-federation-popup-templates';
        const saveCallback = (query) => {
            this._setQuery(query);
            queries.valueHasMutated();
            callbacks.onSave && callbacks.onSave();
        };
        this._afterAddQuery = callbacks.afterAddQuery;
        this._disposables.push(queries.subscribe(queries => queries.forEach(query => {
            query.sources().forEach(x => this._dataSource.addSource(x));
        })));
        this._disposables.push(this._popupSelectQueryBuilder = new FederationSelectQueryBuilderPopup(saveCallback, this._dataSource, rtl, callbacks.onClose));
        this._disposables.push(this._popupUnionQueryBuilder = new FederationUnionQueryBuilderPopup(saveCallback, this._dataSource, rtl, callbacks.onClose));
        this._disposables.push(this._popupTransformQueryBuilder = new FederationTransformQueryBuilderPopup(saveCallback, this._dataSource, rtl, callbacks.onClose));
        this.callBacks = {
            joinCallBack: this._showSelectQbCallBack,
            unionCallBack: this._showUnionQbCallBack,
            transformCallBack: this._showTransformQbCallBack
        };
        this.popupItems = [
            { template: 'dxrd-querybuilder-federation-popup', model: this._popupSelectQueryBuilder },
            { template: 'dxrd-querybuilder-federation-popup', model: this._popupUnionQueryBuilder },
            { template: 'dxrd-querybuilder-federation-popup', model: this._popupTransformQueryBuilder }
        ];
    }
    _getQuery(creator, name) {
        return name ? findFirstItemMatchesCondition(this.queries(), item => name === item.alias()) : creator();
    }
    _setQuery(query) {
        if (!query)
            return;
        if (this.queries.indexOf(query) === -1) {
            query.alias(query.alias() || query.generateName());
            if (this._dataSource.queries().filter(x => x.alias() === query.alias())[0]) {
                query.alias(getUniqueName(this._dataSource.queries().map(x => x.alias()), query.alias()));
            }
            this.queries.push(query);
            this._afterAddQuery && this._afterAddQuery(query);
        }
    }
    editQuery(type, name) {
        switch (type) {
            case FederationQueryType.SelectNode:
                this.callBacks.joinCallBack(name);
                break;
            case FederationQueryType.UnionNode:
                this.callBacks.unionCallBack(name);
                break;
            case FederationQueryType.TransformationNode:
                this.callBacks.transformCallBack(name);
                break;
        }
    }
    dispose() {
        super.dispose();
        this._dataSource = null;
    }
}
