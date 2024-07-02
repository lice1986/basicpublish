﻿/**
* DevExpress Analytics (query-builder\wizard\internal\objectDataSource\_chooseObjectTypes.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { TreeListController } from '../../../../widgets/treelist/_treelistController';
import { Disposable } from '../../../../serializer/disposable';
export class ChooseObjectTypesTreelistController extends TreeListController {
    canSelect(value) {
        return true;
    }
}
export class ChooseObjectTypes extends Disposable {
    constructor(types, provider) {
        super();
        this.types = types;
        this.selectedType = ko.observable();
        this.selectedCtor = ko.observable();
        this.selectedPath = ko.observable('');
        this._scrollViewHeight = 'calc(100% - 36px)';
        this.availableTypesTreelistModel = {
            expandRootItems: true,
            itemsProvider: provider,
            selectedPath: this.selectedPath,
            treeListController: new ChooseObjectTypesTreelistController()
        };
        this._disposables.push(this.selectedPath.subscribe(newValue => {
            types().forEach((type) => {
                if (type.name == newValue) {
                    this.selectedType(type);
                    if (this.selectedCtor() == null)
                        this.selectedCtor.valueHasMutated();
                    else
                        this.selectedCtor(null);
                }
                else {
                    type.ctors.forEach(ctor => {
                        if (type.name.concat('.').concat(ctor.name) == newValue) {
                            this.selectedType(type);
                            this.selectedCtor(ctor);
                        }
                    });
                }
            });
        }));
    }
}