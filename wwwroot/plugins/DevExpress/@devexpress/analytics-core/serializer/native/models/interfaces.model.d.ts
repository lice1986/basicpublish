﻿/**
* DevExpress Analytics (serializer\native\models\interfaces.model.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EventPropertyManager } from '../../eventManager';
import { PropertyChangedEvents } from '../../propertyChangedEvents';
export interface IModel {
    events: EventPropertyManager<this>;
    onPropertyChanged(args: PropertyChangedEvents['propertyChanged']): void;
}
export interface IViewModel<T = unknown> {
    getModel(): T;
}
export interface IRenderingModel {
    getViewModel(): IViewModel;
    createViewModel(): void;
}
