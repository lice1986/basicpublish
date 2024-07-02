﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_bandContainerUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DetailBand } from './xrDetailBand';
import { VerticalBandViewModel } from './xrVerticalBand';
import { insertBand } from './_bandUtils';
export function addBandToContainer(container, control) {
    control.parentModel(container);
    if (control instanceof DetailBand) {
        container.bands().filter(x => x instanceof VerticalBandViewModel).forEach(x => container.removeChild(x));
    }
    else if (control instanceof VerticalBandViewModel) {
        if (container.bands().every(x => !(x instanceof VerticalBandViewModel))) {
            const detailBand = container.bands().filter(x => x instanceof DetailBand)[0];
            detailBand && container.removeChild(detailBand);
            if (control.controlType !== 'VerticalDetailBand')
                container.createChild({ '@ControlType': 'VerticalDetailBand', '@HeightF': container.root.dpi() });
        }
        else {
            const band = container.bands().filter(x => x instanceof VerticalBandViewModel)[0];
            if (band)
                control.height(band.height());
        }
    }
    insertBand(container.bands, control);
}