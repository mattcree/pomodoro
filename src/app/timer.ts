import { Observable, timer } from 'rxjs';

export class Timer {
  private static readonly ONE_SECOND_IN_MS = 1000;

  isTicking: boolean;
  timerDurationInSeconds: number;
  timeLeftOnTimer: number;
  timerObservable: Observable<number>;

  constructor(timerDurationInSeconds: number) {
    this.isTicking = false;
    this.timerDurationInSeconds = timerDurationInSeconds;
    this.timeLeftOnTimer = timerDurationInSeconds;
    this.timerObservable = timer(Timer.ONE_SECOND_IN_MS, Timer.ONE_SECOND_IN_MS);
  }

  startClock() {
    this.isTicking = true;
    return this.timerObservable;
  }

  stopTicking() {
    this.isTicking = false;
  }

  endTimer() {
    this.stopTicking();
    this.resetTimer();
  }

  tick() {
    this.timeLeftOnTimer -= 1;
    console.log(this.timeLeftOnTimer);
  }

  isTimeUp() {
    return this.timeLeftOnTimer === 0;
  }

  resetTimer() {
    this.timeLeftOnTimer = this.timerDurationInSeconds;
  }

}
