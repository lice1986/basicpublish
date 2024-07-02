﻿/**
* DevExpress Analytics (query-builder\wizard\pages\objectDataSourceWizard\configureObjectDataSourceParametersPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { ObjectDataSource } from '../../../dataSource/object/objectDataSource';
import { ChooseObjectMemberParameters } from '../../internal/objectDataSource/_chooseObjectParameters';
import { ObjectDataSourceWizardPageId } from '../../pageId';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { WizardPageBase } from '../wizardPageBase';
export class ConfigureObjectDataSourceParametersPage extends WizardPageBase {
    constructor(itemsProvider) {
        super();
        this._objectDataSource = new ObjectDataSource();
        this._disposables.push(this._chooseObjectParameters = new ChooseObjectMemberParameters(itemsProvider));
    }
    canNext() {
        return false;
    }
    canFinish() {
        return true;
    }
    commit() {
        return $.Deferred().resolve({
            selectedType: this._objectDataSource.selectedType,
            ctor: this._objectDataSource.ctor,
            dataMember: this._objectDataSource.dataMember,
            dataSourceName: this._objectDataSource.name(),
        }).promise();
    }
    initialize(state) {
        this._objectDataSource.setState(state);
        this._chooseObjectParameters.updateCtorParameters(this._objectDataSource.ctor);
        this._chooseObjectParameters.updateMethodParameters(this._objectDataSource.dataMember);
        return $.Deferred().resolve().promise();
    }
}
export function _registerConfigureObjectDataSourceParametersPage(factory, getItemsProviderCallback) {
    factory.registerMetadata(ObjectDataSourceWizardPageId.ConfigureParametersPage, {
        setState: (data, state) => {
            state.ctor = data.ctor;
            state.dataMember = data.dataMember;
            state.selectedType = data.selectedType;
        },
        getState: (state) => {
            return state.objectDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.dataMember = defaultState.dataMember;
        },
        create: () => {
            return new ConfigureObjectDataSourceParametersPage(getItemsProviderCallback && getItemsProviderCallback());
        },
        description: getLocalization('Configure constructor parameters and/or method parameters.', 'AnalyticsCoreStringId.ObjectDSWizard_ConfigureParameters_Description'),
        template: 'dx-objectdatasource-configureparameters-page'
    });
}
