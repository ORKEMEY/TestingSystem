import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'question-menu-component',
  templateUrl: './question-menu.component.html',
  styleUrls: ['./question-menu.component.scss'],
})
export default class QuestionMenuComponent implements AfterViewInit {
  constructor(private location: Location, private renderer: Renderer2, private router: Router) {}

  back() {
    const prevPath = localStorage.getItem('prev');
    if (prevPath) {
      this.router.navigateByUrl(prevPath);
    } else this.location.back();
  }

  @ViewChild('menuEl')
  public menuEl: ElementRef;

  @ViewChild('sliderEl')
  public sliderEl: ElementRef;

  public CurrentEl: ElementRef;

  private menuResizeObserver: ResizeObserver = null;

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
