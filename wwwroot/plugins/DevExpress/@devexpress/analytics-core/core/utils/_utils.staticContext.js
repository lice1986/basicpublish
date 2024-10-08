﻿/**
* DevExpress Analytics (core\utils\_utils.staticContext.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { calculateWithZoomFactor } from '../../accessibility/_internal';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { noDataText, searchPlaceholder, selectPlaceholder } from '../../property-grid/localization/_localization';
import { createGlobalModuleVariableFunc } from '../../serializer/_internal';
import { getParentContainer } from '../../widgets/_utils';
import { ajaxSetup } from '../internal/ajaxSetup';
import { guid } from '../../undo-engine/_utils';
import { getSizeFactor } from './_utils.sizeFactorType';
export const staticContext = {
    _static: {
        searchPlaceholder: () => searchPlaceholder(),
        selectPlaceholder: () => selectPlaceholder(),
        noDataText: () => noDataText(),
        ajaxSetup: ajaxSetup
    }
};
export const _defaultStaticContext = createGlobalModuleVariableFunc({});
export function appendStaticContextToRootViewModel(root, dx = staticContext, className) {
    if (dx)
        root.dx = Object.assign(Object.assign({}, dx), _defaultStaticContext());
    root.getLocalization = function () {
        return getLocalization.apply(root, arguments);
    };
    root.getPopupContainer = getParentContainer;
    root.calculateWithZoomFactor = calculateWithZoomFactor;
    root.containerClass = 'dx-designer-' + guid();
    root.surfaceClass = (el) => 'dx-designer-viewport dx-designer-viewport-' + getSizeFactor(el.clientWidth) +
        ' ' + (!getParentContainer(el, '.dx-theme-generic').length ? ' dx-theme-generic' : '') +
        ' ' + root.containerClass + (className ? ' ' + className : '');
}
