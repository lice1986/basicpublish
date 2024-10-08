﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_ko_bindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { addDisposeCallback } from '@devexpress/analytics-core/analytics-internal-native';
import { getTemplate } from '@devexpress/analytics-core/analytics-utils-native';
import { Painter } from './_painter';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { PictureEditorModel } from './_pictureEditorModel';
ko.bindingHandlers['dxPainter'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const options = valueAccessor();
        $.fn.constructor(element).children().remove();
        const templateHtml = getTemplate('dx-painter');
        const $element = $.fn.constructor(element).append(templateHtml);
        const child = $element.children()[0];
        const model = new Painter(child, options);
        options.setPainter(model);
        addDisposeCallback(element, function () {
            model.dispose();
            options.setPainter(null);
        });
        ko.applyBindings(model.getViewModel(), child);
        return { controlsDescendantBindings: true };
    }
};
ko.bindingHandlers['dxPictureEditor'] = {
    init: function (element, valueAccessor) {
        const viewModel = valueAccessor();
        $.fn.constructor(element).children().remove();
        const templateHtml = getTemplate('dx-picture-editing');
        const $element = $.fn.constructor(element).append(templateHtml);
        const child = $element.children()[0];
        const model = viewModel.getModel();
        const pictureEditorModel = new PictureEditorModel(model, child);
        model._setPictureEditor && model._setPictureEditor(pictureEditorModel);
        ko.cleanNode(child);
        ko.applyBindings(pictureEditorModel.getViewModel(), child);
        addDisposeCallback(element, function () {
            pictureEditorModel.dispose();
            model._setPictureEditor && model._setPictureEditor(null);
        });
        return { controlsDescendantBindings: true };
    }
};
