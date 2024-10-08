﻿/**
* DevExpress Analytics (widgets\expressioneditor\_expressioneditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { getLocalization } from '../../property-grid/localization/localization_utils';
export const RangeSpecific = 'range';
export function createExpressionEditorCollectionToolOptions(collectionItems, toolName, displayToolName, showDescription) {
    return {
        displayName: getLocalization(toolName, displayToolName),
        content: {
            showDescription: showDescription,
            isSelected: ko.observable(false),
            data: {
                items: collectionItems,
                selectedItem: ko.observable(null)
            },
            name: 'dx-expressioneditor-collection'
        },
        dispose: () => void 0
    };
}
export function wrapExpressionValue(path, value, converter, subscriptions) {
    if (!(converter && path))
        return value;
    const _displayValue = ko.observable(value());
    converter.toDisplayExpression(path(), value()).done((result) => {
        _displayValue(result);
    }).fail(() => {
        _displayValue(value());
    });
    const valueSubscription = value.subscribe((newValue) => {
        converter.toDisplayExpression(path(), newValue).done((result) => {
            _displayValue(result);
        }).fail(() => {
            _displayValue(newValue);
        });
    });
    const pathSubscription = path.subscribe(newPath => {
        converter.toDisplayExpression(newPath, value())
            .done(result => { _displayValue(result); })
            .fail(_ => { _displayValue(value()); });
    });
    const displayValue = ko.pureComputed({
        read: () => _displayValue(),
        write: (newValue) => {
            _displayValue(newValue);
            converter.toRealExpression(path(), newValue).done((result) => {
                value(result);
            }).fail(() => {
                value(newValue);
            });
        }
    });
    if (subscriptions)
        [displayValue, valueSubscription, pathSubscription].forEach(x => subscriptions.push(x));
    return displayValue;
}
