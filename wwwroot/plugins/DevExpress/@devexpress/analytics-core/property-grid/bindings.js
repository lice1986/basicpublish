﻿/**
* DevExpress Analytics (property-grid\bindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { ObjectProperties } from './propertygrid';
import { addDisposeCallback } from '../serializer/_internal';
import { globalResolver } from './internal/_codeResolver';
import { selectPlaceholder, noDataText } from './localization/_localization';
import { getLocalization } from './localization/localization_utils';
import dxScrollView from 'devextreme/ui/scroll_view';
import { getTemplate } from './widgets/templateUtils';
import { InitAccordion } from './bindings.accordion';
ko.bindingHandlers['dxPropertyGrid'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $.fn.constructor(element).children().remove();
        const templateHtml = getTemplate('dx-propertieseditor'), $element = $.fn.constructor(element).append(templateHtml);
        const value = valueAccessor();
        const model = new ObjectProperties(value.target, value.editorsInfo, value.level, value.parentDisabled, value.recreateEditors, value.textToSearch);
        element.setAttribute('role', 'tree');
        ko.applyBindings(bindingContext.createChildContext(model.getViewModel()), $element.children()[0]);
        addDisposeCallback(element, function () {
            model.dispose();
        });
        return { controlsDescendantBindings: true };
    }
};
ko.virtualElements.allowedBindings['lazy'] = true;
ko.bindingHandlers['lazy'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        let parsedBindings = valueAccessor();
        const resolver = parsedBindings.resolver || globalResolver;
        const isResolved = parsedBindings.isResolved;
        if (parsedBindings.innerBindings) {
            parsedBindings = parsedBindings.innerBindings;
        }
        let isDisposed = false;
        let tasks = [];
        $.each(parsedBindings, (innerBindingKey, innerBindingParameters) => {
            const innerBinding = ko.bindingHandlers[innerBindingKey];
            tasks.push(resolver.execute(() => {
                if (!isDisposed) {
                    let isInitialized = false;
                    ko.computed({
                        read: () => {
                            if (!isInitialized && innerBinding.init) {
                                innerBinding.init(element, () => { return innerBindingParameters; }, allBindings, viewModel, bindingContext);
                                isInitialized = true;
                            }
                            if (innerBinding.update) {
                                innerBinding.update(element, () => { return innerBindingParameters; }, allBindings, viewModel, bindingContext);
                            }
                        },
                        disposeWhenNodeIsRemoved: element
                    });
                    isResolved && isResolved(true);
                }
            }, 1));
        });
        addDisposeCallback(element, function () {
            isDisposed = true;
            tasks.forEach(x => x.dispose());
            tasks = [];
        });
        return { controlsDescendantBindings: true };
    }
};
ko.bindingHandlers['dxdAccordion'] = {
    init: function (element, valueAccessor) {
        const disposeCallback = InitAccordion(element, valueAccessor());
        addDisposeCallback(element, disposeCallback);
    }
};
ko.bindingHandlers['dxdAccordionExt'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const options = valueAccessor(), $element = $.fn.constructor(element), scrollUpdateCallback = () => {
            const $scroll = $element.parents('.dx-scrollview');
            if ($scroll.length > 0) {
                const scrollView = dxScrollView.getInstance($scroll.get(0));
                scrollView && scrollView['update']();
            }
        }, $accordionContent = $element.find('.dx-accordion-content').first();
        let accordionContentHTML = null;
        if (options.collapsed && options.lazyContentRendering === true) {
            accordionContentHTML = $accordionContent.html();
            $accordionContent.empty();
        }
        const onCollapsedChanged = (newVal) => {
            if (newVal) {
                $accordionContent.slideUp(options.timeout, () => {
                    scrollUpdateCallback();
                });
            }
            else {
                if (accordionContentHTML) {
                    $accordionContent.html(accordionContentHTML);
                    ko.applyBindingsToDescendants(bindingContext, $accordionContent.get(0));
                    accordionContentHTML = null;
                }
                $accordionContent.slideDown(options.timeout, () => {
                    scrollUpdateCallback();
                });
            }
        };
        if (ko.isSubscribable(options.collapsed)) {
            const subscription = options.collapsed.subscribe((newVal) => onCollapsedChanged(newVal));
            addDisposeCallback(element, () => subscription.dispose());
        }
        else if (options['setCollapsedChangedEvent']) {
            const dispose = options.setCollapsedChangedEvent((newVal) => onCollapsedChanged(newVal));
            addDisposeCallback(element, () => dispose());
        }
        else {
            throw Error('Not working!');
        }
        options.collapsed ? $accordionContent.hide() : $accordionContent.show();
    }
};
ko.bindingHandlers['dxLocalizedSelectBox'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const options = valueAccessor();
        const prevDisplayExpr = options.displayExpr;
        options['placeholder'] = options['placeholder'] || selectPlaceholder();
        options['noDataText'] = options['noDataText'] || noDataText();
        options['encodeNoDataText'] = true;
        options.displayExpr = function (value) {
            if (!value)
                return value;
            if (!prevDisplayExpr)
                return getLocalization(value, value.localizationId);
            return getLocalization($.isFunction(prevDisplayExpr) ? prevDisplayExpr(value) : value[prevDisplayExpr], value.localizationId);
        };
        options.itemTemplate = function (itemData, itemIndex, itemElement) {
            const context = bindingContext.createChildContext({
                display: options.displayExpr(itemData)
            });
            $.fn.constructor(itemElement).children().remove();
            const templateHtml = getTemplate('item-with-title'), $element = $.fn.constructor(itemElement).append(templateHtml);
            ko.applyBindingsToDescendants(context, $element[0]);
            return itemElement;
        };
        if (options.useLocalizedTextAsValue) {
            options.valueExpr = options.displayExpr;
        }
        const extendedOptions = viewModel.getOptions ? viewModel.getOptions(options) : options;
        ko.bindingHandlers['dxSelectBox'].init(element, () => { return extendedOptions; }, allBindings, viewModel, bindingContext);
        return { controlsDescendantBindings: true };
    }
};
ko.bindingHandlers['styleunit'] = {
    'update': function (element, valueAccessor) {
        const value = ko.utils.unwrapObservable(valueAccessor() || {});
        $.each(value, (styleName, styleValue) => {
            styleValue = ko.utils.unwrapObservable(styleValue) || 0;
            element.style[styleName] = styleValue + 'px';
        });
    }
};
ko.bindingHandlers['service'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const value = ko.unwrap(valueAccessor() || {}), findService = (serviceName) => {
            if (!!viewModel[serviceName]) {
                return viewModel[serviceName];
            }
            const context = bindingContext.$parents.filter((item) => { return item[serviceName] !== undefined; })[0];
            if (context) {
                return context[serviceName];
            }
            return null;
        }, service = findService(value.name), entity = service && service(viewModel);
        if (entity) {
            const childContext = bindingContext.createChildContext(entity.data);
            ko.renderTemplate(entity.templateName, childContext, {}, element, 'replaceNode');
        }
    }
};
