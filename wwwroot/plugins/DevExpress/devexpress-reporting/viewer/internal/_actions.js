﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_actions.js)
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
import { ActionId, ZoomAutoBy } from '../constants';
import { EditablePreviewEnabled } from '../settings';
import { getLocalization, Disposable } from '@devexpress/analytics-core/analytics-utils-native';
import { parseZoom, getParentContainer, ActionListsBase, BaseAction, koUtils } from '@devexpress/analytics-core/analytics-internal-native';
import { createViewModelGenerator, mutable, mutableArray } from '@devexpress/analytics-core/analytics-serializer-native';
export class PreviewDesignerActions extends Disposable {
    constructor(reportPreview, fullscreen) {
        super();
        this.actions = [];
        const designAction = {
            id: ActionId.Design,
            text: 'Design',
            displayText: () => getLocalization('Design', 'ASPxReportsStringId.ToolBarItemText_Design'),
            imageClassName: 'dxrd-image-design',
            imageTemplateName: 'dxrd-svg-preview-report_designer',
            templateName: reportPreview.canSwitchToDesigner ? 'dxrd-toolbar-two-way-switch' : undefined,
            visible: reportPreview.canSwitchToDesigner,
            hotKey: { ctrlKey: true, keyCode: 68 },
            clickAction: () => {
                reportPreview.previewVisible = false;
                reportPreview.deactivate();
            }
        };
        designAction.contentData = {
            items: [
                { itemData: designAction, active: false },
                { getDisplayText: () => getLocalization('Preview', 'ASPxReportsStringId.ToolBarItemText_Preview'), active: true }
            ]
        };
        this.actions.push(designAction);
        this.actions.push(new FullScreenViewerAction(reportPreview, fullscreen));
    }
    dispose() {
        super.dispose();
        this.removeProperties();
    }
    getActions(context) {
        return this.actions;
    }
}
export class ActionLists extends ActionListsBase {
    constructor(reportPreview, globalActionProviders, customizeActions, enabled) {
        super(enabled);
        this.updateToolbarItems = () => {
            const globalActions = [];
            this.globalActionProviders.forEach((actionProvider) => {
                globalActions.push.apply(globalActions, actionProvider.getActions(reportPreview));
            });
            customizeActions && customizeActions(globalActions);
            this.toolbarItems = globalActions;
        };
        this.globalActionProviders = globalActionProviders;
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'globalActionProviders')
            this.updateToolbarItems();
    }
    processShortcut(e) {
        if (this.shouldIgnoreProcessing(e))
            return;
        super.processShortcut(e);
    }
    dispose() {
        super.dispose();
        this.globalActionProviders = [];
        this.removeProperties();
    }
}
__decorate([
    mutableArray(() => [])
], ActionLists.prototype, "globalActionProviders", void 0);
export class PreviewActions extends Disposable {
    constructor(reportPreview) {
        super();
        this.actions = [];
        const actions = [
            new FirstPageAction(reportPreview),
            new PreviousPageAction(reportPreview),
            new PaginationAction(reportPreview),
            new NextPageAction(reportPreview),
            new LastPageAction(reportPreview),
            new MultipageModeAction(reportPreview),
            new ZoomOutAction(reportPreview),
            new ZoomAction(reportPreview),
            new ZoomInAction(reportPreview),
            new HighlightingAction(reportPreview),
            new PrintAction(reportPreview),
            new PrintPageAction(reportPreview),
        ];
        this.addDisposable(...actions);
        this.actions.push(...actions);
    }
    wrapDisposable(object) {
        this.addDisposable(object);
        return object;
    }
    dispose() {
        super.dispose();
        this.removeProperties();
    }
    getActions(context) {
        return this.actions;
    }
}
export class ViewerAction extends BaseAction {
    constructor(reportPreview, visibilityDependencies = [], disabilityDependencies = [], model) {
        super(model);
        this.reportPreview = reportPreview;
        this.visible = this.isVisible();
        this.disabled = this.isDisabled();
        visibilityDependencies.forEach(dependency => {
            this.addDisposable(this.reportPreview.events.on(`${dependency}Changed`, () => {
                this.visible = this.isVisible();
            }));
        });
        disabilityDependencies.forEach(dependency => {
            this.addDisposable(this.reportPreview.events.on(`${dependency}Changed`, () => {
                this.disabled = this.isDisabled();
            }));
        });
    }
}
export class FullScreenActionBase extends BaseAction {
    constructor(fullscreen, model) {
        super(model);
        this.fullscreen = fullscreen;
        this.text = getLocalization('Full Screen', 'ASPxReportsStringId.ToolBarItemText_FullScreen');
        this.imageClassName = 'dxrd-image-fullscreen';
        this.imageTemplateName = this.getFullScreenImageTemplateName();
        this.selected = koUtils.unwrap(this.fullscreen);
        this.addDisposable(fullscreen === null || fullscreen === void 0 ? void 0 : fullscreen.subscribe(() => {
            this.selected = this.fullscreen();
            this.imageTemplateName = this.getFullScreenImageTemplateName();
        }));
        this.clickAction = () => {
            fullscreen(!fullscreen());
        };
    }
    getFullScreenImageTemplateName() { return koUtils.unwrap(this.fullscreen) ? 'dxrd-svg-toolbar-fullscreen-exit' : 'dxrd-svg-toolbar-fullscreen'; }
}
class FullScreenViewerAction extends FullScreenActionBase {
    constructor(reportPreview, fullscreen) {
        super(fullscreen);
        this.id = ActionId.FullScreen;
        this.visible = !reportPreview.canSwitchToDesigner;
    }
}
class NavigationAction extends ViewerAction {
    constructor(reportPreview) {
        super(reportPreview, ['previewVisible'], ['pageIndex', 'pages']);
    }
    isVisible() {
        return this.reportPreview.previewVisible;
    }
}
class GoBackwardsAction extends NavigationAction {
    isDisabled() {
        return this.reportPreview.pageIndex < 1;
    }
}
class FirstPageAction extends GoBackwardsAction {
    constructor(reportPreview) {
        super(reportPreview);
        this.id = ActionId.FirstPage;
        this.text = getLocalization('First Page', 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_FirstPage');
        this.imageClassName = 'dxrd-image-preview-first';
        this.imageTemplateName = 'dxrd-svg-preview-first_page';
        this.hotKey = { ctrlKey: true, keyCode: 37 };
        this.clickAction = () => {
            if (reportPreview.pageIndex > 0) {
                reportPreview.goToPage(0);
            }
        };
    }
}
class PreviousPageAction extends GoBackwardsAction {
    constructor(reportPreview) {
        super(reportPreview);
        this.id = ActionId.PrevPage;
        this.text = getLocalization('Previous Page', 'ASPxReportsStringId.ToolBarItemText_PreviousPage');
        this.imageClassName = 'dxrd-image-preview-prev';
        this.imageTemplateName = 'dxrd-svg-preview-previous_page';
        this.hotKey = { ctrlKey: false, keyCode: 37 };
        this.clickAction = () => {
            if (reportPreview.pageIndex >= 1) {
                reportPreview.goToPage(reportPreview.pageIndex - 1, false, 500);
            }
        };
    }
}
class PaginationAction extends NavigationAction {
    constructor(reportPreview) {
        super(reportPreview);
        this.id = ActionId.Pagination;
        this.text = 'Pagination';
        this.selectedItem = this.getSelectedItem();
        this.addDisposable(reportPreview.events.on('pageIndexChanged', (args) => {
            this.selectedItem = this.getSelectedItem();
        }));
        this.pageItems = this.getPageItems();
        this.addDisposable(reportPreview.events.on('pagesChanged', (args) => {
            this.pageItems = this.getPageItems();
            this.selectedItem = this.getSelectedItem();
        }));
        this._isPageChanged = (value) => {
            let val = parseInt && parseInt(value);
            if (!!val && val-- > 0 && val < reportPreview.pages.length) {
                reportPreview.goToPage(val);
                return true;
            }
            return false;
        };
        this.displayExpr = function (value) {
            if (reportPreview.pageIndex !== -1 && value && reportPreview.pageIndex !== value.index) {
                return value.text;
            }
            if (reportPreview.pageIndex === -1) {
                return getLocalization('0 pages', 'ASPxReportsStringId.WebDocumentViewer_0Pages');
            }
            else {
                const ofText = getLocalization('of', 'ASPxReportsStringId.ToolBarItemText_OfLabel');
                return (reportPreview.pageIndex + 1) + ' ' + ofText + ' ' + reportPreview.pages.length;
            }
        };
        this.itemTemplate = function (value) { return value.text; };
        this.searchMode = 'startswith';
        this.searchTimeout = 10;
        this.templateName = 'dxrd-preview-pager';
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        const selectBoxViewModel = this.getViewModel();
        if (args.propertyName === 'pageItems')
            selectBoxViewModel.widget.dataSource = args.newValue;
        if (args.propertyName === 'selectedItem')
            selectBoxViewModel.widget.value = args.newValue;
    }
    createViewModel(parent, index) {
        const viewModel = super.createViewModel(parent, index);
        const selectBoxViewModel = createViewModelGenerator(viewModel)
            .generateProperty('templateName', this.templateName)
            .generateProperty('getPopupContainer', getParentContainer)
            .generateProperty('widget', createViewModelGenerator()
            .generateProperty('dataSource', this.pageItems)
            .generateProperty('displayExpr', this.displayExpr)
            .generateProperty('value', this.selectedItem)
            .generateProperty('searchEnabled', true)
            .generateProperty('opened', false)
            .generateProperty('onValueChanged', (e) => {
            this.selectItem(e.value);
        })
            .generateProperty('onKeyUp', (e) => {
            if (e.event.which !== 13)
                return;
            if (this._isPageChanged(e.component.option('text'))) {
                selectBoxViewModel.widget.opened = false;
            }
        })
            .generateProperty('searchMode', this.searchMode)
            .generateProperty('searchTimeout', this.searchTimeout)
            .generateProperty('itemTemplate', this.itemTemplate)
            .generateProperty('dropDownOptions', {
            wrapperAttr: {
                'aria-label': getLocalization('Pager', 'ASPxReportsStringId.WebDocumentViewer_AriaLabelPagerCombobox'),
                'class': 'dx-page-selectbox-popup-wrapper'
            }
        })
            .generateProperty('inputAttr', {
            'aria-label': getLocalization('Pager', 'ASPxReportsStringId.WebDocumentViewer_AriaLabelPagerCombobox')
        })
            .getViewModel())
            .getViewModel();
        return selectBoxViewModel;
    }
    selectItem(newValue) {
        if (!!newValue && (newValue.index || newValue.index === 0)) {
            this.reportPreview.goToPage(newValue.index);
        }
    }
    getPageItems() {
        const pageCount = this.reportPreview.pages.length;
        if (pageCount === 0 || this.reportPreview.pageIndex === -1) {
            return [];
        }
        const pagesArray = new Array();
        for (let i = 0; i < pageCount;) {
            pagesArray.push({ index: i, text: ++i });
        }
        return {
            store: pagesArray,
            paginate: pageCount > 200,
            pageSize: 100
        };
    }
    getSelectedItem() {
        if (this.reportPreview.pageIndex < 0) {
            return null;
        }
        const items = this.getPageItems();
        return items && items.store && (items.store.length > this.reportPreview.pageIndex) && items.store[this.reportPreview.pageIndex];
    }
    isDisabled() {
        return this.reportPreview.pages.length === 0 || this.reportPreview.pageIndex === -1;
    }
}
__decorate([
    mutable(() => null)
], PaginationAction.prototype, "selectedItem", void 0);
__decorate([
    mutable(() => null)
], PaginationAction.prototype, "pageItems", void 0);
class GoForwardAction extends NavigationAction {
    isDisabled() {
        return this.reportPreview.pageIndex < 0 || this.reportPreview.pageIndex >= this.reportPreview.pages.length - 1;
    }
}
class NextPageAction extends GoForwardAction {
    constructor(reportPreview) {
        super(reportPreview);
        this.id = ActionId.NextPage;
        this.text = getLocalization('Next Page', 'ASPxReportsStringId.ToolBarItemText_NextPage');
        this.imageClassName = 'dxrd-image-preview-next';
        this.imageTemplateName = 'dxrd-svg-preview-next_page';
        this.hotKey = { ctrlKey: false, keyCode: 39 };
        this.clickAction = () => {
            if (reportPreview.pageIndex < reportPreview.pages.length - 1) {
                reportPreview.goToPage(reportPreview.pageIndex + 1, false, 500);
            }
        };
    }
}
class LastPageAction extends GoForwardAction {
    constructor(reportPreview) {
        super(reportPreview);
        this.id = ActionId.LastPage;
        this.text = getLocalization('Last Page', 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_LastPage');
        this.imageClassName = 'dxrd-image-preview-last';
        this.imageTemplateName = 'dxrd-svg-preview-last_page';
        this.hotKey = { ctrlKey: true, keyCode: 39 };
        this.clickAction = () => {
            if (reportPreview.pageIndex < reportPreview.pages.length - 1) {
                reportPreview.goToPage(reportPreview.pages.length - 1);
            }
        };
    }
}
class MultipageModeAction extends ViewerAction {
    constructor(reportPreview) {
        super(reportPreview, ['previewVisible']);
        this.id = ActionId.MultipageToggle;
        this.text = getLocalization('Toggle Multipage Mode', 'ASPxReportsStringId.WebDocumentViewer_ToggleMultipageMode');
        this.imageClassName = this.getMultipageToggleImageClassName(reportPreview.showMultipagePreview);
        this.imageTemplateName = this.getMultipageToggleImageTemplateName(reportPreview.showMultipagePreview);
        this.hotKey = { ctrlKey: true, keyCode: 77 };
        this.clickAction = () => {
            const zoom = reportPreview.originalZoom;
            reportPreview.showMultipagePreview = !reportPreview.showMultipagePreview;
            reportPreview.zoom = zoom;
        };
        this.addDisposable(reportPreview.events.on('showMultipagePreviewChanged', (args) => {
            this.imageClassName = this.getMultipageToggleImageClassName(reportPreview.showMultipagePreview);
            this.imageTemplateName = this.getMultipageToggleImageTemplateName(reportPreview.showMultipagePreview);
        }));
        this.hasSeparator = true;
    }
    getMultipageToggleImageClassName(showMultipagePreview) {
        return showMultipagePreview ? 'dxrd-image-preview-single-page' : 'dxrd-image-preview-multipage';
    }
    getMultipageToggleImageTemplateName(showMultipagePreview) {
        return showMultipagePreview ? 'dxrd-svg-preview-single_page' : 'dxrd-svg-preview-multi_page_preview';
    }
    isVisible() {
        return this.reportPreview.previewVisible;
    }
}
class ZoomOutAction extends ViewerAction {
    constructor(reportPreview) {
        super(reportPreview);
        this.id = ActionId.ZoomOut;
        this.text = getLocalization('Zoom Out', 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomOut');
        this.imageClassName = 'dxrd-image-zoomout';
        this.imageTemplateName = 'dxrd-svg-toolbar-zoomout';
        this.hotKey = { ctrlKey: false, keyCode: 109 };
        this.clickAction = () => {
            const currentZoom = reportPreview.zoom;
            const zoomLevel = currentZoom > 0 ? currentZoom : reportPreview.originalZoom;
            reportPreview.zoom = Math.max(zoomLevel - reportPreview.zoomStep, 0.1);
        };
        this.hasSeparator = true;
    }
}
class ZoomAction extends ViewerAction {
    constructor(reportPreview) {
        super(reportPreview);
        this.id = ActionId.ZoomSelector;
        this.hotKey = { ctrlKey: true, keyCode: 187 };
        this.templateName = 'dxrd-zoom-autofit-select-template';
        this.displayExpr = (val) => {
            if (val === ZoomAutoBy.PageWidth) {
                return getLocalization('Page Width', 'DevExpress.XtraReports.UI.XtraReport.PageWidth');
            }
            else if (Math.round(val * 100) === 0) {
                return getLocalization('Whole Page', 'PreviewStringId.MenuItem_ZoomWholePage');
            }
            else {
                return Math.round((val || reportPreview.zoom) * 100) + '%';
            }
        },
            this.onCustomItemCreating = (e) => { e.customItem = parseZoom(e.text); };
        this.zoom = reportPreview.zoom;
        this.clickAction = () => {
            reportPreview.zoom = ZoomAutoBy.WholePage;
        },
            this.addDisposable(reportPreview.events.on('zoomChanged', (args) => {
                this.zoom = reportPreview.zoom;
            }));
        this.zoomLevels = this.getZoomLevels();
        this.addDisposable(reportPreview.events.on('showMultipagePreviewChanged', (args) => {
            this.zoomLevels = this.getZoomLevels();
        }));
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'zoom') {
            this.reportPreview.zoom = this.zoom;
        }
    }
    createViewModel(parent, index) {
        const viewModel = super.createViewModel(parent, index);
        const selectBoxViewModel = createViewModelGenerator(viewModel)
            .configureProperty('widget', (property) => {
            property.inputAttr = {
                'aria-label': getLocalization('Zoom', 'ASPxReportsStringId.WebDocumentViewer_AriaLabelZoomCombobox')
            };
        })
            .getViewModel();
        return selectBoxViewModel;
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        const selectBoxViewModel = this.getViewModel();
        if (args.propertyName === 'zoomLevels')
            selectBoxViewModel.widget.dataSource = args.newValue;
        if (args.propertyName === 'zoom')
            selectBoxViewModel.widget.value = args.newValue;
    }
    getZoomLevels() {
        const items = this.reportPreview.predefinedZoomLevels.slice(0);
        if (this.reportPreview.showMultipagePreview === false && items.indexOf(0) === -1) {
            items.push(ZoomAutoBy.PageWidth);
            items.push(ZoomAutoBy.WholePage);
        }
        return items;
    }
}
__decorate([
    mutable(0)
], ZoomAction.prototype, "zoom", void 0);
__decorate([
    mutable(() => [])
], ZoomAction.prototype, "zoomLevels", void 0);
class ZoomInAction extends ViewerAction {
    constructor(reportPreview) {
        super(reportPreview);
        this.id = ActionId.ZoomIn;
        this.text = getLocalization('Zoom In', 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomIn');
        this.imageClassName = 'dxrd-image-zoomin';
        this.imageTemplateName = 'dxrd-svg-toolbar-zoomin';
        this.hotKey = { ctrlKey: false, keyCode: 107 };
        this.clickAction = () => {
            const currentZoom = reportPreview.zoom;
            const zoomLevel = currentZoom > 0 ? currentZoom : reportPreview.originalZoom;
            reportPreview.zoom = Math.min(zoomLevel + reportPreview.zoomStep, 10);
        };
    }
}
class HighlightingAction extends ViewerAction {
    constructor(reportPreview) {
        super(reportPreview, ['previewVisible'], ['_editingFields']);
        this.id = ActionId.HighlightEditingFields;
        this.text = getLocalization('Highlight Editing Fields', 'DevExpress.XtraPrinting.PrintingSystemCommand.HighlightEditingFields');
        this.imageClassName = 'dxrp-image-hightlight-editing-fields';
        this.imageTemplateName = 'dxrd-svg-toolbar-hightlightEditingFields';
        EditablePreviewEnabled.subscribe(() => this.visible = this.isVisible());
        this.selected = reportPreview.editingFieldsHighlighted;
        this.addDisposable(reportPreview.events.on('editingFieldsHighlightedChanged', (args) => {
            this.selected = args.newValue;
        }));
        this.hotKey = { ctrlKey: true, keyCode: 72 };
        this.clickAction = () => {
            reportPreview.editingFieldsHighlighted = !reportPreview.editingFieldsHighlighted;
        },
            this.hasSeparator = true;
    }
    isDisabled() {
        return this.reportPreview.editingFieldsProvider().length < 1;
    }
    isVisible() {
        return EditablePreviewEnabled() && this.reportPreview.previewVisible;
    }
}
export class ExportActionBase extends ViewerAction {
    constructor(reportPreview) {
        super(reportPreview, undefined, ['exportDisabled']);
    }
    isDisabled() {
        return this.reportPreview.exportDisabled;
    }
}
class PrintAction extends ExportActionBase {
    constructor(reportPreview) {
        super(reportPreview);
        this.id = ActionId.Print;
        this.text = getLocalization('Print', 'ASPxReportsStringId.DocumentViewer_RibbonPrintGroupText');
        this.imageClassName = 'dxrd-image-print';
        this.imageTemplateName = 'dxrd-svg-preview-print';
        this.hasSeparator = true;
        this.hotKey = { ctrlKey: true, keyCode: 80 };
        this.clickAction = () => {
            if (reportPreview.exportDisabled) {
                return;
            }
            reportPreview.printDocument();
        };
    }
}
class PrintPageAction extends ExportActionBase {
    constructor(reportPreview) {
        super(reportPreview);
        this.id = ActionId.PrintPage;
        this.text = getLocalization('Print Page', 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_PrintPage');
        this.imageClassName = 'dxrd-image-print-page';
        this.imageTemplateName = 'dxrd-svg-preview-print_page';
        this.clickAction = () => {
            if (reportPreview.exportDisabled) {
                return;
            }
            reportPreview.printDocument(reportPreview.pageIndex);
        };
    }
}