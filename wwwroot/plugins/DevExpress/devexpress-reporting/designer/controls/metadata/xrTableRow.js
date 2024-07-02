﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTableRow.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { accessibleDescription, accessibleRole, cells, defaultAccessibleRole, keepTogether, textAlignment } from './properties/metadata';
import { commonControlProperties, fontGroup } from './properties/metadataGroups';
import { controlScripts } from './properties/scriptMetadata';
import { weight } from './xrTableCell';
const accessibleRoleRow = extend({}, accessibleRole, { valuesArray: [
        defaultAccessibleRole,
        { value: 'TableHeaderRow', displayValue: 'Table Header Row', localizationId: 'DevExpress.XtraReports.UI.XRAccessibleRole.TableHeaderRow' }
    ] });
export const tableRowSerializationsInfo = [
    accessibleRoleRow,
    weight, textAlignment, keepTogether, controlScripts,
    { propertyName: 'height', displayName: 'Height', localizationId: 'DevExpress.XtraReports.UI.XRControl.Height' },
    cells,
].concat(commonControlProperties, fontGroup).filter(x => x != accessibleDescription);