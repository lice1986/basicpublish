﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_displayNameBindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { addDisposeCallback, DisplayExpressionConverter } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ValueConverter } from './_htmlMarkUpConverter';
ko.bindingHandlers['controlDisplayName'] = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const value = valueAccessor(), surface = ko.unwrap(value);
        const parameters = surface.displayNameParameters();
        const setElementText = (value) => $.fn.constructor(element).text(value ? ('[' + value + ']') : '');
        if (parameters.isExpression) {
            $.fn.constructor(element).text(parameters.text);
            const expressionConverter = new DisplayExpressionConverter(bindingContext.$root.displayNameProvider());
            expressionConverter.toDisplayExpression(parameters.dataMember, parameters.text).done(result => {
                $.fn.constructor(element).text(result);
            });
        }
        else if (parameters.dataMember) {
            setElementText(parameters.dataMember);
            bindingContext.$root.displayNameProvider()
                .getDisplayName(parameters.dataSource, parameters.dataMember, parameters.dataMemberOffset, false)
                .done(data => setElementText(data))
                .fail(() => setElementText(parameters.dataMember));
        }
        else {
            if (!parameters.allowMarkupText) {
                $.fn.constructor(element).text(parameters.text || '');
            }
            else {
                new ValueConverter(parameters).appendTo(element);
            }
        }
    }
};
ko.bindingHandlers['displayNameExtender'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const value = ko.unwrap(valueAccessor());
        const displayName = ko.observable('');
        const displayNameLoader = ko.computed(() => {
            const getDataMember = () => {
                return ko.isSubscribable(value.dataMember) ? value.dataMember() : (value.getDataMember && value.getDataMember());
            };
            const getDataSource = () => {
                return ko.isSubscribable(value.dataSource) ? value.dataSource() : (value.getDataSource && value.getDataSource() || undefined);
            };
            const getPath = () => {
                return ko.isSubscribable(value.path) ? value.path() : (value.getPath && value.getPath());
            };
            const displayNameProvider = bindingContext.$root.displayNameProvider.peek();
            if (getDataMember() && displayNameProvider) {
                const promise = getPath() ? displayNameProvider.getDisplayNameByPath(getPath(), getDataMember()) :
                    displayNameProvider.getDisplayName(getDataSource(), getDataMember(), value.dataMemberOffset, value.includeDataSourceName);
                promise.done(data => displayName(data))
                    .fail(() => displayName(ko.unwrap(value.dataMember)));
            }
            else {
                displayName('');
            }
        }).extend({ rateLimit: 0 });
        addDisposeCallback(element, function () {
            displayNameLoader.dispose();
        });
        bindingContext.$data.$displayName = displayName;
        ko.applyBindingsToDescendants(bindingContext, element);
        return { controlsDescendantBindings: true };
    }
};
ko.virtualElements.allowedBindings['displayNameExtender'] = true;
