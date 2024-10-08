﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_designControlsHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DesignControlsHelper as AnalyticDesignControlsHelper } from '@devexpress/analytics-core/analytics-internal';
import { XRPdfSignatureModel } from '../controls/xrPdfSignature';
import { CalculatedField } from '../dataObjects/calculatedField';
import { Parameter } from '../dataObjects/parameters/parameter';
import { WatermarkModel } from '../controls/properties/watermark';
export class DesignControlsHelper extends AnalyticDesignControlsHelper {
    constructor(target, selection) {
        super(target, [{
                added: (control) => {
                    if (control instanceof XRPdfSignatureModel) {
                        control.signatureOptions.displayDocumentSignature(!this._xrPdfSignatureCollection.some(x => x.signatureOptions.displayDocumentSignature()));
                        this._xrPdfSignatureCollection.push(control);
                        control.subscribeSignature(() => this._xrPdfSignatureCollection);
                    }
                },
                deleted: (control) => {
                    if (control instanceof XRPdfSignatureModel) {
                        const position = this._xrPdfSignatureCollection.indexOf(control);
                        if (position !== -1)
                            this._xrPdfSignatureCollection.splice(position, 1);
                    }
                    control.surface === selection.focused() && selection.focused(control.surface.findNextSelection());
                }
            }], ['controls', 'bands', 'crossBandControls', 'rows', 'cells', 'fields', 'styles', 'parameters', 'formattingRuleSheet', 'calculatedFields', 'components', 'watermarks']);
    }
    dispose() {
        this._xrPdfSignatureCollection = [];
        super.dispose();
    }
    getNameProperty(model) {
        if (model instanceof Parameter)
            return model.parameterName;
        if (model instanceof CalculatedField)
            return model.calculatedFieldName;
        if (model instanceof WatermarkModel)
            return model.watermarkId;
        return super.getNameProperty(model);
    }
    _setName(value) {
        if (value !== this.target) {
            super._setName(value);
        }
    }
    _setDefaultText(value) {
        const controlType = value.controlType || 'Unknown';
        controlType !== 'XRCrossTabCell' && super._setDefaultText(value);
    }
    _getNamePrefix(value) {
        const controlType = value.controlType || 'Unknown';
        if (controlType === 'XRCrossTabCell') {
            return value.namePrefix;
        }
        return super._getNamePrefix(value);
    }
    processCollection(collection) {
        const pdfSignatures = collection.filter(x => x instanceof XRPdfSignatureModel);
        pdfSignatures.forEach(x => x.subscribeSignature(() => this._xrPdfSignatureCollection));
        if (!this._xrPdfSignatureCollection)
            this._xrPdfSignatureCollection = [];
        this._xrPdfSignatureCollection = [].concat(this._xrPdfSignatureCollection, pdfSignatures);
    }
}
