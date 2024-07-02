﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\specifyObjectDataSourceSettingsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { getSectionStyle, WizardSectionPosition } from '../../internal/_utils';
import { ObjectDataMember } from '../../../dataSource/object/objectSchema';
import { ObjectDataSource } from '../../../dataSource/object/objectDataSource';
import { ObjectSchemaProvider } from '../../internal/objectDataSource/_objectSchemaProvider';
import { ChooseObjectTypes } from '../../internal/objectDataSource/_chooseObjectTypes';
import { ChooseObjectDataMembers } from '../../internal/objectDataSource/_chooseObjectDataMembers';
import { ChooseObjectParameters } from '../../internal/objectDataSource/_chooseObjectParameters';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { FullscreenDataSourceWizardPageId } from '../../pageId';
import { WizardPageBase } from '../../pages/wizardPageBase';
export class SpecifyObjectDataSourceSettingsPage extends WizardPageBase {
    constructor(_dataSourceWizardOptions) {
        super();
        this._dataSourceWizardOptions = _dataSourceWizardOptions;
        this._types = ko.observableArray([]);
        this._objectDataSource = new ObjectDataSource();
        const getItemsProviderCallback = this._dataSourceWizardOptions.callbacks.getItemsProviderCallback;
        this._disposables.push(this._provider = new ObjectSchemaProvider(this._dataSourceWizardOptions.requestWrapper), this._chooseObjectType = new ChooseObjectTypes(this._types, this._provider), this._chooseObjectDataMember = new ChooseObjectDataMembers(this._chooseObjectType.selectedType, this._chooseObjectType.selectedCtor), this._chooseObjectParameters = new ChooseObjectParameters(this._chooseObjectType.selectedCtor, this._chooseObjectDataMember.selectedDataMembers, getItemsProviderCallback && getItemsProviderCallback()));
        this._initSections();
    }
    _initSections() {
        this._sections = [
            {
                data: this._chooseObjectType,
                disabled: () => false,
                description: getLocalization('Choose the type and its constructor.', 'AnalyticsCoreStringId.ObjectDSWizard_ChooseType_Description'),
                position: getSectionStyle(this._dataSourceWizardOptions.rtl ? WizardSectionPosition.Right : WizardSectionPosition.Left),
                template: 'dx-objectdatasource-types-section'
            },
            {
                data: this._chooseObjectDataMember,
                disabled: () => !this._chooseObjectDataMember.dataMembers().length,
                description: getLocalization('Choose the entire object or a data member to bind.', 'AnalyticsCoreStringId.ObjectDSWizard_ChooseDataMember_Description'),
                position: getSectionStyle(this._dataSourceWizardOptions.rtl ? WizardSectionPosition.TopLeft : WizardSectionPosition.TopRight),
                disabledText: getLocalization('To select a data member, choose a type that contains at least one data member.', 'AnalyticsCoreStringId.ObjectDSWizard_ChooseDataMember_Disabled_Description'),
                template: 'dx-objectdatasource-datamembers-section'
            },
            {
                data: this._chooseObjectParameters,
                disabled: () => !this._chooseObjectParameters.hasParameters(),
                position: getSectionStyle(this._dataSourceWizardOptions.rtl ? WizardSectionPosition.BottomLeft : WizardSectionPosition.BottomRight),
                description: getLocalization('Configure constructor parameters and/or method parameters.', 'AnalyticsCoreStringId.ObjectDSWizard_ConfigureParameters_Description'),
                disabledText: getLocalization('To specify parameters, select a parameterized constructor or method.', 'AnalyticsCoreStringId.ObjectDSWizard_ConfigureParameters_Disabled_Description'),
                template: 'dx-objectdatasource-parameters-section'
            }
        ];
    }
    showDescription(index, text) {
        return [index + 1, text].join('. ');
    }
    canNext() {
        return false;
    }
    canFinish() {
        return !!this._chooseObjectDataMember.selectedDataMembers().length;
    }
    commit() {
        const selectedDataMember = this._chooseObjectDataMember.selectedDataMembers()[0];
        return $.Deferred().resolve({
            selectedType: this._chooseObjectType.selectedType().name,
            ctor: this._chooseObjectType.selectedCtor(),
            dataSourceName: this._objectDataSource.name(),
            context: this._context,
            dataMember: !selectedDataMember || selectedDataMember.isEntireObject() ? undefined : selectedDataMember,
        }).promise();
    }
    initialize(state) {
        this._context = state.objectDataSourceWizard.context;
        this._objectDataSource.setState(state.objectDataSourceWizard);
        this._chooseObjectType.selectedCtor(this._objectDataSource.ctor);
        this._chooseObjectDataMember.selectedDataMembers([this._objectDataSource.dataMember]);
        this._provider.getObjectTypeDescriptions(state.objectDataSourceWizard.context).done((schema) => {
            schema.types.forEach(type => type.members.splice(0, 0, ObjectDataMember.empty()));
            this._types(schema.types || []);
            if (schema.types.length > 0) {
                this._chooseObjectType.selectedPath(schema.types[0].name);
            }
        });
        return $.Deferred().resolve().promise();
    }
}
export function _registerSpecifyObjectDataSourceSettingsPage(factory, dataSourceWizardOptions) {
    factory.registerMetadata(FullscreenDataSourceWizardPageId.SpecifyObjectDataSourceSettingsPage, {
        setState: (data, state) => {
            state.objectDataSourceWizard.ctor = data.ctor;
            state.objectDataSourceWizard.dataMember = data.dataMember;
            state.objectDataSourceWizard.selectedType = data.selectedType;
            state.objectDataSourceWizard.dataSourceName = data.dataSourceName;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.objectDataSourceWizard.ctor = defaultState.objectDataSourceWizard.ctor;
            state.objectDataSourceWizard.dataMember = defaultState.objectDataSourceWizard.dataMember;
            state.objectDataSourceWizard.selectedType = defaultState.objectDataSourceWizard.selectedType;
            state.objectDataSourceWizard.dataSourceName = defaultState.objectDataSourceWizard.dataSourceName;
        },
        create: () => {
            return new SpecifyObjectDataSourceSettingsPage(dataSourceWizardOptions);
        },
        template: 'dxrd-page-objectsource',
        navigationPanelText: getLocalization('Specify Data Source Settings', 'AnalyticsCoreStringId.Wizard_SpecifyDataSourceSettingsPage')
    });
}
