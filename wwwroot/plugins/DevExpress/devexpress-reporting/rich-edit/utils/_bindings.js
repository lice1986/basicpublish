﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_bindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { addDisposeCallback } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { getTemplate } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { XRRichEditControlModel } from './_model';
export class RichEditVirtualScroll extends Disposable {
    constructor() {
        super(...arguments);
        this.items = [];
    }
    dispose() {
        super.dispose();
        this._viewPort = null;
        this.items = [];
    }
    registerViewPort(viewPort) {
        this._viewPort = viewPort;
        const updateRich = () => this.updateRichPosition();
        this._viewPort.addEventListener('scroll', updateRich, true);
        this._disposables.push({
            dispose: () => this._viewPort.removeEventListener('scroll', updateRich, true)
        });
    }
    registerRichEditControl(element, model) {
        this.isDisposing = false;
        if (!this._viewPort) {
            this.registerViewPort($.fn.constructor(element).closest('.dxrd-viewport')[0]);
        }
        const richItem = { element, model };
        this.updateRich(richItem, this._viewPort.getBoundingClientRect());
        this.items.push(richItem);
        this._disposables.push(model.visible.subscribe((newVal) => this.updateRich(richItem, this._viewPort.getBoundingClientRect())));
    }
    unregisterRichEditControl(element) {
        let currentIndex = -1;
        this.items.some((x, index) => {
            if (x.element === element) {
                currentIndex = index;
                return true;
            }
            return false;
        });
        if (currentIndex !== -1)
            this.items.splice(currentIndex, 1);
        if (this.items.length === 0)
            this.dispose();
    }
    updateRich(item, viewPortRect) {
        let currentHeight = Math.min(item.element.clientHeight, this._viewPort.clientHeight);
        if (!item.model.visible()) {
            const elementRect = item.element.getBoundingClientRect();
            let newVerticalScrollOffset = viewPortRect.top - elementRect.top;
            if (elementRect.bottom - viewPortRect.top < 0 || elementRect.top > viewPortRect.bottom) {
                currentHeight = 0;
                newVerticalScrollOffset = 0;
            }
            if (item.model._richHeight != currentHeight || item.model._verticalScrollOffset != newVerticalScrollOffset) {
                item.model.setRichHeight(currentHeight);
                item.model._verticalScrollOffset = newVerticalScrollOffset;
                item.model.updateCanvasScroll();
            }
        }
        else {
            item.model.setRichHeight(null);
            item.model._verticalScrollOffset = 0;
            item.model.updateCanvasScroll();
        }
    }
    updateRichPosition() {
        const viewPortRect = this._viewPort.getBoundingClientRect();
        this.items.forEach(x => this.updateRich(x, viewPortRect));
    }
}
const virtualScroll = new RichEditVirtualScroll();
ko.bindingHandlers['dxRichSurface'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $.fn.constructor(element).children().remove();
        const model = viewModel;
        if (model.controller && model.controller.richEdit) {
            const _richElement = model.controller.richEdit._element;
            if (ko.dataFor(_richElement) && document.getElementById(_richElement.id)) {
                $.fn.constructor(element).closest('.dxrd-control').css('display', 'none');
            }
            else {
                $.fn.constructor(element).append(_richElement);
                ko.applyBindings(model.controller.richEdit, _richElement);
                virtualScroll.registerRichEditControl(_richElement, model.controller.richEdit);
                addDisposeCallback(element, () => {
                    virtualScroll.unregisterRichEditControl(_richElement);
                });
            }
        }
        else {
            const editorOptions = valueAccessor();
            const templateHtml = getTemplate('dxrd-rich-edit');
            const inlineControl = editorOptions.inlineEdit;
            const richElement = $.fn.constructor(element).append(templateHtml).children()[0];
            const richEditModel = new XRRichEditControlModel(richElement, inlineControl, model.selected);
            model.createController(richEditModel);
            ko.applyBindings(richEditModel, richElement);
            virtualScroll.registerRichEditControl(richElement, richEditModel);
            addDisposeCallback(element, () => {
                virtualScroll.unregisterRichEditControl(richElement);
            });
        }
        return { controlsDescendantBindings: true };
    }
};