﻿/**
* DevExpress Analytics (core\tools\contextMenuProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { $dx } from '../utils/_jqueryUtils';
import { getTemplate } from '../../property-grid/widgets/templateUtils';
export class ContextMenuProvider extends Disposable {
    constructor({ actions, target, getClickActionParams, contextMenusEnabled }) {
        super();
        this.hideOnOutsideClick = true;
        this.actions = actions;
        this.target = target;
        const getDataSource = () => {
            return this.actions().reduce((result, item) => {
                var _a;
                if (item.group) {
                    return [...result, {
                            text: item.group,
                            items: item.items.filter(item => { var _a; return ((_a = item.isContextMenuAction) !== null && _a !== void 0 ? _a : true); })
                        }];
                }
                else if ((_a = item.isContextMenuAction) !== null && _a !== void 0 ? _a : true) {
                    return [...result, item];
                }
                return result;
            }, []);
        };
        this.dataSource = ko.observable(getDataSource());
        this.addDisposable(this.actions.subscribe((newVal) => {
            this.dataSource(getDataSource());
        }));
        this.itemTemplate = (itemData, index, element) => {
            if (itemData.hasSeparator) {
                const seperator = document.createElement('div');
                seperator.style.borderBottomWidth = '1px';
                seperator.style.borderBottomStyle = 'solid';
                seperator.style.color = '#E6E6E6';
                seperator.style.width = '100%';
                $dx(element).parentElement().prepend(seperator);
            }
            $dx(element).css({ padding: '3px 5px 5px' });
            return getTemplate('dxrd-context-menu-item');
        };
        this.onItemClick = (e) => {
            if ((!('disabled' in e.itemData) || !ko.unwrap(e.itemData.disabled)) && e.itemData.clickAction) {
                const params = getClickActionParams && getClickActionParams();
                e.itemData.clickAction(params);
                e.component.hide();
            }
        };
        this.onInitialized = (e) => {
            this.component = e.component;
        };
        this.onOptionChanged = (e) => {
            var _a, _b;
            if (e.name === 'visible' && e.value)
                if ((_b = (_a = e.component._overlay) === null || _a === void 0 ? void 0 : _a._positionController) === null || _b === void 0 ? void 0 : _b.$container[0]) {
                    const container = document.getElementsByClassName('dx-designer-viewport')[0];
                    e.component._overlay._positionController.$container[0] = container;
                }
        };
        this.disabled = ko.observable(!contextMenusEnabled());
        this._disposables.push(contextMenusEnabled.subscribe((newValue => {
            this.disabled(!newValue);
        })));
    }
    hide() {
        this.component && this.component.hide();
    }
}
