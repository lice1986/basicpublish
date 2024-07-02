﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\symbology.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { defaultFrameOptionsSerializationInfo, frameOptionsMap } from '../metadata/properties/frameOptions';
import { createPaddingProperty } from '../utils/_paddingUtils';
class FrameOptionsModel extends SerializableModel {
    constructor(model, serializer, info, barCode) {
        super(model, serializer, info);
        if (this.padding) {
            createPaddingProperty(this, barCode);
        }
    }
}
export class BarCodeSymbology extends SerializableModel {
    constructor(model, serializer, info, barCode) {
        super(model, serializer, info);
        if (this.frameOptions) {
            this.frameOptions(this.createFrameOptions(this.frameOptions() || {}, barCode, serializer));
            this.frameOptionsFake = {
                type: ko.pureComputed({
                    read: () => {
                        return this.frameOptions()['name']();
                    },
                    write: (val) => {
                        var _a;
                        this.frameOptions && ((_a = this.frameOptions()) === null || _a === void 0 ? void 0 : _a.dispose());
                        this.frameOptions(this.createFrameOptions({ '@Name': val }, barCode, serializer));
                    }
                }),
                content: this.frameOptions,
                showClearButton: true
            };
            this._disposables.push(this.frameOptionsFake.type);
        }
    }
    createFrameOptions(model, barCode, serializer = null) {
        const frameOptionsInfo = frameOptionsMap[model['@Name']] || [defaultFrameOptionsSerializationInfo];
        return new FrameOptionsModel(model, serializer, frameOptionsInfo, barCode);
    }
    isPropertyDisabled(propertyName) {
        if (this.name() === 'DataBar')
            return propertyName == 'fNC1Substitute' && this['type']().indexOf('Expanded') === -1;
        return false;
    }
    dispose() {
        var _a;
        super.dispose();
        this.frameOptions && ((_a = this.frameOptions()) === null || _a === void 0 ? void 0 : _a.dispose());
    }
}
