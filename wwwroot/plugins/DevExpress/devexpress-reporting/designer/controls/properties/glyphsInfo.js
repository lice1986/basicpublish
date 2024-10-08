﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\glyphsInfo.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Size } from '@devexpress/analytics-core/analytics-elements';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { ImageSource } from '../../../common/imageSource';
import { GlyphStyle } from '../../../viewer/editing/models/checkEditingField';
export function getDefaultCheckSize(checkState = GlyphStyle.StandardBox1) {
    if (checkState === GlyphStyle.StandardBox1)
        return new Size(13, 13);
    else
        return new Size(16, 16);
}
export function _getCustomGlyphsInfo(type) {
    return {
        propertyName: type,
        modelName: '@' + type,
        editor: { header: 'dxrd-image-loadfile', editorType: Editor },
        displayName: type,
        localizationId: 'DevExpress.XtraReports.UI.CheckBoxGlyphs.' + type,
        from: val => ko.observable(ImageSource.parse(val)),
        toJsonObject: ImageSource.toString,
        defaultVal: null
    };
}
