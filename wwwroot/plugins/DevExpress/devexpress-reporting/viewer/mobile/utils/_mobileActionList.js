﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\utils\_mobileActionList.js)
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
import { SearchAvailable } from '../../settings';
import * as $ from 'jquery';
import { BaseRenderingModel, createViewModelGenerator, mutable } from '@devexpress/analytics-core/analytics-serializer-native';
export class MobileActionList extends BaseRenderingModel {
    constructor(actions, reportPreview) {
        super();
        this.actions = actions;
        this.addDisposable(reportPreview.events.on('actionsVisibleChanged', (args) => {
            this.visible = args.newValue;
        }));
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('visible', this.visible)
            .generateProperty('actions', this.actions)
            .getViewModel();
    }
    updateViewModel() {
        const viewModel = this.getViewModel();
        viewModel.visible = this.visible;
    }
    onPropertyChanged() { }
    dispose() {
        this.actions.forEach(action => {
            if (action.content && action.content.dispose) {
                action.content.dispose();
                delete action.content.dispose;
            }
        });
        super.dispose();
    }
}
__decorate([
    mutable(false)
], MobileActionList.prototype, "visible", void 0);
export function getPreviewActionsMobile(options) {
    const getItems = () => {
        const allFormats = options.exportModel._getExportFormatItems();
        const availableFormats = options.exportTypes.filter(x => allFormats.indexOf(x) !== -1);
        if (availableFormats.length > 9) {
            availableFormats.splice(9, availableFormats.length - 9);
        }
        else if (availableFormats.length < 9) {
            const notUsedFormats = allFormats.filter(x => availableFormats.indexOf(x) === -1);
            availableFormats.push.apply(availableFormats, notUsedFormats.slice(0, 9 - availableFormats.length));
        }
        return availableFormats.map((item) => {
            item.action = () => { options.exportModel._exportDocumentByFormat(item.format); };
            return item;
        });
    };
    const disposables = [
        options.reportPreview.events.on('exportOptionsModelChanged', (args) => {
            exportToModel.items = getItems();
        }),
        options.designerModel.events.on('availableFormatsChanged', (args) => {
            exportToModel.items = getItems();
        })
    ];
    const exportToModel = createViewModelGenerator()
        .generateProperty('visible', false)
        .generateProperty('items', getItems())
        .getViewModel();
    const searchAction = createViewModelGenerator({
        clickAction: () => {
            options.searchModel.searchPanelVisible = true;
            options.searchModel.editorVisible = true;
            options.searchModel.focusEditor({ currentTarget: $.fn.constructor('.dxrdp-taptosearch') });
            options.reportPreview.actionsVisible = false;
        },
        imageClassName: 'dxrd-image-search',
        imageTemplateName: 'dxrd-svg-preview-search'
    })
        .generateProperty('visible', SearchAvailable())
        .getViewModel();
    const subsciption = SearchAvailable.subscribe((newVal) => searchAction.visible = newVal);
    const actions = [
        searchAction,
        {
            clickAction: () => { exportToModel.visible = !exportToModel.visible; },
            imageClassName: 'dxrd-image-export-to',
            imageTemplateName: 'dxrd-svg-preview-export-export-to',
            visible: true,
            content: {
                name: 'dxrd-menu-export-content',
                data: exportToModel,
                dispose: () => {
                    exportToModel.items.forEach(item => {
                        delete item.action;
                    });
                    disposables.forEach(dispose => dispose());
                }
            }
        },
    ];
    const parametersAction = createViewModelGenerator({
        clickAction: () => {
            options.parametersModel._popupVisible = !options.parametersModel._popupVisible;
            options.reportPreview.actionsVisible = false;
        },
        imageClassName: 'dxrd-image-parameters',
        imageTemplateName: 'dxrd-svg-tabs-parameters',
    })
        .generateProperty('visible', options.parametersModel.popupInfo.notEmpty)
        .getViewModel();
    actions.push(parametersAction);
    options.parametersModel.events.on('isEmptyChanged', (args) => {
        parametersAction.visible = options.parametersModel.popupInfo.notEmpty;
    });
    options.callbacks && options.callbacks.customizeActions && options.callbacks.customizeActions(actions);
    const actionList = new MobileActionList(actions, options.reportPreview);
    actionList.addDisposable(subsciption);
    return actionList;
}