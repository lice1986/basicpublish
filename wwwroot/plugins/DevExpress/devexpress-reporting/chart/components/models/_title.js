﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_title.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend, getUniqueName, guid } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { wordWrap } from '../../../designer/controls/metadata/properties/metadata';
import { enableAntialiasing } from '../../internal/meta/_chart';
import { font18, textColor, titleAlignment, visibility } from '../../internal/meta/_common';
import { ChartElementCollectionItemBase } from '../../internal/_elementCollection';
import { createInnerActionsWithPopover } from '../../internal/_utils';
export class TitleViewModel extends ChartElementCollectionItemBase {
    constructor() {
        super(...arguments);
        this.name = ko.observable(TitleViewModel.prefix);
    }
    static from(model, serializer) {
        return new TitleViewModel(model || {}, null, serializer);
    }
    getExpressionProperties() {
        return ['Text'];
    }
    getInfo() {
        return titleSerializationsInfo;
    }
}
TitleViewModel.prefix = 'Title';
export class ChartViewTitleModel extends TitleViewModel {
    getInfo() {
        return chartViewTitleSerializationsInfo;
    }
}
export function assignTitleActions(titles) {
    const addTitle = (model) => {
        model['@TitleID'] = getUniqueName(titles().map(x => { return x.titleID(); }), '');
        titles()['innerActions'][0].closePopover();
        titles.push(new TitleViewModel(model, titles));
    };
    const actions = [
        {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-top_left',
            imageTemplateName: 'dxrd-svg-titles-top_left',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Alignment': 'Near' }); }
        }, {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-top_center',
            imageTemplateName: 'dxrd-svg-titles-top_center',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Alignment': 'Center' }); }
        }, {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-top_right',
            imageTemplateName: 'dxrd-svg-titles-top_right',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Alignment': 'Far' }); }
        }, {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-right_top_vertical',
            imageTemplateName: 'dxrd-svg-titles-right_top_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Dock': 'Right', '@Alignment': 'Near' }); }
        }, {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-right_center_vertical',
            imageTemplateName: 'dxrd-svg-titles-right_center_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Dock': 'Right', '@Alignment': 'Center' }); }
        }, {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-right_bottom_vertical',
            imageTemplateName: 'dxrd-svg-titles-right_bottom_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Dock': 'Right', '@Alignment': 'Far' }); }
        }, {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-bottom_left',
            imageTemplateName: 'dxrd-svg-titles-bottom_left',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Dock': 'Bottom', '@Alignment': 'Near' }); }
        }, {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-bottom_center',
            imageTemplateName: 'dxrd-svg-titles-bottom_center',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Dock': 'Bottom', '@Alignment': 'Center' }); }
        }, {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-bottom_right',
            imageTemplateName: 'dxrd-svg-titles-bottom_right',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Dock': 'Bottom', '@Alignment': 'Far' }); }
        }, {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-left_bottom_vertical',
            imageTemplateName: 'dxrd-svg-titles-left_bottom_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Dock': 'Left', '@Alignment': 'Near' }); }
        }, {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-left_center_vertical',
            imageTemplateName: 'dxrd-svg-titles-left_center_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Dock': 'Left', '@Alignment': 'Center' }); }
        }, {
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-left_top_vertical',
            imageTemplateName: 'dxrd-svg-titles-left_top_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => { addTitle({ '@Dock': 'Left', '@Alignment': 'Far' }); }
        }
    ];
    titles()['innerActions'] = createInnerActionsWithPopover(getLocalization('Add', 'ChartStringId.MenuItemAdd'), 'addtitles-action_' + guid(), actions);
}
const dock = {
    propertyName: 'dock', modelName: '@Dock', displayName: 'Dock', defaultVal: 'Top', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Top', displayValue: 'Top', localizationId: 'DevExpress.XtraReports.UI.XRDockStyle.Top' }, { value: 'Bottom', displayValue: 'Bottom', localizationId: 'DevExpress.XtraReports.UI.XRDockStyle.Bottom' }, { value: 'Left', displayValue: 'Left', localizationId: 'DevExpress.XtraReports.UI.XRControl.Left' }, { value: 'Right', displayValue: 'Right', localizationId: 'DevExpress.XtraCharts.RectangleIndents.Right' }],
    localizationId: 'DevExpress.XtraCharts.DockableTitle.Dock'
};
export const defaultChartTitleText = 'Chart Title';
const indent = { propertyName: 'indent', modelName: '@Indent', displayName: 'Indent', defaultVal: 5, editor: editorTemplates.getEditor('numeric'), localizationId: 'TO DO', editorOptions: { min: 0, max: 1000 } };
const titleWordWrap = extend(true, {}, wordWrap, { defaultVal: false });
const titleID = { propertyName: 'titleID', modelName: '@TitleID' };
const chartTitleTextInfo = { propertyName: 'text', modelName: '@Text', localizable: true, displayName: 'Text', editor: editorTemplates.getEditor('text'), localizationId: 'ASPxReportsStringId.ExportName_txt', defaultVal: defaultChartTitleText };
const chartViewTitleTextInfo = extend(true, {}, chartTitleTextInfo, { defaultVal: '{S}' });
const titleSerializationsInfoBase = [titleID, textColor, dock, enableAntialiasing, indent, titleAlignment, visibility, titleWordWrap, font18];
export const chartViewTitleSerializationsInfo = [chartViewTitleTextInfo].concat(titleSerializationsInfoBase);
export const titleSerializationsInfo = [chartTitleTextInfo].concat(titleSerializationsInfoBase);
