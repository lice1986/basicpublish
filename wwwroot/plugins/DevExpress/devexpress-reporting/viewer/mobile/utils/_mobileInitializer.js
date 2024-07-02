﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\utils\_mobileInitializer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MobileReportPreview } from '../mobilePreview';
import { MobileSearchViewModel } from '../internal/_mobileSearch';
import { GalleryModel } from '../internal/gallery/_galleryModel';
import { MobilePaginator } from '../internal/_paginator';
import { PreviewParametersViewModel } from '../../parameters/previewParametersViewModel';
import { PreviewRequestWrapper } from '../../internal/_previewRequestWrapper';
import { updatePreviewContentSizeMobile } from '../internal/_sizeUtils';
import { MobilePreviewParameterHelper } from '../internal/_mobilePreviewParameterHelper';
import { ExportOptionsModel } from '../../exportOptions/exportOptionsModel';
import { ExportFormatID, PreviewElements } from '../../constants';
import { getPreviewActionsMobile } from './_mobileActionList';
import { MobilePreviewModel } from '../internal/_mobilePreviewModel';
import { ParametersPopupModel } from '../internal/_parametersPopup';
import { MobilePreviewElements } from '../constants';
import { getUpdateProgressBarCallback } from '../../internal/_progressBarUtils';
import { getDockedElementCallback } from '../../internal/_sizeUtils';
import { appendStaticContextToRootViewModel, staticContext } from '@devexpress/analytics-core/analytics-internal-native';
import * as $ from 'jquery';
import { BreadcrumbModel } from '../../internal/_previewBreadcrumbs';
export function createMobilePreview(bindingSettings) {
    const callbacks = bindingSettings.callbacks;
    const bindingModel = bindingSettings.model;
    const bindingElement = bindingSettings.element;
    const previewWrapper = new PreviewRequestWrapper(null, callbacks), breadcrumb = new BreadcrumbModel(), reportPreview = new MobileReportPreview(bindingModel.handlerUri, previewWrapper, undefined, callbacks, undefined, bindingModel.mobileModeSettings, breadcrumb, bindingModel.exportSettings);
    const $root = $.fn.constructor(bindingElement);
    const updatePreviewContentSize_ = updatePreviewContentSizeMobile(reportPreview, $root);
    updatePreviewContentSize_();
    const gallery = new GalleryModel(reportPreview);
    const searchModel = new MobileSearchViewModel(reportPreview, gallery);
    const parametersModel = new PreviewParametersViewModel(reportPreview, new MobilePreviewParameterHelper(bindingModel.parametersInfo && bindingModel.parametersInfo.knownEnums, callbacks));
    const exportModel = new ExportOptionsModel(reportPreview);
    reportPreview.allowURLsWithJSContent = bindingModel.allowURLsWithJSContent;
    reportPreview.previewParametersViewModel = parametersModel;
    previewWrapper.initialize(reportPreview, parametersModel, searchModel);
    const exportTypes = ([
        ExportFormatID.PDF, ExportFormatID.XLS, ExportFormatID.XLSX,
        ExportFormatID.RTF, ExportFormatID.DOCX, ExportFormatID.HTML,
        ExportFormatID.Text, ExportFormatID.CSV, ExportFormatID.Image
    ]);
    const paginator = new MobilePaginator(reportPreview, gallery);
    const designerModelOptions = {
        rootStyle: 'dxrd-preview dxrdp-mobile dxd-back-primary',
        reportPreview: reportPreview,
        parametersModel: parametersModel,
        exportModel: exportModel,
        searchModel: searchModel,
        rtl: reportPreview.rtlViewer,
        gallery: gallery,
        paginator: paginator,
        availableFormats: exportTypes
    };
    const designerModel = new MobilePreviewModel(designerModelOptions);
    const mobileActions = getPreviewActionsMobile({ designerModel, reportPreview, exportModel, parametersModel, searchModel, exportTypes, callbacks: callbacks });
    const parametersPopup = new ParametersPopupModel(parametersModel, reportPreview);
    const designerViewModel = designerModel.getViewModel();
    designerModel.parts = [
        { id: MobilePreviewElements.Surface, templateName: MobilePreviewElements.Surface, model: designerViewModel.reportPreview },
        { id: MobilePreviewElements.Search, templateName: MobilePreviewElements.Search, model: designerViewModel.searchModel },
        { id: MobilePreviewElements.Pages, templateName: MobilePreviewElements.Pages, model: designerViewModel.paginator },
        { id: MobilePreviewElements.MobileActions, templateName: MobilePreviewElements.MobileActions, model: mobileActions, viewModel: mobileActions.getViewModel() },
        { id: MobilePreviewElements.Parameters, templateName: MobilePreviewElements.Parameters, model: parametersPopup, viewModel: parametersPopup.getViewModel() },
        { id: PreviewElements.ExportTool, templateName: PreviewElements.ExportTool, model: designerViewModel.exportHandler }
    ];
    callbacks && callbacks.customizeParts && callbacks.customizeParts(designerModel.parts);
    const $actions = $root.find('.dxrdp-mobile-actions');
    const $window = $.fn.constructor(window);
    const updateProgressPosition = getUpdateProgressBarCallback(bindingModel.progressBarSettings, designerModel, reportPreview, bindingElement, $window);
    const updateMobilePreviewActionsPosition_ = getDockedElementCallback($actions, $root, $window, '.dxrdp-mobile-actions');
    const updateSizesCallback = () => {
        updatePreviewContentSize_ && updatePreviewContentSize_();
        updateProgressPosition && updateProgressPosition();
    };
    designerModel.updateSurfaceSize = updateSizesCallback;
    designerModel.resizeCallback = () => {
        if (parametersModel.popupInfo.visible) {
            parametersPopup.initVisibilityIcons();
        }
        updateSizesCallback();
        if (reportPreview.actionsVisible)
            updateMobilePreviewActionsPosition_(bindingElement);
    };
    window.addEventListener('resize', designerModel.resizeCallback);
    const onScroll = () => {
        if (reportPreview.actionsVisible)
            updateMobilePreviewActionsPosition_(bindingElement);
    };
    window.addEventListener('scroll', onScroll);
    designerModel.addDisposable(() => {
        window.removeEventListener('resize', designerModel.resizeCallback);
        window.removeEventListener('scroll', onScroll);
        mobileActions.dispose();
    });
    designerModel.addDisposable(reportPreview.events.on('actionsVisibleChanged', (args) => {
        if (args.newValue)
            updateMobilePreviewActionsPosition_(bindingElement);
    }));
    appendStaticContextToRootViewModel(designerModel, staticContext);
    return designerModel;
}