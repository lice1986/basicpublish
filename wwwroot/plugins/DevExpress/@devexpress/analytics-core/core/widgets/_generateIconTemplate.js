﻿/**
* DevExpress Analytics (core\widgets\_generateIconTemplate.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { getTemplate } from '../../property-grid/widgets/templateUtils';
export const generateIconTemplate = (iconClass) => {
    return {
        render: function (options) {
            const $icon = $.fn.constructor('<i />').addClass('dx-icon');
            if (!!iconClass) {
                $icon.addClass(iconClass);
                $icon.addClass('dx-icon-' + iconClass);
                $icon.addClass('dx-icon-dxrd');
            }
            else if (!!options.model.icon) {
                $icon.addClass(options.model.icon);
            }
            if (options.model.icon) {
                $icon.html(getTemplate(options.model.icon));
            }
            const icon = $icon.get(0);
            $.fn.constructor(options.container).append(icon);
            if (options.model.text) {
                const $span = $.fn.constructor('<span />').addClass('dx-button-text');
                $span.text(options.model.text);
                $.fn.constructor(options.container).append($span);
            }
        }
    };
};
export const editor_template = {
    render: function (options) {
        generateIconTemplate(options.model.iconClass).render(options);
    }
};
