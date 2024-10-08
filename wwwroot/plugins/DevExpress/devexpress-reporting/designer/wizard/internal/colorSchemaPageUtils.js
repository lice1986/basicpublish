﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\colorSchemaPageUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { currentMultiPlatformEngine } from '@devexpress/analytics-core/analytics-serializer-native';
import { colorFromString, colorToString, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export class ColorScheme {
    constructor(name, localizationId, baseColor) {
        this._isCustom = false;
        this.name = name;
        this.localizationId = localizationId;
        this.baseColor = baseColor;
        this.color = currentMultiPlatformEngine.unwrap(colorFromString(baseColor));
        this.displayName = getLocalization(this.name, this.localizationId);
        this.selected = ko.observable(false);
    }
}
export class CustomColorScheme extends ColorScheme {
    constructor(name, localizationId, baseColor) {
        super(name, localizationId, baseColor);
        this.color = colorFromString(baseColor);
        this.editorColor = ko.observable(this.color());
        this.popoverVisible = ko.observable(false);
    }
    applyColor() {
        this.color(this.editorColor());
        this.baseColor = colorToString(this.editorColor());
        this.popoverVisible(false);
    }
    resetColor() {
        this.editorColor(this.color());
        this.popoverVisible(false);
    }
}
