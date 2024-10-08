﻿/**
* DevExpress Analytics (widgets\criteria\utils\criteriaProcessType.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IAggregateOperandOptions } from '../operators/options/aggregate';
import { IBetweenOperatorOptions } from '../operators/options/between';
import { IBinaryOperatorOptions } from '../operators/options/binary';
import { IFunctionOperatorProperties } from '../operators/options/function';
import { IGroupOperatorOptions } from '../operators/options/group';
import { IInOperatorOptions } from '../operators/options/in';
import { IJoinOperandOptions } from '../operators/options/join';
import { IOperandParameterOptions } from '../operators/options/parameter';
import { IOperandPropertyOptions } from '../operators/options/property';
import { IUnaryOperatorOptions } from '../operators/options/unary';
import { IOperandValueOptions } from '../operators/options/value';
export declare type CriteriaProcessType = {
    'join': Partial<IJoinOperandOptions>;
    'between': Partial<IBetweenOperatorOptions>;
    'property': Partial<IOperandPropertyOptions>;
    'parameter': Partial<IOperandParameterOptions>;
    'value': Partial<IOperandValueOptions>;
    'in': Partial<IInOperatorOptions>;
    'function': Partial<IFunctionOperatorProperties>;
    'unary': Partial<IUnaryOperatorOptions>;
    'group': Partial<IGroupOperatorOptions>;
    'binary': Partial<IBinaryOperatorOptions>;
    'const': Partial<IOperandValueOptions>;
    'aggregate': Partial<IAggregateOperandOptions>;
    'default': any;
};
