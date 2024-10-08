﻿/**
* DevExpress Analytics (query-builder\elements\querySurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase } from '../../core/elements/baseSurface';
import { createObservableArrayMapCollection } from '../../core/utils/_arrayutils';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { HoverInfo } from '../../core/internal/_hoverInfo';
export class QuerySurface extends SurfaceElementBase {
    constructor(query, zoom = ko.observable(1)) {
        super(query, {
            measureUnit: ko.observable('Pixels'),
            zoom: zoom,
            dpi: ko.observable(100)
        }, QuerySurface._unitProperties);
        this.placeholder = () => getLocalization('Drop a table or view here to create a query.', 'AnalyticsCoreStringId.QueryBuilder_SurfacePlaceholder');
        this.tables = ko.observableArray();
        this.relations = ko.observableArray();
        this.allowMultiselect = false;
        this.focused = ko.observable(false);
        this.selected = ko.observable(false);
        this.underCursor = ko.observable(new HoverInfo());
        this.templateName = 'dx-query-surface';
        this.rtl = ko.observable(false);
        this.measureUnit = this._context.measureUnit;
        this.dpi = this._context.dpi;
        this._context = this;
        this.margins = { bottom: this['_bottom'], left: this['_left'], right: this['_right'], top: this['_top'] };
        this.zoom = zoom;
        createObservableArrayMapCollection(query.tables, this.tables, this._createSurface);
        createObservableArrayMapCollection(query.relations, this.relations, this._createSurface);
        this._joinedColumns = ko.computed(() => {
            const resultColumns = [];
            this.relations().forEach(relation => {
                relation.conditions().forEach(condition => {
                    const joinModel = condition.getControlModel();
                    joinModel.parentColumn() && resultColumns.push(joinModel.parentColumn());
                    joinModel.nestedColumn() && resultColumns.push(joinModel.nestedColumn());
                });
            });
            return resultColumns;
        });
    }
    checkParent(surfaceParent) { return false; }
    getChildrenCollection() {
        return this.tables;
    }
    isJoined(column) {
        return this._joinedColumns().indexOf(column.getControlModel()) > -1;
    }
}
QuerySurface._unitProperties = {
    _width: (o) => { return o.pageWidth; },
    _height: (o) => { return o.pageWidth; },
    pageWidth: (o) => { return o.pageWidth; },
    pageHeight: (o) => { return o.pageHeight; },
    _bottom: (o) => { return o.margins.bottom; },
    _left: (o) => { return o.margins.left; },
    _right: (o) => { return o.margins.right; },
    _top: (o) => { return o.margins.top; }
};
