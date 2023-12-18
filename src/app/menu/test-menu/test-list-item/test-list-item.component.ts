import { Component, Input } from '@angular/core';
import Test from '../../../core/models/test.model';

@Component({
  selector: 'test-list-item-component',
  templateUrl: './test-list-item.component.html',
  styleUrls: ['./test-list-item.component.css'],
})
export default class TestListItemComponent {
  @Input()
  public item: Test = null;

  public get Name(): String {
    if (this.item === null) {
      return 'Name is not set';
    }
    return this.item.name;
  }
}
