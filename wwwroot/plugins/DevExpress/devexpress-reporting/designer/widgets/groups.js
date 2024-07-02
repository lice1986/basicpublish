﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\groups.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { appearanceName, paletteName, pivotGridDataSourceOptions, seriesDataMember } from '../../chart/internal/meta/_chart';
import { rotated } from '../../chart/internal/meta/_common';
import { chartDataSource } from '../../chart/internal/_editorTemplates';
import { pageRange } from '../../common/exportOptions/metadata';
import { imageAlignment, sizing } from '../../viewer/editing/editingField';
import { drillDownControl, drillDownDetailReportExpanded, height, keepTogetherWithDetailReports, level, pageBreak, printAcrossBands, printAtBottom, repeatEveryPage } from '../bands/metadata/bandsMetadata';
import { multiColumn } from '../bands/metadata/multiColumnMetaData';
import { fillEmptySpace, hierarchyPrintOptions, sortFields } from '../bands/metadata/xrDetailBandMetaData';
import { groupFields, groupFooterUnion, groupUnion, sortingSummary } from '../bands/metadata/xrGroupBandMetaData';
import { printOn } from '../bands/metadata/xrPageBandMetaData';
import { columnFields, crossTabGroupInterval, crossTabGroupIntervalNumericRange, crossTabSortBySummaryInfo, dataFields, rowFields } from '../controls/metadata/crosstab/fields';
import { crossTabLayoutOptions } from '../controls/metadata/crosstab/layoutOptions';
import { crossTabPrintOptions } from '../controls/metadata/crosstab/printOptions';
import { columnAutoWidthMode, columnIndex, columnVisible, rowAutoHeightMode, rowIndex, rowVisible } from '../controls/metadata/crosstab/xrCrossTabCell';
import { allowedAreas, area, areaIndexEditable, caption, cellFormat, columnValueLineCount, displayFolder, emptyCellText, emptyValueText, expandedInFieldsGroup, fieldName, grandTotalCellFormat, grandTotalText, groupInterval, groupIntervalNumericRange, KPIGraphic, minWidth, options, pivotGridFieldsSerializable, rowValueLineCount, runningTotal, showNewValues, sortBySummary, sortMode, sortOrder, summaryDisplayType, topValueCount, topValueShowOthers, topValueType, totalCellFormat, totalsVisibility, totalValueFormat, unboundExpression, unboundExpressionMode, unboundFieldName, unboundType, useNativeFormat, valueFormat } from '../controls/metadata/pivotgrid/pivotgridfield';
import { summaryType } from '../controls/metadata/pivotgrid/sortBySummary';
import { anchorHorizontal, anchorVertical } from '../controls/metadata/properties/anchoring';
import { editOptions, textEditOptions } from '../controls/metadata/properties/editOptions';
import { conditionObj, formatting } from '../controls/metadata/properties/formattingrules';
import { formattingRuleLinks } from '../controls/metadata/properties/formattingRulesLink';
import { accessibleDescription, accessibleRole, allowMarkupText, angle, autoWidth, backColor, bookmark, bookmarkParent, borderColor, borderDashStyle, borders, borderWidth, canGrow, canPublish, canShrink, dataAdapter, dataMember, dataSource, displayName, expressionableFont, filterStringEditable, font, foreColor, imageType, keepTogether, lineStyle, lineWidth, location, multiline, name, navigateUrl, nullValueText, padding, processDuplicatesMode, processDuplicatesTarget, processNullValues, reportPrintOptions, rtl, size, summary, tag, target, text, textAlignment, textArea, textFitMode, textFormatString, textTrimming, visible, wordWrap, xlsxFormatString } from '../controls/metadata/properties/metadata';
import { allScripts } from '../controls/metadata/properties/scriptMetadata';
import { interactiveSorting } from '../controls/metadata/properties/sortingOptions';
import { stylePriority, stylesInfo } from '../controls/metadata/properties/style';
import { alignment, autoModule, barcodeFake, barCodeOrientation, moduleInfo, showText, targetDeviceDpi } from '../controls/metadata/xrBarcode';
import { cellHeight, cellHorizontalSpacing, cellSizeMode, cellVerticalSpacing, cellWidth, characterCombFont } from '../controls/metadata/xrCharactercomb';
import { controlParametersInfo } from '../controls/metadata/xrChart';
import { checked, checkEditOptions, checkState, glyphOptions } from '../controls/metadata/xrCheckbox';
import { borderDashStyleCrossband, endBand, endPoint, startBand, startPoint, width } from '../controls/metadata/xrCrossband';
import { actualValue, maximum, minimum, targetValue, tickmarkCount, viewStyle, viewTheme, viewType } from '../controls/metadata/xrGauge';
import { lineDirection } from '../controls/metadata/xrLine';
import { pageInfo, runningBand, startPageNumber } from '../controls/metadata/xrPageinfo';
import { pageCount, pdfSource, pdfSourceUrl } from '../controls/metadata/xrPdfContent';
import { signatureOptions } from '../controls/metadata/xrPdfSignature';
import { imageEditOptions, imageSource, imageUrl, useImageMetadata } from '../controls/metadata/xrPicturebox';
import { pivotGridAppearances, pivotGridOptions, prefilter } from '../controls/metadata/xrPivotgrid';
import { bookmarkDuplicateSuppress, calculatedFields, defaultPrinterSettingsUsingInfo, drawWatermark, horizontalContentSplitting, landscape, language, margins, measureUnit, pageColor, pageHeight, pageWidth, paperKind, parametersInfo, reportExportOptionsSerializationInfo, requestParameters, rollPaper, rtlLayout, rtlReport, scriptLanguage, scriptReferencesString, showPreviewMarginLines, snapGridSize, verticalContentSplitting, watermarkId, watermarks } from '../controls/metadata/xrReport';
import { newDocumentData, rtf, textRtf } from '../controls/metadata/xrRichText';
import { fillColor, shapeFake, stretch } from '../controls/metadata/xrShape';
import { sparklineFake, valueMember, valueRange } from '../controls/metadata/xrSparkline';
import { generateOwnPages, parameterBindings, reportSourceUrl } from '../controls/metadata/xrSubreport';
import { processHiddenCellMode } from '../controls/metadata/xrTable';
import { rowSpan } from '../controls/metadata/xrTableCell';
import { maxNestingLevel, tocLevelDefault, tocLevels, tocTitle } from '../controls/metadata/xrTableOfContents';
import { segmentWidth } from '../controls/metadata/xrZipcode';
import { calculatedFieldExpression } from '../dataObjects/metadata/calculatedField';
import { dataBindings } from '../dataObjects/metadata/dataBinding';
import { action } from '../controls/metadata/properties/action';
export const groups = {
    'Styles': {
        info: stylesInfo,
        displayName: () => getLocalization('Styles', 'DevExpress.XtraReports.UI.XRPivotGrid.Styles')
    },
    'Appearance': {
        info: [
            appearanceName, pivotGridAppearances, alignment, backColor, borderColor,
            borderDashStyle, borderDashStyleCrossband, borderWidth, borders,
            caption, cellFormat, columnValueLineCount,
            displayFolder, emptyCellText, emptyValueText,
            fillColor, font, expressionableFont, characterCombFont, foreColor,
            glyphOptions,
            grandTotalCellFormat, grandTotalText,
            lineDirection, lineStyle, lineWidth, padding, pageColor,
            paletteName, imageType, rowValueLineCount,
            signatureOptions, sparklineFake,
            stylePriority, textAlignment, textTrimming, totalCellFormat,
            totalValueFormat, valueFormat, viewStyle, viewTheme,
            viewType, formattingRuleLinks,
            columnIndex, rowIndex, watermarkId, watermarks
        ],
        displayName: () => getLocalization('Appearance', 'DevExpress.XtraReports.UI.XRPivotGrid.Appearance')
    },
    'Behavior': {
        info: [
            allowedAreas, anchorVertical, anchorHorizontal, angle,
            area, areaIndexEditable, autoModule, allowMarkupText, autoWidth,
            barCodeOrientation, canGrow, canPublish, canShrink, conditionObj,
            drillDownControl, drillDownDetailReportExpanded, hierarchyPrintOptions, fillEmptySpace,
            generateOwnPages, columnAutoWidthMode, rowAutoHeightMode, rowVisible, columnVisible,
            groupInterval, groupIntervalNumericRange, totalsVisibility,
            displayName, formatting, groupFields, groupUnion, groupFooterUnion,
            keepTogether, keepTogetherWithDetailReports, level,
            moduleInfo, multiline, multiColumn,
            pageBreak, pageInfo, printAtBottom, printOn, printAcrossBands, processDuplicatesMode, processDuplicatesTarget, processNullValues,
            repeatEveryPage, measureUnit, rotated, runningBand, requestParameters, rowSpan,
            segmentWidth, shapeFake, sizing, imageAlignment, useImageMetadata, showPreviewMarginLines, showText, startPageNumber, stretch, barcodeFake, targetDeviceDpi,
            textFitMode, verticalContentSplitting, visible, wordWrap, scriptLanguage,
            reportExportOptionsSerializationInfo, horizontalContentSplitting,
            scriptReferencesString, allScripts, sortingSummary,
            tocTitle, tocLevelDefault, tocLevels, maxNestingLevel,
            editOptions, textEditOptions, checkEditOptions, imageEditOptions, interactiveSorting, sortBySummary,
            processHiddenCellMode, crossTabLayoutOptions, crossTabPrintOptions
        ],
        displayName: () => getLocalization('Behavior', 'ReportStringId.CatBehavior')
    },
    'Data': {
        info: [
            accessibleDescription, accessibleRole, actualValue, seriesDataMember,
            checkState, checked, chartDataSource,
            dataSource, dataMember, dataAdapter, expandedInFieldsGroup, pivotGridDataSourceOptions,
            fieldName, filterStringEditable,
            imageSource, imageUrl, tickmarkCount, maximum, minimum, nullValueText, prefilter,
            runningTotal, sortFields, summary, showNewValues,
            sortMode, sortOrder, summaryDisplayType, summaryType,
            targetValue, tag, text, textArea, rtf, textRtf, newDocumentData, topValueCount, topValueShowOthers, topValueType,
            unboundExpression, unboundExpressionMode, unboundFieldName, unboundType, useNativeFormat,
            xlsxFormatString,
            pivotGridFieldsSerializable,
            valueMember, valueRange,
            reportSourceUrl, calculatedFields, parameterBindings, parametersInfo, controlParametersInfo,
            dataBindings([]), textFormatString,
            pdfSource, pdfSourceUrl,
            rowFields, columnFields, dataFields,
            calculatedFieldExpression,
            crossTabGroupInterval, crossTabGroupIntervalNumericRange, crossTabSortBySummaryInfo,
            pageRange, pageCount
        ],
        displayName: () => getLocalization('Data', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Data')
    },
    'Design': {
        info: [name, snapGridSize, drawWatermark, language],
        displayName: () => getLocalization('Design', 'ReportStringId.CatDesign')
    },
    'Layout': {
        info: [
            cellHeight, cellHorizontalSpacing, cellSizeMode, cellVerticalSpacing, cellWidth,
            startBand, startPoint, endBand, endPoint, height,
            location, size, minWidth, width
        ],
        displayName: () => getLocalization('Layout', 'DevExpress.XtraReports.UI.MultiColumn.Layout')
    },
    'Navigation': {
        info: [
            action, bookmark, bookmarkParent, bookmarkDuplicateSuppress, target, navigateUrl
        ],
        displayName: () => getLocalization('Navigation', 'ASPxReportsStringId.DocumentViewer_RibbonNavigationGroupText')
    },
    'Page Settings': {
        info: [
            landscape, rollPaper, pageWidth, pageHeight, paperKind, margins, defaultPrinterSettingsUsingInfo
        ],
        displayName: () => getLocalization('Page Settings', 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.PageSettings')
    },
    'Printing': {
        info: [rtl, rtlReport, rtlLayout, reportPrintOptions],
        displayName: () => getLocalization('Printing', 'ReportStringId.CatPrinting')
    },
    'Options': {
        info: pivotGridOptions.concat(options),
        displayName: () => getLocalization('Options', 'DevExpress.XtraPivotGrid.PivotGridFieldBase.Options')
    },
    'KPI': {
        info: [KPIGraphic],
        displayName: () => getLocalization('Appearance', 'DevExpress.XtraReports.UI.XRPivotGrid.Appearance')
    },
    'Custom': {
        info: [],
        displayName: () => getLocalization('Custom properties', '')
    }
};
