﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorToolbarItem.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, BaseModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import dxPopup, { ContentReadyEvent, HiddenEvent, Properties, ShownEvent } from 'devextreme/ui/popup';
import { PictureEditorActionId } from './_pictureEditorTypes';
export declare class PictureEditorToolbarItem extends BaseModel implements IPictureEditorToolbarItem {
    constructor(options: IPictureEditorToolbarItemOptions);
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    dispose(): void;
    id: PictureEditorActionId;
    icon: string;
    title: string;
    active: boolean;
    action: (e: any, model: any) => void;
}
export declare class PictureEditorToolbarItemWithPopup extends PictureEditorToolbarItem implements IPictureEditorToolbarItemWithPopup {
    private _popup;
    constructor(options: IPictureEditorToolbarItemWithTemplateOptions<IPictureEditorActionPopupOptions>);
    onPropertyChanged(args: PropertyChangedEventArgs<PictureEditorToolbarItemWithPopup> | ArrayPropertyChangedEventArgs<PictureEditorToolbarItemWithPopup>): void;
    dispose(): void;
    template: string;
    templateOptions: IPictureEditorActionPopup;
}
export interface IPictureEditorToolbarItem extends IPictureEditorToolbarItemOptions {
    dispose: () => void;
    active: boolean;
}
export interface IPictureEditorToolbarItemWithPopup extends IPictureEditorToolbarItemWithTemplateOptions<IPictureEditorActionPopup> {
    dispose: () => void;
}
export interface IPictureEditorToolbarItemWithTemplateOptions<T = unknown> extends IPictureEditorToolbarItemOptions {
    template?: string;
    templateOptions?: T;
}
export interface IPictureEditorToolbarItemOptions {
    id: PictureEditorActionId;
    icon: string;
    action?: (e: any, model: any) => void;
    title: string;
}
export interface IPictureEditorActionPopup extends IPictureEditorActionPopupOptions {
    component: dxPopup<Properties>;
    onContentReady: (event: ContentReadyEvent) => void;
    onShown: (event: ShownEvent) => void;
    onHidden: (e: HiddenEvent) => void;
    hideOnOutsideClick: (e: {
        target: any;
    }) => boolean;
}
export interface IPictureEditorActionPopupOptions {
    width: string;
    height: string;
    contentTemplate: string;
    contentData: any;
    container: string;
    target: string;
    boundary: string | any;
    getPositionTarget: () => HTMLElement;
    visible: boolean;
}
