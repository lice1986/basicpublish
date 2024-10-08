﻿/**
* DevExpress Analytics (widgets\criteria\utils\criteriaChangeOperator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaProcessType } from './criteriaProcessType';
export interface ICriteriaChangeOperator {
    name: string;
    value: any;
    type: any;
    _type: keyof CriteriaProcessType;
    hidden?: boolean;
    reverse?: boolean;
    localizationId?: string;
    insertVal?: string;
    displayText?: string;
    paramCount?: number;
    emptyRightPart?: boolean;
}
