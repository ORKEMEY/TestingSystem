import { Component } from '@angular/core';
import TestService from '../../../core/services/test.service';
import Paginator from '../../../shared/paginator';
import Test from '../../../core/models/test.model';

@Component({
  selector: 'test-list-component',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css'],
})
export default class TestListComponent extends Paginator<Test> {
  public tests: Test[] | null;

  protected get items(): Test[] | null {
    return this.tests;
  }

  constructor(private testService: TestService) {
    super(15); // numberOfElemsOnPage
    this.tests = [
      new Test('name1', 1, null, null, null, 1, 'description'),
      new Test('name2', 1, null, null, null, 1, 'description'),
      null,
      new Test('name2', 1, null, null, null, 1, 'description'),
      null,
      null,
    ];
  }
}
