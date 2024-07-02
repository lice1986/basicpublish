﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_bandUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { bandSurfaceCollapsedHeight } from './bandSurfaceCollapsedHeight';
export function sortBands(band1, band2) {
    return getBandWeight(band1) - getBandWeight(band2);
}
export function setMarkerWidth(bandHolder, levelCount, currentLevel = 0) {
    if (bandHolder && bandHolder.bands().length !== 0) {
        bandHolder.bands().forEach((band) => {
            band.markerWidth(bandSurfaceCollapsedHeight * (levelCount - currentLevel));
            setMarkerWidth(band.bandsHolder, levelCount, currentLevel + 1);
        });
        bandHolder.verticalBandsContainer && bandHolder.verticalBandsContainer.markerWidth(bandSurfaceCollapsedHeight * (levelCount - currentLevel));
    }
}
export function getLevelCount(bandHolder) {
    let result = 0, maxLevelCount = 0;
    if (!bandHolder)
        return result;
    if (bandHolder.bands().length !== 0) {
        bandHolder.bands().forEach((band) => {
            const levelCount = getLevelCount(band.bandsHolder);
            if (levelCount > maxLevelCount) {
                maxLevelCount = levelCount;
            }
        });
        result = maxLevelCount + 1;
    }
    else if (bandHolder.verticalBandsContainer && bandHolder.verticalBandsContainer.visible) {
        result = maxLevelCount + 1;
    }
    return result;
}
export function insertBand(bands, newBand) {
    if (newBand.controlType === 'GroupHeaderBand' || newBand.controlType === 'GroupFooterBand' || newBand.controlType === 'DetailReportBand' || newBand.controlType === 'SubBand') {
        const array = generateArray(bands(), newBand.controlType);
        let level = array.length;
        for (let i = 0; i < array.length; i++) {
            if (!array[i]) {
                level = i;
                break;
            }
        }
        newBand._level(level);
    }
    insertBandSorted(bands, newBand);
}
function insertBandSorted(bands, newBand) {
    if (newBand) {
        const cloneBands = bands().slice(0);
        const previousBandIndex = bands().indexOf(newBand);
        if (previousBandIndex === -1) {
            cloneBands.push(newBand);
        }
        cloneBands.sort(sortBands);
        const index = cloneBands.indexOf(newBand);
        if (previousBandIndex !== -1) {
            bands.splice(previousBandIndex, 1);
        }
        bands.splice(index, 0, newBand);
    }
}
const bandsWeight = {
    'TopMarginBand': 100,
    'ReportHeaderBand': 200,
    'PageHeaderBand': 300,
    'GroupHeaderBand': 400,
    'DetailBand': 500,
    'VerticalHeaderBand': 500,
    'VerticalDetailBand': 600,
    'VerticalTotalBand': 700,
    'DetailReportBand': 800,
    'GroupFooterBand': 900,
    'ReportFooterBand': 1000,
    'PageFooterBand': 1100,
    'BottomMarginBand': 1200
};
function getBandWeight(band) {
    if (band.controlType === 'GroupHeaderBand') {
        return bandsWeight[band.controlType] - (band['level']() || 0);
    }
    if (band.controlType === 'GroupFooterBand') {
        return bandsWeight[band.controlType] + (band['level']() || 0);
    }
    if (band.controlType === 'DetailReportBand') {
        return bandsWeight[band.controlType] + (band['level']() || -1);
    }
    return bandsWeight[band.controlType];
}
function initGroupIndexes(largeGroupBandCollection, smallGroupBandCollection) {
    const replaces = {};
    const busyIndexes = [];
    const findClosestIndex = (currentIndex) => {
        let index = currentIndex;
        const findClosestAvailableIndex = (currentIndex, inc) => {
            const newIndex = currentIndex + inc;
            if (newIndex === largeGroupBandCollection.length || newIndex === -1) {
                return undefined;
            }
            if (busyIndexes.indexOf(currentIndex + inc) !== -1) {
                return newIndex;
            }
            else {
                return findClosestAvailableIndex(newIndex, inc);
            }
        };
        if (busyIndexes.indexOf(currentIndex) !== -1) {
            index = findClosestAvailableIndex(currentIndex, -1);
            if (index === undefined)
                index = findClosestAvailableIndex(currentIndex, 1);
        }
        return index;
    };
    for (let i = 0; i < largeGroupBandCollection.length; i++) {
        const currentLevel = largeGroupBandCollection[i]._level;
        if (!replaces[currentLevel()])
            replaces[currentLevel()] = [i];
        else {
            replaces[currentLevel()].push(i);
        }
        currentLevel(i);
    }
    for (let i = 0; i < smallGroupBandCollection.length; i++) {
        let index = i;
        const currentLevel = smallGroupBandCollection[i]._level;
        if (replaces[currentLevel()] && replaces[currentLevel()].length > 0) {
            index = replaces[currentLevel()].splice(0, 1)[0];
        }
        else if (currentLevel() < largeGroupBandCollection.length) {
            index = findClosestIndex(currentLevel());
        }
        else {
            index = findClosestIndex(i);
        }
        currentLevel(index);
        busyIndexes.push(index);
    }
}
export function initLevels(bands) {
    ['DetailReportBand', 'SubBand'].map(type => bands.filter(b => b.controlType === type).sort(sortBands)).forEach(items => {
        for (let i = 0; i < items.length; i++) {
            items[i]._level(i);
        }
    });
    const groupHeaderBands = bands.filter(b => b.controlType === 'GroupHeaderBand').sort(sortBands).reverse();
    const groupFooterBands = bands.filter(b => b.controlType === 'GroupFooterBand').sort(sortBands);
    if (groupFooterBands.length > groupHeaderBands.length) {
        initGroupIndexes(groupFooterBands, groupHeaderBands);
    }
    else {
        initGroupIndexes(groupHeaderBands, groupFooterBands);
    }
}
export function generateArray(allbands, controlType, newLevel) {
    let array = allbands.filter(x => x.controlType === controlType);
    newLevel = newLevel || array.length - 1;
    array = controlType === 'GroupHeaderBand' ? array.reverse() : array;
    const length = (array.length > 0 && array[array.length - 1].level() > newLevel ? array[array.length - 1].level() : newLevel) + 1;
    let j = 0;
    const fakeArray = [];
    for (let i = 0; i < length; i++) {
        if (j < array.length && array[j]._level() === i) {
            fakeArray.push(array[j]);
            j++;
        }
        else {
            fakeArray.push(undefined);
        }
    }
    return fakeArray;
}
export function _getUnitAbsoluteRect(bandSurface, getPositionInParent) {
    const parentAbsoluteRect = bandSurface.parent && bandSurface.parent['_unitAbsoluteRect'];
    if (parentAbsoluteRect) {
        const _unitPosition = getPositionInParent();
        return {
            top: parentAbsoluteRect.top + _unitPosition.y(), left: parentAbsoluteRect.left + _unitPosition.x(),
            right: parentAbsoluteRect.left + _unitPosition.x() + bandSurface._control.size.width(), bottom: parentAbsoluteRect.top + _unitPosition.y() + bandSurface._control.size.height(),
            width: bandSurface._control.size.width() - bandSurface['_getGrayArea'](), height: bandSurface._control.size.height()
        };
    }
    else {
        return {
            top: 0, left: 0,
            right: bandSurface._control.size.width(), bottom: bandSurface._control.size.height(),
            width: bandSurface._control.size.width() - bandSurface['_getGrayArea'](), height: bandSurface._control.size.height()
        };
    }
}
