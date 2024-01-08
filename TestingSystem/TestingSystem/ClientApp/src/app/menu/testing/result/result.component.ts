import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import LogService from '../../../core/services/log.service';
import Log from '../../../core/models/log.model';

@Component({
  selector: 'result-component',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export default class ResultComponent {
  private LogId: number = 0;

  public Log: Log = null;

  constructor(private logService: LogService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      this.LogId = Number.parseInt(params.id, 10);
      this.loadLog();
    });

    /* this.Log = new Log('00:01:10', new Date().toString());
    this.Log.zero = -10;
    this.Log.mark = 0;
    this.Log.numberOfCorrectAnswers = 10;
    this.Log.maxPoints = 0;
    this.Log.maxNumberOfCorrectAnswers = 25; */
  }

  private loadLog() {
    if (this.LogId !== 0) {
      this.logService.getById(this.LogId, {
        next: (item) => {
          this.Log = item;
        },
      } as Observer<Log>);
    } else {
      this.Log = null;
    }
  }
}