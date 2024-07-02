﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrBarcode.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { Editor, editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ImageSource } from '../../../common/imageSource';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { barCodesTypes } from '../barCodesTypes';
import { createSinglePopularBindingInfos } from '../utils/_metaUtils';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { keepTogether, text, textAlignment, textAlignmentValues, textFormatString } from './properties/metadata';
import { commonControlProperties, fontGroup, navigationGroup, processGroup, sizeLocation } from './properties/metadataGroups';
import { textControlScripts } from './properties/scriptMetadata';
import { action } from './properties/action';
import { frameOptionsTypes, FrameOptionsTypesEPC } from './properties/frameOptions';
import { extend } from '@devexpress/analytics-core/analytics-internal';
export const defaultCodeSerializationInfo = { propertyName: 'name', modelName: '@Name' };
const calcCheckSum = { propertyName: 'calcCheckSum', modelName: '@CalcCheckSum', defaultVal: true, from: parseBool, editor: editorTemplates.getEditor('bool'), displayName: 'Calculate a Checksum', localizationId: 'DevExpress.XtraPrinting.BarCode.BarCodeGeneratorBase.CalcCheckSum' };
const code93SerializationInfo = [defaultCodeSerializationInfo, calcCheckSum];
const wideNarrowRatio = { propertyName: 'wideNarrowRatio', modelName: '@WideNarrowRatio', defaultVal: 2.5, from: floatFromModel, displayName: 'Wide Narrow Ratio', localizationId: 'DevExpress.XtraPrinting.BarCode.CodabarGenerator.WideNarrowRatio', editor: editorTemplates.getEditor('numeric') };
const wideNarrowRatio3 = $.extend({}, wideNarrowRatio, { defaultVal: 3 });
const codabarStartStopSymbolValues = [
    { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPrinting.BarCode.CodabarStartStopSymbol.None' },
    { value: 'A', displayValue: 'A', localizationId: 'DevExpress.XtraPrinting.BarCode.CodabarStartStopSymbol.A' },
    { value: 'B', displayValue: 'B', localizationId: 'DevExpress.XtraPrinting.BarCode.CodabarStartStopSymbol.B' },
    { value: 'C', displayValue: 'C', localizationId: 'DevExpress.XtraPrinting.BarCode.CodabarStartStopSymbol.C' },
    { value: 'D', displayValue: 'D', localizationId: 'DevExpress.XtraPrinting.BarCode.CodabarStartStopSymbol.D' },
];
const codaBarStartSymbol = {
    propertyName: 'startSymbol', modelName: '@StartSymbol', defaultVal: 'A',
    editor: editorTemplates.getEditor('combobox'), displayName: 'Start Symbol', localizationId: 'DevExpress.XtraPrinting.BarCode.CodabarGenerator.StartSymbol',
    valuesArray: codabarStartStopSymbolValues
};
const codaBarStopSymbol = {
    propertyName: 'stopSymbol', modelName: '@StopSymbol', defaultVal: 'A',
    editor: editorTemplates.getEditor('combobox'), displayName: 'Stop Symbol', localizationId: 'DevExpress.XtraPrinting.BarCode.CodabarGenerator.StopSymbol',
    valuesArray: codabarStartStopSymbolValues
};
const codabarSerializationInfo = [
    defaultCodeSerializationInfo,
    codaBarStartSymbol,
    codaBarStopSymbol,
    wideNarrowRatio
];
const charset = {
    propertyName: 'characterSet',
    modelName: '@CharacterSet', defaultVal: 'CharsetA', displayName: 'Character Set', localizationId: 'DevExpress.XtraPrinting.BarCode.Code128Generator.CharacterSet', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'CharsetAuto', displayValue: 'CharsetAuto', localizationId: 'DevExpress.XtraPrinting.BarCode.Code128Charset.CharsetAuto' },
        { value: 'CharsetA', displayValue: 'CharsetA', localizationId: 'DevExpress.XtraPrinting.BarCode.Code128Charset.CharsetA' },
        { value: 'CharsetB', displayValue: 'CharsetB', localizationId: 'DevExpress.XtraPrinting.BarCode.Code128Charset.CharsetB' },
        { value: 'CharsetC', displayValue: 'CharsetC', localizationId: 'DevExpress.XtraPrinting.BarCode.Code128Charset.CharsetC' }
    ]
};
const addLeadingZero = { propertyName: 'addLeadingZero', displayName: 'Add Leading Zero', localizationId: 'DevExpress.XtraPrinting.BarCode.Code128Generator.AddLeadingZero', modelName: '@AddLeadingZero', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool') };
const fnc1Substitute = { propertyName: 'fNC1Substitute', modelName: '@FNC1Substitute', defaultVal: '', editor: editorTemplates.getEditor('text'), displayName: 'FNC1 Functional Character', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarGenerator.FNC1Substitute', descriptionLocalizationId: 'DevExpress.XtraPrinting.BarCode.Code128Generator.FNC1Substitute.Description' };
const fnc2Substitute = { propertyName: 'fNC2Substitute', modelName: '@FNC2Substitute', defaultVal: '', editor: editorTemplates.getEditor('text'), displayName: 'FNC2 Functional Character', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarGenerator.FNC2Substitute', descriptionLocalizationId: 'DevExpress.XtraPrinting.BarCode.Code128Generator.FNC2Substitute.Description' };
const fnc3Substitute = { propertyName: 'fNC3Substitute', modelName: '@FNC3Substitute', defaultVal: '', editor: editorTemplates.getEditor('text'), displayName: 'FNC3 Functional Character', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarGenerator.FNC3Substitute', descriptionLocalizationId: 'DevExpress.XtraPrinting.BarCode.Code128Generator.FNC3Substitute.Description' };
const fnc4Substitute = { propertyName: 'fNC4Substitute', modelName: '@FNC4Substitute', defaultVal: '', editor: editorTemplates.getEditor('text'), displayName: 'FNC4 Functional Character', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarGenerator.FNC4Substitute', descriptionLocalizationId: 'DevExpress.XtraPrinting.BarCode.Code128Generator.FNC4Substitute.Description' };
const code128SerializationInfo = [
    defaultCodeSerializationInfo,
    addLeadingZero,
    charset,
    fnc1Substitute,
    fnc2Substitute,
    fnc3Substitute,
    fnc4Substitute
];
const code39SerializationInfo = [wideNarrowRatio3].concat(code93SerializationInfo);
const codeMSISerializationInfo = [
    defaultCodeSerializationInfo,
    {
        propertyName: 'msiCheckSum',
        modelName: '@MSICheckSum', defaultVal: 'Modulo10', displayName: 'MSI Checksum', localizationId: 'DevExpress.XtraPrinting.BarCode.CodeMSIGenerator.MSICheckSum', editor: editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPrinting.BarCode.MSICheckSum.None' },
            { value: 'Modulo10', displayValue: 'Modulo10', localizationId: 'DevExpress.XtraPrinting.BarCode.MSICheckSum.Modulo10' },
            { value: 'DoubleModulo10', displayValue: 'DoubleModulo10', localizationId: 'DevExpress.XtraPrinting.BarCode.MSICheckSum.DoubleModulo10' }
        ]
    }
];
const fnc1SubstituteWithSharp = Object.assign(Object.assign({}, fnc1Substitute), { defaultVal: '#' });
const dataBarSerializationInfo = [
    defaultCodeSerializationInfo,
    fnc1SubstituteWithSharp,
    { propertyName: 'segmentsInRow', modelName: '@SegmentsInRow', defaultVal: 20, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Segments In Row', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarGenerator.SegmentsInRow' },
    {
        propertyName: 'type',
        modelName: '@Type', defaultVal: 'Omnidirectional', editor: editorTemplates.getEditor('combobox'),
        displayName: 'Type', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarGenerator.Type', valuesArray: [
            { value: 'Omnidirectional', displayValue: 'Omnidirectional', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarType.Omnidirectional' },
            { value: 'Truncated', displayValue: 'Truncated', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarType.Truncated' },
            { value: 'Stacked', displayValue: 'Stacked', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarType.Stacked' },
            { value: 'StackedOmnidirectional', displayValue: 'StackedOmnidirectional', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarType.StackedOmnidirectional' },
            { value: 'Limited', displayValue: 'Limited', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarType.Limited' },
            { value: 'Expanded', displayValue: 'Expanded', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarType.Expanded' },
            { value: 'ExpandedStacked', displayValue: 'ExpandedStacked', localizationId: 'DevExpress.XtraPrinting.BarCode.DataBarType.ExpandedStacked' }
        ]
    }
];
const matrixSize = {
    propertyName: 'matrixSize',
    modelName: '@MatrixSize', defaultVal: 'MatrixAuto', editor: editorTemplates.getEditor('combobox'),
    displayName: 'Matrix Size', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixGenerator.MatrixSize', valuesArray: [
        { value: 'MatrixAuto', displayValue: 'MatrixAuto', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.MatrixAuto' },
        { value: 'Matrix10x10', displayValue: 'Matrix10x10', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix10x10' },
        { value: 'Matrix12x12', displayValue: 'Matrix12x12', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix12x12' },
        { value: 'Matrix14x14', displayValue: 'Matrix14x14', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix14x14' },
        { value: 'Matrix16x16', displayValue: 'Matrix16x16', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix16x16' },
        { value: 'Matrix18x18', displayValue: 'Matrix18x18', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix18x18' },
        { value: 'Matrix20x20', displayValue: 'Matrix20x20', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix20x20' },
        { value: 'Matrix22x22', displayValue: 'Matrix22x22', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix22x22' },
        { value: 'Matrix24x24', displayValue: 'Matrix24x24', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix24x24' },
        { value: 'Matrix26x26', displayValue: 'Matrix26x26', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix26x26' },
        { value: 'Matrix32x32', displayValue: 'Matrix32x32', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix32x32' },
        { value: 'Matrix36x36', displayValue: 'Matrix36x36', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix36x36' },
        { value: 'Matrix40x40', displayValue: 'Matrix40x40', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix40x40' },
        { value: 'Matrix44x44', displayValue: 'Matrix44x44', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix44x44' },
        { value: 'Matrix48x48', displayValue: 'Matrix48x48', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix48x48' },
        { value: 'Matrix52x52', displayValue: 'Matrix52x52', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix52x52' },
        { value: 'Matrix64x64', displayValue: 'Matrix64x64', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix64x64' },
        { value: 'Matrix72x72', displayValue: 'Matrix72x72', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix72x72' },
        { value: 'Matrix80x80', displayValue: 'Matrix80x80', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix80x80' },
        { value: 'Matrix88x88', displayValue: 'Matrix88x88', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix88x88' },
        { value: 'Matrix96x96', displayValue: 'Matrix96x96', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix96x96' },
        { value: 'Matrix104x104', displayValue: 'Matrix104x104', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix104x104' },
        { value: 'Matrix120x120', displayValue: 'Matrix120x120', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix120x120' },
        { value: 'Matrix132x132', displayValue: 'Matrix132x132', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix132x132' },
        { value: 'Matrix144x144', displayValue: 'Matrix144x144', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix144x144' },
        { value: 'Matrix8x18', displayValue: 'Matrix8x18', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix8x18' },
        { value: 'Matrix8x32', displayValue: 'Matrix8x32', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix8x32' },
        { value: 'Matrix12x26', displayValue: 'Matrix12x26', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix12x26' },
        { value: 'Matrix12x36', displayValue: 'Matrix12x36', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix12x36' },
        { value: 'Matrix16x36', displayValue: 'Matrix16x36', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix16x36' },
        { value: 'Matrix16x48', displayValue: 'Matrix16x48', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix16x48' }
    ]
};
const dataMatrixSerializationInfo = [
    defaultCodeSerializationInfo,
    matrixSize,
    {
        propertyName: 'compactionMode',
        modelName: '@CompactionMode', defaultVal: 'ASCII', editor: editorTemplates.getEditor('combobox'),
        displayName: 'Compaction Mode', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixGenerator.CompactionMode', valuesArray: [
            { value: 'ASCII', displayValue: 'ASCII', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixCompactionMode.ASCII' },
            { value: 'C40', displayValue: 'C40', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixCompactionMode.C40' },
            { value: 'Text', displayValue: 'Text', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixCompactionMode.Text' },
            { value: 'X12', displayValue: 'X12', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixCompactionMode.X12' },
            { value: 'Edifact', displayValue: 'Edifact', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixCompactionMode.Edifact' },
            { value: 'Binary', displayValue: 'Binary', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixCompactionMode.Binary' }
        ]
    }
];
const humanReadableText = { propertyName: 'humanReadableText', modelName: '@HumanReadableText', defaultVal: true, from: parseBool, displayName: 'Human-Readable Text', localizationId: 'DevExpress.XtraPrinting.BarCode.DataMatrixGS1Generator.HumanReadableText', editor: editorTemplates.getEditor('bool') };
const dataMatrixGS1SerializationInfo = [
    defaultCodeSerializationInfo,
    matrixSize,
    fnc1SubstituteWithSharp,
    humanReadableText,
];
const EAN128SerializationInfo = [
    defaultCodeSerializationInfo,
    charset,
    fnc1SubstituteWithSharp,
    humanReadableText
];
const Industrial2of5SerializationInfo = [defaultCodeSerializationInfo, calcCheckSum, wideNarrowRatio];
const Interleaved2of5SerializationInfo = [defaultCodeSerializationInfo, calcCheckSum, wideNarrowRatio3];
const PDF417SerializationInfo = [
    defaultCodeSerializationInfo,
    { propertyName: 'columns', modelName: '@Columns', defaultVal: 1, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Columns', localizationId: 'DevExpress.XtraPrinting.BarCode.PDF417Generator.Columns' },
    {
        propertyName: 'compactionMode',
        modelName: '@CompactionMode', defaultVal: 'Text', editor: editorTemplates.getEditor('combobox'), displayName: 'Compaction Mode', localizationId: 'DevExpress.XtraPrinting.BarCode.PDF417Generator.CompactionMode',
        valuesArray: [
            { value: 'Binary', displayValue: 'Binary', localizationId: 'DevExpress.XtraPrinting.BarCode.PDF417CompactionMode.Binary' },
            { value: 'Text', displayValue: 'Text', localizationId: 'DevExpress.XtraPrinting.BarCode.PDF417CompactionMode.Text' }
        ]
    },
    {
        propertyName: 'errorCorrectionLevel',
        modelName: '@ErrorCorrectionLevel', defaultVal: 'Level2', editor: editorTemplates.getEditor('combobox'), displayName: 'Error Correction Level', localizationId: 'DevExpress.XtraPrinting.BarCode.PDF417Generator.ErrorCorrectionLevel',
        valuesArray: [
            { value: 'Level0', displayValue: 'Level0', localizationId: 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level0' },
            { value: 'Level1', displayValue: 'Level1', localizationId: 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level1' },
            { value: 'Level2', displayValue: 'Level2', localizationId: 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level2' },
            { value: 'Level3', displayValue: 'Level3', localizationId: 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level3' },
            { value: 'Level4', displayValue: 'Level4', localizationId: 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level4' },
            { value: 'Level5', displayValue: 'Level5', localizationId: 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level5' },
            { value: 'Level6', displayValue: 'Level6', localizationId: 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level6' },
            { value: 'Level7', displayValue: 'Level7', localizationId: 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level7' },
            { value: 'Level8', displayValue: 'Level8', localizationId: 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level8' }
        ]
    },
    { propertyName: 'rows', modelName: '@Rows', defaultVal: 0, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Rows', localizationId: 'DevExpress.XtraPrinting.BarCode.PDF417Generator.Rows' },
    { propertyName: 'yToXRatio', modelName: '@YToXRatio', defaultVal: 3, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Y to X Ratio', localizationId: 'DevExpress.XtraPrinting.BarCode.PDF417Generator.YToXRatio' },
    { propertyName: 'truncateSymbol', modelName: '@TruncateSymbol', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool'), displayName: 'Truncate Symbol', localizationId: 'DevExpress.XtraPrinting.BarCode.PDF417Generator.TruncateSymbol' }
];
const SSCCSerializationInfo = [
    defaultCodeSerializationInfo,
];
const compactionMode = {
    propertyName: 'compactionMode',
    modelName: '@CompactionMode', defaultVal: 'AlphaNumeric', editor: editorTemplates.getEditor('combobox'), displayName: 'Compaction Mode', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeGenerator.CompactionMode',
    valuesArray: [
        { value: 'Numeric', displayValue: 'Numeric', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeCompactionMode.Numeric' },
        { value: 'AlphaNumeric', displayValue: 'AlphaNumeric', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeCompactionMode.AlphaNumeric' },
        { value: 'Byte', displayValue: 'Byte', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeCompactionMode.Byte' }
    ]
};
const errorCorrectionLevel = {
    propertyName: 'errorCorrectionLevel',
    modelName: '@ErrorCorrectionLevel', defaultVal: 'L', editor: editorTemplates.getEditor('combobox'), displayName: 'Error Correction Level', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeGenerator.ErrorCorrectionLevel',
    valuesArray: [
        { value: 'M', displayValue: 'M', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeErrorCorrectionLevel.M' },
        { value: 'L', displayValue: 'L', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeErrorCorrectionLevel.L' },
        { value: 'H', displayValue: 'H', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeErrorCorrectionLevel.H' },
        { value: 'Q', displayValue: 'Q', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeErrorCorrectionLevel.Q' }
    ]
};
const logo = {
    propertyName: 'logo',
    modelName: '@Logo',
    editor: { header: 'dxrd-image-loadfile', editorType: Editor },
    displayName: 'Logo',
    localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeGenerator.Logo',
    from: val => ko.observable(ImageSource.parse(val)),
    toJsonObject: ImageSource.toString,
    defaultVal: null
};
const includeQuietZone = {
    propertyName: 'IncludeQuietZone',
    modelName: '@IncludeQuietZone',
    displayName: 'Include Quiet Zone',
    localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeGenerator.IncludeQuietZone',
    defaultVal: true,
    editor: editorTemplates.getEditor('bool'),
    from: parseBool
};
const version = {
    propertyName: 'version',
    modelName: '@Version', defaultVal: 'AutoVersion', editor: editorTemplates.getEditor('combobox'), displayName: 'Version', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeGenerator.Version',
    valuesArray: [
        { value: 'AutoVersion', displayValue: 'AutoVersion', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.AutoVersion' },
        { value: 'Version1', displayValue: 'Version1', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version1' },
        { value: 'Version2', displayValue: 'Version2', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version2' },
        { value: 'Version3', displayValue: 'Version3', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version3' },
        { value: 'Version4', displayValue: 'Version4', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version4' },
        { value: 'Version5', displayValue: 'Version5', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version5' },
        { value: 'Version6', displayValue: 'Version6', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version6' },
        { value: 'Version7', displayValue: 'Version7', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version7' },
        { value: 'Version8', displayValue: 'Version8', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version8' },
        { value: 'Version9', displayValue: 'Version9', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version9' },
        { value: 'Version10', displayValue: 'Version10', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version10' },
        { value: 'Version11', displayValue: 'Version11', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version11' },
        { value: 'Version12', displayValue: 'Version12', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version12' },
        { value: 'Version13', displayValue: 'Version13', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version13' },
        { value: 'Version14', displayValue: 'Version14', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version14' },
        { value: 'Version15', displayValue: 'Version15', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version15' },
        { value: 'Version16', displayValue: 'Version16', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version16' },
        { value: 'Version17', displayValue: 'Version17', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version17' },
        { value: 'Version18', displayValue: 'Version18', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version18' },
        { value: 'Version19', displayValue: 'Version19', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version19' },
        { value: 'Version20', displayValue: 'Version20', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version20' },
        { value: 'Version21', displayValue: 'Version21', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version21' },
        { value: 'Version22', displayValue: 'Version22', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version22' },
        { value: 'Version23', displayValue: 'Version23', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version23' },
        { value: 'Version24', displayValue: 'Version24', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version24' },
        { value: 'Version25', displayValue: 'Version25', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version25' },
        { value: 'Version26', displayValue: 'Version26', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version26' },
        { value: 'Version27', displayValue: 'Version27', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version27' },
        { value: 'Version28', displayValue: 'Version28', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version28' },
        { value: 'Version29', displayValue: 'Version29', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version29' },
        { value: 'Version30', displayValue: 'Version30', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version30' },
        { value: 'Version31', displayValue: 'Version31', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version31' },
        { value: 'Version32', displayValue: 'Version32', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version32' },
        { value: 'Version33', displayValue: 'Version33', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version33' },
        { value: 'Version34', displayValue: 'Version34', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version34' },
        { value: 'Version35', displayValue: 'Version35', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version35' },
        { value: 'Version36', displayValue: 'Version36', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version36' },
        { value: 'Version37', displayValue: 'Version37', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version37' },
        { value: 'Version38', displayValue: 'Version38', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version38' },
        { value: 'Version39', displayValue: 'Version39', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version39' },
        { value: 'Version40', displayValue: 'Version40', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version40' },
    ]
};
const frameOptions = { propertyName: 'frameOptions', modelName: 'FrameOptions' };
const frameOptionsFake = {
    propertyName: 'frameOptionsFake', editor: designerEditorTemplates.getEditor('contentByType'),
    valuesArray: frameOptionsTypes,
    displayName: 'Frame Options', localizationId: 'DevExpress.XtraPrinting.BarCode.QRCodeGenerator.FrameOptions'
};
const QRCodeSerializationInfo = [
    defaultCodeSerializationInfo,
    compactionMode,
    errorCorrectionLevel,
    frameOptions,
    frameOptionsFake,
    logo,
    includeQuietZone,
    version
];
const QRCodeGS1SerializationInfo = [
    defaultCodeSerializationInfo,
    fnc1SubstituteWithSharp,
    compactionMode,
    errorCorrectionLevel,
    frameOptions,
    frameOptionsFake,
    includeQuietZone,
    version,
];
const FrameOptionsFakeEPC = extend({}, frameOptionsFake, { valuesArray: FrameOptionsTypesEPC });
const QRCodeEPCSerializationInfo = [
    defaultCodeSerializationInfo,
    frameOptions,
    FrameOptionsFakeEPC,
    includeQuietZone,
    logo,
    version,
];
const PharmacodeSerializationInfo = [
    defaultCodeSerializationInfo,
    {
        propertyName: 'pharmacodeType',
        modelName: '@PharmacodeType', defaultVal: 'OneTrack', editor: editorTemplates.getEditor('combobox'), displayName: 'PharmacodeType', localizationId: 'DevExpress.XtraPrinting.BarCode.PharmacodeGenerator.PharmacodeType',
        valuesArray: [
            { value: 'OneTrack', displayValue: 'OneTrack', localizationId: 'DevExpress.XtraPrinting.BarCode.PharmacodeType.OneTrack' },
            { value: 'TwoTrack', displayValue: 'TwoTrack', localizationId: 'DevExpress.XtraPrinting.BarCode.PharmacodeType.TwoTrack' }
        ]
    }
];
export const autoModule = { propertyName: 'autoModule', modelName: '@AutoModule', defaultVal: false, from: parseBool, editor: editorTemplates.getEditor('bool'), displayName: 'Auto-Module', localizationId: 'DevExpress.XtraReports.UI.XRBarCode.AutoModule' };
export const barCodeOrientation = {
    propertyName: 'barCodeOrientation',
    modelName: '@BarCodeOrientation', defaultVal: 'Normal',
    editor: editorTemplates.getEditor('combobox'),
    displayName: 'Orientation', localizationId: 'DevExpress.XtraReports.UI.XRBarCode.BarCodeOrientation', valuesArray: [
        { value: 'Normal', displayValue: 'Normal', localizationId: 'DevExpress.XtraPrinting.BarCode.BarCodeOrientation.Normal' },
        { value: 'UpsideDown', displayValue: 'UpsideDown', localizationId: 'DevExpress.XtraPrinting.BarCode.BarCodeOrientation.UpsideDown' },
        { value: 'RotateLeft', displayValue: 'RotateLeft', localizationId: 'DevExpress.XtraPrinting.BarCode.BarCodeOrientation.RotateLeft' },
        { value: 'RotateRight', displayValue: 'RotateRight', localizationId: 'DevExpress.XtraPrinting.BarCode.BarCodeOrientation.RotateRight' }
    ]
};
export const moduleInfo = { propertyName: 'module', modelName: '@Module', defaultVal: 2, from: floatFromModel, editor: editorTemplates.getEditor('numeric'), displayName: 'Module', localizationId: 'DevExpress.XtraReports.UI.XRBarCode.Module' };
export const showText = { propertyName: 'showText', modelName: '@ShowText', defaultVal: true, from: parseBool, editor: editorTemplates.getEditor('bool'), displayName: 'Show Text', localizationId: 'DevExpress.XtraReports.UI.XRBarCode.ShowText' };
export const symbology = { propertyName: 'symbology', modelName: 'Symbology' };
export const targetDeviceDpi = { propertyName: 'targetDeviceDpi', modelName: '@TargetDeviceDpi', displayName: 'Target Device Dpi', localizationId: 'DevExpress.XtraReports.UI.XRBarCode.TargetDeviceDpi', editor: editorTemplates.getEditor('numeric'), editorOptions: { min: 1, format: '#' } };
export const barcodeFake = { propertyName: 'barcodeFake', valuesArray: barCodesTypes, editor: designerEditorTemplates.getEditor('contentByType'), displayName: 'Symbology', localizationId: 'DevExpress.XtraReports.UI.XRBarCode.Symbology', descriptionLocalizationId: '' };
export const alignment = {
    propertyName: 'alignment',
    modelName: '@Alignment', displayName: 'Alignment', localizationId: 'DevExpress.XtraReports.UI.XRBarCode.Alignment', defaultVal: 'TopLeft',
    editor: editorTemplates.getEditor('combobox'),
    valuesArray: textAlignmentValues
};
export const barCodesMap = {
    'Codabar': codabarSerializationInfo,
    'Code11': [defaultCodeSerializationInfo],
    'Code128': code128SerializationInfo,
    'Code39': code39SerializationInfo,
    'Code39Extended': code39SerializationInfo,
    'Code93': code93SerializationInfo,
    'Code93Extended': code93SerializationInfo,
    'CodeMSI': codeMSISerializationInfo,
    'DataBar': dataBarSerializationInfo,
    'DataMatrix': dataMatrixSerializationInfo,
    'DataMatrixGS1': dataMatrixGS1SerializationInfo,
    'EAN128': EAN128SerializationInfo,
    'EAN13': [defaultCodeSerializationInfo],
    'EAN8': [defaultCodeSerializationInfo],
    'Industrial2of5': Industrial2of5SerializationInfo,
    'IntelligentMail': [defaultCodeSerializationInfo],
    'IntelligentMailPackage': [defaultCodeSerializationInfo, fnc1Substitute],
    'Interleaved2of5': Interleaved2of5SerializationInfo,
    'ITF14': Interleaved2of5SerializationInfo,
    'Matrix2of5': Industrial2of5SerializationInfo,
    'PDF417': PDF417SerializationInfo,
    'PostNet': [defaultCodeSerializationInfo],
    'SSCC': SSCCSerializationInfo,
    'QRCode': QRCodeSerializationInfo,
    'UPCA': [defaultCodeSerializationInfo],
    'UPCE0': [defaultCodeSerializationInfo],
    'UPCE1': [defaultCodeSerializationInfo],
    'UPCSupplemental2': [defaultCodeSerializationInfo],
    'UPCSupplemental5': [defaultCodeSerializationInfo],
    'Pharmacode': PharmacodeSerializationInfo,
    'DeutschePostIdentcode': [defaultCodeSerializationInfo, wideNarrowRatio3],
    'DeutschePostLeitcode': [defaultCodeSerializationInfo, wideNarrowRatio3],
    'QRCodeGS1': QRCodeGS1SerializationInfo,
    'QRCodeEPC': QRCodeEPCSerializationInfo
};
const barcodeTextFormatString = Object.assign(Object.assign({}, textFormatString), { descriptionLocalizationId: 'DevExpress.XtraReports.UI.XRBarCode.TextFormatString.Description' });
export const barcodeSerializationsInfo = [
    alignment, autoModule, barCodeOrientation, moduleInfo, showText, symbology, text, barcodeTextFormatString,
    keepTogether, anchorVertical, anchorHorizontal, action,
    $.extend({}, textAlignment, { defaultVal: 'BottomLeft' }),
    textControlScripts, barcodeFake, targetDeviceDpi,
    dataBindings(['Bookmark', 'NavigateUrl', 'Tag', 'Text']),
].concat(createSinglePopularBindingInfos('Text'), sizeLocation, commonControlProperties, fontGroup, navigationGroup, processGroup);
export const popularPropertiesBarCode = ['barcodeFake', 'module', 'targetDeviceDpi', 'autoModule', 'barCodeOrientation', 'text', 'popularDataBinding', 'textFormatString', 'bookmark', 'bookmarkParent', 'showText'];
