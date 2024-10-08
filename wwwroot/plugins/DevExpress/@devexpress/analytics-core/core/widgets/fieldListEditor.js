﻿/**
* DevExpress Analytics (core\widgets\fieldListEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '../../property-grid/widgets/editor';
import { TreeListController } from '../../widgets/treelist/_treelistController';
import { createViewModelGenerator } from '../../serializer/native/viewModels/viewModelGenerator';
export class FieldListEditor extends Editor {
    constructor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        super(modelPropertyInfo, level, parentDisabled, textToSearch);
        this.path = ko.pureComputed(() => {
            const model = this._get('_model');
            return model && model['getPath'] && model['getPath'](this.name) || '';
        });
        this.treeListController = new TreeListController();
        this._disposables.push(this.path);
        this._disposables.push(this.treeListController);
    }
    createViewModel() {
        const viewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('path', ko.unwrap(this.path))
            .generateProperty('treeListController', this.treeListController)
            .generateProperty('getPath', () => ko.unwrap(this.path))
            .generateProperty('getDataMember', () => ko.unwrap(this.value))
            .getViewModel();
        this.subscribeOnChanges(viewModel, ['path']);
        return viewModel;
    }
}
