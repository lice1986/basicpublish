﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_sizeUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IElementPosition } from './_progressViewModel';
import { ZoomAutoBy } from '../constants';
import { ReportPreview } from '../reportPreview';
export declare function stringToPosition(position: string): IElementPosition;
export declare function getDockedElementCallback($targetElement: JQuery<Element>, $viewer: JQuery<Element>, $window: JQuery<Window>, selector: string, position?: IElementPosition): (element: Element) => void;
export declare function updatePreviewContentSize(reportPreview: ReportPreview, root: HTMLElement, rtl?: boolean): (position: string) => void;
export declare function updatePreviewZoomWithAutoFit(width: number, height: number, element: HTMLElement, autoFitBy?: ZoomAutoBy): number;
