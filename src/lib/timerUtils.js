// timerUtils.js

export class Timer {
    /**
     * @param {any} onTick
     * @param {any} onStateChange
     */
    constructor(onTick, onStateChange) {
        this.totalElapsedTime = 0;
        this.lastTimestamp = 0;
        this.requestRef = null;
        this.isRunning = false;
        this.onTick = onTick;
        this.onStateChange = onStateChange;
    }

    /**
     * @param {number} timestamp
     */
    animate(timestamp) {
        if (this.lastTimestamp) {
            const delta = (timestamp - this.lastTimestamp) / 1000;
            this.totalElapsedTime += delta;
            this.onTick(delta, this.totalElapsedTime);
        }
        this.lastTimestamp = timestamp;
        if (this.isRunning) {
            this.requestRef = requestAnimationFrame(this.animate.bind(this));
        }
    }

    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTimestamp = 0;
            this.requestRef = requestAnimationFrame(this.animate.bind(this));
            this.onStateChange(true);
        }
    }

    stop() {
        this.isRunning = false;
        // @ts-ignore
        cancelAnimationFrame(this.requestRef);
        this.lastTimestamp = 0;
        this.onStateChange(false);
    }

    reset() {
        this.stop();
        this.totalElapsedTime = 0;
        this.onTick(0, 0);
    }

    getElapsedTime() {
        return this.totalElapsedTime;
    }
}