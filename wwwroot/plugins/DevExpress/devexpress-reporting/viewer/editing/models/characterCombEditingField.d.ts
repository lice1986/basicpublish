﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\characterCombEditingField.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ITextEditingFieldViewModelBase, TextEditingFieldViewModelBase } from './textEditingField';
import { IEditingFieldModel, EditingField, IBounds } from '../editingField';
import { PreviewPage } from '../../internal/_page';
interface ICharacterCombCell {
    text: string;
    style: any;
}
export interface ICharacterCombEditingFieldViewModel extends ITextEditingFieldViewModelBase {
    cells: ICharacterCombCell[];
}
export declare class CharacterCombEditingFieldViewModel extends TextEditingFieldViewModelBase<ICharacterCombEditingFieldViewModel> implements IEditingFieldModel {
    field: EditingField<string>;
    constructor(field: EditingField<string>, pageWidth: number, pageHeight: number, page: PreviewPage, bounds: IBounds);
    private _createCellViewModels;
    createViewModel(): ICharacterCombEditingFieldViewModel;
    cells: ICharacterCombCell[];
    template: string;
    canActivateEditor: boolean;
    activateEditor(viewModel: CharacterCombEditingFieldViewModel, event: MouseEvent): void;
    static setText(cells: ICharacterCombCell[], textAlignment: string, rtl: boolean, text: string, rowsCount: number, colsCount: number): void;
}
export {};
