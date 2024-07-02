﻿/**
* DevExpress Analytics (serializer\native\deserializationEngine.updateViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '../propertyChangedEvents';
import { IModel } from './models/interfaces.model';
export declare function updateViewModel(model: IModel, args: PropertyChangedEventArgs | ArrayPropertyChangedEventArgs): void;
export declare function _updateViewModelWithChunks(model: IModel, args: PropertyChangedEventArgs | ArrayPropertyChangedEventArgs): void;