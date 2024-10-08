﻿/**
* DevExpress Analytics (widgets\internal\_popupComponentBase.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxPopup, { ContentReadyEvent, Properties } from 'devextreme/ui/popup';
import { BaseModel } from '../../serializer/native/models/base.model';
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '../../serializer/propertyChangedEvents';
export declare class PopupComponentBase extends BaseModel {
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    private _component;
    getComponent(): dxPopup<Properties>;
    onContentReady: (e: ContentReadyEvent) => void;
    hideOnOutsideClick: (e: {
        target: HTMLElement;
    }) => boolean;
    dispose(): void;
}
