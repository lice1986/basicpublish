﻿/**
* DevExpress Analytics (core\widgets\_buttonInlineEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import registerComponent from 'devextreme/core/component_registrator';
import 'devextreme/ui/button';
import dxButton from 'devextreme/ui/button';
import { editor_template } from './_generateIconTemplate';
export class dxButtonWithTemplate extends dxButton {
    constructor(element, options) {
        options['template'] = editor_template;
        super(element, options);
    }
    _patchOptionValues(options) {
        const patchedOptions = super['_patchOptionValues'].call(this, options);
        const optionsToExtend = { iconClass: options['iconClass'] };
        patchedOptions.templateData = Object.assign(Object.assign({}, patchedOptions.templateData), optionsToExtend);
        return patchedOptions;
    }
}
export function InitButtonWithTemplate(element, options) {
    const button = new dxButtonWithTemplate(element, options);
    return () => button === null || button === void 0 ? void 0 : button.dispose();
}
registerComponent('dxButtonWithTemplate', dxButtonWithTemplate);
