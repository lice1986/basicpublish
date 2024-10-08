﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\anchoring.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { checkModelReady } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export class Anchoring extends Disposable {
    constructor(subscrible, model, anchoringProperty) {
        super();
        this.state = Anchoring.states.complete;
        this.anchoring = anchoringProperty;
        this.start(subscrible, model);
    }
    dispose() {
        super.dispose();
        this.subscribtion.dispose();
    }
    start(subscrible, model) {
        this.subscribtion && this.subscribtion.dispose();
        const oldVal = ko.observable(subscrible());
        this.subscribtion = subscrible.subscribe((newVal) => {
            if (this.state !== Anchoring.states.fromControls) {
                this.state = Anchoring.states.inProgress;
                this.anchorSubscribtion(newVal, oldVal, model);
            }
            oldVal(newVal);
            this.state = Anchoring.states.complete;
        });
    }
}
Anchoring.states = {
    inProgress: 'inProgress',
    complete: 'complete',
    fromControls: 'fromControls'
};
export class VerticalAcnhoring extends Anchoring {
    constructor(subscrible, model, anchoringProperty) {
        super(subscrible, model, anchoringProperty);
        this.anchorSubscribtion = (parentSizeValue, oldValue, model) => {
            if (checkModelReady(model.root) && isFinite(oldValue()) && oldValue()) {
                if (this.anchoring() === 'Both') {
                    const newSize = model.size.height() + parentSizeValue - oldValue();
                    model.size.height(newSize > 0 ? newSize : 1);
                }
                if (this.anchoring() === 'Bottom') {
                    const newLocation = model.location.y() + parentSizeValue - oldValue();
                    model.location.y(newLocation > 0 ? newLocation : 0);
                }
            }
        };
        this._disposables.push(model.size.height.subscribe((newVal) => {
            if (this.state === Anchoring.states.complete) {
                this.state = Anchoring.states.fromControls;
            }
        }));
        this._disposables.push(model.location.y.subscribe((newVal) => {
            if (this.state === Anchoring.states.complete) {
                this.state = Anchoring.states.fromControls;
            }
        }));
    }
}
export class HorizontalAnchoring extends Anchoring {
    constructor(subscrible, model, anchoringProperty) {
        super(subscrible, model, anchoringProperty);
        this.anchorSubscribtion = (parentSizeValue, oldValue, model) => {
            if (checkModelReady(model.root) && isFinite(oldValue()) && oldValue()) {
                if (this.anchoring() === 'Both') {
                    const newSize = model.size.width() + parentSizeValue - oldValue();
                    model.size.width(newSize > 0 ? newSize : 1);
                }
                if (this.anchoring() === 'Right') {
                    const newLocation = model.location.x() + parentSizeValue - oldValue();
                    model.location.x(newLocation > 0 ? newLocation : 0);
                }
            }
        };
    }
}
