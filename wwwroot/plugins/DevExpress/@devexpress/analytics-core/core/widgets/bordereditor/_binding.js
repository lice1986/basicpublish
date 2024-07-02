﻿/**
* DevExpress Analytics (core\widgets\bordereditor\_binding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { BordersModel } from './_bordereditor';
import { getTemplate } from '../../../property-grid/widgets/templateUtils';
import { addDisposeCallback } from '../../../serializer/_internal';
ko.bindingHandlers['dxBorderEditor'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $.fn.constructor(element).children().remove();
        const templateHtml = getTemplate('dxrd-bordereditor'), $element = $.fn.constructor(element).append(templateHtml);
        const model = new BordersModel(valueAccessor());
        ko.applyBindings({ value: model }, $element.children()[0]);
        addDisposeCallback(element, () => model.dispose());
        return { controlsDescendantBindings: true };
    }
};
