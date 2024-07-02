﻿/**
* DevExpress Analytics (widgets\criteria\utils\criteriaOperatorStateMachine.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { stringReplace } from '../../../property-grid/widgets/internal/_utils';
import { parse } from '../parser/criteriaparser';
export class MachineState {
    constructor(tokenName, alphabet, startTerm, endTerm) {
        this.tokenName = tokenName;
        this.alphabet = alphabet;
        this.startTerm = startTerm;
        this.endTerm = endTerm;
        this.tokenLength = 0;
        this.isActiveState = false;
        this.tokens = [];
    }
    _isSubline(pos, term) {
        let result = (pos + term.length - 1 < this.alphabet.length);
        for (let i = pos; i < (pos + term.length) && result; i++)
            result = this.alphabet[i] == term[i - pos];
        return result;
    }
    _getToken(pos) {
        const token = {
            type: this.tokenName, start: pos - this.tokenLength + 1, end: pos + this.endTerm.length
        };
        token.val = this.alphabet.substring(token.start, token.end);
        return token;
    }
    processTransitionFunction(pos) {
        if (this.isActiveState) {
            this.tokenLength++;
        }
        if (this._isSubline(pos, this.startTerm) && !this.isActiveState) {
            this.isActiveState = true;
            this.tokenLength += this.startTerm.length;
            return this.startTerm.length - 1;
        }
        else if (this.isActiveState && this._isSubline(pos, this.endTerm)) {
            this.isActiveState = false;
            this.tokens.push(this._getToken(pos));
            this.tokenLength = 0;
            return this.endTerm.length - 1;
        }
        return 0;
    }
}
export class CriteriaOperatorStateMachine {
    constructor(stringCriteria) {
        this.stringCriteria = stringCriteria;
        this.machineStates = [];
        this.machineStates.push(new MachineState('field', stringCriteria, '[', ']'));
        this.machineStates.push(new MachineState('value', stringCriteria, "'", "'"));
        this.machineStates.push(new MachineState('comment', stringCriteria, '/*', '*/'));
        this._inputStringCriteria = stringCriteria;
    }
    static parse(stringCriteria, saveOriginalStringLength = false) {
        if (stringCriteria && stringCriteria !== '') {
            if (saveOriginalStringLength)
                return new CriteriaOperatorStateMachine(stringCriteria).replaceCommentsToChar(' ').getCriteria();
            return new CriteriaOperatorStateMachine(stringCriteria).replaceCommentsToChar().getCriteria();
        }
        return null;
    }
    _tokenize() {
        for (let i = 0; i < this.stringCriteria.length; i++) {
            let step = 0;
            this.machineStates.forEach(state => {
                if (step)
                    return;
                const anotherMachines = this.machineStates.filter(a => a != state && a.isActiveState);
                if (!anotherMachines.length)
                    step = state.processTransitionFunction(i);
            });
            i += step;
        }
        let resultTokens = [];
        this.machineStates.forEach((state) => {
            resultTokens = resultTokens.concat(state.tokens);
            state.tokens = [];
        });
        return resultTokens;
    }
    _replaceTokenToAnotherToken(tokens, newTokenChar, tokenName) {
        let tempCriteria = this.stringCriteria;
        tokens = tokens.filter(a => a.type == tokenName).sort(a => a.start).reverse();
        tokens.forEach(token => {
            const lines = token.val.split('\n');
            let start = token.start;
            let end = token.end;
            lines.forEach(line => {
                if (line.length + start !== token.end) {
                    end = start + line.length;
                }
                else {
                    end = token.end;
                }
                tempCriteria = stringReplace(tempCriteria, start, end - start, newTokenChar);
                start = (line.length * newTokenChar.length) + 1;
            });
        });
        return tempCriteria;
    }
    replaceCommentsToChar(char = '') {
        this._inputStringCriteria = this._replaceTokenToAnotherToken(this._tokenize(), char, 'comment');
        return this;
    }
    getCriteria() {
        return parse(this._inputStringCriteria);
    }
}