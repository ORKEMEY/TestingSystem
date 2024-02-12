import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
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

  @Input()
  item: Test = null;

  @Output() deleteButtonPushed = new EventEmitter<Test>();

  public delete(event: Event) {
    event.stopPropagation();
    this.deleteButtonPushed.emit(this.item);
  }

  public get Name(): String {
    if (this.item === null) {
      return 'Name is not set';
    }
    return this.item.name;
  }

  constructor(private renderer: Renderer2) {}

  // #region ticker

  @ViewChild('nameWrapperEl', { static: false })
  public nameWrapperEl: ElementRef | undefined;

  @ViewChild('nameEl', { static: false })
  public nameEl: ElementRef | undefined;

  public isNameElOverflown: boolean = false;

  private nameResizeObserver: ResizeObserver = null;

  isLabelElOverflownCheck() {
    if (this.nameEl.nativeElement.classList.contains('ticker')) {
      this.isNameElOverflown =
        this.nameWrapperEl.nativeElement.scrollWidth / 2 >
        this.nameWrapperEl.nativeElement.clientWidth;
    } else {
      this.isNameElOverflown =
        this.nameWrapperEl.nativeElement.scrollWidth > this.nameWrapperEl.nativeElement.clientWidth;
    }
  }

  ngAfterViewInit(): void {
    if (this.nameResizeObserver) return;

    this.nameResizeObserver = new ResizeObserver(() => {
      this.isLabelElOverflownCheck();

      if (this.isNameElOverflown) {
        this.renderer.addClass(this.nameEl.nativeElement, 'ticker');

        const duration = this.nameEl.nativeElement.scrollWidth / 25;

        this.renderer.setStyle(
          this.nameEl.nativeElement,
          'animation-duration',
          `${Math.round(duration)}s`,
        );
      } else {
        this.renderer.removeClass(this.nameEl.nativeElement, 'ticker');
      }
    });

    this.nameResizeObserver.observe(this.nameWrapperEl.nativeElement);
  }
  // #endregion

  // #region background

  public BgGradient: string = this.RandomRaialGradient();

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

  // #endregion

  // #region label

  public Label: String = 'Tag';

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

  // #endregion
}
