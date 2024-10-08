﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\wizardTypes.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceWizard, FullscreenDataSourceWizard, MultiQueryDataSourceWizard } from '@devexpress/analytics-core/analytics-wizard';
import { FullscreenReportWizard } from './fullscreenReportWizard';
import { ReportWizard } from './reportWizard';
export declare type WizardTypeString = 'SingleQueryDataSourceWizard' | 'DataSourceWizard' | 'ReportWizard';
export declare type WizardRunType = 'NewViaReportWizard' | 'DataSourceWizard' | 'DesignInReportWizard';
export declare type CommandRunType = WizardRunType | 'LocalizationCommand';
export declare type WizardType = DataSourceWizard | FullscreenDataSourceWizard | FullscreenReportWizard | ReportWizard | MultiQueryDataSourceWizard;
