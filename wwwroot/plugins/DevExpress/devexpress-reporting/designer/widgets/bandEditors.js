﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\bandEditors.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor, ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { pageBreakValues, pageBreakWithoutAfterValues, printAcrossBands } from '../bands/metadata/bandsMetadata';
import { sortFields } from '../bands/metadata/xrDetailBandMetaData';
import { groupFields } from '../bands/metadata/xrGroupBandMetaData';
import { DetailReportBand } from '../bands/xrDetailReportBand';
export class BandEditorBase extends Editor {
    constructor() {
        super(...arguments);
        this.generateValue = (bands) => {
            if (!this.bands) {
                this.bands = bands(this.filter, this.noneNeaded);
            }
            return this.bands;
        };
        this.bands = null;
    }
}
export class RunningBandEditor extends BandEditorBase {
    constructor() {
        super(...arguments);
        this.filter = (item) => {
            return item.controlType === 'GroupHeaderBand' || item.controlType === 'DetailReportBand';
        };
        this.noneNeaded = true;
    }
}
export class BandsEditor extends BandEditorBase {
    constructor() {
        super(...arguments);
        this.filter = (item) => {
            return !(item instanceof DetailReportBand);
        };
        this.noneNeaded = false;
    }
}
export class SortingBandEditor extends BandEditorBase {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
        this.filter = (item) => {
            return item.controlType === 'GroupHeaderBand' || item.controlType === 'DetailBand';
        };
        this.noneNeaded = true;
        const value = ko.computed(() => { return this.value() || {}; });
        this._disposables.push(value);
        this.viewmodel = new ObjectProperties(value, { editors: [sortFields, groupFields] }, level + 1, this._get('disabled', 'wrapped'), false, textToSearch);
        this._disposables.push(this.viewmodel);
    }
}
export class PageBreakBandEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
        this._disposables.push(this.values = ko.pureComputed(() => {
            const model = this._get('_model');
            if (model && model[printAcrossBands.propertyName] && !!model[printAcrossBands.propertyName]())
                return pageBreakWithoutAfterValues;
            else
                return pageBreakValues;
        }));
    }
}
