﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_progressViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ListKeyboardHelper } from '@devexpress/analytics-core/analytics-internal-native';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs, IRenderingModel } from '@devexpress/analytics-core/analytics-serializer-native';
import { IDisposable } from '@devexpress/analytics-core/analytics-utils-native';
export interface IElementPosition {
    top: boolean;
    bottom?: boolean;
    left: boolean;
    right?: boolean;
}
export interface IProgressHandler extends IRenderingModel, IDisposable {
    text: string;
    visible: boolean;
    progress: number;
    inProgress: boolean;
    cancelText: string;
    cancelAction: () => void;
    startProgress: (startOperationId: string, onStop: (operationId: string) => void, getOperationIdPromise: JQueryPromise<string>) => JQuery.Promise<string>;
    complete: (operationId: string) => void;
    wasCancelRequested(id: string): boolean;
    setPosition: (position: IElementPosition) => void;
}
export interface IProgressBarViewModel extends IViewModel {
    text: string;
    visible: boolean;
    progress: number;
    cssClasses: string;
    progressBarAccessibilityKeyboardHelper: any;
    cancelButton: {
        action: () => void;
        text?: string;
        visible?: boolean;
    };
}
export declare class ProgressViewModel extends BaseRenderingModel<IProgressBarViewModel> implements IProgressHandler {
    private _startOperationId;
    private _lastOperationIdDeferred;
    private _lastOperationDeferred;
    private _cancelExportRequests;
    constructor(enableKeyboardSupport?: boolean);
    updateViewModel(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    createViewModel(): IProgressBarViewModel;
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    private _rejectLastOperationIdDeferred;
    private _rejectLastOperationDeferred;
    progressBarAccessibility: ListKeyboardHelper;
    visible: boolean;
    text: string;
    progress: number;
    cancelText: string;
    cancelAction: () => void;
    inProgress: boolean;
    private _operationId;
    private _isCancelling;
    private _forceInvisible;
    private _cssClasses;
    startProgress(startOperationId: string, onStop?: (operationId: string) => void, operationIdPromise?: JQueryPromise<string>): JQuery.Promise<string>;
    complete(completeOperationId: string): void;
    wasCancelRequested(id: string): boolean;
    setPosition(position: IElementPosition): void;
    dispose(): void;
}
