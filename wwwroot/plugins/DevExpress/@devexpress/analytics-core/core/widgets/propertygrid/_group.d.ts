﻿/**
* DevExpress Analytics (core\widgets\propertygrid\_group.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { Disposable } from '../../../serializer/disposable';
import { IPropertiesAccessibilityProvider } from '../../../property-grid/_propertiesAccessibilityProvider';
import { Editor } from '../../../property-grid/widgets/editor';
import { ElementViewModel } from '../../elements/elementViewModel';
export declare type GroupObject = {
    [key: string]: {
        info: ISerializationInfoArray;
        displayName?: () => string;
    };
};
export declare class Group extends Disposable {
    private _viewModel;
    private _serializationsInfo;
    private _displayName;
    private _localizationId;
    private _accessibilityProvider;
    constructor(name: string, serializationsInfo: ISerializationInfoArray, createEditors: (serializationInfo: ISerializationInfoArray) => Editor[], collapsed?: boolean, displayName?: () => string);
    resetEditors(): void;
    dispose(): void;
    update(viewModel: ElementViewModel): void;
    registerAccessibilityProvider(accessibilityProvider: IPropertiesAccessibilityProvider): void;
    displayName: () => string;
    editors: ko.ObservableArray<Editor>;
    context: any;
    recreate: () => void;
    collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
    visible: ko.Computed<Boolean>;
    editorsCreated: ko.Observable<boolean>;
    editorsRendered: ko.Observable<boolean>;
}