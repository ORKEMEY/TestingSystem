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

  warningMessage: string = '';

  constructor(private testService: TestService) {
    super(14); // numberOfElemsOnPage
    /* this.tests = [
      new Test('name1', 1, null, null, null, 1, 'description'),
      new Test('name2', 1, null, '2023-06-01T13:45:30', '2024-06-01T13:45:30', 1, 'description'),
      new Test('name3', 1, null, '2024-06-01T13:45:30', '2024-07-01T13:45:30', 1, 'description'),
      new Test('name4', 1, null, '2023-06-01T13:45:30', '2023-07-01T13:45:30', 1, 'description'),
      new Test('name5', 1, null, '2023-06-01T13:45:30', null, 1, 'description'),
      new Test('name6', 1, null, '2024-06-01T13:45:30', null, 1, 'description'),
      new Test('name7', 1, null, null, '2024-06-01T13:45:30', 1, 'description'),
      new Test('name8', 1, null, null, '2023-06-01T13:45:30', 1, 'description'),
      new Test('name9', 1, null, '2023-06-01T13:45:30', '2024-06-01T13:45:30', 1, 'description'),
      new Test('name10', 1, null, null, null, 1, 'description'),
      new Test('name11', 1, null, '2023-06-01T13:45:30', null, 1, 'description'),
      new Test('name12', 1, null, null, null, 1, 'description'),
      new Test('name13', 1, null, '2024-06-01T13:45:30', '2024-07-01T13:45:30', 1, 'description'),
      new Test('name14', 1, null, null, null, 1, 'description'),
      new Test('name15', 1, null, null, null, 1, 'description'),
    ]; */
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
}
