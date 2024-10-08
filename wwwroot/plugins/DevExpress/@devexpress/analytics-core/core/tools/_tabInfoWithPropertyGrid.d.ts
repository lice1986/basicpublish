﻿/**
* DevExpress Analytics (core\tools\_tabInfoWithPropertyGrid.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IObjectPropertiesViewModel, ObjectProperties } from '../../property-grid/propertygrid';
import { ITabInfoOptions, ITabPanelItemViewModel, TabInfo } from '../widgets/tabInfo';
import { EngineType } from '../../serializer/native/models/base.model';
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '../../serializer/propertyChangedEvents';
export interface ITabPanelItemWithPropertyGridViewModel extends ITabPanelItemViewModel {
    propertyGrid: IObjectPropertiesViewModel;
    propertyGridModel: any;
}
export interface ITabInfoWithPropertyGridOptions extends ITabInfoOptions {
    propertyGridModel: any;
    engineType?: EngineType;
}
export declare class TabInfoWithPropertyGrid extends TabInfo {
    createViewModel(): ITabPanelItemViewModel<any>;
    updateViewModel(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    constructor(options: ITabInfoWithPropertyGridOptions);
    propertyGridModel: any;
    propertyGrid: ObjectProperties;
}
