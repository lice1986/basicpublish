﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_wizardRunner.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export class WizardRunner extends Disposable {
    constructor(_menuOptions) {
        super();
        this._menuOptions = _menuOptions;
        this._currentWizard = null;
        this._wizards = {};
        this._disposables.push(this._menuOptions.collapsed.subscribe((newVal) => {
            if (!newVal) {
                this._currentWizard.close();
                this._currentWizard = null;
            }
        }));
    }
    dispose() {
        super.dispose();
        this._currentWizard = null;
        this._wizards = {};
    }
    registerCommand(wizardType, start, close) {
        this._wizards[wizardType] = { start, close };
    }
    run(command) {
        this._currentWizard && this._currentWizard.close();
        this._currentWizard = this._wizards[command];
        this._currentWizard && this._currentWizard.start();
    }
    closeWizard() {
        this._currentWizard && this._currentWizard.close();
    }
}
