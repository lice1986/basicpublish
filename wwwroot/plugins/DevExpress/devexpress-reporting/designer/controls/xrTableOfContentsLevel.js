﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableOfContentsLevel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { recalculateUnit } from '../internal/_utils';
import { controlsFactory } from '../utils/settings';
import { levelDefaultHeight } from './defaultTableOfContentsLevelHeight';
import { tocTitleSerializationsInfo } from './metadata/xrTableOfContents';
import { tocLevelSerializationsInfo } from './metadata/xrTableOfContentsLevel';
import { XRControlSurfaceBase } from './xrControl';
import { createPaddingProperty } from './utils/_paddingUtils';
export class TableOfContentsLevel extends ElementViewModel {
    constructor(model, parent, serializer, isTitle = false) {
        super($.extend({ '@ControlType': 'TableOfContentsLevel', isTitle: isTitle }, model), parent, serializer);
        this.borderWidth = parent.borderWidth;
        this.borderColor = parent.borderColor;
        this.borders = parent.borders;
        this.dpi = parent.dpi;
        if (this.padding) {
            createPaddingProperty(this, parent);
        }
        this.borderDashStyle = parent.borderDashStyle;
        this.borderDefault = parent.borderDefault;
        this._disposables.push(this._levelIndex = ko.pureComputed(() => parent.allLevels().indexOf(this)));
        this._disposables.push(this._indentFactor = ko.pureComputed(() => recalculateUnit(60, this.parentModel().dpi())));
        this.indent = this.indent || ko.observable(0);
        this._disposables.push(this.left = ko.pureComputed({
            read: () => {
                if (!this.indent)
                    return 0;
                if (this.indent() !== null && this.indent() !== undefined)
                    return this.indent();
                return this._levelIndex() === 0 ? 0 : (this._levelIndex() - 1) * this._indentFactor();
            },
            write: $.noop
        }));
        this._disposables.push(this.width = ko.pureComputed({
            read: () => parent.size.width() - this.left(),
            write: $.noop
        }));
        this._disposables.push(this.name = ko.pureComputed(() => {
            if (this.isTitle)
                return null;
            if (this._levelIndex() == parent.allLevels().length - 1)
                return 'Level (Default)';
            return 'Level ' + this._levelIndex();
        }));
        this._disposables.push(this.top = ko.computed({
            read: () => {
                const previousLevel = parent.allLevels()[this._levelIndex() - 1];
                return previousLevel ? previousLevel.top() + previousLevel.height() : 0;
            },
            write: $.noop,
            deferEvaluation: true
        }));
        this.lockedInUserDesigner = parent.lockedInUserDesigner;
    }
    dispose() {
        super.dispose();
        this.parentModel(null);
    }
    static createNew(parent) {
        return new TableOfContentsLevel({ '@Height': recalculateUnit(levelDefaultHeight, parent.dpi()) }, parent);
    }
    preInitProperties(model) {
        this.isTitle = model.isTitle;
        delete model['isTitle'];
    }
    getInfo() {
        return this.isTitle ? tocTitleSerializationsInfo : tocLevelSerializationsInfo;
    }
    isPropertyModified(name) {
        return false;
    }
    getControlFactory() {
        return controlsFactory();
    }
    rtl() {
        return this.parentModel() && this.parentModel().rtl();
    }
}
TableOfContentsLevel.unitProperties = ['height', 'indent'];
export class TableOfContentsLevelSurface extends XRControlSurfaceBase {
    constructor(control, context) {
        super(control, context, TableOfContentsLevelSurface._unitProperties);
        this._leaderSymbolWidth = ko.pureComputed(() => {
            if (!TableOfContentsLevelSurface._$leaderSymbol)
                TableOfContentsLevelSurface._$leaderSymbol = $.fn.constructor('<span />').hide().appendTo('body');
            TableOfContentsLevelSurface._$leaderSymbol.html(this.getControlModel().leaderSymbol()).css(this.contentCss());
            return TableOfContentsLevelSurface._$leaderSymbol.width();
        });
        this.leaderSymbols = ko.pureComputed(() => {
            const elementWidth = this.contentWidthWithoutZoom();
            if (elementWidth <= 0 || this._leaderSymbolWidth() === 0)
                return '';
            const symbolsCount = elementWidth / this._leaderSymbolWidth();
            const symbol = this.getControlModel().leaderSymbol();
            const a = [];
            while (a.length < symbolsCount) {
                a.push(symbol);
            }
            return a.join('');
        });
        this._disposables.push(this.isIntersect = ko.computed(() => { return false; }));
        this._disposables.push(this.leaderSymbols);
        this.text = control.text;
        this.template = 'dxrd-table-of-contents-level';
    }
    resizable(resizeHandler, element) {
        return $.extend({}, resizeHandler, {
            handles: 's',
            $selectedNodes: $.fn.constructor(element),
            minimumHeight: 10
        });
    }
    rtlLayout() {
        return this._control.rtl();
    }
}
TableOfContentsLevelSurface._unitProperties = {
    _height: (o) => {
        return o.height;
    },
    _width: (o) => {
        return o.width;
    },
    _x: (o) => {
        return o.left;
    },
    _y: (o) => {
        return o.top;
    },
};