﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_brickUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IBrickNode } from '../utils/utils';
import { EditingField } from '../editing/editingField';
export declare function convertToPercent(childSize: any, parentSize: any): string;
export declare function getBrickValueForKey(brick: IBrickNode, key?: string): any;
export declare function brickText(brick: IBrickNode, editingFieldsProvider?: () => EditingField[]): any;
export declare function updateBricksPosition(brick: IBrickNode, height: any, width: any): void;
export declare function initializeBrick(brick: IBrickNode, processClick: (target: IBrickNode, e?: JQueryEventObject) => void, editingFieldBricks: IBrickNode[]): void;
