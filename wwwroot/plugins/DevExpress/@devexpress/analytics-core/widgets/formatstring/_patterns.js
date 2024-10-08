﻿/**
* DevExpress Analytics (widgets\formatstring\_patterns.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const formatStringStandardPatterns = {
    'DateTime': { type: 'System.DateTime', value: new Date(Date.now()), patterns: [] },
    'Number': { type: 'System.Int32', value: '123456789', patterns: ['#.00', '#,#', '0.E+0.0', '0.e+0.0', 'n', 'n1', 'n2', 'e', 'e1', 'f', 'f1'] },
    'Percent': { type: 'System.Int32', value: '100', patterns: ['0.00%', '0%'] },
    'Currency': { type: 'System.Int32', value: '100', patterns: ['$0.00', '$0', 'c', 'c1', 'c2'] },
    'Special': { type: 'System.Int32', value: '123456789', patterns: ['(###) ### - ####', '### - ## - ####'] },
    'General': { type: 'System.String', value: '', patterns: ['General format have no specific number format'] }
};
