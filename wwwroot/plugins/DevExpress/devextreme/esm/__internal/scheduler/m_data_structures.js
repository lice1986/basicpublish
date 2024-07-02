/**
 * DevExtreme (esm/__internal/scheduler/m_data_structures.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
export class AppointmentTooltipInfo {
    constructor(appointment) {
        var targetedAppointment = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
        var color = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
        var settings = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
        this.appointment = appointment;
        this.targetedAppointment = targetedAppointment;
        this.color = color;
        this.settings = settings
    }
}
