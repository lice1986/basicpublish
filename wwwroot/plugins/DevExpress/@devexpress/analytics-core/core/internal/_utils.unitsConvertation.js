﻿/**
* DevExpress Analytics (core\internal\_utils.unitsConvertation.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const convertToCssPixelUnits = (value) => `${value}px`;
export const convertFromCssPixelUnits = (value) => parseFloat(value.replace('px', ''));
