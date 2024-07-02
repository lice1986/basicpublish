﻿/**
* DevExpress Analytics (core\widgets\textAlignmentEditor\_binding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { TextAlignmentModel } from './_textAlignmentEditor';
import { getTemplate } from '../../../property-grid/widgets/templateUtils';
import { addDisposeCallback } from '../../../serializer/_internal';
ko.bindingHandlers['dxTextAlignmentEditor'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $.fn.constructor(element).children().remove();
        const templateHtml = getTemplate('dxrd-textalignment-editor'), $element = $.fn.constructor(element).append(templateHtml);
        const model = new TextAlignmentModel(valueAccessor());
        ko.applyBindings({ value: model }, $element.children()[0]);
        addDisposeCallback(element, () => model.dispose());
        return { controlsDescendantBindings: true };
    }
};