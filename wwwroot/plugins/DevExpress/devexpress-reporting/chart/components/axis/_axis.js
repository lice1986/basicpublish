﻿/**
* DevExpress HTML/JS Reporting (chart\components\axis\_axis.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export function initCollectionItem(item, parent) {
    return () => {
        item.parent = parent;
        item.innerActions = [
            {
                text: getLocalization('Remove', 'ReportStringId.UD_Capt_SpacingRemove'),
                imageClassName: 'dxrd-image-recycle-bin',
                imageTemplateName: 'dxrd-svg-operations-recycle_bin',
                disabled: ko.observable(false),
                visible: true,
                clickAction: () => { parent.remove(item); },
            }
        ];
    };
}