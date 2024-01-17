import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Observer, Subscription, timer, takeWhile } from 'rxjs';
import TestVariantService from '../../../core/services/test-variant.service';
import Paginator from '../../../shared/paginator';
import TestVariant from '../../../core/models/test-variant.model';
import AlertBoxHandler from '../../../shared/utils/alert-box-handler';

@Component({
  selector: 'questions-manager-component',
  templateUrl: './questions-manager.component.html',
  styleUrls: ['./questions-manager.component.css'],
  animations: [fadeInOnEnterAnimation({ duration: 130 })],
})
export default class QuestionsManagerComponent
  extends Paginator<TestVariant>
  implements OnInit, OnDestroy
{
  private testVariantsSub: Subscription;

  AlertBox: AlertBoxHandler = new AlertBoxHandler();

  private testId: number = 0;

  public testVariants: TestVariant[] | null;

  protected get items(): TestVariant[] | null {
    return this.testVariants;
  }

  constructor(
    private testVariantService: TestVariantService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(1);
    this.activatedRoute.parent.params.subscribe((params) => {
      this.testId = Number.parseInt(params.id, 10);
      this.loadTestVariants();
    });
  }

  ngOnInit(): void {
    this.testVariantsSub = this.testVariantService.dataTestVariants$.subscribe(
      (data: TestVariant[] | null) => {
        this.testVariants = data;
        this.toFirstPage();
        this.checkCollection();
      },
    );
    this.loadTestVariants();
  }

  loadTestVariants() {
    if (this.testId !== 0) {
      this.testVariantService.searchTestVariantsByTestId(this.testId);
    }
  }

  ngOnDestroy(): void {
    this.testVariantsSub.unsubscribe();
  }

  deleteItem(testVariant: TestVariant) {
    this.testVariantService.DeleteTestVariantAsync(
      testVariant.id as number,
      {
        next: () => {
          this.testVariantService.searchTestVariantsByTestId(this.testId);
        },
        error: (errMsg: string) => console.log(errMsg),
      } as Observer<void>,
    );
  }

  private checkCollection() {
    if (this.testVariants === null || this.testVariants.length === 0) {
      this.AlertBox.Alert('No test variant found!');
    } else {
      this.AlertBox.hideAlert();
    }
  }

  public toPrevPage() {
    if (this.previous()) {
      this.scrollToTop(2);
    }
  }

  public toNextPage() {
    if (this.next()) {
      this.scrollToTop(2);
    }
  }

  scrollToTop(acceleration: number = 1) {
    let scrollAvailable = true;

    timer(0, 1)
      .pipe(takeWhile(() => scrollAvailable))
      .subscribe((e) => {
        if (window.pageYOffset >= 0) {
          window.scrollTo(0, window.pageYOffset - e * acceleration);
        }

        if (window.pageYOffset === 0) {
          scrollAvailable = false;
        }
      });
  }
}
