﻿/**
* DevExpress Analytics (core\widgets\popover.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseRenderingModel } from '../../serializer/native/models/base.model';
import { IViewModel } from '../../serializer/native/models/interfaces.model';
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '../../serializer/propertyChangedEvents';
import { getParentContainer } from '../../widgets/_utils';
export interface IPopoverViewModel extends IViewModel {
    data: string;
    target: HTMLElement;
    visible: boolean;
    onHiding: () => void;
    getPopupContainer: typeof getParentContainer;
}
export declare class Popover extends BaseRenderingModel<IPopoverViewModel> {
    createViewModel(): IPopoverViewModel;
    updateViewModel(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    onHiding(): void;
    visible: boolean;
    target: HTMLElement;
    data: string;
    getPopupContainer: typeof getParentContainer;
}