import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Log from '../../../core/models/log.model';
import LogService from '../../../core/services/log.service';
import Paginator from '../../../shared/paginator';
import Alert from '../../../core/alert';

// import Customer from '../../../core/models/customer.model';

@Component({
  selector: 'test-results-component',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css'],
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

  isWarningVisible: Boolean = false;

  warningMessage: string = '';

  isLoading: boolean = true;

  private id: number = 0;

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
      log.user.Login = 'testlogin';
      log.user.Name = 'Name';
      log.user.Surname = 'Surname';
      log.user.EMail = 'test@email.com';

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
          (el) => el.GetAbsPoints() === Number.parseInt(this.searchLine.trim(), 10),
        );

      case 'E-Mail':
        return this.logs.filter((el) => el.user.EMail.includes(this.searchLine.trim()));

      case 'Surname':
        return this.logs.filter((el) => el.user.Surname.includes(this.searchLine.trim()));

      case 'Name':
        return this.logs.filter((el) => el.user.Name.includes(this.searchLine.trim()));

      default:
        return null;
    }
  }

  onSearchLineChange() {
    if (!this.items || this.items.length === 0) {
      this.Warn('No results found!');
    } else {
      this.hideWarning();
    }
  }

  private checkCollection() {
    if (this.logs === null || this.logs.length === 0) {
      Alert.alertMessage(this.alertDiv, 'No test result was found!');
    } else {
      Alert.hideAlertMessage(this.alertDiv);
    }
  }

  Warn(msg: string) {
    this.warningMessage = msg;
    this.isWarningVisible = true;
  }

  hideWarning() {
    this.warningMessage = '';
    this.isWarningVisible = false;
  }
}