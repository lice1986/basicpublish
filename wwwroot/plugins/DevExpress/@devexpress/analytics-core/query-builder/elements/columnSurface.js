﻿/**
* DevExpress Analytics (query-builder\elements\columnSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase } from '../../core/elements/baseSurface';
import { isAggregatedExpression } from '../widgets/filterEditor/_queryBuilderObjectsProvider';
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
export class ColumnSurface extends SurfaceElementBase {
    constructor(control, context) {
        super(control, context, null);
        this.template = 'dxqb-table-field';
        this.toggleSelected = () => {
            this.getControlModel().selected(!this.getControlModel().selected());
        };
        this.selectedWrapper = ko.pureComputed(() => {
            return this.getControlModel().selected();
        });
        this.isNotAvailable = ko.pureComputed(() => this._control.isNotAvailable());
        this.isAggregate = ko.pureComputed(() => isAggregatedExpression(this.getControlModel()));
        this.isAscending = ko.pureComputed(() => {
            return this.getControlModel().sortingType() === 'Ascending';
        });
        this.isDescending = ko.pureComputed(() => {
            return this.getControlModel().sortingType() === 'Descending';
        });
        this.cssClasses = (query, columnDragHandler, parent) => {
            if (!this._isJoined) {
                this._isJoined = ko.pureComputed(() => {
                    return query.isJoined(this) || this.getControlModel() === columnDragHandler.getDragColumn();
                });
            }
            if (!this._isHovered) {
                this._isHovered = ko.pureComputed(() => {
                    const isColumnDragStarted = !!columnDragHandler.getDragColumn();
                    const isCurrentTableNotParentForDraggedColumn = isColumnDragStarted && this.getControlModel().parentModel() !== columnDragHandler.getDragColumn().parentModel();
                    return this.underCursor().isOver && (!DragDropHandler.started() || isCurrentTableNotParentForDraggedColumn);
                });
            }
            return {
                'dxd-state-invalid': this.isNotAvailable,
                'dxd-state-active': this.selected(),
                'dxd-state-joined': this._isJoined,
                'dxd-state-hovered': this._isHovered,
            };
        };
    }
}
