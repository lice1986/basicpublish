﻿/**
* DevExpress Analytics (query-builder\wizard\pages\objectDataSourceWizard\chooseObjectDataSourceDataMembersPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { ChooseObjectDataMembers } from '../../internal/objectDataSource/_chooseObjectDataMembers';
import { ObjectDataSource } from '../../../dataSource/object/objectDataSource';
import { ObjectDataSourceWizardPageId } from '../../pageId';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { WizardPageBase } from '../wizardPageBase';
export class ChooseObjectDataSourceDataMembersPage extends WizardPageBase {
    constructor(_requestWrapper = new RequestWrapper()) {
        super();
        this._requestWrapper = _requestWrapper;
        this._objectDataSource = new ObjectDataSource();
        this._type = ko.observable();
        this._ctor = ko.observable();
        this._disposables.push(this._chooseObjectDataMember = new ChooseObjectDataMembers(this._type, this._ctor));
    }
    initialize(state) {
        this._objectDataSource.setState(state);
        this._type(state.selectedObjectType);
        this._ctor(state.ctor);
        return $.Deferred().resolve().promise();
    }
    canNext() {
        return !!this._needParametersPage;
    }
    canFinish() {
        return !this._needParametersPage;
    }
    commit() {
        return $.Deferred().resolve({
            selectedType: this._type().name,
            ctor: this._ctor(),
            dataMember: !this._selectedDataMember || this._selectedDataMember.isEntireObject() ? undefined : this._selectedDataMember,
        }).promise();
    }
    get _selectedDataMember() {
        const selectedDataMembers = this._chooseObjectDataMember.selectedDataMembers();
        return !!selectedDataMembers ? selectedDataMembers[0] : null;
    }
    get _needParametersPage() {
        return (!!this._selectedDataMember && this._selectedDataMember.parameters.length > 0) ||
            (!!this._ctor() && this._ctor().parameters.length > 0);
    }
}
export function _registerChooseObjectDataSourceDataMembersPage(factory, dataSourceWizardOptions) {
    factory.registerMetadata(ObjectDataSourceWizardPageId.ChooseDataMembersPage, {
        setState: (data, state) => {
            state.selectedType = data.selectedType;
            state.ctor = data.ctor;
            state.dataMember = data.dataMember;
        },
        getState: (state) => {
            return state.objectDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.dataMember = defaultState.dataMember;
        },
        create: () => {
            return new ChooseObjectDataSourceDataMembersPage(dataSourceWizardOptions.requestWrapper);
        },
        description: getLocalization('Choose the entire object or a data member to bind.', 'AnalyticsCoreStringId.ObjectDSWizard_ChooseDataMember_Description'),
        template: 'dxrd-page-objectdatasource-datamembers'
    });
}
