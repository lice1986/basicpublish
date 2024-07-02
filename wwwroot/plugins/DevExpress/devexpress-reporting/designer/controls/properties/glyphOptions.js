﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\glyphOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { GlyphStyle } from '../../../viewer/editing/models/checkEditingField';
import { glyphOptionsSerializationInfo } from '../metadata/properties/glyphOptions';
import { getDefaultCheckSize } from './glyphsInfo';
export class GlyphOptions extends Disposable {
    constructor(model, serializer) {
        super();
        this.getInfo = ko.observable(glyphOptionsSerializationInfo);
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model || {});
        let _currentCheckState = GlyphStyle[this.style()];
        this._disposables.push(this.style.subscribe((newStyle) => {
            if (newStyle) {
                const oldDefSize = getDefaultCheckSize(_currentCheckState);
                const newDefSize = getDefaultCheckSize(GlyphStyle[newStyle]);
                _currentCheckState = GlyphStyle[newStyle];
                if (oldDefSize.height() === this.size.height()) {
                    this.size.height(newDefSize.height());
                }
                if (oldDefSize.width() === this.size.width()) {
                    this.size.width(newDefSize.width());
                }
            }
        }));
    }
}
GlyphOptions.unitProperties = ['size'];
