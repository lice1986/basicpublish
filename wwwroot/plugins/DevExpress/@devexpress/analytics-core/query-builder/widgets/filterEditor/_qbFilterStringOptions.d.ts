﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_qbFilterStringOptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { FilterStringOptions } from '../../../widgets/filtereditor/filtereditoroptions';
import { ParameterViewModel } from '../../elements/parameterModel';
import { FilterEditorSerializer } from '../../../widgets/filtereditor/helpers/_serializer';
import { QBFilterEditorHelper } from './_qbFilterEditorHelper';
export declare class QBFilterStringOptions extends FilterStringOptions {
    constructor(filterString: ko.Observable<string> | ko.Computed<string>, dataMember?: ko.Observable | ko.Computed, disabled?: ko.Observable<boolean> | ko.Computed<boolean>, title?: {
        text: string;
        localizationId?: string;
    });
    initializeFilterStringHelper(parameters: ko.ObservableArray<ParameterViewModel> | ko.Computed<ParameterViewModel[]>, parametersMode: string, serializer?: FilterEditorSerializer): void;
    helper: QBFilterEditorHelper;
}
