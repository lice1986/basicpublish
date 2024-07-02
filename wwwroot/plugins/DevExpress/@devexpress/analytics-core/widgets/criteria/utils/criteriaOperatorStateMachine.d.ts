﻿/**
* DevExpress Analytics (widgets\criteria\utils\criteriaOperatorStateMachine.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator } from '../operators/criteriaOperator';
export interface _IToken {
    type: string;
    val?: string;
    start: number;
    end: number;
}
export declare class MachineState {
    private tokenName;
    private alphabet;
    private startTerm;
    private endTerm;
    private tokenLength;
    isActiveState: boolean;
    tokens: _IToken[];
    constructor(tokenName: 'comment' | 'field' | 'value', alphabet: string, startTerm: string, endTerm: string);
    private _isSubline;
    private _getToken;
    processTransitionFunction(pos: number): number;
}
export declare class CriteriaOperatorStateMachine {
    private stringCriteria;
    static parse(stringCriteria: string, saveOriginalStringLength?: boolean): CriteriaOperator;
    private machineStates;
    private _inputStringCriteria;
    constructor(stringCriteria: string);
    _tokenize(): _IToken[];
    _replaceTokenToAnotherToken(tokens: _IToken[], newTokenChar: string, tokenName: string): string;
    replaceCommentsToChar(char?: string): CriteriaOperatorStateMachine;
    getCriteria(): CriteriaOperator;
}
