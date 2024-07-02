﻿/**
* DevExpress Analytics (property-grid\widgets\collectioneditor\_bindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { CollectionEditorViewModel, wrapOptions } from './_editor';
import { addDisposeCallback } from '../../../serializer/_internal';
import { getTemplate } from '../templateUtils';
import { wrapModelWithKo } from './_ko_model';
import { Editor } from '../editor';
ko.bindingHandlers['dxCollectionEditor'] = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        const options = valueAccessor();
        let engineType = 'multiplatform';
        if (viewModel && !(viewModel instanceof Editor) && viewModel.getModel) {
            engineType = viewModel.getModel()._engineType;
        }
        const collectionEditorModel = engineType === 'multiplatform' ?
            wrapModelWithKo(valueAccessor(), viewModel) :
            new CollectionEditorViewModel(wrapOptions(viewModel)), templateHtml = getTemplate(options.editorTemplate || '#dx-collectioneditor'), $templateHtml = $.fn.constructor(templateHtml), info = ko.unwrap(options.info), itemTemplateName = info && info['template'] || options.template;
        if (itemTemplateName) {
            const itemTemplateHtml = getTemplate(itemTemplateName);
            $templateHtml.find('.dx-collection-item').append($.fn.constructor(itemTemplateHtml));
        }
        else {
            $templateHtml.find('.dx-collection-item').append($.fn.constructor(element).children());
        }
        const $element = $.fn.constructor(element).append($templateHtml);
        const childContext = bindingContext.createChildContext(collectionEditorModel.getViewModel());
        ko.applyBindings(childContext, $element.children()[0]);
        addDisposeCallback(element, () => {
            collectionEditorModel.dispose();
        });
        return { controlsDescendantBindings: true };
    }
};
