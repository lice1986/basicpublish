﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_subreportUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { collectionsVisitor } from '@devexpress/analytics-core/analytics-internal';
export function subreportControlCollector(target, subreportControls = []) {
    if (!target)
        return subreportControls;
    const visitor = (target) => {
        if (target.controlType === 'XRSubreport') {
            subreportControls.push(target);
            subreportControlCollector(target['reportSource'], subreportControls);
        }
    };
    visitor(target);
    collectionsVisitor(target, (collection) => {
        collection().forEach(visitor);
    }, ['controls', 'bands']);
    return subreportControls;
}
