﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\colorSchemePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { colorFromString, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ColorScheme, CustomColorScheme } from '../internal/colorSchemaPageUtils';
import { ReportWizardPageId } from '../pageId';
import { currentMultiPlatformEngine } from '@devexpress/analytics-core/analytics-serializer-native';
export class ChooseReportColorSchemePage extends WizardPageBase {
    constructor() {
        super();
        this._scheme = ko.observable(null);
        this._customColorScheme = new CustomColorScheme('Custom', 'ReportStringId.Wizard_ReportColorScheme_Custom', '255, 183, 227, 228');
        this._lookupData = {
            scheme: [
                new ColorScheme('Grey', 'ReportStringId.Wizard_ReportColorScheme_Grey', '255, 75,75,75'),
                new ColorScheme('ColdGrey', 'ReportStringId.Wizard_ReportColorScheme_ColdGrey', '255, 93,98,110'),
                new ColorScheme('Cream', 'ReportStringId.Wizard_ReportColorScheme_Cream', '255, 227,202,166'),
                new ColorScheme('JeansBlue', 'ReportStringId.Wizard_ReportColorScheme_JeansBlue', '255, 69,94,178'),
                new ColorScheme('Blue', 'ReportStringId.Wizard_ReportColorScheme_Blue', '255, 23,104,196'),
                new ColorScheme('Yellow', 'ReportStringId.Wizard_ReportColorScheme_Yellow', '255, 255,209,107'),
                new ColorScheme('LightGreen', 'ReportStringId.Wizard_ReportColorScheme_LightGreen', '255, 181,211,142'),
                new ColorScheme('Mint', 'ReportStringId.Wizard_ReportColorScheme_Mint', '255, 46,148,130'),
                new ColorScheme('LightBlue', 'ReportStringId.Wizard_ReportColorScheme_LightBlue', '255, 153,212,246'),
                new ColorScheme('Azure', 'ReportStringId.Wizard_ReportColorScheme_Azure', '255, 57,159,228'),
                new ColorScheme('Coral', 'ReportStringId.Wizard_ReportColorScheme_Coral', '255, 250,128,114'),
                new ColorScheme('Red', 'ReportStringId.Wizard_ReportColorScheme_Red', '255, 196,66,79'),
                new ColorScheme('Raspberry', 'ReportStringId.Wizard_ReportColorScheme_Raspberry', '255, 152,51,91'),
                new ColorScheme('Violet', 'ReportStringId.Wizard_ReportColorScheme_Violet', '255, 113,69,168'),
                this._customColorScheme
            ]
        };
        let customSubscription = null;
        this._scheme(this._lookupData.scheme[0]);
        this._disposables.push(this._scheme.subscribe((newVal) => {
            if (newVal === this._customColorScheme) {
                this._disposables.push(customSubscription = this._customColorScheme.color.subscribe(() => {
                    this._onChange();
                }));
            }
            else {
                customSubscription && customSubscription.dispose();
            }
            this._onChange();
        }));
    }
    addColorScheme(name, color, position = this._lookupData.scheme.length) {
        const scheme = new ColorScheme(name, undefined, color);
        scheme._isCustom = true;
        this._lookupData.scheme.splice(position, 0, scheme);
    }
    removeColorScheme(...names) {
        names.forEach(name => {
            const scheme = this._lookupData.scheme.filter(x => x.name == name || x.displayName == name)[0];
            if (scheme) {
                this._lookupData.scheme.splice(this._lookupData.scheme.indexOf(scheme), 1);
            }
        });
    }
    removeAllColorSchemes() {
        this._lookupData.scheme = [];
    }
    setCustomColor(color) {
        this._customColorScheme.editorColor(color.indexOf('rgb') === 0 ?
            color :
            currentMultiPlatformEngine.unwrap(colorFromString(color)));
        this._customColorScheme.applyColor();
    }
    _applyScheme(data) {
        this._scheme() && this._scheme().selected(false);
        data.selected(true);
        this._scheme(data);
    }
    canFinish() {
        return true;
    }
    initialize(state) {
        if (state.name === 'Custom') {
            this._customColorScheme.editorColor(state.baseColor);
            this._customColorScheme.applyColor();
        }
        let currentScheme = this._lookupData.scheme.filter(x => x.name === state.name)[0];
        if (!currentScheme) {
            currentScheme = this._lookupData.scheme[0];
        }
        this._scheme(currentScheme);
        if (currentScheme)
            currentScheme.selected(true);
        return $.Deferred().resolve().promise();
    }
    commit() {
        const scheme = this._scheme();
        const result = scheme ? {
            name: scheme._isCustom ? 'Custom' : scheme.name,
            baseColor: scheme.baseColor,
            _color: ko.unwrap(scheme.color)
        } : {};
        return $.Deferred().resolve(result).promise();
    }
}
export function _applyColorSchemeState(data, state) {
    state.baseColor = data.baseColor;
    state.name = data.name;
    state['_color'] = data['_color'];
}
export function _registerChooseReportColorSchemePage(factory) {
    factory.registerMetadata(ReportWizardPageId.ChooseReportColorSchemePage, {
        create: () => new ChooseReportColorSchemePage(),
        getState: (state) => state.colorScheme,
        setState: (data, state) => {
            _applyColorSchemeState(data, state);
        },
        resetState: (state, defaultState) => {
            _applyColorSchemeState(defaultState, state);
        },
        template: 'dxrd-page-colorScheme',
        description: getLocalization('Choose a report color scheme.', 'ASPxReportsStringId.ReportDesigner_Wizard_ColorScheme_Description')
    });
}