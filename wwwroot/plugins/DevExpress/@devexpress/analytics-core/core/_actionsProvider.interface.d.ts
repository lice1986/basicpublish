﻿/**
* DevExpress Analytics (core\_actionsProvider.interface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IAction } from '../widgets/utils';
export interface IActionsProvider {
    getActions: (context: any) => IAction[];
}
