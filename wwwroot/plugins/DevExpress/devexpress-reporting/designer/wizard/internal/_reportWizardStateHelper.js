﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_reportWizardStateHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _convertToStateDataSource } from '../pages/chooseAvailableDataSourcePage';
import { GraphicsUnit } from '../reportWizardState';
export class ReportWizardStateHelper {
    static applyDataBindings(state, model) {
        const modelDS = model.dataSource();
        const dataSourceInfo = modelDS && modelDS['dataSourceInfo'];
        state.dataSource = dataSourceInfo && _convertToStateDataSource(dataSourceInfo);
        state.dataMember = model.dataMember() || '';
        if (state.dataMember) {
            state.dataMemberInfo = {
                name: model.dataMember(),
                displayName: undefined
            };
            state.dataMemberPath = model.dataMember();
        }
    }
    static applyPageSetup(state, model) {
        let unit;
        let _pageSetupProps = [
            model.pageWidth(),
            model.pageHeight(),
            model.margins.left(),
            model.margins.right(),
            model.margins.top(),
            model.margins.bottom()
        ];
        switch (model.measureUnit()) {
            case 'HundredthsOfAnInch':
                _pageSetupProps = _pageSetupProps.map(x => x / 100);
                unit = GraphicsUnit.Inch;
                break;
            case 'TenthsOfAMillimeter':
                _pageSetupProps = _pageSetupProps.map(x => x / 10);
                unit = GraphicsUnit.Millimeter;
                break;
            case 'Pixels':
                unit = GraphicsUnit.Pixel;
                break;
        }
        state.pageSetup = {
            paperKind: model.paperKind(),
            unit: unit,
            width: _pageSetupProps[0],
            height: _pageSetupProps[1],
            marginLeft: _pageSetupProps[2],
            marginRight: _pageSetupProps[3],
            marginTop: _pageSetupProps[4],
            marginBottom: _pageSetupProps[5],
            landscape: model.landscape()
        };
    }
}
