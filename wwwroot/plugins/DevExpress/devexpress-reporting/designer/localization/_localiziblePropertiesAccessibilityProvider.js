﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localiziblePropertiesAccessibilityProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PropertiesAccessibilityProvider } from '@devexpress/analytics-core/analytics-internal';
export class LocaliziblePropertiesAccessibilityProvider extends PropertiesAccessibilityProvider {
    constructor(isDefaultLanguage) {
        super();
        this.isDefaultLanguage = isDefaultLanguage;
    }
    isPropertyVisible(editor) {
        const visible = super.isPropertyVisible(editor);
        if (visible) {
            if (!this.isDefaultLanguage()) {
                const info = editor._get('info');
                const hasLocalizedChild = () => info.info && info.info.length != 0 && info.info.filter(childProperty => !!childProperty.localizable).length != 0;
                return !!info.localizable || hasLocalizedChild() || this._hasLocalizedParent(editor._get('_parent'));
            }
        }
        return visible;
    }
    _hasLocalizedParent(parent) {
        if (!parent)
            return false;
        if (parent._get('info').localizable)
            return true;
        return this._hasLocalizedParent(parent._get('_parent'));
    }
}
