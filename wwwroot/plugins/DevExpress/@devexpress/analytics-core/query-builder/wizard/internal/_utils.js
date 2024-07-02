﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_utils.js)
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
import { mutable } from '../../../serializer/native/models/base.model';
import { createViewModelGenerator } from '../../../serializer/native/viewModels/viewModelGenerator';
import { KoTreeListItemFactory, wrapTreeListOptionsWithKo } from '../../../widgets/treelist/_ko_treelistUtils';
import { TreeListItemViewModel } from '../../../widgets/treelist/_treelistItem';
export var WizardSectionPosition;
(function (WizardSectionPosition) {
    WizardSectionPosition[WizardSectionPosition["Left"] = 1] = "Left";
    WizardSectionPosition[WizardSectionPosition["TopLeft"] = 2] = "TopLeft";
    WizardSectionPosition[WizardSectionPosition["BottomLeft"] = 3] = "BottomLeft";
    WizardSectionPosition[WizardSectionPosition["Right"] = 4] = "Right";
    WizardSectionPosition[WizardSectionPosition["TopRight"] = 5] = "TopRight";
    WizardSectionPosition[WizardSectionPosition["BottomRight"] = 6] = "BottomRight";
    WizardSectionPosition[WizardSectionPosition["Top"] = 7] = "Top";
    WizardSectionPosition[WizardSectionPosition["Bottom"] = 8] = "Bottom";
})(WizardSectionPosition || (WizardSectionPosition = {}));
export class CustomQueryTreeListItem extends TreeListItemViewModel {
    _getTemplateName() {
        return this._getCustomizedTemplateName(true);
    }
    _getCustomizedTemplateName(isEditable) {
        return isEditable ? 'dxd-custom-query-treelisitem' : super._getTemplateName();
    }
    updateViewModel(args) {
        super.updateViewModel(args);
        const viewModel = this.getViewModel();
        viewModel.queryName = this.queryName;
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('queryName', this.queryName)
            .generateProperty('queryNameHasChanged', (event) => this.queryName = event.value)
            .getViewModel();
    }
    onPropertyChanged(args) {
        var _a;
        super.onPropertyChanged(args);
        if (args.propertyName === 'data') {
            this.queryName = ((_a = this.data) === null || _a === void 0 ? void 0 : _a.name) || '';
        }
        if (args.propertyName === 'queryName') {
            const propertyChangedEventArgs = args;
            const data = this.data;
            if (data && data.name !== propertyChangedEventArgs.newValue) {
                data.name = propertyChangedEventArgs.newValue;
                data['_afterCheckToggled'] && data['_afterCheckToggled'](data);
            }
        }
    }
}
__decorate([
    mutable('')
], CustomQueryTreeListItem.prototype, "queryName", void 0);
export class MultiQueryTreeListItemFactory extends KoTreeListItemFactory {
    createItem(options, path, onItemsVisibilityChanged, rtl, resolver) {
        if (path[0] === 'queries') {
            return new CustomQueryTreeListItem(wrapTreeListOptionsWithKo(options), path, onItemsVisibilityChanged, rtl, resolver);
        }
        return super.createItem(options, path, onItemsVisibilityChanged, rtl, resolver);
    }
}
export function getSectionStyle(position, defaultMargin = 30, isVisible = true) {
    const _clearStyle = 'inherit';
    const _defaultHalfMargin = '-' + (defaultMargin / 2) + 'px';
    const _fullSize = 100;
    const _defaultSize = _fullSize / 2;
    const _inPercent = (size) => {
        return size + '%';
    };
    if (!position) {
        return {
            top: _defaultHalfMargin,
            bottom: _defaultHalfMargin,
            left: _defaultHalfMargin,
            right: _defaultHalfMargin,
            width: _clearStyle,
            height: _clearStyle,
            display: isVisible ? 'block' : 'none'
        };
    }
    return {
        top: (position === WizardSectionPosition.Left || position === WizardSectionPosition.Right || position === WizardSectionPosition.Top || position === WizardSectionPosition.TopLeft || position === WizardSectionPosition.TopRight) ? _defaultHalfMargin : _clearStyle,
        bottom: (position === WizardSectionPosition.Left || position === WizardSectionPosition.Right || position === WizardSectionPosition.Bottom || position === WizardSectionPosition.BottomLeft || position === WizardSectionPosition.BottomRight) ? _defaultHalfMargin : _clearStyle,
        left: (position === WizardSectionPosition.Top || position === WizardSectionPosition.Bottom || position === WizardSectionPosition.Left || position === WizardSectionPosition.TopLeft || position === WizardSectionPosition.BottomLeft) ? _defaultHalfMargin : _clearStyle,
        right: (position === WizardSectionPosition.Top || position === WizardSectionPosition.Bottom || position === WizardSectionPosition.Right || position === WizardSectionPosition.TopRight || position === WizardSectionPosition.BottomRight) ? _defaultHalfMargin : _clearStyle,
        width: (position === WizardSectionPosition.Top || position === WizardSectionPosition.Bottom) ? _clearStyle : _inPercent(_defaultSize),
        height: (position === WizardSectionPosition.Left || position === WizardSectionPosition.Right) ? _clearStyle : _inPercent(_defaultSize),
        display: isVisible ? 'block' : 'none'
    };
}
export function subscribeArray(array, subscribeItem, onChange) {
    array().forEach((item) => subscribeItem(item, onChange));
    return array.subscribe((changeSet) => {
        changeSet.forEach((change) => {
            if (change.status === 'added') {
                subscribeItem(change.value, onChange);
            }
            else if (change.status === 'deleted') {
                change.value['dispose'] && change.value['dispose']();
            }
        });
        onChange();
    }, null, 'arrayChange');
}
export function subscribeProperties(properties, onChange) {
    const subscriptions = [];
    properties.forEach((property) => {
        if (property && property.subscribe) {
            subscriptions.push(property.subscribe((val) => onChange(val)));
        }
    });
    return subscriptions;
}
export function subscribeObject(object, subscribeProperties, onChange) {
    subscribeProperties(object(), onChange);
    return object.subscribe((newVal) => {
        subscribeProperties(newVal, onChange);
        onChange();
    });
}
export function _createBeforeInitializePageEventArgs(page, self) {
    return {
        page: page.page,
        pageId: page.pageId,
        wizard: self,
        state: self.stateManager.getPageState(page.pageId)
    };
}
export function _createPageEventArgs(page, self) {
    return {
        page: page.page,
        pageId: page.pageId,
        wizard: self
    };
}
export function _isMoreThanOneDataSourceTypeAvailable(dataSourceOptions) {
    return [dataSourceOptions.jsonDataSourceAvailable, dataSourceOptions.sqlDataSourceAvailable,
        dataSourceOptions.objectDataSourceAvailable, dataSourceOptions.federationDataSourceAvailable].filter(x => !!x).length > 1;
}