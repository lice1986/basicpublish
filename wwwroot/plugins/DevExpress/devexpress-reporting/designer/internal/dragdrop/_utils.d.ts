﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IElementViewModel, ISize } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { IDataMemberInfo, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { ITreeListItemViewModel, TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { BandSurface } from '../../bands/xrBand';
import { VerticalBandSurface } from '../../bands/xrVerticalBand';
import { ReportSurface } from '../../controls/xrReport';
import { XRReportElementViewModel } from '../../controls/xrReportelement';
import { DataBindingMode } from '../_dataBindingMode';
export declare function selectTreeListItem(item: ITreeListItemViewModel, event: JQueryEventObject): void;
export declare function getClosestDataMember(control: XRReportElementViewModel): string;
export declare function getExpressionPath(container: XRReportElementViewModel, pathRequest: string | PathRequest): string;
export declare function getFirstSurfaceParentByType(target: ISelectionTarget, checkBandsType: (target: ISelectionTarget) => boolean): ISelectionTarget;
export declare function getUsefulReportWidth(surface?: ReportSurface): ISize;
export declare function createPictureBox(container: XRReportElementViewModel, bindingPath: string, dataBindingMode: string): XRReportElementViewModel;
export declare const _checkBandsType: (target: BandSurface | VerticalBandSurface) => boolean;
export declare function createSimpleControl(controlType: string, dropTargetControl: XRReportElementViewModel): XRReportElementViewModel;
export declare function assignBinding(control: XRReportElementViewModel, container: XRReportElementViewModel, bindingName: string, item: TreeListItemViewModel, dataBindingMode: DataBindingMode): XRReportElementViewModel;
export declare function isList(data: IDataMemberInfo): boolean;
export declare function dragDropComponentAdded(model: IElementViewModel<string>, parent: IElementViewModel<string>): void;