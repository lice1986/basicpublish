/**
 * DevExtreme (esm/integration/angular/components.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import Callbacks from "../../core/utils/callbacks";
import ngModule from "./module";
import angular from "angular";
if (angular) {
    ngModule.service("dxDigestCallbacks", ["$rootScope", function($rootScope) {
        var begin = Callbacks();
        var prioritizedEnd = Callbacks();
        var end = Callbacks();
        var digestPhase = false;
        $rootScope.$watch((function() {
            if (digestPhase) {
                return
            }
            digestPhase = true;
            begin.fire();
            $rootScope.$$postDigest((function() {
                digestPhase = false;
                prioritizedEnd.fire();
                end.fire()
            }))
        }));
        return {
            begin: {
                add: function(callback) {
                    if (digestPhase) {
                        callback()
                    }
                    begin.add(callback)
                },
                remove: begin.remove.bind(begin)
            },
            end: {
                add: end.add.bind(end),
                addPrioritized: prioritizedEnd.add.bind(prioritizedEnd),
                remove: end.remove.bind(end)
            }
        }
    }])
}
