import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent implements OnInit, OnDestroy {
  constructor() {}

  @Input() set dDay(dDay: Date) {
    this._dDay = dDay;
   // console.log(this._dDay);
    
  }
  private subscription: Subscription = new Subscription();
  private _dDay: Date;

  private millisecondsInSeconds: number = 1000;
  private secondsInMinute: number = 60;
  private minutesInHours: number = 60;
  private hoursInADay: number = 24;

  public timeDiff: number;

  public seconds: number;
  public minutes: number;
  public hours: number;
  public days: number;

  ngOnInit(): void {
    this.subscription.add(
      interval(1000).subscribe(() => {
        this.getTimeDiff();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getTimeDiff(): void {
    this.timeDiff = new Date(this._dDay).getTime() - new Date().getTime();
    this.setTimeUnits(this.timeDiff);
  }

  private setTimeUnits(timeDiff: number): void {
    const totalSeconds = Math.floor(timeDiff / this.millisecondsInSeconds);

    this.days = Math.floor(
      totalSeconds /
        (this.secondsInMinute * this.minutesInHours * this.hoursInADay)
    );
    const remainingSeconds =
      totalSeconds %
      (this.secondsInMinute * this.minutesInHours * this.hoursInADay);

    this.hours = Math.floor(
      remainingSeconds / (this.secondsInMinute * this.minutesInHours)
    );
    const remainingSecondsAfterHours =
      remainingSeconds % (this.secondsInMinute * this.minutesInHours);

    this.minutes = Math.floor(
      remainingSecondsAfterHours / this.secondsInMinute
    );
    this.seconds = remainingSecondsAfterHours % this.secondsInMinute;
  }
}
