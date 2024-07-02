﻿/**
* DevExpress Analytics (core\tools\_actionListBase.viewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createViewModelGenerator } from '../../serializer/native/viewModels/viewModelGenerator';
import { guid } from '../../undo-engine/_utils';
import { getParentContainer } from '../../widgets/_utils';
import { koUtils } from '../utils/_koUtils';
export function createActionListBaseViewModel(base) {
    return createViewModelGenerator(base)
        .generateProperty('toolbarItems', this.mapActionToViewModels(koUtils.unwrap(this.toolbarItems)))
        .generateProperty('processShortcut', (e) => this.processShortcut(e))
        .getViewModel();
}
export function createBaseActionViewModel(action, index) {
    const actionDisplayText = action.displayText && action.displayText() || action.text;
    const getActionClass = () => {
        return `dxrd-toolbar-item-${index} ${action.hasSeparator ? 'dxrd-toolbar-item-with-separator dxd-border-primary' : ''}`;
    };
    let disabled = koUtils.unwrap(action.disabled);
    let selected = koUtils.unwrap(action.selected);
    let imageClassName = koUtils.unwrap(action.imageClassName);
    const getImageClass = () => {
        const classes = ['dxrd-toolbar-item-image', 'dxd-state-normal', 'dxd-icon-highlighted'];
        if (imageClassName)
            classes.push(koUtils.unwrap(action.imageClassName));
        if (disabled)
            classes.push('dxrd-disabled-button');
        if (selected)
            classes.push('dxd-button-back-color dxd-back-highlighted dxd-state-active');
        return classes.join(' ');
    };
    const getAttributeValue = (active) => {
        return active ? 'true' : 'false';
    };
    const attrViewModelGenerator = createViewModelGenerator()
        .generateProperty('aria-disabled', getAttributeValue(koUtils.unwrap(action.disabled)))
        .generateProperty('aria-label', actionDisplayText);
    if (action.selected !== undefined) {
        attrViewModelGenerator.generateProperty('aria-pressed', getAttributeValue(koUtils.unwrap(action.selected)));
    }
    const viewModelAction = createViewModelGenerator()
        .createDefaultModel(action)
        .generateProperty('ref', guid())
        .generateProperty('disabled', koUtils.unwrap(action.disabled))
        .generateProperty('displayText', actionDisplayText)
        .generateProperty('selected', koUtils.unwrap(action.selected))
        .generateProperty('visible', koUtils.unwrap(action.visible))
        .generateProperty('templateName', action.templateName)
        .generateProperty('hasSeparator', action.hasSeparator)
        .generateProperty('click', (e) => {
        if (!koUtils.unwrap(action.disabled))
            action.clickAction(e);
    })
        .generateProperty('actionClass', getActionClass())
        .generateProperty('block', createViewModelGenerator()
        .generateProperty('attr', attrViewModelGenerator.getViewModel())
        .getViewModel())
        .generateProperty('image', createViewModelGenerator()
        .generateProperty('templateName', koUtils.unwrap(action.imageTemplateName))
        .generateProperty('class', getImageClass())
        .getViewModel())
        .getViewModel();
    this.subscribe(action, 'imageTemplateName', (newImageTemplateName) => {
        viewModelAction.image.templateName = newImageTemplateName;
    });
    this.subscribe(action, 'imageClassName', (newImageClassName) => {
        imageClassName = newImageClassName;
        viewModelAction.image.class = getImageClass();
    });
    this.subscribe(action, 'disabled', (newDisabled) => {
        disabled = newDisabled;
        viewModelAction.disabled = newDisabled;
        viewModelAction.block.attr['aria-disabled'] = getAttributeValue(newDisabled);
        viewModelAction.image.class = getImageClass();
    });
    this.subscribe(action, 'visible', (newVisible) => {
        viewModelAction.visible = newVisible;
    });
    this.subscribe(action, 'selected', (newSelected) => {
        selected = newSelected;
        viewModelAction.image.class = getImageClass();
        viewModelAction.block.attr['aria-pressed'] = getAttributeValue(newSelected);
    });
    this.subscribeOnChanges(action, viewModelAction, [
        'disabled',
        'visible',
        'selected',
    ]);
    if ('contentData' in action) {
        return createViewModelGenerator(viewModelAction)
            .generateProperty('contentData', action.contentData)
            .getViewModel();
    }
    if ('zoom' in action) {
        const selectBoxViewModel = createViewModelGenerator(viewModelAction)
            .generateProperty('templateName', action.templateName)
            .generateProperty('getPopupContainer', getParentContainer)
            .generateProperty('widget', createViewModelGenerator()
            .generateProperty('dataSource', koUtils.unwrap(action.zoomLevels))
            .generateProperty('displayExpr', action.displayExpr)
            .generateProperty('value', koUtils.unwrap(action.zoom))
            .generateProperty('onCustomItemCreating', action.onCustomItemCreating)
            .generateProperty('onValueChanged', (e) => {
            if (koUtils.isSubscribable(action.zoom)) {
                action.zoom(e.value);
            }
            else {
                action.zoom = e.value;
            }
        })
            .getViewModel())
            .getViewModel();
        this.subscribe(action, 'zoomLevels', (zoomLevels) => {
            selectBoxViewModel.widget.dataSource = zoomLevels;
        });
        this.subscribe(action, 'zoom', (newZoom) => {
            selectBoxViewModel.widget.value = newZoom;
        });
        return selectBoxViewModel;
    }
    return viewModelAction;
}