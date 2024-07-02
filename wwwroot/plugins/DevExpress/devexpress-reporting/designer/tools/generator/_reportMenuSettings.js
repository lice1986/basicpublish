﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\_reportMenuSettings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MenuSettings } from '@devexpress/analytics-core/analytics-internal';
import * as events from 'devextreme/events';
import * as ko from 'knockout';
export class ReportMenuSettings extends MenuSettings {
    constructor() {
        super();
        this._appMenuVisible = ko.observable(false);
        this._$menuElement = null;
        this.isMenuCollapsed = ko.observable(false);
        this.toggleAppMenu = (event) => {
            const canToggle = !event || !this._$menuElement.is(event.target) && !this._$menuElement.find(event.target).length;
            canToggle && this._toggleAppMenu();
            return canToggle;
        };
    }
    dispose() {
        super.dispose();
        events.off(document, 'dxpointerdown', this.toggleAppMenu);
        this._$menuElement = null;
    }
    setMenuElement($element) {
        this._$menuElement = $element;
    }
    _toggleAppMenu() {
        this.appMenuVisible(!this.appMenuVisible());
        if (this.appMenuVisible()) {
            events.on(document, 'dxpointerdown', this.toggleAppMenu);
        }
        else {
            this.isMenuCollapsed(false);
            events.off(document, 'dxpointerdown', this.toggleAppMenu);
        }
    }
    generate() {
        const result = super.generate();
        if (this.isMenuCollapsed)
            result['isMenuCollapsed'] = this.isMenuCollapsed;
        result['setMenuElement'] = ($element) => this.setMenuElement($element);
        return result;
    }
}