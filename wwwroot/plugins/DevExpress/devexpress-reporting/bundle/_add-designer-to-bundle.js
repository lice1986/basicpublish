﻿/**
* DevExpress HTML/JS Reporting (bundle\_add-designer-to-bundle.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ChartInternal from '../scopes/reporting-chart-internal';
import * as ChartInternalAxis from '../scopes/reporting-chart-internal-axis';
import * as ChartInternalDataMembers from '../scopes/reporting-chart-internal-dataMembers';
import * as ChartInternalSeriesMetadata from '../scopes/reporting-chart-internal-series-metadata';
import * as ChartInternalModels from '../scopes/reporting-chart-internal-models';
import * as ChartInternalSeries from '../scopes/reporting-chart-internal-series';
import * as ChartInternalWidgets from '../scopes/reporting-chart-internal-widgets';
import * as DesignerControls from '../scopes/reporting-designer-controls';
import * as DesignerBandsMetadata from '../scopes/reporting-designer-bands-metadata';
import * as DesignerControlsMetadata from '../scopes/reporting-designer-controls-metadata';
import * as DesignerDataMetadata from '../scopes/reporting-designer-data-metadata';
import * as DesignerControlsPivotGridMetadata from '../scopes/reporting-designer-controls-pivotGrid-metadata';
import * as DesignerControlsCrossTabMetadata from '../scopes/reporting-designer-controls-crossTab-metadata';
import * as Designer from '../scopes/reporting-designer';
import * as DesignerActions from '../scopes/reporting-designer-actions';
import * as DesignerBandsInternal from '../scopes/reporting-designer-bands-internal';
import * as DesignerBands from '../scopes/reporting-designer-bands';
import * as DesignerControlsPivotGrid from '../scopes/reporting-designer-controls-pivotGrid';
import * as DesignerControlsCrossTab from '../scopes/reporting-designer-controls-crossTab';
import * as DesignerData from '../scopes/reporting-designer-data';
import * as DesignerInternal from '../scopes/reporting-designer-internal';
import * as DesignerInternalHtmlMarkUp from '../scopes/reporting-designer-internal-htmlMarkUp';
import * as DesignerLocalization from '../scopes/reporting-designer-localization';
import * as DesignerTools from '../scopes/reporting-designer-tools';
import * as DesignerUtils from '../scopes/reporting-designer-utils';
import * as DesignerSettings from '../scopes/reporting-designer-settings';
import * as DesignerWidgets from '../scopes/reporting-designer-widgets';
import * as DesignerWidgetsInternal from '../scopes/reporting-designer-widgets-internal';
import * as DesignerWizard from '../scopes/reporting-designer-wizard';
export function _addDesignerToBundle(bundle) {
    bundle.Reporting = bundle.Reporting || {};
    bundle.Reporting.Designer = Designer;
    bundle.Reporting.Chart = {};
    bundle.Reporting.Chart.Internal = ChartInternal;
    bundle.Reporting.Chart.Internal.Axis = ChartInternalAxis;
    bundle.Reporting.Chart.Internal.DataMembers = ChartInternalDataMembers;
    bundle.Reporting.Chart.Internal.Models = ChartInternalModels;
    bundle.Reporting.Chart.Internal.Series = ChartInternalSeries;
    bundle.Reporting.Chart.Internal.Series.Metadata = ChartInternalSeriesMetadata;
    bundle.Reporting.Chart.Internal.Widgets = ChartInternalWidgets;
    bundle.Reporting.Designer.Actions = DesignerActions;
    bundle.Reporting.Designer.Bands = DesignerBands;
    bundle.Reporting.Designer.Bands.Internal = DesignerBandsInternal;
    bundle.Reporting.Designer.Bands.Metadata = DesignerBandsMetadata;
    bundle.Reporting.Designer.Controls = DesignerControls;
    bundle.Reporting.Designer.Controls.Metadata = DesignerControlsMetadata;
    bundle.Reporting.Designer.Controls.PivotGrid = DesignerControlsPivotGrid;
    bundle.Reporting.Designer.Controls.PivotGrid.Metadata = DesignerControlsPivotGridMetadata;
    bundle.Reporting.Designer.Controls.CrossTab = DesignerControlsCrossTab;
    bundle.Reporting.Designer.Controls.CrossTabMetaData = DesignerControlsCrossTabMetadata;
    bundle.Reporting.Designer.Data = DesignerData;
    bundle.Reporting.Designer.Data.Metadata = DesignerDataMetadata;
    bundle.Reporting.Designer.Internal = DesignerInternal;
    bundle.Reporting.Designer.Internal.HtmlMarkUp = DesignerInternalHtmlMarkUp;
    bundle.Reporting.Designer.Localization = DesignerLocalization;
    bundle.Reporting.Designer.Tools = DesignerTools;
    bundle.Reporting.Designer.Utils = DesignerUtils;
    bundle.Reporting.Designer.Widgets = DesignerWidgets;
    bundle.Reporting.Designer.Widgets.Internal = DesignerWidgetsInternal;
    bundle.Reporting.Designer.Wizard = DesignerWizard;
    bundle.Reporting.Designer.Settings = DesignerSettings;
    return bundle;
}
