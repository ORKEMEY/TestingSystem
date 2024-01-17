import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import Log from '../../../core/models/log.model';
import LogService from '../../../core/services/log.service';
import TestResultCalc from '../../../core/utils/test-result-calc';
import Paginator from '../../../shared/paginator';
import Alert from '../../../core/utils/alert';
import WarningBoxHandler from '../../../shared/utils/warning-box-handler';

// import Customer from '../../../core/models/customer.model';

@Component({
  selector: 'test-results-component',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css'],
  animations: [fadeInOnEnterAnimation({ duration: 130 })],
})
export default class TestResultsComponent extends Paginator<Log> implements OnInit, OnDestroy {
  private logsSub: Subscription;

  public logs: Log[] | null;

  protected get items(): Log[] | null {
    if (this.searchLine !== '' && !!this.searchLine) {
      return this.search();
    }
    return this.logs;
  }

  public SearchCategory: string = 'Name';

  @ViewChild('alertDiv', { static: false })
  alertDiv: ElementRef | undefined;

  WarningBox: WarningBoxHandler = new WarningBoxHandler();

  isLoading: boolean = true;

  private id: number = 0;

  public TestResCalc: TestResultCalc = new TestResultCalc();

  public searchLine: string | null;

  constructor(private activatedRoute: ActivatedRoute, private logService: LogService) {
    super(15);
    this.activatedRoute.parent.params.subscribe((params) => {
      this.id = Number.parseInt(params.id, 10);
    });
  }

  ngOnInit(): void {
    this.logsSub = this.logService.dataLogs$.subscribe((data: Log[] | null) => {
      this.logs = data;
      this.isLoading = false;
      this.toFirstPage();
      this.checkCollection();
    });
    this.isLoading = true;
    this.logService.searchLogsByTestId(this.id);

    /* setTimeout(() => {
      const log = new Log('00:01:10', new Date().toString());

      log.user = new Customer();
      log.user.login = 'testlogin';
      log.user.name = 'Name';
      log.user.surname = 'Surname';
      log.user.eMail = 'test@email.com';

      log.zero = -10;
      log.mark = 0;
      log.numberOfCorrectAnswers = 10;
      log.maxPoints = 0;
      log.maxNumberOfCorrectAnswers = 25;
      this.logs = [log, log, log, log];
      this.isLoading = false;
    }, 3000); */
  }

  ngOnDestroy(): void {
    this.logsSub?.unsubscribe();
  }

  search(): Log[] | null {
    switch (this.SearchCategory) {
      case 'Points':
        return this.logs.filter(
          (el) => this.TestResCalc.GetAbsPoints(el) === Number.parseInt(this.searchLine.trim(), 10),
        );

      case 'E-Mail':
        return this.logs.filter((el) => el.user.eMail.includes(this.searchLine.trim()));

      case 'Surname':
        return this.logs.filter((el) => el.user.surname.includes(this.searchLine.trim()));

      case 'Name':
        return this.logs.filter((el) => el.user.name.includes(this.searchLine.trim()));

      default:
        return null;
    }
  }

  onSearchLineChange() {
    if (!this.items || this.items.length === 0) {
      this.WarningBox.Warn('No results found!');
    } else {
      this.WarningBox.hideWarning();
    }
  }

  private checkCollection() {
    if (this.logs === null || this.logs.length === 0) {
      Alert.alertMessage(this.alertDiv, 'No test result was found!');
    } else {
      Alert.hideAlertMessage(this.alertDiv);
    }
  }

  getLocalDateTime(utc: string): Date | null {
    const date = new Date(utc);
    if (!date) return null;
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
  }
}
