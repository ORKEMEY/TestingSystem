import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observer } from 'rxjs';
import TestService from '../../../core/services/test.service';
import Paginator from '../../../shared/paginator';
import Test from '../../../core/models/test.model';
import Alert from '../../../core/alert';

@Component({
  selector: 'test-list-component',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css'],
})
export default class TestListComponent extends Paginator<Test> implements OnInit, OnDestroy {
  private testsSub: Subscription;

  public tests: Test[] | null;

  public searchLine: string | null;

  protected get items(): Test[] | null {
    return this.tests;
  }

  @ViewChild('alertDiv', { static: false })
  alertDiv: ElementRef | undefined;

  isWarningVisible: Boolean = false;

  isInfoVisible: Boolean = false;

  warningMessage: string = '';

  infoMessage: string = '';

  constructor(private testService: TestService) {
    super(14); // numberOfElemsOnPage
    /* this.tests = [
      new Test('name1', null, null, null, 1, 'description', 1),
      new Test('name2', null, '2023-06-01T13:45:30', '2024-06-01T13:45:30', 1, 'description', 1),
      new Test('name3', null, '2024-06-01T13:45:30', '2024-07-01T13:45:30', 1, 'description', 1),
      new Test('name4', null, '2023-06-01T13:45:30', '2023-07-01T13:45:30', 1, 'description', 1),
      new Test('name5', null, '2023-06-01T13:45:30', null, 1, 'description', 1),
      new Test('name6', null, '2024-06-01T13:45:30', null, 1, 'description', 1),
      new Test('name7', null, null, '2024-06-01T13:45:30', 1, 'description', 1),
      new Test('name8', null, null, '2023-06-01T13:45:30', 1, 'description', 1),
      new Test('name9', null, '2023-06-01T13:45:30', '2024-06-01T13:45:30', 1, 'description', 1),
      new Test('name10', null, null, null, 1, 'description', 1),
      new Test('name11', null, '2023-06-01T13:45:30', null, 1, 'description', 1),
      new Test('name12', null, null, null, 1, 'description', 1),
      new Test('name13', null, '2024-06-01T13:45:30', '2024-07-01T13:45:30', 1, 'description', 1),
      new Test('name14', null, null, null, 1, 'description', 1),
      new Test('name15', null, null, null, 1, 'description', 1),
    ];

    this.tests.forEach((el, ind) => {
      el.id = ind + 1;
    }); */
  }

  ngOnInit(): void {
    this.testsSub = this.testService.dataTests$.subscribe((data: Test[] | null) => {
      this.tests = data;
      this.toFirstPage();
      this.checkCollection();
    });
    this.testService.refreshOwnedTests();
  }

  ngOnDestroy(): void {
    this.testsSub.unsubscribe();
  }

  onSearchLineEmpty() {
    if (this.searchLine === '') {
      this.testService.refreshOwnedTests();
    }
  }

  searchItems() {
    if (this.searchLine !== '' && this.searchLine !== undefined) {
      this.testService.searchOwnedTestsByName(this.searchLine.trim());
    } else {
      console.log('searching line is empty');
    }
  }

  deleteItem(test: Test) {
    this.testService.DeleteOwnedTestAsync(
      test.id as number,
      {
        next: () => {
          this.Info('Test succesfully deleted!');
          this.testService.refreshOwnedTests();
        },
        error: (errMsg: string) => this.Warn(errMsg),
      } as Observer<void>,
    );
    /* const index = this.tests.indexOf(test);
    this.tests.splice(index, 1); */
  }

  private checkCollection() {
    if (this.tests === null || this.tests.length === 0) {
      Alert.alertMessage(this.alertDiv, 'No tests found');
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

  Info(msg: string) {
    this.infoMessage = msg;
    this.isInfoVisible = true;
  }

  hideInfo() {
    this.infoMessage = '';
    this.isInfoVisible = false;
  }
}
