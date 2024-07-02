﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\_codeCompletor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CodeCompletor, ICodeCompletorOptions } from '../../common/_codeCompletor';
export declare class FilterEditorCodeCompletor extends CodeCompletor {
    filterEditorAvailable: {
        operators: Array<{
            name: string;
            insertVal: string;
            paramCount: number;
        }>;
        aggregate: Array<{
            name: string;
            insertVal: string;
        }>;
        functions: Array<{
            name: string;
            insertVal: string;
        }>;
    };
    constructor(options: ICodeCompletorOptions);
    getFunctionsCompletions(): any[];
    getAggregateCompletions(): any[];
    getOperatorCompletions(prefix: any): any[];
}