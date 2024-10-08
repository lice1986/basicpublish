/**
 * DevExtreme (esm/renovation/ui/scheduler/utils/semaphore/scrollSemaphore.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    Semaphore
} from "./semaphore";
export class ScrollSemaphore {
    constructor() {
        this.semaphore = new Semaphore;
        this.position = {
            left: -1,
            top: -1
        }
    }
    isFree(position) {
        if (this.isInitialPosition()) {
            this.setPosition(position);
            return this.semaphore.isFree()
        }
        return this.semaphore.isFree() && !this.comparePosition(position)
    }
    take(position) {
        this.semaphore.take();
        this.setPosition(position)
    }
    release() {
        this.semaphore.release()
    }
    setPosition(source) {
        var _source$left, _source$top;
        this.position.left = null !== (_source$left = source.left) && void 0 !== _source$left ? _source$left : -1;
        this.position.top = null !== (_source$top = source.top) && void 0 !== _source$top ? _source$top : -1
    }
    isInitialPosition() {
        return -1 === this.position.left && -1 === this.position.top
    }
    comparePosition(target) {
        var _target$left, _target$top;
        var left = null !== (_target$left = target.left) && void 0 !== _target$left ? _target$left : -1;
        var top = null !== (_target$top = target.top) && void 0 !== _target$top ? _target$top : -1;
        return this.position.left === left && this.position.top === top
    }
}
