﻿/**
* DevExpress Analytics (query-builder\wizard\pages\objectDataSourceWizard\chooseObjectDataSourceTypesPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { ObjectSchemaProvider } from '../../internal/objectDataSource/_objectSchemaProvider';
import { ChooseObjectTypes } from '../../internal/objectDataSource/_chooseObjectTypes';
import { ObjectDataSource } from '../../../dataSource/object/objectDataSource';
import { ObjectDataMember } from '../../../dataSource/object/objectSchema';
import { ObjectDataSourceWizardPageId } from '../../pageId';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { WizardPageBase } from '../wizardPageBase';
export class ChooseObjectDataSourceTypesPage extends WizardPageBase {
    constructor(_requestWrapper = new RequestWrapper()) {
        super();
        this._requestWrapper = _requestWrapper;
        this._objectDataSource = new ObjectDataSource();
        this._types = ko.observableArray([]);
        this._disposables.push(this._provider = new ObjectSchemaProvider(this._requestWrapper), this._chooseObjectType = new ChooseObjectTypes(this._types, this._provider));
    }
    canNext() {
        return !!this._selectedTypeName;
    }
    canFinish() {
        return false;
    }
    commit() {
        return $.Deferred().resolve({
            selectedType: this._selectedTypeName,
            selectedObjectType: this._chooseObjectType.selectedType(),
            ctor: this._chooseObjectType.selectedCtor()
        }).promise();
    }
    initialize(state) {
        this._objectDataSource.setState(state);
        this._provider.getObjectTypeDescriptions(state.context).done((schema) => {
            schema.types.forEach(type => type.members.splice(0, 0, ObjectDataMember.empty()));
            this._types(schema.types || []);
            if (schema.types.length > 0) {
                this._chooseObjectType.selectedPath(schema.types[0].name);
            }
        });
        return $.Deferred().resolve().promise();
    }
    get _selectedTypeName() {
        return !!this._chooseObjectType.selectedType() ? this._chooseObjectType.selectedType().name : null;
    }
}
export function _registerChooseObjectDataSourceTypesPage(factory, dataSourceWizardOptions) {
    factory.registerMetadata(ObjectDataSourceWizardPageId.ChooseTypesPage, {
        setState: (data, state) => {
            state.selectedType = data.selectedType;
            state.selectedObjectType = data.selectedObjectType;
            state.ctor = data.ctor;
        },
        getState: (state) => {
            return state.objectDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.selectedType = defaultState.selectedType;
            state.selectedObjectType = defaultState.selectedObjectType;
            state.ctor = defaultState.ctor;
        },
        create: () => {
            return new ChooseObjectDataSourceTypesPage(dataSourceWizardOptions.requestWrapper);
        },
        description: getLocalization('Choose the type and its constructor.', 'AnalyticsCoreStringId.ObjectDSWizard_ChooseType_Description'),
        template: 'dxrd-page-objectdatasource-types'
    });
}