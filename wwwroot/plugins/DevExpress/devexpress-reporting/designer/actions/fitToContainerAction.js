﻿/**
* DevExpress HTML/JS Reporting (designer\actions\fitToContainerAction.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { BandSurface } from '../bands/xrBand';
import { VerticalBandSurface } from '../bands/xrVerticalBand';
import { XRControlSurface } from '../controls/xrControl';
import { XRCrossBandSurface } from '../controls/xrCrossband';
import { XRPageBreakSurface } from '../controls/xrPagebreak';
import { XRTableCellSurface } from '../controls/xrTableCell';
import { XRTableOfContentsSurface } from '../controls/xrTableOfContents';
export class FitToContainerAction {
    constructor(_control) {
        this._control = _control;
        this._container = ko.pureComputed(() => this._control() && this._control().parent);
    }
    doAction() {
        this._control().rect(this._container().getUsefulRect());
    }
    allowed() {
        const container = this._container();
        if (!container || container.getChildrenCollection()().length > 1)
            return false;
        return (container instanceof XRTableCellSurface ||
            container instanceof XRControlSurface ||
            container instanceof BandSurface ||
            container instanceof VerticalBandSurface);
    }
    visible() {
        return !(this._control() instanceof XRCrossBandSurface ||
            this._control() instanceof XRPageBreakSurface ||
            this._control() instanceof XRTableOfContentsSurface);
    }
}