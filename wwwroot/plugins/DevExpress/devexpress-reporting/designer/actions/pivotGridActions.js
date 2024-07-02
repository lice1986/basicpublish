﻿/**
* DevExpress HTML/JS Reporting (designer\actions\pivotGridActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { XRPivotGridViewModel } from '../controls/xrPivotgrid';
import { CrossTabConverter } from '../internal/_crossTabConverter';
import { DefaultCrossTabControlEnum } from '../internal/_defaultCrossTabControl';
import { DefaultCrossTabControl } from '../utils/settings';
export class PivotGridActions extends BaseActionsProvider {
    constructor(_converters, isDisabled = () => false) {
        super();
        this._converters = _converters;
        super.initActions([
            {
                text: 'Insert Field in Filter Area',
                group: () => getLocalization('Pivot Grid', 'ReportStringId.RibbonXRDesign_PageGroup_PivotGrid'),
                displayText: () => getLocalization('Insert Field in Filter Area', 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheFilterArea'),
                imageClassName: 'dxrd-image-actions-add_field_to_filter_area',
                imageTemplateName: 'dxrd-svg-actions-add_field_to_filter_area',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: (model) => { model['addFieldToArea']('FilterArea'); }
            },
            {
                text: 'Insert Field in Data Area',
                group: () => getLocalization('Pivot Grid', 'ReportStringId.RibbonXRDesign_PageGroup_PivotGrid'),
                displayText: () => getLocalization('Insert Field in Data Area', 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheDataArea'),
                imageClassName: 'dxrd-image-actions-add_field_to_data_area',
                imageTemplateName: 'dxrd-svg-actions-add_field_to_data_area',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: (model) => { model['addFieldToArea']('DataArea'); }
            },
            {
                text: 'Insert Field in Column Area',
                group: () => getLocalization('Pivot Grid', 'ReportStringId.RibbonXRDesign_PageGroup_PivotGrid'),
                displayText: () => getLocalization('Insert Field in Column Area', 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheColumnArea'),
                imageClassName: 'dxrd-image-actions-add_field_to_column_area',
                imageTemplateName: 'dxrd-svg-actions-add_field_to_column_area',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: (model) => { model['addFieldToArea']('ColumnArea'); }
            },
            {
                text: 'Insert Field in Row Area',
                group: () => getLocalization('Pivot Grid', 'ReportStringId.RibbonXRDesign_PageGroup_PivotGrid'),
                displayText: () => getLocalization('Insert Field in Row Area', 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheRowArea'),
                imageClassName: 'dxrd-image-actions-add_field_to_row_area',
                imageTemplateName: 'dxrd-svg-actions-add_field_to_row_area',
                disabled: ko.pureComputed(() => isDisabled()),
                clickAction: (model) => { model['addFieldToArea']('RowArea'); }
            },
            {
                text: 'Convert to Cross Tab',
                group: () => getLocalization('Pivot Grid', 'ReportStringId.RibbonXRDesign_PageGroup_PivotGrid'),
                displayText: () => getLocalization('Convert to Cross Tab', 'ReportStringId.Verb_ConvertPivotGridToCrossTab'),
                imageClassName: 'dxrd-image-actions-convertation',
                imageTemplateName: 'dxrd-svg-actions-convertation',
                disabled: ko.pureComputed(() => isDisabled()),
                visible: DefaultCrossTabControl() == DefaultCrossTabControlEnum.XRCrossTab,
                clickAction: (model) => {
                    const converter = this._converter;
                    converter && converter.convert(model);
                }
            }
        ]);
    }
    get _converter() {
        return this._converters.filter(x => x instanceof CrossTabConverter)[0];
    }
    condition(context) {
        return context instanceof XRPivotGridViewModel;
    }
}