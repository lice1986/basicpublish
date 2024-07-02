/**
 * DevExtreme (esm/renovation/ui/scheduler/utils/data.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    replaceWrongEndDate
} from "../../../../__internal/scheduler/appointments/data_provider/m_utils";
import {
    createAppointmentAdapter
} from "../../../../__internal/scheduler/m_appointment_adapter";
import {
    isDefined
} from "../../../../core/utils/type";
var RECURRENCE_FREQ = "freq";
export var getPreparedDataItems = (dataItems, dataAccessors, cellDurationInMinutes, timeZoneCalculator) => {
    var result = [];
    null === dataItems || void 0 === dataItems ? void 0 : dataItems.forEach(rawAppointment => {
        var _recurrenceRule$match;
        var startDate = new Date(dataAccessors.getter.startDate(rawAppointment));
        var endDate = new Date(dataAccessors.getter.endDate(rawAppointment));
        replaceWrongEndDate(rawAppointment, startDate, endDate, cellDurationInMinutes, dataAccessors);
        var adapter = createAppointmentAdapter(rawAppointment, dataAccessors, timeZoneCalculator);
        var comparableStartDate = adapter.startDate && adapter.calculateStartDate("toGrid");
        var comparableEndDate = adapter.endDate && adapter.calculateEndDate("toGrid");
        var regex = new RegExp(RECURRENCE_FREQ, "gi");
        var recurrenceRule = adapter.recurrenceRule;
        var hasRecurrenceRule = !!(null !== recurrenceRule && void 0 !== recurrenceRule && null !== (_recurrenceRule$match = recurrenceRule.match(regex)) && void 0 !== _recurrenceRule$match && _recurrenceRule$match.length);
        var visible = isDefined(rawAppointment.visible) ? !!rawAppointment.visible : true;
        if (comparableStartDate && comparableEndDate) {
            result.push({
                allDay: !!adapter.allDay,
                startDate: comparableStartDate,
                startDateTimeZone: rawAppointment.startDateTimeZone,
                endDate: comparableEndDate,
                endDateTimeZone: rawAppointment.endDateTimeZone,
                recurrenceRule: adapter.recurrenceRule,
                recurrenceException: adapter.recurrenceException,
                hasRecurrenceRule: hasRecurrenceRule,
                visible: visible,
                rawAppointment: rawAppointment
            })
        }
    });
    return result
};
export var resolveDataItems = options => Array.isArray(options) ? options : options.data;
