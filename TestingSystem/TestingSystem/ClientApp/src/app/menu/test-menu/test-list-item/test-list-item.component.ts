import { Component, Input, Output, EventEmitter } from '@angular/core';
import Test from '../../../core/models/test.model';

@Component({
  selector: 'test-list-item-component',
  templateUrl: './test-list-item.component.html',
  styleUrls: ['./test-list-item.component.css'],
})
export default class TestListItemComponent {
  public isSettingsVisible: boolean = false;

  public Label: String = 'Tag';

  @Input()
  item: Test = null;

  @Output() deleteButtonPushed = new EventEmitter<Test>();

  public delete() {
    this.deleteButtonPushed.emit(this.item);
  }

  public get Name(): String {
    if (this.item === null) {
      return 'Name is not set';
    }
    return this.item.name;
  }

  public get LabelClasses(): Object {
    const labelClasses = {};
    const nullDate = new Date(null).getTime();
    const opening = new Date(this.item.openingTime).getTime();
    const closure = new Date(this.item.closureTime).getTime();
    const now = new Date().getTime();

    if (now < opening) {
      labelClasses['badge-warning'] = true;
      this.Label = 'Pending';
    }

    if (
      (opening < now && (now < closure || closure === nullDate)) ||
      (opening === nullDate && now < closure) ||
      (opening === nullDate && closure === nullDate)
    ) {
      labelClasses['badge-success'] = true;
      this.Label = 'Opened';
    }

    if (closure < now && closure !== nullDate) {
      labelClasses['badge-danger'] = true;
      this.Label = 'Closed';
    }

    return labelClasses;
  }
}
