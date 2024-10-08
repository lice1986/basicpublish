﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_wizardRunner.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { CommandRunType } from '../wizard/wizardTypes';
export declare class WizardRunner extends Disposable {
    private _menuOptions;
    dispose(): void;
    private _currentWizard;
    private _wizards;
    constructor(_menuOptions: {
        visible: ko.Subscribable<boolean>;
        collapsed: ko.Subscribable<boolean>;
    });
    registerCommand(wizardType: CommandRunType, start: () => void, close: () => void): void;
    run(command: CommandRunType): void;
    closeWizard(): void;
}
