﻿/**
* DevExpress HTML/JS Reporting (designer\utils\_registerControls.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { bandSerializationInfo, popularPropertiesReportFooter, popularPropertiesReportHeader, reportFooterBandSerializationInfo, reportHeaderBandSerializationInfo } from '../bands/metadata/xrBandMetaData';
import { detailBandSerializationInfo, generalBandPopularProperties, popularPropertiesDetail, subBandSerializationInfo } from '../bands/metadata/xrDetailBandMetaData';
import { detailReportBandSerializationInfo, popularPropertiesDetailReport } from '../bands/metadata/xrDetailReportBandMetaData';
import { groupFooterBandSerializationInfo, groupHeaderBandSerializationInfo, popularPropertiesGroupFooter, popularPropertiesGroupHeader } from '../bands/metadata/xrGroupBandMetaData';
import { pageBandSerializationInfo, pageBandSerializationInfoPageHeader, popularPropertiesPageFooter, popularPropertiesPageHeader } from '../bands/metadata/xrPageBandMetaData';
import { popularPropertiesVerticalHeaderBand, popularPropertiesVerticalTotalBand, verticalHeaderBandSerializationInfo, verticalTotalBandSerializationInfo } from '../bands/metadata/xrVerticalBandMetaData';
import { popularPropertiesVerticalDetailBand, verticalDetailBandSerializationInfo } from '../bands/metadata/xrVerticalDetailBandMetaData';
import { BandSurface, BandViewModel } from '../bands/xrBand';
import { DetailBand, DetailBandSurface } from '../bands/xrDetailBand';
import { DetailReportBand, DetailReportBandSurface } from '../bands/xrDetailReportBand';
import { GroupHeaderBand } from '../bands/xrGroupBand';
import { BottomMarginBand, BottomMarginSurface, TopMarginBand } from '../bands/xrMarginBands';
import { PageFooterSurface } from '../bands/xrPageBand';
import { SubBandSurface, SubBandViewModel } from '../bands/xrSubband';
import { VerticalBandSurface, VerticalBandViewModel } from '../bands/xrVerticalBand';
import { VerticalDetailBandViewModel } from '../bands/xrVerticalDetailBand';
import { getNearestBand } from '../controls/getNearestBand';
import { cellserializtionInfo, popularPropertiesCrossTabCell } from '../controls/metadata/crosstab/xrCrossTabCell';
import { pivotGridFieldSerializationsInfo, popularPropertiesPivotGridField } from '../controls/metadata/pivotgrid/pivotgridfield';
import { unknownSerializationsInfo } from '../controls/metadata/properties/metadataGroups';
import { commonBandScripts } from '../controls/metadata/properties/scriptMetadata';
import { barcodeSerializationsInfo, popularPropertiesBarCode } from '../controls/metadata/xrBarcode';
import { characterCombSerializationsInfo } from '../controls/metadata/xrCharactercomb';
import { xrChartSerializationInfo } from '../controls/metadata/xrChart';
import { checkboxSerializationsInfo, popularPropertiesCheckBox } from '../controls/metadata/xrCheckbox';
import { xrControlSerializationsInfo, panelSerializationsInfo } from '../controls/metadata/xrControl';
import { crossBandBoxControlSerializationsInfo, crossBandLineControlSerializationsInfo, popularPropertiesCrossLine } from '../controls/metadata/xrCrossband';
import { crossTabSerializationInfo } from '../controls/metadata/xrCrossTab';
import { popularPropertiesGauge, xrGaugeSerializationInfo } from '../controls/metadata/xrGauge';
import { lineSerializationsInfo, popularPropertiesLine } from '../controls/metadata/xrLine';
import { pageBreakSerializationsInfo } from '../controls/metadata/xrPagebreak';
import { pageInfoSerializationsInfo, popularPropertiesPageInfo } from '../controls/metadata/xrPageinfo';
import { pdfContentSerializationInfo, popularPropertiesPdfContent } from '../controls/metadata/xrPdfContent';
import { pdfSignatureInfo } from '../controls/metadata/xrPdfSignature';
import { pictureBoxSerializationsInfo, popularPropertiesPicture } from '../controls/metadata/xrPicturebox';
import { pivotGridSerializationsInfo } from '../controls/metadata/xrPivotgrid';
import { popularPropertiesReport, reportSerializationInfo } from '../controls/metadata/xrReport';
import { popularPropertiesRichText, richTextSerializationsInfo } from '../controls/metadata/xrRichText';
import { popularPropertiesShape, shapeSerializationsInfo } from '../controls/metadata/xrShape';
import { popularPropertiesSparkline, sparklineSerializationsInfo } from '../controls/metadata/xrSparkline';
import { subreportSerializationsInfo } from '../controls/metadata/xrSubreport';
import { popularPropertiesTable, tableSerializationsInfo } from '../controls/metadata/xrTable';
import { popularPropertiesTableCell, tableCellSerializationsInfo } from '../controls/metadata/xrTableCell';
import { tocSerializationsInfo } from '../controls/metadata/xrTableOfContents';
import { tableRowSerializationsInfo } from '../controls/metadata/xrTableRow';
import { labelSerializationsInfo, popularPropertiesLabel } from '../controls/metadata/xrTextControl';
import { popularPropertiesZipCode, zipCodeSerializationInfo } from '../controls/metadata/xrZipcode';
import { PivotGridFieldSurface, PivotGridFieldViewModel } from '../controls/pivotgrid/pivotgridfield';
import { getRichEditSurface } from '../controls/richEdit';
import { SubreportViewModel } from '../controls/subreportViewModel';
import { ControlsFactory } from '../controls/utils/controlsFactory';
import { isHeaderOrFooterBandType } from '../controls/utils/_headOrFooterBandType';
import { getExistTableOfContents } from '../controls/utils/_tocUtils';
import { XRBarCodeViewModel } from '../controls/xrBarcode';
import { XRCharacterComb, XRCharacterCombSurface } from '../controls/xrCharactercomb';
import { XRChartSurface, XRChartViewModel } from '../controls/xrChart';
import { XRCheckBoxSurface, XRCheckBoxViewModel } from '../controls/xrCheckbox';
import { XRControlSurface, XRControlViewModel } from '../controls/xrControl';
import { XRCrossBandControlViewModel, XRCrossBandSurface } from '../controls/xrCrossband';
import { XRCrossTabSurface, XRCrossTabViewModel } from '../controls/xrCrossTab';
import { XRCellsurface, XRCrossTabCellViewModel } from '../controls/xrCrossTabCell';
import { XRGaugeViewModel } from '../controls/xrGauge';
import { XRLineSurface } from '../controls/xrLine';
import { XRPageBreakSurface } from '../controls/xrPagebreak';
import { XRPageInfoSurface, XRPageInfoViewModel } from '../controls/xrPageinfo';
import { XRPdfContentSurface, XRPdfContentViewModel } from '../controls/xrPdfContent';
import { XRPdfSignatureModel, XRPdfSignatureSurface } from '../controls/xrPdfSignature';
import { XRPictureBoxSurface, XRPictureBoxViewModel } from '../controls/xrPicturebox';
import { XRPivotGridSurface, XRPivotGridViewModel } from '../controls/xrPivotgrid';
import { ReportSurface } from '../controls/xrReport';
import { XRRichViewModel } from '../controls/xrRichText';
import { XRShapeControlSurface, XRShapeViewModel } from '../controls/xrShape';
import { XRSparkLineSurface, XRSparklineViewModel } from '../controls/xrSparkline';
import { XRSubreportSurface, XRSubreportViewModel } from '../controls/xrSubreport';
import { XRTableControlViewModel, XRTableSurface } from '../controls/xrTable';
import { XRTableCellSurface, XRTableCellViewModel } from '../controls/xrTableCell';
import { XRTableOfContentsSurface, XRTableOfContentsViewModel } from '../controls/xrTableOfContents';
import { XRTableRowSurface, XRTableRowViewModel } from '../controls/xrTableRow';
import { XRTextControlSurfaceBase } from '../controls/xrTextControl';
import { XRZipCodeSurface } from '../controls/xrZipcode';
import { UnknownViewModel } from '../controls/_xrTodoControl';
import { XRUnknownControlSurface } from '../controls/xrUnknownControl';
import { DefaultCrossTabControlEnum } from '../internal/_defaultCrossTabControl';
import { controlsFactory, DefaultCrossTabControl } from './settings';
import { _isMarginBand, _isPageBand, _isReorderBand } from './utils';
import { defaultTextPadding } from '../controls/metadata/properties/metadata';
const canPasteInBand = (dropTarget) => {
    const model = dropTarget.getControlModel();
    return model instanceof BandViewModel;
};
export function registerControls(fieldListProvider) {
    controlsFactory(new ControlsFactory(fieldListProvider));
    controlsFactory().registerControl('Unknown', {
        info: unknownSerializationsInfo,
        type: UnknownViewModel,
        defaultVal: {
            '@SizeF': '100,23'
        },
        nonToolboxItem: true,
        surfaceType: XRControlSurface
    });
    controlsFactory().registerControl('XRLabel', {
        info: labelSerializationsInfo,
        toolboxIndex: 0,
        defaultVal: {
            '@Padding': defaultTextPadding,
            '@Multiline': 'true',
            '@SizeF': '100,23'
        },
        group: 'common',
        defaultBindingName: 'Text',
        surfaceType: XRTextControlSurfaceBase,
        type: XRControlViewModel,
        popularProperties: popularPropertiesLabel,
        displayName: getLocalization('Label', 'DevExpress.XtraReports.UI.XRLabel')
    });
    controlsFactory().registerControl('XRCheckBox', {
        info: checkboxSerializationsInfo,
        toolboxIndex: 1,
        group: 'common',
        type: XRCheckBoxViewModel,
        surfaceType: XRCheckBoxSurface,
        defaultVal: {
            '@SizeF': '100,23',
            '@Padding': defaultTextPadding
        },
        defaultBindingName: 'CheckBoxState',
        popularProperties: popularPropertiesCheckBox,
        displayName: getLocalization('Check Box', 'DevExpress.XtraReports.UI.XRCheckBox')
    });
    controlsFactory().registerControl('XRRichText', {
        info: richTextSerializationsInfo,
        toolboxIndex: 2,
        group: 'common',
        defaultVal: {
            '@SizeF': '100,23',
            '@Padding': defaultTextPadding
        },
        surfaceType: getRichEditSurface()(),
        type: XRRichViewModel,
        defaultBindingName: 'Rtf',
        popularProperties: popularPropertiesRichText,
        displayName: getLocalization('Rich Text', 'DevExpress.XtraReports.UI.XRRichText')
    });
    controlsFactory().registerControl('XRPictureBox', {
        info: pictureBoxSerializationsInfo,
        toolboxIndex: 3,
        group: 'common',
        defaultVal: {
            '@SizeF': '100,100',
            '@Sizing': 'ZoomImage',
        },
        type: XRPictureBoxViewModel,
        surfaceType: XRPictureBoxSurface,
        defaultBindingName: 'ImageSource',
        popularProperties: popularPropertiesPicture,
        displayName: getLocalization('Picture Box', 'DevExpress.XtraReports.UI.XRPictureBox')
    });
    controlsFactory().registerControl('XRPanel', {
        info: panelSerializationsInfo,
        toolboxIndex: 4,
        group: 'common',
        defaultVal: {
            '@SizeF': '300,75'
        },
        surfaceType: XRControlSurface,
        type: XRControlViewModel,
        isContainer: true,
        displayName: getLocalization('Panel', 'DevExpress.XtraReports.UI.XRPanel')
    });
    controlsFactory().registerControl('XRTable', {
        info: tableSerializationsInfo,
        group: 'common',
        type: XRTableControlViewModel,
        toolboxIndex: 5,
        defaultVal: {
            '@SizeF': '300,25',
            '@Padding': defaultTextPadding,
            'Rows': {
                'Item1': {
                    '@ControlType': 'XRTableRow',
                    '@Weight': '1',
                    'Cells': {
                        'Item1': {
                            '@ControlType': 'XRTableCell',
                            '@Weight': '1',
                            '@Multiline': 'true'
                        },
                        'Item2': {
                            '@ControlType': 'XRTableCell',
                            '@Weight': '1',
                            '@Multiline': 'true'
                        },
                        'Item3': {
                            '@ControlType': 'XRTableCell',
                            '@Weight': '1',
                            '@Multiline': 'true'
                        }
                    }
                }
            }
        },
        surfaceType: XRTableSurface,
        popularProperties: popularPropertiesTable,
        isContainer: true,
        isPasteDeny: true,
        canDrop: (dropTarget) => dropTarget.getControlModel().controlType !== 'XRTableRow',
        displayName: getLocalization('Table', 'DevExpress.XtraReports.UI.XRTable')
    });
    controlsFactory().registerControl('XRCharacterComb', {
        info: characterCombSerializationsInfo,
        toolboxIndex: 6,
        group: 'common',
        defaultVal: {
            '@SizeF': '200,80',
            '@Multiline': 'true'
        },
        defaultBindingName: 'Text',
        surfaceType: XRCharacterCombSurface,
        type: XRCharacterComb,
        popularProperties: popularPropertiesLabel,
        displayName: getLocalization('Character Comb', 'DevExpress.XtraReports.UI.XRCharacterComb')
    });
    controlsFactory().registerControl('XRLine', {
        info: lineSerializationsInfo,
        group: 'graphics',
        toolboxIndex: 7,
        type: XRControlViewModel,
        surfaceType: XRLineSurface,
        defaultVal: {
            '@SizeF': '100,23',
        },
        popularProperties: popularPropertiesLine,
        displayName: getLocalization('Line', 'DevExpress.XtraReports.UI.XRLine')
    });
    controlsFactory().registerControl('XRShape', {
        info: shapeSerializationsInfo,
        toolboxIndex: 8,
        group: 'graphics',
        defaultVal: {
            '@SizeF': '100,100'
        },
        defaultBindingName: 'Tag',
        type: XRShapeViewModel,
        surfaceType: XRShapeControlSurface,
        popularProperties: popularPropertiesShape,
        displayName: getLocalization('Shape', 'DevExpress.XtraReports.UI.XRShape')
    });
    controlsFactory().registerControl('XRBarCode', {
        info: barcodeSerializationsInfo,
        toolboxIndex: 9,
        group: 'graphics',
        defaultVal: {
            '@SizeF': '200,75',
            '@Padding': '10,10,0,0,100',
            'Symbology': {
                '@Name': 'Code128'
            },
            '@Text': ''
        },
        defaultBindingName: 'Text',
        surfaceType: XRUnknownControlSurface,
        type: XRBarCodeViewModel,
        popularProperties: popularPropertiesBarCode,
        displayName: getLocalization('Bar Code', 'DevExpress.XtraReports.UI.XRBarCode')
    });
    controlsFactory().registerControl('XRZipCode', {
        info: zipCodeSerializationInfo,
        type: XRControlViewModel,
        nonToolboxItem: true,
        group: 'graphics',
        surfaceType: XRZipCodeSurface,
        toolboxIndex: 10,
        defaultVal: {
            '@SizeF': '100,23'
        },
        popularProperties: popularPropertiesZipCode,
        displayName: getLocalization('Zip Code', 'DevExpress.XtraReports.UI.XRZipCode')
    });
    controlsFactory().registerControl('XRChart', {
        info: xrChartSerializationInfo,
        group: 'complex',
        toolboxIndex: 11,
        defaultVal: {
            '@SizeF': '400,300',
            'Chart': {
                'Diagram': {
                    '@TypeNameSerializable': 'XYDiagram',
                    'AxisY': {
                        '@VisibleInPanesSerializable': '-1'
                    },
                    'AxisX': {
                        '@VisibleInPanesSerializable': '-1'
                    }
                },
                'DataContainer': {}
            }
        },
        defaultBindingName: 'Tag',
        type: XRChartViewModel,
        surfaceType: XRChartSurface,
        popularProperties: ['dataSource', 'dataMember', 'controlParameters'],
        displayName: getLocalization('Chart', 'DevExpress.XtraReports.UI.XRChart')
    });
    controlsFactory().registerControl('XRGauge', {
        info: xrGaugeSerializationInfo,
        surfaceType: XRUnknownControlSurface,
        type: XRGaugeViewModel,
        group: 'complex',
        toolboxIndex: 12,
        defaultVal: {
            '@SizeF': '220,120'
        },
        defaultBindingName: 'Tag',
        popularProperties: popularPropertiesGauge,
        displayName: getLocalization('Gauge', 'DevExpress.XtraReports.UI.XRGauge')
    });
    controlsFactory().registerControl('XRSparkline', {
        info: sparklineSerializationsInfo,
        toolboxIndex: 13,
        group: 'complex',
        defaultVal: {
            '@SizeF': '150,80',
            'View': {
                '@Type': 'Line'
            },
        },
        surfaceType: XRSparkLineSurface,
        defaultBindingName: 'Tag',
        type: XRSparklineViewModel,
        popularProperties: popularPropertiesSparkline,
        displayName: getLocalization('Sparkline', 'DevExpress.XtraReports.UI.XRSparkline')
    });
    controlsFactory().registerControl('XRPivotGrid', {
        info: pivotGridSerializationsInfo,
        toolboxIndex: 14,
        group: 'complex',
        defaultVal: {
            '@ControlType': 'XRPivotGrid',
            '@SizeF': '250,120',
            'OptionsChartDataSource': {},
            'Prefilter': {},
            'OptionsPrint': {
                '@FilterSeparatorBarPadding': '3',
                '@UsePrintAppearance': 'true',
                '@PrintFilterHeaders': 'False'
            },
            'OptionsView': {}
        },
        canPaste: canPasteInBand,
        defaultBindingName: 'Tag',
        type: XRPivotGridViewModel,
        surfaceType: XRPivotGridSurface,
        nonToolboxItem: DefaultCrossTabControl() == DefaultCrossTabControlEnum.XRCrossTab,
        popularProperties: ['dataSource', 'dataMember'],
        displayName: getLocalization('Pivot Grid', 'DevExpress.XtraReports.UI.XRPivotGrid')
    });
    controlsFactory().registerControl('XRCrossTab', {
        info: crossTabSerializationInfo,
        toolboxIndex: 14,
        type: XRCrossTabViewModel,
        group: 'complex',
        defaultVal: {
            '@ControlType': 'XRCrossTab',
            '@SizeF': '200,50',
            'ColumnDefinitions': {
                'Item1': {},
                'Item2': {}
            },
            'RowDefinitions': {
                'Item1': {},
                'Item2': {}
            },
            'Cells': {
                'Item1': { '@ControlType': 'XRCrossTabCell', '@ColumnIndex': '0', '@RowIndex': '0', '@Text': null },
                'Item2': { '@ControlType': 'XRCrossTabCell', '@ColumnIndex': '1', '@RowIndex': '1', '@Text': null },
                'Item3': { '@ControlType': 'XRCrossTabCell', '@ColumnIndex': '1', '@RowIndex': '0', '@Text': null },
                'Item4': { '@ControlType': 'XRCrossTabCell', '@ColumnIndex': '0', '@RowIndex': '1', '@Text': null }
            }
        },
        surfaceType: XRCrossTabSurface,
        displayName: getLocalization('Cross Tab', 'DevExpress.XtraReports.UI.XRCrossTab'),
        nonToolboxItem: DefaultCrossTabControl() == DefaultCrossTabControlEnum.XRPivotGrid,
        popularProperties: ['dataSource', 'dataMember', 'layoutOptions', 'printOptions', 'controlParameters', 'filterString']
    });
    controlsFactory().registerControl('XRCrossTabCell', {
        info: cellserializtionInfo,
        type: XRCrossTabCellViewModel,
        popularProperties: popularPropertiesCrossTabCell,
        nonToolboxItem: true,
        isDeleteDeny: true,
        group: 'complex',
        defaultVal: {
            '@ControlType': 'XRCrossTabCell',
            '@Text': '',
            '@TextFormatString': ''
        },
        surfaceType: XRCellsurface,
        displayName: getLocalization('Cross Tab Cell', 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell')
    });
    controlsFactory().registerControl('XRSubreport', {
        info: subreportSerializationsInfo,
        toolboxIndex: 15,
        group: 'complex',
        defaultVal: {
            '@SizeF': '100,23',
            'ReportSource': SubreportViewModel.defaultReport
        },
        surfaceType: XRSubreportSurface,
        type: XRSubreportViewModel,
        canPaste: canPasteInBand,
        popularProperties: ['name', 'reportSourceUrl'],
        displayName: getLocalization('Sub-Report', 'DevExpress.XtraReports.UI.XRSubreport')
    });
    controlsFactory().registerControl('XRPdfContent', {
        info: pdfContentSerializationInfo,
        toolboxIndex: 16,
        group: 'complex',
        defaultVal: {
            '@HeightF': '23'
        },
        defaultBindingName: 'SourceUrl',
        surfaceType: XRPdfContentSurface,
        type: XRPdfContentViewModel,
        popularProperties: popularPropertiesPdfContent,
        displayName: getLocalization('PDF Content', 'DevExpress.XtraReports.UI.XRPdfContent'),
        canDrop: (dropTarget, dragFrom) => {
            const bandModel = getNearestBand(dropTarget.getControlModel());
            return bandModel && !_isMarginBand(bandModel) && !_isPageBand(bandModel);
        },
        canPaste: canPasteInBand
    });
    controlsFactory().registerControl('XRPdfSignature', {
        info: pdfSignatureInfo,
        type: XRPdfSignatureModel,
        toolboxIndex: 17,
        group: 'complex',
        defaultVal: {
            '@SizeF': '200,100',
            'SignatureOptions': {
                '@DisplayDocumentSignature': 'false'
            }
        },
        surfaceType: XRPdfSignatureSurface,
        popularProperties: ['signatureOptions'],
        displayName: getLocalization('PDF Signature', 'DevExpress.XtraReports.UI.XRPdfSignature')
    });
    controlsFactory().registerControl('XRTableOfContents', {
        toolboxIndex: 18,
        info: tocSerializationsInfo,
        group: 'misc',
        surfaceType: XRTableOfContentsSurface,
        type: XRTableOfContentsViewModel,
        defaultVal: {
            '@ControlType': 'XRTableOfContents',
            'LevelTitle': {
                '@Text': 'Title',
                '@Height': '23',
                '@Padding': '0,0,0,0,100'
            },
            'LevelDefault': {
                '@Height': '23',
                '@Padding': '0,0,0,0,100'
            }
        },
        canDrop: (dropTarget, dragFrom) => {
            const bandModel = getNearestBand(dropTarget.getControlModel());
            if (!bandModel)
                return false;
            if (!dragFrom) {
                const reportModel = bandModel.root;
                return reportModel.canAddToC();
            }
            else if (isHeaderOrFooterBandType(bandModel)) {
                const toc = getExistTableOfContents(bandModel);
                return !toc || toc === dragFrom;
            }
            return false;
        },
        displayName: getLocalization('Table of Contents', 'DevExpress.XtraReports.UI.XRTableOfContents')
    });
    controlsFactory().registerControl('XRPageInfo', {
        info: pageInfoSerializationsInfo,
        type: XRPageInfoViewModel,
        surfaceType: XRPageInfoSurface,
        toolboxIndex: 19,
        group: 'misc',
        defaultVal: {
            '@SizeF': '100,23',
            '@Padding': defaultTextPadding
        },
        popularProperties: popularPropertiesPageInfo,
        displayName: getLocalization('Page Info', 'DevExpress.XtraReports.UI.XRPageInfo')
    });
    controlsFactory().registerControl('XRPageBreak', {
        info: pageBreakSerializationsInfo,
        type: XRControlViewModel,
        surfaceType: XRPageBreakSurface,
        toolboxIndex: 20,
        group: 'misc',
        defaultVal: {
            '@SizeF': '30,2'
        },
        canPaste: canPasteInBand,
        displayName: getLocalization('Page Break', 'DevExpress.XtraReports.UI.XRPageBreak')
    });
    controlsFactory().registerControl('XRCrossBandLine', {
        info: crossBandLineControlSerializationsInfo,
        type: XRCrossBandControlViewModel,
        toolboxIndex: 21,
        group: 'misc',
        defaultVal: {
            '@WidthF': '9.38',
            '@StartPointFloat': '0,0',
            '@EndPointFloat': '0,50'
        },
        size: '9.38, 50',
        surfaceType: XRCrossBandSurface,
        popularProperties: popularPropertiesCrossLine,
        displayName: getLocalization('Cross-band Line', 'DevExpress.XtraReports.UI.XRCrossBandLine')
    });
    controlsFactory().registerControl('XRCrossBandBox', {
        info: crossBandBoxControlSerializationsInfo,
        type: XRCrossBandControlViewModel,
        toolboxIndex: 22,
        group: 'misc',
        defaultVal: {
            '@WidthF': '50',
            '@StartPointFloat': '0,0',
            '@EndPointFloat': '0,50'
        },
        size: '50,50',
        popularProperties: ['borderColor', 'visible', 'canPublish', 'borders'],
        surfaceType: XRCrossBandSurface,
        displayName: getLocalization('Cross-band Box', 'DevExpress.XtraReports.UI.XRCrossBandBox')
    });
    controlsFactory().registerControl('DevExpress.XtraReports.UI.XtraReport', {
        info: reportSerializationInfo,
        nonToolboxItem: true,
        surfaceType: ReportSurface,
        popularProperties: popularPropertiesReport,
        isCopyDeny: true,
        isDeleteDeny: true,
        displayName: getLocalization('Report', 'DevExpress.XtraReports.UI.XtraReport')
    });
    controlsFactory().registerControl('TopMarginBand', {
        info: bandSerializationInfo.concat(commonBandScripts),
        type: TopMarginBand,
        nonToolboxItem: true,
        surfaceType: BandSurface,
        isContainer: true,
        isCopyDeny: true,
        isDeleteDeny: true,
        displayName: getLocalization('Top Margin', 'DevExpress.XtraReports.UI.TopMarginBand')
    });
    controlsFactory().registerControl('BottomMarginBand', {
        info: bandSerializationInfo.concat(commonBandScripts),
        type: BottomMarginBand,
        nonToolboxItem: true,
        surfaceType: BottomMarginSurface,
        isContainer: true,
        isCopyDeny: true,
        isDeleteDeny: true,
        displayName: getLocalization('Bottom Margin', 'DevExpress.XtraReports.UI.BottomMarginBand')
    });
    controlsFactory().registerControl('DetailReportBand', {
        info: detailReportBandSerializationInfo,
        type: DetailReportBand,
        nonToolboxItem: true,
        surfaceType: DetailReportBandSurface,
        popularProperties: popularPropertiesDetailReport,
        isContainer: true,
        isCopyDeny: true,
        canDrop: (dropTarget, draggableModel) => {
            const dropTargetModel = dropTarget.getControlModel();
            return (dropTargetModel.controlType === 'DevExpress.XtraReports.UI.XtraReport' || dropTargetModel.controlType === 'DetailReportBand');
        },
        displayName: getLocalization('Detail Report', 'DevExpress.XtraReports.UI.DetailReportBand')
    });
    controlsFactory().registerControl('DetailBand', {
        info: detailBandSerializationInfo,
        type: DetailBand,
        nonToolboxItem: true,
        surfaceType: DetailBandSurface,
        popularProperties: popularPropertiesDetail,
        isContainer: true,
        isCopyDeny: true,
        isDeleteDeny: true,
        displayName: getLocalization('Detail', 'DevExpress.XtraReports.UI.DetailBand')
    });
    controlsFactory().registerControl('SubBand', {
        info: subBandSerializationInfo,
        type: SubBandViewModel,
        nonToolboxItem: true,
        surfaceType: SubBandSurface,
        popularProperties: generalBandPopularProperties,
        isContainer: true,
        isCopyDeny: true,
        canDrop: (dropTarget, draggableModel) => {
            const dropTargetModel = dropTarget.getControlModel();
            return draggableModel.parentModel() === dropTargetModel.parentModel() && dropTargetModel.controlType === 'SubBand';
        },
        displayName: getLocalization('Sub-Band', 'DevExpress.XtraReports.UI.SubBand')
    });
    controlsFactory().registerControl('GroupHeaderBand', {
        info: groupHeaderBandSerializationInfo,
        type: GroupHeaderBand,
        nonToolboxItem: true,
        surfaceType: BandSurface,
        popularProperties: popularPropertiesGroupHeader,
        isContainer: true,
        isCopyDeny: true,
        canDrop: _isReorderBand,
        displayName: getLocalization('Group Header', 'DevExpress.XtraReports.UI.GroupHeaderBand')
    });
    controlsFactory().registerControl('GroupFooterBand', {
        info: groupFooterBandSerializationInfo,
        type: BandViewModel,
        nonToolboxItem: true,
        surfaceType: BandSurface,
        popularProperties: popularPropertiesGroupFooter,
        isContainer: true,
        isCopyDeny: true,
        canDrop: _isReorderBand,
        displayName: getLocalization('Group Footer', 'DevExpress.XtraReports.UI.GroupFooterBand')
    });
    controlsFactory().registerControl('PageHeaderBand', {
        info: pageBandSerializationInfoPageHeader,
        type: BandViewModel,
        nonToolboxItem: true,
        surfaceType: BandSurface,
        popularProperties: popularPropertiesPageHeader,
        isContainer: true,
        isCopyDeny: true,
        displayName: getLocalization('Page Header', 'DevExpress.XtraReports.UI.PageHeaderBand')
    });
    controlsFactory().registerControl('PageFooterBand', {
        info: pageBandSerializationInfo,
        type: BandViewModel,
        nonToolboxItem: true,
        surfaceType: PageFooterSurface,
        popularProperties: popularPropertiesPageFooter,
        isContainer: true,
        isCopyDeny: true,
        displayName: getLocalization('Page Footer', 'DevExpress.XtraReports.UI.PageFooterBand')
    });
    controlsFactory().registerControl('ReportHeaderBand', {
        info: reportHeaderBandSerializationInfo,
        type: BandViewModel,
        nonToolboxItem: true,
        surfaceType: BandSurface,
        popularProperties: popularPropertiesReportHeader,
        isContainer: true,
        isCopyDeny: true,
        displayName: getLocalization('Report Header', 'DevExpress.XtraReports.UI.ReportHeaderBand')
    });
    controlsFactory().registerControl('ReportFooterBand', {
        info: reportFooterBandSerializationInfo,
        type: BandViewModel,
        nonToolboxItem: true,
        popularProperties: popularPropertiesReportFooter,
        surfaceType: BandSurface,
        isContainer: true,
        isCopyDeny: true,
        displayName: getLocalization('Report Footer', 'DevExpress.XtraReports.UI.ReportFooterBand')
    });
    controlsFactory().registerControl('VerticalHeaderBand', {
        info: verticalHeaderBandSerializationInfo,
        type: VerticalBandViewModel,
        nonToolboxItem: true,
        popularProperties: popularPropertiesVerticalHeaderBand,
        surfaceType: VerticalBandSurface,
        isContainer: true,
        isCopyDeny: true
    });
    controlsFactory().registerControl('VerticalDetailBand', {
        info: verticalDetailBandSerializationInfo,
        type: VerticalDetailBandViewModel,
        nonToolboxItem: true,
        popularProperties: popularPropertiesVerticalDetailBand,
        surfaceType: VerticalBandSurface,
        isContainer: true,
        isCopyDeny: true,
        isDeleteDeny: true
    });
    controlsFactory().registerControl('VerticalTotalBand', {
        info: verticalTotalBandSerializationInfo,
        type: VerticalBandViewModel,
        nonToolboxItem: true,
        popularProperties: popularPropertiesVerticalTotalBand,
        surfaceType: VerticalBandSurface,
        isContainer: true,
        isCopyDeny: true
    });
    controlsFactory().registerControl('PivotGridField', {
        info: pivotGridFieldSerializationsInfo,
        type: PivotGridFieldViewModel,
        surfaceType: PivotGridFieldSurface,
        nonToolboxItem: true,
        popularProperties: popularPropertiesPivotGridField,
        displayName: 'PivotGridField'
    });
    controlsFactory().registerControl('XRTableRow', {
        info: tableRowSerializationsInfo,
        type: XRTableRowViewModel,
        defaultVal: {
            '@HeightF': '25',
            '@Weight': '20'
        },
        nonToolboxItem: true,
        surfaceType: XRTableRowSurface,
        isContainer: true,
        isCopyDeny: true,
        isPasteDeny: true,
        canDrop: (dropTarget) => dropTarget.getControlModel().controlType === 'XRTable',
        displayName: getLocalization('Table Row', 'DevExpress.XtraReports.UI.XRTableRow')
    });
    controlsFactory().registerControl('XRTableCell', {
        info: tableCellSerializationsInfo,
        type: XRTableCellViewModel,
        defaultVal: {
            '@Weight': '1',
            '@WidthF': '100',
            '@Multiline': 'true'
        },
        nonToolboxItem: true,
        surfaceType: XRTableCellSurface,
        popularProperties: popularPropertiesTableCell,
        isContainer: true,
        defaultBindingName: 'Text',
        isCopyDeny: true,
        canDrop: (dropTarget) => dropTarget.getControlModel().controlType === 'XRTableRow',
        displayName: getLocalization('Table Cell', 'DevExpress.XtraReports.UI.XRTableCell')
    });
    controlsFactory().registerControl('XRControl', {
        isToolboxItem: false,
        info: xrControlSerializationsInfo,
        defaultVal: {
            '@Padding': defaultTextPadding,
            '@SizeF': '100,23'
        },
        surfaceType: XRUnknownControlSurface,
        type: XRControlViewModel,
        popularProperties: [],
        displayName: 'XRControl'
    });
}