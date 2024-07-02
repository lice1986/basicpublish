﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobileBindings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import 'devextreme/events/transform';
import 'devextreme/events/pointer';
import { IZoomOptions } from '../mobilePreview.viewModel';
import { IMobileSearchViewModel } from './_mobileSearch';
import { IMobilePaginatorViewModel } from './_paginator';
import { ISlideOptions } from '../mobilePreview';
export declare function initializeMobileZoomBinding(element: HTMLElement, options: IZoomOptions): void;
export declare function initializeSlideBinding(element: HTMLElement, options: ISlideOptions): () => void;
export declare function initializeMobileSearchBinding(element: HTMLDivElement, viewModel: IMobileSearchViewModel): () => void;
export declare function initializeMobilePaginatorBinding(element: HTMLElement, viewModel: IMobilePaginatorViewModel): void;
