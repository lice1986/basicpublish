/**
 * DevExtreme (esm/renovation/ui/scheduler/header/utils.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    getViewSwitcher,
    getDropDownViewSwitcher
} from "./view_switcher";
import {
    getDateNavigator
} from "./date_navigator";
import {
    validateViews,
    getViewName,
    getViewText,
    getViewType
} from "../../../../__internal/scheduler/header/m_utils";
import devices from "../../../../core/devices";
var DEFAULT_ELEMENT = "defaultElement";
var VIEW_SWITCHER = "viewSwitcher";
var DATE_NAVIGATOR = "dateNavigator";
export var formToolbarItem = (item, options) => {
    var {
        captionText: captionText,
        isNextButtonDisabled: isNextButtonDisabled,
        isPreviousButtonDisabled: isPreviousButtonDisabled,
        selectedView: selectedView,
        setCurrentView: setCurrentView,
        showCalendar: showCalendar,
        updateDateByDirection: updateDateByDirection,
        useDropDownViewSwitcher: useDropDownViewSwitcher,
        views: views
    } = options;
    if (item[DEFAULT_ELEMENT]) {
        var defaultElementType = item[DEFAULT_ELEMENT];
        switch (defaultElementType) {
            case VIEW_SWITCHER:
                if (useDropDownViewSwitcher) {
                    return getDropDownViewSwitcher(item, selectedView, views, setCurrentView)
                }
                return getViewSwitcher(item, selectedView, views, setCurrentView);
            case DATE_NAVIGATOR:
                return getDateNavigator(item, showCalendar, captionText, updateDateByDirection, isPreviousButtonDisabled, isNextButtonDisabled);
            default:
                throw new Error("Unknown default item in the scheduler's toolbar")
        }
    }
    return item
};
export var formatViews = views => {
    validateViews(views);
    return views.map(view => {
        var text = getViewText(view);
        var name = getViewName(view);
        return {
            text: text,
            name: name
        }
    })
};
export var isMonthView = currentView => "month" === getViewType(currentView);
export var isMobileLayout = () => !devices.current().generic;
