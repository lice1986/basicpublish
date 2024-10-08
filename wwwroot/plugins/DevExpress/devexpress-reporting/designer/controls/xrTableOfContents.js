﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableOfContents.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createObservableArrayMapCollection } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { TableOfContentLocalizationProvider } from './utils/_localizationUtils';
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { XRReportElementViewModel } from './xrReportelement';
import { TableOfContentsLevel, TableOfContentsLevelSurface } from './xrTableOfContentsLevel';
export class XRTableOfContentsViewModel extends XRControlViewModel {
    constructor(control, parent, serializer) {
        super(control, parent, serializer);
        this.borderDefault = ko.pureComputed(() => 'none');
        this._disposables.push(this.levelTitle = new TableOfContentsLevel(control['LevelTitle'], this, serializer, true));
        this.levelTitleText = this.levelTitle.text;
        this._disposables.push(this.levelDefault = new TableOfContentsLevel(control['LevelDefault'], this, serializer));
        this.levels = deserializeArray(control['Levels'], (item) => new TableOfContentsLevel(item, this, serializer));
        this._disposables.push(this.allLevels = ko.computed(() => {
            const array = [this.levelTitle];
            Array.prototype.push.apply(array, this.levels());
            array.push(this.levelDefault);
            return array;
        }));
        this._disposables.push(this.size.height = ko.computed({
            read: () => this.levelDefault.top() + this.levelDefault.height(),
            write: $.noop
        }));
        this._disposables.push(this.size.width = ko.computed({
            read: () => (this.parentModel() ? this.parentModel().size.width() : 0),
            write: $.noop
        }));
        this._disposables.push(this.location.x = ko.computed({
            read: () => 0,
            write: () => { }
        }));
        this._disposables.push(this.borderDefault);
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.levels);
        this.resetObservableArray(this.levels);
    }
    createLocalizationProvider() {
        return new TableOfContentLocalizationProvider(this);
    }
    get textEditableProperty() { return this.levelTitleText; }
}
XRTableOfContentsViewModel.unitProperties = [].concat(['levelTitle', 'levelDefault'], XRReportElementViewModel.unitProperties);
export class XRTableOfContentsSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this.levels = ko.observableArray();
        this._disposables.push(this.levelTitle = new TableOfContentsLevelSurface(control.levelTitle, context));
        this._disposables.push(this.levelDefault = new TableOfContentsLevelSurface(control.levelDefault, context));
        this._disposables.push(createObservableArrayMapCollection(control.levels, this.levels, (item) => new TableOfContentsLevelSurface(item, context)));
        this.template = 'dxrd-table-of-contents';
        this.selectiontemplate = 'dxrd-table-of-contents-selected';
    }
    isThereIntersectionWithChildCollection() {
        return false;
    }
    isThereIntersectionWithUsefulArea() {
        return false;
    }
    isThereIntersectionWithParentCollection() {
        return false;
    }
}
