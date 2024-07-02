﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\defineCrossTabPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { FullscreenWizardPage } from '@devexpress/analytics-core/analytics-wizard';
import { WizardSectionPosition } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as $ from 'jquery';
import { crossTabSummaryType, sortOrderdefaultValAscending } from '../../../controls/metadata/crosstab/fields';
import { FullscreenReportWizardPageId, FullscreenReportWizardSectionId } from '../../pageId';
import { ConfigureCrossTabPage, SelectCrossTabDataMember, _registerConfigureCrossTabPage } from './configureCrossTabPage';
import { _registerDefineReportLayoutPage } from './defineReportLayoutPage';
export class DefineCrossTabPage extends FullscreenWizardPage {
    constructor(_reportWizardOptions) {
        super();
        this._reportWizardOptions = _reportWizardOptions;
        this._className = 'dxrd-wizard-section-crosstab';
    }
    _showPageDescription() {
        return false;
    }
    canNext() {
        return true;
    }
    registerSections() {
        _registerSelectSingleDataMemberPage(this._factory, this._reportWizardOptions);
        this._setSectionPosition(FullscreenReportWizardSectionId.SelectSingleDataMemberPage, WizardSectionPosition.TopLeft);
        _registerConfigureCrossTabPage(this._factory, FullscreenReportWizardSectionId.ConfigureCrossTabColumnsPage, 'Columns', 'ReportStringId.CrossTab_ColumnAreaName', sortOrderdefaultValAscending);
        this._setSectionPosition(FullscreenReportWizardSectionId.ConfigureCrossTabColumnsPage, WizardSectionPosition.TopRight);
        _registerConfigureCrossTabPage(this._factory, FullscreenReportWizardSectionId.ConfigureCrossTabRowsPage, 'Rows', 'ReportStringId.CrossTab_RowAreaName', sortOrderdefaultValAscending);
        this._setSectionPosition(FullscreenReportWizardSectionId.ConfigureCrossTabRowsPage, WizardSectionPosition.BottomLeft);
        _registerConfigureCrossTabPage(this._factory, FullscreenReportWizardSectionId.ConfigureCrossTabDataPage, 'Data', 'ReportStringId.CrossTab_DataAreaName', crossTabSummaryType);
        this._setSectionPosition(FullscreenReportWizardSectionId.ConfigureCrossTabDataPage, WizardSectionPosition.BottomRight);
    }
    getNextSectionId(sectionId) {
        if (!sectionId)
            return FullscreenReportWizardSectionId.SelectSingleDataMemberPage;
        else if (sectionId === FullscreenReportWizardSectionId.SelectSingleDataMemberPage) {
            return FullscreenReportWizardSectionId.ConfigureCrossTabColumnsPage;
        }
        else if (sectionId === FullscreenReportWizardSectionId.ConfigureCrossTabColumnsPage) {
            return FullscreenReportWizardSectionId.ConfigureCrossTabRowsPage;
        }
        else if (sectionId === FullscreenReportWizardSectionId.ConfigureCrossTabRowsPage) {
            return FullscreenReportWizardSectionId.ConfigureCrossTabDataPage;
        }
    }
    commit() {
        const result = {};
        this._sections.forEach(section => {
            if (section && section.page().page instanceof ConfigureCrossTabPage) {
                const page = section.page().page;
                result[page.stateName] = page.fieldInfos().filter(x => x.field()).map(x => {
                    const info = {
                        name: x.field().name, displayName: x.field().displayName
                    };
                    info[page.itemInfo.propertyName] = x.functionValue().value;
                    return info;
                });
            }
        });
        const defferer = $.Deferred();
        super.commit().done(sectionsResult => {
            defferer.resolve(extend(sectionsResult, result));
        });
        return defferer.promise();
    }
}
export function _registerSelectSingleDataMemberPage(factory, reportWizardOptions) {
    factory.registerMetadata(FullscreenReportWizardSectionId.SelectSingleDataMemberPage, {
        create: () => {
            return new SelectCrossTabDataMember(reportWizardOptions.callbacks.fieldListsCallback, reportWizardOptions.hideDataMemberSubItems);
        },
        template: 'dxrd-page-crosstab-dataMembers',
        getState: (state) => state,
        setState: (data, state) => {
            state.crossTabFields = data.crossTabFields;
            state.dataMemberPath = data.dataMemberPath;
            state.dataMemberInfo = data.dataMemberInfo;
        },
        resetState: (state, defaultState) => {
            state.crossTabFields = defaultState.crossTabFields;
            state.dataMemberPath = defaultState.dataMemberPath;
            state.dataMemberInfo = defaultState.dataMemberInfo;
        }
    });
}
export function _registerDefineCrossTabPage(factory, reportWizardOptions) {
    _registerDefineReportLayoutPage(factory, reportWizardOptions);
    const meta = factory.getMetadata(FullscreenReportWizardPageId.DefineReportLayoutPage);
    const newMeta = extend({}, meta, {
        create: () => {
            return new DefineCrossTabPage(reportWizardOptions);
        },
        setState: (data, state) => {
            state.crossTabFields = data.crossTabFields;
            state.dataMemberPath = data.dataMemberPath;
            state.dataMemberInfo = data.dataMemberInfo;
            state.crossTabColumnsFieldInfo = data.crossTabColumnsFieldInfo;
            state.crossTabRowsFieldInfo = data.crossTabRowsFieldInfo;
            state.crossTabDataFieldInfo = data.crossTabDataFieldInfo;
        },
        resetState: (state, defaultState) => {
            state.crossTabFields = defaultState.crossTabFields;
            state.dataMemberPath = defaultState.dataMemberPath;
            state.dataMemberInfo = defaultState.dataMemberInfo;
            state.crossTabColumnsFieldInfo = defaultState.crossTabColumnsFieldInfo;
            state.crossTabRowsFieldInfo = defaultState.crossTabRowsFieldInfo;
            state.crossTabDataFieldInfo = defaultState.crossTabDataFieldInfo;
        }
    });
    factory.registerMetadata(FullscreenReportWizardPageId.DefineCrossTabPage, newMeta);
}
