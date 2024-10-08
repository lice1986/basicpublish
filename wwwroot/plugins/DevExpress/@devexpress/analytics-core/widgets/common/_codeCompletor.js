﻿/**
* DevExpress Analytics (widgets\common\_codeCompletor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { functionDisplay } from '../expressioneditor/tools/_functions';
import { Disposable } from '../../serializer/disposable';
import { isList, setCursorInFunctionParameter } from '../_utils';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { PathRequest } from './pathRequest';
import { RangeSpecific } from '../expressioneditor/_expressioneditor';
import { operatorNames } from '../expressioneditor/tools/_operatorNames';
import { CriteriaOperatorStateMachine } from '../criteria/utils/criteriaOperatorStateMachine';
export class CodeCompletor extends Disposable {
    constructor(_options) {
        super();
        this._options = _options;
        this._contextPath = null;
        this._isInContext = () => this._contextPath !== null;
        this._getPath = () => this._contextPath ? this._path() + '.' + this._contextPath : this._path();
        this.identifierRegexps = [/\./, /\[/];
        this._fieldListProvider = _options.fieldListProvider;
        this._path = _options.path;
        this._editor = _options.editor;
        this._functions = ko.computed(() => { return ko.unwrap(_options.functions) || functionDisplay(); });
        this._rootItems = _options.rootItems || [{ name: 'Parameters', needPrefix: true }];
        this._disposables.push(this._functions);
    }
    _previousSymbol() {
        const cursorPosition = this._editor.getCursorPosition();
        return this._editor.session.getLine(cursorPosition.row)[cursorPosition.column - 1];
    }
    beforeInsertMatch(editor, token, parentPrefix) {
        const cursorPosition = editor.getCursorPosition();
        if (parentPrefix === 'Parameters.') {
            token = token || !this['_isInContext']() && editor.session.getTokenAt(cursorPosition.row, cursorPosition.column);
            if (token) {
                if ((token.type === 'support.variable.other' || token.type === 'support.function')) {
                    editor.session.remove({
                        start: { column: token.start - 1 || 0, row: cursorPosition.row },
                        end: { column: Math.max(token.start + token.value.length || 0, cursorPosition.column), row: cursorPosition.row }
                    });
                }
                else if (token.type === 'support.variable.parameter') {
                    editor.session.remove({
                        start: { column: token.start || 0, row: cursorPosition.row },
                        end: { column: Math.max(token.start + token.value.length + 1 || 0, cursorPosition.column), row: cursorPosition.row }
                    });
                }
                else if (token.type === 'text' && token.value[token.value.length - 1] === '?') {
                    editor.session.remove({
                        start: { column: token.start + token.value.length - 1 || 0, row: cursorPosition.row },
                        end: { column: token.start + token.value.length || 0, row: cursorPosition.row },
                    });
                }
            }
        }
        else {
            token = token || editor.session.getTokenAt(cursorPosition.row, cursorPosition.column);
            if (!token)
                return;
            let endColumn = null;
            if (token.type === 'support.variable.other' || token.type === 'support.function') {
                endColumn = Math.max(token.start + token.value.length || 0, cursorPosition.column);
            }
            else if (token.type === 'support.context.start' && cursorPosition.column < token.start + token.value.length) {
                endColumn = token.start + token.value.length - 1 || 0;
            }
            if (endColumn !== null)
                editor.session.remove({
                    start: { column: token.start || 0, row: cursorPosition.row },
                    end: { column: endColumn, row: cursorPosition.row }
                });
        }
    }
    insertMatch(editor, parentPrefix, fieldName) {
        if (parentPrefix === 'Parameters.') {
            editor.insert('?' + fieldName);
        }
        else {
            editor.insert('[' + (parentPrefix || '') + fieldName + ']');
        }
    }
    generateFieldDisplayName(parentPrefix, displayName) {
        if (parentPrefix === 'Parameters.') {
            return '?' + displayName;
        }
        return '[' + displayName + ']';
    }
    _convertDataMemberInfoToCompletions(fields, getToken, parentPrefix = '') {
        return (fields || []).map(field => {
            const displayName = this.generateFieldDisplayName(parentPrefix, field.displayName);
            return {
                caption: field.displayName || field.name,
                snippet: displayName,
                meta: isList(field) && getLocalization('list', 'DxDesignerStringId.CodeCompletion_List') || getLocalization('field', 'DxDesignerStringId.CodeCompletion_Field'),
                score: isList(field) && 200 || 100,
                completer: {
                    insertMatch: (editor, data) => {
                        this.beforeInsertMatch(editor, getToken(), parentPrefix);
                        this.insertMatch(editor, parentPrefix, this._options.getRealExpression ? (field.displayName || field.name) : field.name);
                    }
                }
            };
        });
    }
    _combinePath(parentPrefix) {
        let path = this._getPath();
        if (parentPrefix) {
            const rootItem = this._rootItems.filter(item => parentPrefix.indexOf(item.name) === 0)[0];
            if (rootItem && rootItem.rootPath)
                path = [rootItem.rootPath, parentPrefix].join('.');
            else
                path = [path, parentPrefix].join('.');
        }
        return path;
    }
    _getParentPrefix(token) {
        const position = this._editor.getCursorPosition().column - token.start - 1;
        let dotIndex = token.value.lastIndexOf('.', position);
        const closeIndex = token.value.lastIndexOf(']', position);
        dotIndex = Math.max(closeIndex, dotIndex);
        const startIndex = token.type === 'support.variable.other' || token.type === 'support.context.start' ? 1 : 0;
        let parentPrefix = token.value.substring(startIndex, dotIndex);
        if (parentPrefix[0] === '[')
            parentPrefix = parentPrefix.substr(1);
        if (parentPrefix[parentPrefix.length - 1] === ']')
            parentPrefix = parentPrefix.substring(0, parentPrefix.length - 1);
        return parentPrefix;
    }
    _getRealPath(path) {
        const pathArray = path.split('.');
        const $deferred = $.Deferred();
        if (this._options.getRealExpression) {
            this._options.getRealExpression(pathArray[0], this.generateFieldDisplayName(null, pathArray.splice(1).join('.'))).done(result => {
                result = result.slice(1, result.length - 1);
                $deferred.resolve(result && [pathArray[0], result].join('.') || pathArray[0]);
            }).fail(() => { $deferred.resolve(path); });
        }
        else {
            $deferred.resolve(path);
        }
        return $deferred.promise();
    }
    _getFields(getToken = () => null, completions = [], ignorePrefix = false) {
        const $deferred = $.Deferred();
        let parentPrefix = undefined;
        const token = getToken();
        if (token && (token.type === 'support.variable.other' || token.type === 'support.function' || token.type === 'support.context.start')) {
            parentPrefix = this._getParentPrefix(token);
        }
        this._getRealPath(this._combinePath(parentPrefix)).done((path) => {
            const $fields = ko.unwrap(this._fieldListProvider).getItems(new PathRequest(path))
                .done((fields) => {
                completions.push.apply(completions, this._convertDataMemberInfoToCompletions(CodeCompletor._cleanupFields(fields), getToken, ignorePrefix ? null : parentPrefix && parentPrefix + '.'));
            });
            const $deferreds = [$fields];
            const rootPathRequests = [];
            if (!parentPrefix) {
                this._rootItems.forEach(item => {
                    const path = item.rootPath || item.name;
                    if (rootPathRequests.indexOf(path) === -1) {
                        rootPathRequests.push(path);
                        $deferreds.push(ko.unwrap(this._fieldListProvider).getItems(new PathRequest(path))
                            .done((fields) => {
                            this._processFields($deferreds, fields, completions, path, getToken, item.needPrefix ? item.name + '.' : '', true);
                        }));
                    }
                });
            }
            $.when($deferreds).always(() => { $deferred.resolve(completions); });
        });
        return $deferred.promise();
    }
    static _cleanupFields(fields = []) {
        return fields.filter(x => x.specifics !== 'parameters' && x.specifics !== 'none');
    }
    _processFields($deferreds, fields, completions, path, getToken, parentPrefix = '', needCleanup = false) {
        const pushToCompletions = (fields) => {
            completions.push.apply(completions, this._convertDataMemberInfoToCompletions(needCleanup ? CodeCompletor._cleanupFields(fields) : fields, getToken, parentPrefix));
        };
        fields.forEach(item => {
            if (item.specifics === RangeSpecific && isList(item)) {
                $deferreds.push(ko.unwrap(this._fieldListProvider).getItems(new PathRequest(path + '.' + item.name))
                    .done((subFields) => {
                    pushToCompletions(subFields);
                })
                    .fail(() => {
                    pushToCompletions([item]);
                }));
            }
            else {
                pushToCompletions([item]);
            }
        });
    }
    getFunctionsCompletions() {
        const functions = [];
        const functionsWithoutAggregates = ko.unwrap(this._functions).filter(fnDisplay => fnDisplay.category !== 'Aggregate');
        functionsWithoutAggregates.forEach(fnDisplay => {
            Object.keys(fnDisplay.items).forEach(fnKey => {
                if (fnDisplay.items[fnKey]) {
                    functions.push(createFunctionCompletion(fnDisplay.items[fnKey][0], fnKey));
                }
            });
        });
        return functions;
    }
    getAggregateCompletions() {
        const functions = [];
        const aggregates = ko.unwrap(this._functions).filter(fnDisplay => fnDisplay.category === 'Aggregate')[0];
        if (aggregates)
            Object.keys(aggregates.items).forEach(fnKey => {
                if (aggregates.items[fnKey]) {
                    functions.push(createFunctionCompletion(aggregates.items[fnKey][0], fnKey, fnKey + '()'));
                }
            });
        return functions;
    }
    getOperatorCompletions(prefix) {
        return operatorNames.map(operator => {
            return { caption: operator.text, snippet: prefix + operator.text, meta: getLocalization('operator', 'DxDesignerStringId.CodeCompletion_Operator') };
        });
    }
    _addFunctions(completions) {
        completions.push.apply(completions, this.getFunctionsCompletions());
    }
    _addAggregates(completions) {
        completions.push.apply(completions, this.getAggregateCompletions());
    }
    _addOperators(completions, text) {
        const prefix = /\s/.test(text[text.length - 1]) ? '' : ' ';
        completions.push.apply(completions, this.getOperatorCompletions(prefix));
    }
    _addParameterOperators(completions, getToken) {
        const $deferred = $.Deferred();
        const $parametersPromises = [];
        const paramPath = 'Parameters';
        $parametersPromises.push(ko.unwrap(this['_fieldListProvider']).getItems(new PathRequest(paramPath))
            .done((fields) => {
            this._processFields($parametersPromises, fields, completions, paramPath, getToken, paramPath + '.');
        }));
        $.when($parametersPromises).always(() => { $deferred.resolve(completions); });
        return $deferred.promise();
    }
    _getOperands(getToken = () => null) {
        const result = [];
        this._addFunctions(result);
        return this._getFields(getToken, result);
    }
    _getOperandsOrOperators(getToken, text, completions) {
        let exceptionInfo;
        try {
            CriteriaOperatorStateMachine.parse(text);
        }
        catch (exception) {
            exceptionInfo = exception.hash;
        }
        const trimmedText = text.trim();
        const lastNonSpaceSymbol = trimmedText[trimmedText.length - 1];
        if (lastNonSpaceSymbol === '?' && text[text.length - 1] !== ' ') {
            this._addParameterOperators(completions, getToken);
        }
        else if (!exceptionInfo && trimmedText || (lastNonSpaceSymbol === ']' || lastNonSpaceSymbol === ')')) {
            this._addOperators(completions, text);
        }
        else {
            return this._getOperands();
        }
    }
    _findStartContextTokenPosition(tokens, index) {
        let blocks = 0;
        const path = [];
        for (let i = index; i > -1; i--) {
            if (tokens[i].type === 'support.context.end') {
                blocks++;
            }
            else if (tokens[i].type === 'support.context.start') {
                if (blocks > 0)
                    blocks--;
                else
                    return i;
            }
        }
    }
    _findOpenedStartContext(tokens, index) {
        const openedContextIndexes = [];
        const contextItems = tokens.filter((token, tokenIndex) => (token.type === 'support.context.start' || token.type === 'support.context.end') && tokenIndex < index);
        for (let i = 0; i < contextItems.length; i++) {
            if (contextItems[i].type === 'support.context.start') {
                openedContextIndexes.push(tokens.indexOf(contextItems[i]));
            }
            else {
                openedContextIndexes.pop();
            }
        }
        return openedContextIndexes;
    }
    _findOpenedAggregates(tokens, index) {
        const openedAggregatesIndexes = [];
        const aggregates = tokens.filter((token, tokenIndex) => token.type === 'support.other.aggregate' && tokenIndex < index);
        if (aggregates.length > 0) {
            const currentToken = tokens[index];
            const currentCursorPosition = this._editor.getCursorPosition().column - (currentToken && currentToken.start || 0);
            for (let i = aggregates.length - 1; i > -1; i--) {
                const aggregateIndex = tokens.indexOf(aggregates[i]);
                let openBrace = 0;
                let closeBrace = 0;
                let isClosedAggregate = false;
                if (aggregateIndex + 1 === index && tokens[aggregateIndex + 1].value.substr(0, currentCursorPosition).indexOf('()') !== -1 ||
                    aggregateIndex + 1 < index && tokens[aggregateIndex + 1].value.indexOf('()') !== -1) {
                    isClosedAggregate = true;
                    index = aggregateIndex;
                    continue;
                }
                for (let j = aggregateIndex; j < index; j++) {
                    if (tokens[j].value.trim() === '(') {
                        openBrace++;
                    }
                    else if (tokens[j].value.trim() === ')') {
                        closeBrace++;
                    }
                    if (openBrace === closeBrace && openBrace !== 0) {
                        isClosedAggregate = true;
                        break;
                    }
                }
                if (!isClosedAggregate)
                    openedAggregatesIndexes.splice(0, 0, aggregateIndex);
                index = aggregateIndex;
            }
        }
        return openedAggregatesIndexes;
    }
    _getContextPath(tokens, currentPosition) {
        const path = [];
        const openedAggregatePositions = this._findOpenedAggregates(tokens, currentPosition);
        const openedContextPositions = this._findOpenedStartContext(tokens, currentPosition);
        const contextPath = openedContextPositions.concat(...openedAggregatePositions).sort((a, b) => { return a - b; });
        if (contextPath.length > 0) {
            for (let i = 0; i < contextPath.length; i++) {
                if (tokens[contextPath[i]].type === 'support.other.aggregate') {
                    if (tokens[contextPath[i] - 1].type === 'support.context.end') {
                        const startContextToken = this._findStartContextTokenPosition(tokens, contextPath[i] - 2);
                        const member = trimBrackets(tokens[startContextToken].value.match(/^\[(?:[^\]\)])*\]/)[0]);
                        path.push(member);
                    }
                    else if (tokens[contextPath[i] - 1].type === 'support.variable.other') {
                        path.push(trimBrackets(tokens[contextPath[i] - 1].value));
                    }
                }
                else {
                    const member = trimBrackets(tokens[contextPath[i]].value.match(/^\[(?:[^\]\)])*\]/)[0]);
                    path.push(member);
                }
            }
        }
        return path.filter(x => !!x).join('.');
    }
    _getCompletions(editor, session, pos, prefix) {
        let $deferred;
        const completions = [];
        const getToken = () => session.getTokenAt(pos.row, pos.column);
        const currentToken = getToken();
        const text = editor.session.getLine(pos.row).substring(0, pos.column);
        const tokens = session.getTokens(pos.row);
        const currentTokenIndex = currentToken ? currentToken.index : -1;
        this._contextPath = this._getContextPath(tokens, currentTokenIndex);
        if (!currentToken) {
            $deferred = this._getOperands();
        }
        else if (currentToken.type === 'support.context.start') {
            const ignorePrefix = this._editor.getCursorPosition().column - currentToken.start === currentToken.value.length;
            let functions;
            if (ignorePrefix) {
                functions = [];
                this._addFunctions(functions);
            }
            $deferred = this._getFields(getToken, functions, ignorePrefix);
        }
        else if (currentToken.type === 'string.quoted.single') {
        }
        else if (currentToken.type.indexOf('support.variable') === 0) {
            $deferred = this._getFields(getToken);
        }
        else if (currentToken.type === 'support.function') {
            $deferred = this.defaultProcess(getToken, text.substring(0, currentToken.start), completions);
        }
        else if (currentToken.type === 'support.other.aggregate') {
            const previousToken = tokens[currentTokenIndex - 1];
            this._addAggregates(completions);
            if (previousToken && trimBrackets(previousToken.value).trim()) {
                $deferred = this._getFields(() => ({
                    start: (currentToken.start - (previousToken.value || '').length) || 0,
                    value: previousToken.value + currentToken.value,
                    type: 'support.function'
                }), completions);
            }
        }
        else {
            if (!(currentToken.type.indexOf('comment') === 0)) {
                $deferred = this.defaultProcess(getToken, text, completions);
            }
        }
        return $deferred ? $deferred.promise() : $.Deferred().resolve(completions).promise();
    }
    defaultProcess(getToken, text, completions) {
        return this._getOperandsOrOperators(getToken, text, completions);
    }
    getCompletions(aceEditor, session, pos, prefix, callback) {
        this._getCompletions(aceEditor, session, pos, prefix).done(completions => {
            callback(null, completions);
        });
    }
    getDocTooltip(item) {
        if (item.tooltip && !item.docHTML) {
            item.docHTML = [
                item.tooltip
            ].join('');
        }
    }
}
export function createFunctionCompletion(fnInfo, name, insertValue = null) {
    let newinsertValue = insertValue || fnInfo.text;
    return {
        caption: name,
        snippet: newinsertValue,
        meta: getLocalization('function', 'DxDesignerStringId.CodeCompletion_Function'),
        tooltip: fnInfo.description || getLocalization(fnInfo.text, fnInfo.descriptionStringId) || null,
        score: 10,
        completer: {
            insertMatch: (editor, data) => {
                const completions = editor.completer.completions;
                if (completions.filterText) {
                    const ranges = editor.selection.getAllRanges();
                    for (let i = 0, range; range = ranges[i]; i++) {
                        range.start.column -= completions.filterText.length;
                        editor.session.remove(range);
                    }
                }
                if (newinsertValue.substr(0, 3) === '[].') {
                    const ranges = editor.selection.getAllRanges();
                    for (let i = 0, range; range = ranges[i]; i++) {
                        range.start.column -= 2;
                        if (editor.session.getTextRange(range) === '].')
                            newinsertValue = newinsertValue.substr(3);
                    }
                }
                editor.insert(newinsertValue);
                setCursorInFunctionParameter(fnInfo.paramCount, editor, newinsertValue);
            }
        }
    };
}
export function trimBrackets(value) {
    return value.substring(value[0] === '[' ? 1 : 0, value[value.length - 1] === ']' ? value.length - 1 : value.length);
}
