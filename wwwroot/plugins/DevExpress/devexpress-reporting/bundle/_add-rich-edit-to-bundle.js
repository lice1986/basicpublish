﻿/**
* DevExpress HTML/JS Reporting (bundle\_add-rich-edit-to-bundle.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as DesignerControlsRichEdit from '../scopes/reporting-designer-controls-richEdit';
import * as DesignerControlsRichEditInternal from '../scopes/reporting-designer-controls-richEdit-internal';
import * as DesignerControlsRichEditInternalToolbar from '../scopes/reporting-designer-controls-richEdit-internal-toolbar';
export function _addRichToBundle(bundle) {
    bundle.Reporting.Designer.Controls.RichEdit = DesignerControlsRichEdit;
    bundle.Reporting.Designer.Controls.RichEdit.Internal = DesignerControlsRichEditInternal;
    bundle.Reporting.Designer.Controls.RichEdit.Internal.Toolbar = DesignerControlsRichEditInternalToolbar;
    return bundle;
}
