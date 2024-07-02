﻿/**
* DevExpress Analytics (widgets\expressioneditor\bindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { ExpressionEditor } from './expressioneditor';
import { addDisposeCallback } from '../../serializer/_internal';
ko.bindingHandlers['dxExpressionEditor'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        let $element = $.fn.constructor(element);
        $element.children().remove();
        const values = valueAccessor();
        $.fn.constructor(element).addClass(values.wrapper ? 'dx-expressioneditor-content' : 'dx-popup-general');
        const templateName = values.editorTemplateName || 'dx-expressioneditor';
        let optionSubscription = null;
        let editor = new ExpressionEditor(ko.unwrap(values.options), values.fieldListProvider, viewModel.disabled, $.fn.constructor(element).closest('.dx-rtl').length > 0, values.displayNameProvider, values.popupVisible, viewModel.editorInputId);
        if (ko.isSubscribable(values.options)) {
            optionSubscription = values.options.subscribe(newOptions => {
                newOptions && editor.koOptions(newOptions);
            });
        }
        values.wrapper && values.wrapper.editor(editor);
        const childContext = bindingContext.createChildContext(editor);
        const child = document.createElement('div');
        $element = $element.append(child);
        ko.renderTemplate(templateName, childContext, {}, child, 'replaceNode');
        const callback = () => {
            editor.dispose();
            editor = null;
            values.wrapper && values.wrapper.editor(null);
            optionSubscription && optionSubscription.dispose();
        };
        addDisposeCallback(element, callback);
        return { controlsDescendantBindings: true };
    }
};
