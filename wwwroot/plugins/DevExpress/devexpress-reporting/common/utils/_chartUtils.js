﻿/**
* DevExpress HTML/JS Reporting (common\utils\_chartUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export function getChartChildComponents(chartComponent, path, displayPath = '') {
    const result = [];
    if (chartComponent === null || chartComponent === void 0 ? void 0 : chartComponent.getChildComponents) {
        const childComponents = chartComponent.getChildComponents();
        childComponents.forEach(childComponent => {
            if (!childComponent.component)
                return;
            const currentPath = path ? `${path}.${childComponent.path}` : childComponent.path;
            const currentDisplayPath = displayPath ? `${displayPath}.${childComponent.path}` : childComponent.path;
            result.push(..._getChartSubComponents(childComponent.component, currentPath, currentDisplayPath));
        });
    }
    return result;
}
function _getChartSubComponents(component, path, displayPath) {
    const result = [];
    if (Array.isArray(component)) {
        component.forEach((element, index) => {
            result.push(..._getChartSubComponents(element, `${path}.${index}`, `${displayPath}.${ko.unwrap(element.name)}`));
        });
    }
    else {
        result.push({ component: component, path: path, displayPath: displayPath });
        result.push(...getChartChildComponents(component, path, displayPath));
    }
    return result;
}
