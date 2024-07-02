﻿/**
* DevExpress Analytics (widgets\criteria\utils\criteriaOperatorPreprocessor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from '../operators/criteriaOperator';
import { CriteriaProcessType } from './criteriaProcessType';
import { ICriteriaChangeOperator } from './criteriaChangeOperator';
declare type CriteriaFactory = {
    [k in keyof CriteriaProcessType]?: (options?: CriteriaProcessType[k]) => CriteriaOperator;
};
declare type CriteriaChangeFactory = {
    [k in keyof CriteriaProcessType]?: (options?: ICriteriaChangeOperator) => CriteriaOperator;
};
export declare class CriteriaOperatorPreprocessor {
    _factory: CriteriaFactory;
    _changeTypeFactory: CriteriaChangeFactory;
    _func: Array<(currentOperand: CriteriaOperator, options: {
        operatorType: string;
        options: any;
    }) => CriteriaOperator>;
    constructor();
    addListener(func: (currentOperand: CriteriaOperator, options: {
        operatorType: string;
        options: any;
    }) => CriteriaOperator): void;
    removeListener(func: (currentOperand: CriteriaOperator, options: {
        operatorType: string;
        options: any;
    }) => CriteriaOperator): void;
    register<K extends keyof CriteriaProcessType>(operatorType: K, create: (options: CriteriaProcessType[K]) => CriteriaOperator, changeType?: (changeOperator: ICriteriaChangeOperator) => CriteriaOperator): void;
    process<K extends keyof CriteriaProcessType>(operatorType: K, options?: CriteriaProcessType[K]): CriteriaOperator;
    changeByType(value: ICriteriaChangeOperator): CriteriaOperator;
}
export declare const criteriaCreator: CriteriaOperatorPreprocessor;
export {};
