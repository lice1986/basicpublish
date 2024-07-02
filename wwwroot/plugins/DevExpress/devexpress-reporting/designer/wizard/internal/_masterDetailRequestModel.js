﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_masterDetailRequestModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { PaperKind } from '../../utils/paperKind';
import { ReportType } from '../reportWizardState';
import { CommonRequestModel } from './_commonRequestModel';
import { CrossTabColumnFieldInfo, CrossTabDataFieldInfo, CrossTabRowFieldInfo } from './_crossTabRequestModel';
export class MasterDetailRequestModel extends CommonRequestModel {
    constructor(state) {
        super(state);
        this._masterRelationMap = (query, path) => {
            const newInfo = {
                Name: query.name,
                DisplayName: query.displayName,
                CheckedState: query.checked,
                Fields: query.fields.map(field => {
                    return {
                        Name: field.name,
                        DisplayName: field.displayName,
                        Checked: field.checked,
                    };
                }),
                Relations: query.relations.map(relation => this._masterRelationMap(relation, relation.path))
            };
            this._collectionByPath[path] = newInfo;
            return newInfo;
        };
        this._collectionByPath = {};
        this.UseMasterDetailBuilder = true;
        const dataSource = state.dataSource || state.newDataSource;
        this.DataSourceName = dataSource && JSON.parse(dataSource).name;
        if (state.reportType === ReportType.CrossTab) {
            this.CrossTabFieldInfo = [].concat((state.crossTabColumnsFieldInfo || []).map(item => new CrossTabColumnFieldInfo({ name: item.name, displayName: item.displayName, sortOrder: item.sortOrder })), (state.crossTabRowsFieldInfo || []).map(item => new CrossTabRowFieldInfo({ name: item.name, displayName: item.displayName, sortOrder: item.sortOrder })), (state.crossTabDataFieldInfo || []).map(item => new CrossTabDataFieldInfo({ name: item.name, displayName: item.displayName, summaryType: item.summaryType })));
        }
        else {
            this.MasterDetailInfo = state.masterDetailInfoCollection.map(info => {
                return this._masterRelationMap(info, info.path);
            });
            this.MasterDetailGroupsInfo = $.map(state.masterDetailGroups, (array, key) => ({
                'Key': this._collectionByPath[key],
                'Value': (array || []).map(item => ((item || [])))
            }));
            this.MasterDetailSummariesInfo = $.map(state.masterDetailSummariesInfo, (value, key) => ({
                'Key': this._collectionByPath[key],
                'Value': (value || []).map((item) => {
                    return {
                        Column: {
                            Name: item.column.name,
                            DisplayName: item.column.displayName
                        },
                        SummaryFunctions: item.summaryFunctions
                    };
                })
            }));
        }
        if (state.pageSetup) {
            this.PaperKind = PaperKind[state.pageSetup.paperKind];
            this.PaperSize = {
                width: state.pageSetup.width,
                height: state.pageSetup.height
            };
            this.Margins = {
                left: state.pageSetup.marginLeft,
                right: state.pageSetup.marginRight,
                top: state.pageSetup.marginTop,
                bottom: state.pageSetup.marginBottom
            };
            this.Portrait = !state.pageSetup.landscape;
            this.Unit = state.pageSetup.unit;
        }
    }
}
