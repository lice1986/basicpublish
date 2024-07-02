﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\exportOptionsModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { $unwrap, getLocalization, getParentContainer, PropertyGridKeyboardHelper } from '@devexpress/analytics-core/analytics-internal-native';
import { Disposable, TabInfoWithPropertyGrid, } from '@devexpress/analytics-core/analytics-utils-native';
import { ActionId, ExportFormatID } from '../constants';
import { createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
import { ExportActionBase } from '../internal/_actions';
export class ExportOptionsModel extends Disposable {
    constructor(reportPreview, enableKeyboardSupport) {
        super();
        this.actions = [];
        this._reportPreview = reportPreview;
        const getTabPanelVisible = () => !!reportPreview.exportOptionsModel && reportPreview.exportOptionsTabVisible !== false;
        const keyboardHelperViewModelAccessor = () => this.tabInfo.getViewModel().propertyGrid.editors;
        const keyboardHelper = enableKeyboardSupport ? new PropertyGridKeyboardHelper(keyboardHelperViewModelAccessor) : undefined;
        this.tabInfo = new TabInfoWithPropertyGrid({
            text: 'Export Options',
            template: 'dxrd-preview-export-options',
            propertyGridModel: reportPreview.exportOptionsModel,
            model: undefined,
            keyboardHelper,
            localizationId: 'DevExpress.XtraPrinting.ExportOptions',
            imageClassName: 'properties',
            imageTemplateName: 'dxrd-svg-tabs-properties',
            visible: getTabPanelVisible(),
            engineType: 'native'
        });
        this.addDisposable(reportPreview.events.on('exportOptionsModelChanged', (args) => {
            if (reportPreview.exportOptionsModel)
                this.tabInfo.propertyGridModel = reportPreview.exportOptionsModel;
            this.tabInfo.visible = getTabPanelVisible();
        }), reportPreview.events.on('exportOptionsTabVisibleChanged', (args) => {
            this.tabInfo.visible = getTabPanelVisible();
        }));
        const actionExportTo = new ExportAction(reportPreview, this);
        this.actions.push(actionExportTo);
        this.addDisposable(actionExportTo);
        this._disposables.push(this.tabInfo);
    }
    _getExportFormatItems() {
        const result = [];
        const exportOptionsModel = this._reportPreview.exportOptionsModel;
        if (exportOptionsModel) {
            exportOptionsModel.pdf && result.push(ExportFormatID.PDF);
            exportOptionsModel.xls && result.push(ExportFormatID.XLS);
            exportOptionsModel.xlsx && result.push(ExportFormatID.XLSX);
            exportOptionsModel.rtf && result.push(ExportFormatID.RTF);
            exportOptionsModel.docx && result.push(ExportFormatID.DOCX);
            exportOptionsModel.mht && result.push(ExportFormatID.MHT);
            exportOptionsModel.html && result.push(ExportFormatID.HTML);
            exportOptionsModel.textExportOptions && result.push(ExportFormatID.Text);
            exportOptionsModel.csv && result.push(ExportFormatID.CSV);
            exportOptionsModel.image && result.push(ExportFormatID.Image);
        }
        return result;
    }
    _exportDocumentByFormat(format) {
        format && this._reportPreview.exportDocumentTo(format);
    }
    getActions(context) {
        return this.actions;
    }
    dispose() {
        super.dispose();
        this.disposeArray(this.actions);
        this.removeProperties();
    }
}
export class ExportOptionsEventHandlers {
    onSubmenuShowing(popupContainer, element) {
        return (e) => {
            e.submenu._overlay.option('container', popupContainer);
            e.submenu._overlay.option('focusStateEnabled', false);
            e.submenu._overlay.option('position', { my: 'left top', at: 'left bottom', of: element, collision: 'none', boundary: popupContainer });
            this._menuButton = e.component.option('focusedElement');
            e.submenu._attachHoverEvents();
        };
    }
    onSubmenuShown(e) {
        const submenu = e.submenu;
        submenu.registerKeyHandler('escape', (e) => submenu.hide());
        submenu.registerKeyHandler('leftArrow', (e) => submenu.hide());
        submenu.registerKeyHandler('rightArrow', (e) => submenu.hide());
    }
    onSubmenuHiding(e) {
        if (this._menuButton) {
            e.component.option('focusedElement', this._menuButton);
            e.component.focus();
        }
    }
    onItemRendered(e) {
        var _a;
        $unwrap(e.itemElement).setAttribute('aria-label', (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.text);
    }
}
export class ExportAction extends ExportActionBase {
    constructor(reportPreview, model) {
        super(reportPreview);
        this.model = model;
        this.id = ActionId.ExportTo;
        this.text = 'Export To';
        this.textId = 'ASPxReportsStringId.WebDocumentViewer_ExportToText';
        this.items = this.getExportItems();
        this.addDisposable(reportPreview.events.on('exportOptionsModelChanged', () => {
            this.items = this.getExportItems();
        }));
        this.clickAction = (model) => {
            if (reportPreview.exportDisabled)
                return;
            this.model._exportDocumentByFormat(model.itemData.format);
        };
        this.templateName = 'dxrd-preview-export-to';
        this.imageTemplateName = 'dxrd-svg-preview-export-export-to';
        this.eventHandlers = new ExportOptionsEventHandlers();
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        const selectBoxViewModel = this.getViewModel();
        if (args.propertyName === 'items')
            selectBoxViewModel.widget.items = args.newValue;
    }
    createViewModel(parent, index) {
        const viewModel = super.createViewModel(parent, index);
        const getItems = (items) => {
            return items.map(x => ({
                imageClassName: x.imageClassName,
                imageTemplateName: x.imageTemplateName,
                text: getLocalization(x.text, x.textId),
                format: x.format,
                items: x.items && getItems(x.items) || undefined
            }));
        };
        const exportActionViewModel = createViewModelGenerator(viewModel)
            .generateProperty('widget', createViewModelGenerator()
            .generateProperty('items', getItems(this.items))
            .generateProperty('onItemRendered', (e) => this.eventHandlers.onItemRendered(e))
            .generateProperty('onSubmenuHiding', (e) => this.eventHandlers.onSubmenuHiding(e))
            .generateProperty('onSubmenuShown', (e) => this.eventHandlers.onSubmenuShown(e))
            .generateProperty('onSubmenuShowing', (container, element) => this.eventHandlers.onSubmenuShowing(container, element))
            .getViewModel())
            .generateProperty('getPopupContainer', getParentContainer)
            .getViewModel();
        return exportActionViewModel;
    }
    getExportItems() {
        const items = this.model._getExportFormatItems();
        const result = {
            text: 'Export To',
            textId: 'ASPxReportsStringId.WebDocumentViewer_ExportToText',
            imageClassName: 'dxrd-image-export-to',
            items: items
        };
        Object.defineProperty(result, 'imageTemplateName', {
            enumerable: true,
            configurable: true,
            get: () => {
                return this.imageTemplateName;
            },
            set: (newVal) => {
                this.imageTemplateName = newVal;
            }
        });
        return [result];
    }
}
__decorate([
    mutable(() => [])
], ExportAction.prototype, "items", void 0);