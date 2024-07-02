﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_masterDetailRequestModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { INumericSize } from '@devexpress/analytics-core/analytics-elements';
import { PaperKind } from '../../utils/paperKind';
import { GraphicsUnit, IReportWizardState } from '../reportWizardState';
import { CommonRequestModel } from './_commonRequestModel';
export declare class MasterDetailRequestModel extends CommonRequestModel {
    private _masterRelationMap;
    private _collectionByPath;
    DataSourceName: string;
    MasterDetailInfo: any;
    MasterDetailGroupsInfo: {
        [key: string]: any;
    };
    MasterDetailSummariesInfo: {
        [key: string]: any;
    };
    CrossTabFieldInfo: any;
    Portrait: boolean;
    PaperKind: PaperKind;
    PaperSize: INumericSize;
    Margins: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    Unit: GraphicsUnit;
    UseMasterDetailBuilder: boolean;
    DataMemberName: {
        'DisplayName': string;
        'Name': string;
        'DataMemberType': number;
    };
    constructor(state: IReportWizardState);
}
