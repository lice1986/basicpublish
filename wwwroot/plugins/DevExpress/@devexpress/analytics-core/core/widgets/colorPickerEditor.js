﻿/**
* DevExpress Analytics (core\widgets\colorPickerEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '../../property-grid/widgets/editor';
import { createViewModelGenerator } from '../../serializer/native/viewModels/viewModelGenerator';
import { subscribableProperty } from '../../serializer/native/multiplatformEngine';
export class ColorPickerEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch, popupService, popover, engineType) {
        super(info, level, parentDisabled, textToSearch, popupService, popover, engineType);
        this.addDisposable(this.createComputedProperty('displayValue', {
            read: () => {
                const value = this._get('value');
                if (!value)
                    return undefined;
                if (value && value.toLowerCase() === 'transparent') {
                    return 'rgba(0,0,0,0)';
                }
                if ((/^rgba\s*\((\s*[a-f\d]+\s*,){3}\s*[a-f\d]+\s*\)$/i).test(value))
                    return value;
                const div = document.createElement('div');
                div.style.backgroundColor = value;
                return div.style.backgroundColor || 'rgba(0,0,0,1)';
            },
            write: (val) => {
                this._set('value', val);
            }
        }, [
            subscribableProperty(this, ['value'])
        ]));
    }
    createViewModel() {
        const viewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('displayValue', this.unwrap(this.displayValue))
            .getViewModel();
        this.subscribeOnChanges(viewModel, ['displayValue']);
        return viewModel;
    }
}
