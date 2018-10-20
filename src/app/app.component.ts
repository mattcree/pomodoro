import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Timer } from './timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  static readonly POMODORO_TIME_IN_SECONDS = 60 * 25;
  workTimer: Timer;
  timerSubscription: Subscription;

  constructor() {
    this.workTimer = new Timer(AppComponent.POMODORO_TIME_IN_SECONDS);
    this.timerSubscription = null;
  }

  startClock() {
    this.timerSubscription = this.workTimer.startClock().subscribe(() => {
      this.workTimer.isTimeUp() ? this.alarm() : this.workTimer.tick();
    });
  }

  stopClock() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.workTimer.stopTicking();
    }
  }

  resetClock() {
    this.workTimer.resetTimer();
  }

  alarm() {
    this.stopClock();
    this.playAlarmSound();
    this.workTimer.endTimer();
  }

  formatSeconds(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} minutes and ${seconds} seconds`;
  }

  playAlarmSound() {
    let audio = new Audio();
    audio.src = 'assets/audio/alarm.wav';
    audio.load();
    audio.play();
  }

}
