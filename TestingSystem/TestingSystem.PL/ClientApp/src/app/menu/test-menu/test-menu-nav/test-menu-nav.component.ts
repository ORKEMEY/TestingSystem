import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'test-menu-nav-component',
  templateUrl: './test-menu-nav.component.html',
  styleUrls: ['./test-menu-nav.component.scss'],
})
export default class TestMenuNavComponent implements AfterViewInit {
  testId: number = 0;

  @ViewChild('menuEl')
  public menuEl: ElementRef;

  @ViewChild('sliderEl')
  public sliderEl: ElementRef;

  public CurrentEl: ElementRef;

  private menuResizeObserver: ResizeObserver = null;

  constructor(private renderer: Renderer2, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.testId = Number.parseInt(params.id, 10);
    });
  }

  ngAfterViewInit(): void {
    if (this.menuResizeObserver) return;

    this.CurrentEl = this.menuEl.nativeElement.querySelector('li');
    this.menuResizeObserver = new ResizeObserver(() => {
      this.moveSliderTo(this.CurrentEl);
    });
    this.menuResizeObserver.observe(this.menuEl.nativeElement);
  }

  onMenuItemClick(event) {
    this.CurrentEl = event.target;
    this.moveSliderTo(event.target);
  }

  moveSliderTo(target) {
    this.renderer.setStyle(this.sliderEl.nativeElement, 'left', `${target.offsetLeft}px`);
    this.renderer.setStyle(this.sliderEl.nativeElement, 'width', `${target.offsetWidth}px`);
  }
}
