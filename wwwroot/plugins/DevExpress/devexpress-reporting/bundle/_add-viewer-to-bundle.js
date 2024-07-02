﻿/**
* DevExpress HTML/JS Reporting (bundle\_add-viewer-to-bundle.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as Reporting from '../scopes/reporting';
import * as Editing from '../scopes/reporting-editing';
import * as Export from '../scopes/reporting-export';
import * as ExportMetadata from '../scopes/reporting-export-metadata';
import * as Internal from '../scopes/reporting-internal';
import * as Metadata from '../scopes/reporting-metadata';
import * as Viewer from '../scopes/reporting-viewer';
import * as ViewerEditing from '../scopes/reporting-viewer-editing';
import * as ViewerExport from '../scopes/reporting-viewer-export';
import * as ViewerExportMetadata from '../scopes/reporting-viewer-export-metadata';
import * as ViewerInternal from '../scopes/reporting-viewer-internal';
import * as ViewerMobile from '../scopes/reporting-viewer-mobile';
import * as ViewerMobileInternal from '../scopes/reporting-viewer-mobile-internal';
import * as ViewerParameters from '../scopes/reporting-viewer-parameters';
import * as ViewerSettings from '../scopes/reporting-viewer-settings';
import * as ViewerUtils from '../scopes/reporting-viewer-utils';
import * as ViewerWidgets from '../scopes/reporting-viewer-widgets';
import * as ViewerWidgetsInternal from '../scopes/reporting-viewer-widgets-internal';
import { version } from '../dx-reporting-version';
export function _addViewerToBundle(bundle) {
    bundle.Reporting = Reporting;
    bundle.Reporting.Editing = Editing;
    bundle.Reporting.Export = Export;
    bundle.Reporting.Export.Metadata = ExportMetadata;
    bundle.Reporting.Internal = Internal;
    bundle.Reporting.Metadata = Metadata;
    bundle.Reporting.Viewer = Viewer;
    bundle.Reporting.Viewer.Editing = ViewerEditing;
    bundle.Reporting.Viewer.Export = ViewerExport;
    bundle.Reporting.Viewer.Export.Metadata = ViewerExportMetadata;
    bundle.Reporting.Viewer.Internal = ViewerInternal;
    bundle.Reporting.Viewer.Mobile = ViewerMobile;
    bundle.Reporting.Viewer.Mobile.Internal = ViewerMobileInternal;
    bundle.Reporting.Viewer.Parameters = ViewerParameters;
    bundle.Reporting.Viewer.Settings = ViewerSettings;
    bundle.Reporting.Viewer.Utils = ViewerUtils;
    bundle.Reporting.Viewer.Widgets = ViewerWidgets;
    bundle.Reporting.Viewer.Widgets.Internal = ViewerWidgetsInternal;
    bundle.Reporting.VERSION = version;
    return bundle;
}
