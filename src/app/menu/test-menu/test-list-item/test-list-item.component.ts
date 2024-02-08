import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { flipInXOnEnterAnimation, flipOutXOnLeaveAnimation } from 'angular-animations';
import Test from '../../../core/models/test.model';

@Component({
  selector: 'test-list-item-component',
  templateUrl: './test-list-item.component.html',
  styleUrls: ['./test-list-item.component.scss'],
  animations: [
    flipInXOnEnterAnimation({ duration: 500 }),
    flipOutXOnLeaveAnimation({ duration: 300 }),
  ],
})
export default class TestListItemComponent implements AfterViewInit {
  public isSettingsVisible: boolean = false;

  public Label: String = 'Tag';

  @Input()
  item: Test = null;

  @Output() deleteButtonPushed = new EventEmitter<Test>();

  public get Name(): String {
    if (this.item === null) {
      return 'Name is not set';
    }
    return this.item.name;
  }

  public BgGradient: string = this.RandomRaialGradient();

  @ViewChild('labelEl', { static: false })
  public LabelEl: ElementRef | undefined;

  public isLabelElOverflown: boolean = false;

  ngAfterViewInit(): void {
    this.isLabelElOverflown =
      this.LabelEl.nativeElement.scrollWidth > this.LabelEl.nativeElement.clientWidth;
  }

  public RandomRaialGradient(): string {
    const colors = [
      'rgba(252, 176, 69, 0.3)',
      'rgba(231, 60, 126, 0.3)',
      'rgba(35, 165, 213, 0.3)',
      'rgba(50, 215, 35, 0.3)',
    ]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return `radial-gradient(circle,${colors[0]} 25%,
        ${colors[1]} 50%, ${colors[2]} 75%, ${colors[3]} 100%)`;
  }

  public RandomLinGradient(): string {
    const genColor = () => {
      const colors = [];
      for (let i = 0; i < 3; i += 1) {
        colors.push(Math.round(Math.random() * 255));
      }
      return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.4)`;
    };

    const angle = Math.round(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${genColor()}, ${genColor()}, ${genColor()}, ${genColor()})`;
  }

  public delete(event: Event) {
    event.stopPropagation();
    this.deleteButtonPushed.emit(this.item);
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
