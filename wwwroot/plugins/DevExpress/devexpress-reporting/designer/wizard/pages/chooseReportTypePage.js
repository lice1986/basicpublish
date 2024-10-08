﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseReportTypePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { findFirstItemMatchesCondition } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { getTemplate } from '@devexpress/analytics-core/analytics-widgets';
import { addToBindingsCache } from '@devexpress/analytics-core/analytics-widgets-internal';
import { ChooseDataSourceTypePage as AnalyticChooseDataSourceTypePage, DataSourceType, DataSourceWizardPageId, TypeItem } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { SearchBoxVisibilityMode } from '../../utils/inititalizer';
import { FullscreenReportWizardPageId } from '../pageId';
import { ReportType } from '../reportWizardState';
export class SelectReportTypePage extends AnalyticChooseDataSourceTypePage {
    constructor(_options) {
        super({});
        this._options = _options;
        this._IsSelected = (item) => {
            return this.selectedItem().type === item.type && this.selectedItem().id === item.id;
        };
        this.selectedItem = ko.observable();
        this._extendCssClass = (rightPath) => 'dxrd-report-' + rightPath;
        this._textToSearch = ko.observable('');
        this.typeItems = [];
        _options.reportTemplates.forEach(template => {
            template.text = getLocalization(template.text, template.localizationID);
            template.type = ReportType[template.id] !== undefined ? ReportType[template.id] : ReportType.Template;
            if (!template.imageTemplateName && !template.imageClassName) {
                template.imageTemplateName = SelectReportTypePage.defaultImageID;
            }
            if (this.itemsFilter(template)) {
                this.typeItems.push(template);
            }
        });
    }
    getListOptions() {
        const searchEnabled = this._options.searchBoxVisibilityMode === SearchBoxVisibilityMode.Always ||
            this._options.searchBoxVisibilityMode === SearchBoxVisibilityMode.Auto && this.typeItems.length > 15;
        return {
            itemTemplate: getTemplate('dxrd-page-choose-type-item'),
            dataSource: this.typeItems,
            searchEnabled: searchEnabled,
            searchValue: this._textToSearch,
            searchExpr: 'text',
            focusStateEnabled: false,
            hoverStateEnabled: false,
            activeStateEnabled: false,
            pageLoadMode: 'scrollBottom',
            searchEditorOptions: {
                placeholder: getLocalization('Find a Report Template...', 'ASPxReportsStringId.ReportDesigner_Wizard_SearchPlaceholder')
            }
        };
    }
    itemsFilter(item) {
        if (item.type === ReportType.Standard || item.type === ReportType.CrossTab)
            return !!this._options.canCreateDatabound;
        if (item.type === ReportType.Vertical)
            return this._options.canCreateDatabound && this._options.showVertical;
        return true;
    }
    canNext() {
        return this.selectedItem() !== null && this.selectedItem().type !== ReportType.Empty;
    }
    canFinish() {
        return this.selectedItem() !== null && this.selectedItem().canInstantlyFinish;
    }
    commit() {
        return $.Deferred().resolve({ reportType: this.selectedItem().type, reportTemplateID: this.selectedItem().id }).promise();
    }
    initialize(state) {
        const type = state.reportType || ReportType.Standard;
        const item = findFirstItemMatchesCondition(this.typeItems, (item) => item.type === type);
        this.selectedItem(item || this.typeItems[0]);
        return $.Deferred().resolve().promise();
    }
}
SelectReportTypePage.defaultImageID = 'dxrd-svg-wizard-UndefinedReport';
export class ChooseDataSourceTypePage extends AnalyticChooseDataSourceTypePage {
    constructor(dataSourceWizardOptions) {
        super(dataSourceWizardOptions);
        this.typeItems.push(new TypeItem('No Data', 'DataAccessUIStringId.DSTypeNoData', 'nodata', 'dxrd-svg-wizard-NoDataSource', DataSourceType.NoData));
    }
}
export function _registerSelectReportTypePage(factory, options) {
    factory.registerMetadata(FullscreenReportWizardPageId.SelectReportTypePage, {
        setState: (data, state) => {
            state.reportType = data.reportType;
            state.reportTemplateID = data.reportTemplateID;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.reportType = defaultState.reportType;
            state.reportTemplateID = defaultState.reportTemplateID;
        },
        create: () => {
            const canCreateDatabound = 'function' === typeof (options.canCreateDatabound) ? options.canCreateDatabound() : options.canCreateDatabound;
            return new SelectReportTypePage({
                canCreateDatabound: canCreateDatabound,
                showVertical: options.showVertical,
                reportTemplates: options.reportTemplates,
                searchBoxVisibilityMode: options.searchBoxVisibilityMode
            });
        },
        description: getLocalization('Select the report type you wish to create.', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectReportType_Message'),
        template: 'dxrd-page-choose-report-type',
        navigationPanelText: getLocalization('Select Report Type', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectReportType')
    });
}
export function _registerChooseDataSourceTypePage(factory, dataSourceWizardOptions) {
    factory.registerMetadata(DataSourceWizardPageId.ChooseDataSourceTypePage, {
        setState: (data, state) => {
            state.dataSourceType = data.dataSourceType;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.dataSourceType = defaultState.dataSourceType;
        },
        create: () => {
            return new ChooseDataSourceTypePage(dataSourceWizardOptions);
        },
        description: getLocalization('Select the data source type.', 'DataAccessUIStringId.WizardPageChooseDSType'),
        template: 'dxrd-page-choose-datasource-type'
    });
}
addToBindingsCache('text: $root.getLocalization(`Report Template`, `ASPxReportsStringId.ReportDesigner_Wizard_ReportTemplate_Thumbnail`)', function ($context, $element) {
    return {
        'text': function () {
            return getLocalization('Report Template', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportTemplate_Thumbnail');
        }
    };
});
