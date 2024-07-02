﻿/**
* DevExpress Analytics (core\tools\_copyPaste.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { Point } from '../elements/point';
import { ModelSerializer } from '../../serializer/serializer';
import { findSurface } from '../internal/_surfaceHelpers';
export const copyPasteStrategy = {
    createChild: (pasteTarget, info) => {
        return pasteTarget.createChild(info);
    },
    calculateDelta: (selection, pasteTargetSurface, minPoint) => {
        return {
            x: selection.rect().left - minPoint.x(),
            y: selection.rect().top - minPoint.y()
        };
    },
    canPaste: (pasteTarget, info) => true
};
export class CopyPasteHandler {
    constructor(selectionProvider, _copyPasteStrategy = copyPasteStrategy) {
        this._copyPasteStrategy = _copyPasteStrategy;
        this._copyInfo = ko.observable(null);
        this.hasPasteInfo = ko.pureComputed(() => { return this._copyInfo() !== null; });
        this._selectionProvider = selectionProvider;
    }
    canCopy() {
        return this._selectionProvider.focused() !== null && !this._selectionProvider.focused().getControlModel().getMetaData().isCopyDeny;
    }
    canPaste() {
        const pasteTargetSurface = this._selectionProvider.focused();
        return pasteTargetSurface !== null
            && this.hasPasteInfo()
            && pasteTargetSurface.canDrop()
            && (!this._copyPasteStrategy.canPaste || this._copyPasteStrategy.canPaste(pasteTargetSurface.getControlModel(), this._copyInfo()))
            && !pasteTargetSurface.getControlModel().getMetaData().isPasteDeny;
    }
    copy() {
        if (this.canCopy()) {
            const serializer = new ModelSerializer(), copyInfo = {
                focused: this._selectionProvider.focused(),
                objects: $.map(this._selectionProvider.selectedItems, (item) => {
                    return serializer.serialize(item.getControlModel());
                })
            };
            this._copyInfo(copyInfo);
        }
    }
    cut() {
        const serializer = new ModelSerializer(), focused = this._selectionProvider.focused(), objects = [];
        this._selectionProvider.selectedItems.forEach(item => {
            const control = item.getControlModel();
            control.parentModel().removeChild(control);
            objects.push(serializer.serialize(control));
            if (this._copyPasteStrategy.createSelfRestoringItems)
                objects.push(...this._copyPasteStrategy.createSelfRestoringItems(control, serializer));
        });
        const cutInfo = {
            focused: focused,
            objects: objects
        };
        this._copyInfo(cutInfo);
    }
    paste() {
        if (this.canPaste()) {
            let pasteTargetSurface = this._selectionProvider.focused(), pasteTarget = pasteTargetSurface.getControlModel();
            const newSelection = [];
            if (pasteTargetSurface === this._copyInfo().focused) {
                pasteTargetSurface = pasteTargetSurface.parent;
                pasteTarget = pasteTargetSurface.getControlModel();
            }
            if (!pasteTarget.getMetaData().isContainer) {
                pasteTargetSurface = pasteTargetSurface.parent;
                pasteTarget = pasteTargetSurface.getControlModel();
            }
            const minPoint = new Point(Number.MAX_VALUE, Number.MAX_VALUE), maxPoint = new Point(-1, -1);
            for (let i = 0; i < this._copyInfo().objects.length; i++) {
                const newControl = this._copyPasteStrategy.createChild(pasteTarget, this._copyInfo().objects[i]);
                const newControlSurface = findSurface(newControl);
                if (!newControlSurface)
                    continue;
                const posMin = new Point(newControlSurface.rect().left, newControlSurface.rect().top);
                const posMax = new Point(newControlSurface.rect().left + newControlSurface.rect().width, newControlSurface.rect().top + newControlSurface.rect().height);
                if (minPoint.x() >= posMin.x())
                    minPoint.x(posMin.x());
                if (maxPoint.x() <= posMax.x())
                    maxPoint.x(posMax.x());
                if (minPoint.y() >= posMin.y())
                    minPoint.y(posMin.y());
                if (maxPoint.y() <= posMax.y())
                    maxPoint.y(posMax.y());
                newSelection.push(newControlSurface);
            }
            const newOriginPoint = new Point(((pasteTargetSurface.rect().width - pasteTargetSurface['_context'].margins.right()) / 2) - ((maxPoint.x() - minPoint.x()) / 2) + (pasteTargetSurface['rtlLayout']() ? pasteTargetSurface['_context'].margins.right() : 0), (pasteTargetSurface.rect().height / 2) - ((maxPoint.y() - minPoint.y()) / 2));
            for (let i = 0; i < newSelection.length; i++) {
                const delta = this._copyPasteStrategy.calculateDelta(newSelection[i], pasteTargetSurface, minPoint);
                newSelection[i].rect({ left: newOriginPoint.x() + delta.x, top: newOriginPoint.y() + delta.y });
            }
            this._selectionProvider.initialize();
            newSelection.forEach(newControlSurface => {
                this._selectionProvider.selecting({ control: newControlSurface, cancel: false });
            });
        }
    }
}