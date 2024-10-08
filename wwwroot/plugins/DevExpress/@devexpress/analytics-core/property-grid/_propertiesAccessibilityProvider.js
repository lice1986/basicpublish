﻿/**
* DevExpress Analytics (property-grid\_propertiesAccessibilityProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { koUtils } from '../core/utils/_koUtils';
export class PropertiesAccessibilityProvider {
    isPropertyVisible(editor) {
        if (!editor._get('_model'))
            return false;
        const model = editor._get('_model');
        let visible = model.isPropertyVisible ? model.isPropertyVisible(editor.name) : true;
        if (visible) {
            visible = this._calculateAccessibilityByPropertyInfo(model, editor._get('info').visible, true);
        }
        return visible;
    }
    isPropertyDisabled(editor) {
        if (!editor._get('_model'))
            return true;
        const model = editor._get('_model');
        return model.isPropertyDisabled && model.isPropertyDisabled(editor.name) || this._calculateAccessibilityByPropertyInfo(model, editor._get('info').disabled, false);
    }
    _calculateAccessibilityByPropertyInfo(model, propertyInfo, defaultValue) {
        let result;
        if (koUtils.isSubscribable(propertyInfo)) {
            result = propertyInfo();
        }
        else if (typeof propertyInfo === 'function') {
            result = propertyInfo(model);
        }
        else {
            result = propertyInfo !== undefined ? propertyInfo : defaultValue;
        }
        return result;
    }
}
export const defaultAccessibilityProvider = new PropertiesAccessibilityProvider();
