﻿/**
* DevExpress Analytics (widgets\formatstring\binding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { FormatStringEditor } from './formatstringeditor';
import { addDisposeCallback } from '../../serializer/_internal';
import { getTemplate } from '../../property-grid/widgets/templateUtils';
ko.bindingHandlers['dxFormatEditor'] = {
    init: function (element, valueAccessor) {
        $.fn.constructor(element).children().remove();
        $.fn.constructor(element).addClass('dx-popup-general');
        const templateHtml = getTemplate('dx-format-string'), $element = $.fn.constructor(element).append(templateHtml), values = valueAccessor();
        const formatEditor = new FormatStringEditor(values.value, values['disabled'], values['standardPatterns'], values['customPatterns'], values['actions'], values['rtl'], values['popupContainer']);
        ko.applyBindings(formatEditor, $element.children()[0]);
        addDisposeCallback(element, function () {
            formatEditor.dispose();
        });
        return { controlsDescendantBindings: true };
    }
};