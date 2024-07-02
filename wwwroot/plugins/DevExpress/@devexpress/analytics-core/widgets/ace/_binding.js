﻿/**
* DevExpress Analytics (widgets\ace\_binding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ace from 'ace-builds/src-noconflict/ace';
import languageTools from 'ace-builds/src-noconflict/ext-language_tools';
import modeJson from 'ace-builds/src-noconflict/mode-json';
import modeSql from 'ace-builds/src-noconflict/mode-sql';
import modeText from 'ace-builds/src-noconflict/mode-text';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { addDisposeCallback } from '../../serializer/_internal';
import { aceAvailable } from './_ace-available';
import { defineAceCriteria } from './_ace-mode-criteria';
import { defineAceDocComments } from './_ace-mode-doc-comment';
import { defineAceThemes, getAceThemeName } from './_ace_theme';
let aceDefined = false;
export function defineAce(ace) {
    if (!aceDefined) {
        defineAceDocComments(ace);
        defineAceCriteria(ace);
        defineAceThemes(ace);
        try {
            ace.config.set('useStrictCSP', true);
        }
        catch (_a) {
            console.warn('Update \'ace\' version to 1.4.13');
        }
        if ('setModuleLoader' in ace.config) {
            ace.config.setModuleLoader('./theme/textmate', () => __awaiter(this, void 0, void 0, function* () { return ace.require('./theme/textmate'); }));
            ace.config.setModuleLoader('ace/mode/criteria', () => __awaiter(this, void 0, void 0, function* () { return ace.require('ace/mode/criteria'); }));
            ace.config.setModuleLoader('ace/mode/sql', () => __awaiter(this, void 0, void 0, function* () { return ace.require('ace/mode/sql'); }));
            ace.config.setModuleLoader('ace/mode/text', () => __awaiter(this, void 0, void 0, function* () { return ace.require('ace/mode/text'); }));
            ace.config.setModuleLoader('ace/mode/json', () => __awaiter(this, void 0, void 0, function* () { return ace.require('ace/mode/json'); }));
        }
        if (!window['ace'] && aceAvailable()) {
            ace.config.setModuleUrl('ace/ext/language_tools', languageTools);
            ace.config.setModuleUrl('ace/mode/sql', modeSql);
            ace.config.setModuleUrl('ace/mode/text', modeText);
            ace.config.setModuleUrl('ace/mode/json', modeJson);
        }
    }
    aceDefined = true;
}
ko.bindingHandlers['dxAceEditor'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const _ace = ace || window['ace'];
        defineAce(_ace);
        const values = valueAccessor(), text = values.value, editorContainer = values.editorContainer;
        let editor, shouldProcessOnChangeEvent = true;
        const _setEditorText = (editorInstance, text) => {
            shouldProcessOnChangeEvent = false;
            editorInstance.getSession().setValue((text && text.toString()) || '');
            editorInstance.clearSelection();
            editorInstance.getSession().getUndoManager().reset();
            shouldProcessOnChangeEvent = true;
        };
        if (_ace) {
            const showGutter = values.options.showGutter != undefined ? values.options.showGutter : true;
            const additionalOptions = values.additionalOptions;
            const langTools = _ace.require('ace/ext/language_tools');
            const themePath = 'ace/theme/' + getAceThemeName(values.theme);
            editor = _ace.edit(element, { theme: themePath });
            editor.$blockScrolling = Infinity;
            const languageMode = viewModel.languageHelper.getLanguageMode();
            const session = editor.getSession();
            session.gutterRenderer = {
                getWidth: (session, lastLineNumber, config) => {
                    return lastLineNumber.toString().length * config.characterWidth;
                },
                getText: (session, row) => {
                    return row + 1;
                }
            };
            session.setMode(languageMode);
            let onBlur = () => { editor.completer && editor.completer.popup && editor.completer.popup.hide(); }, onChange, onFocus, onChangeAnnotation;
            if (additionalOptions) {
                if (additionalOptions.onChange) {
                    let timer = null;
                    onChange = (e) => {
                        if (timer !== null)
                            clearTimeout(timer);
                        if (shouldProcessOnChangeEvent) {
                            timer = setTimeout(() => {
                                if (text() !== session.getValue() || (session.getAnnotations() || []).some(x => x.type === 'error')) {
                                    additionalOptions.onChange(session);
                                }
                            }, additionalOptions && additionalOptions.changeTimeout || 1000);
                        }
                    };
                    session.on('change', onChange);
                }
                if (additionalOptions.overrideEditorFocus) {
                    editor.focus = function (a, e) {
                        editor.textInput.getElement().focus();
                    };
                }
                if (additionalOptions.onFocus) {
                    onFocus = () => { additionalOptions.onFocus(session); };
                    editor.on('focus', onFocus);
                }
                if (additionalOptions.onBlur) {
                    onBlur = () => {
                        editor.completer && editor.completer.popup && editor.completer.popup.hide();
                        return additionalOptions.onBlur(session);
                    };
                }
                if (additionalOptions.onChangeAnnotation) {
                    onChangeAnnotation = (a, e) => {
                        additionalOptions.onChangeAnnotation(e);
                    };
                    session.on('changeAnnotation', onChangeAnnotation);
                }
            }
            editor.on('blur', onBlur);
            const completers = viewModel.languageHelper.createCompleters(editor, bindingContext, viewModel);
            langTools.setCompleters(completers);
            editor.setOptions(Object.assign({ autoScrollEditorIntoView: false }, values.options));
            if (additionalOptions && 'setUseWrapMode' in additionalOptions) {
                editor.getSession().setUseWrapMode(additionalOptions.setUseWrapMode);
            }
            if (!showGutter) {
                editor.renderer.setShowGutter(showGutter);
            }
            if (editor.renderer.$gutter) {
                const gutterClassName = editor.renderer.$gutter.className + ' dxd-border-primary dxd-text-primary dxd-back-primary';
                editor.renderer.$gutter.className = gutterClassName;
            }
            const oldMouseMove = editor._defaultHandlers.guttermousemove;
            editor._defaultHandlers.guttermousemove = function (e) {
                const rect = element.getBoundingClientRect();
                e.x = e.x - rect.left;
                e.y = e.y - rect.top;
                oldMouseMove(e);
            };
            let subscription;
            if (ko.isSubscribable(text)) {
                subscription = text.subscribe((newText) => {
                    if (newText !== session.getValue()) {
                        _setEditorText(editor, newText);
                    }
                    if (additionalOptions && additionalOptions.onValueChange)
                        additionalOptions.onValueChange(editor);
                });
            }
            _setEditorText(editor, ko.unwrap(text));
            if (values.callbacks)
                values.callbacks.focus = () => {
                    setTimeout(() => {
                        editor.textInput.getElement().focus();
                    }, 10);
                };
            addDisposeCallback(element, function () {
                editor.completers && editor.completers.splice(0);
                editor._defaultHandlers.guttermousemove = oldMouseMove;
                subscription.dispose();
                if (values.callbacks)
                    values.callbacks.focus = $.noop;
                completers.forEach(x => x.dispose && x.dispose());
                onBlur && editor.off('blur', onBlur);
                onFocus && editor.off('focus', onFocus);
                onChange && session.off('change', onChange);
                onChangeAnnotation && session.off('changeAnnotation', onChangeAnnotation);
                editor.destroy();
            });
        }
        if (ko.isObservable(editorContainer)) {
            editorContainer(editor);
        }
    }
};
