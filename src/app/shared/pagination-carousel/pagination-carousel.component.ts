import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination-carousel',
  templateUrl: './pagination-carousel.component.html',
  styleUrls: ['./pagination-carousel.component.scss'],
})
export default class PaginationCarouselComponent {
  @Input()
  CurrentPage: number = null;

  @Output() prevButtonPushed = new EventEmitter<void>();

  @Output() nextButtonPushed = new EventEmitter<void>();

  previous() {
    this.prevButtonPushed.emit();
  }

  next() {
    this.nextButtonPushed.emit();
  }
}
