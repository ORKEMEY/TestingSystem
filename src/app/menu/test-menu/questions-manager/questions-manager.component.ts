import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Observer, Subscription } from 'rxjs';
import TestVariantService from '../../../core/services/test-variant.service';
import Paginator from '../../../shared/paginator';
import TestVariant from '../../../core/models/test-variant.model';
import AlertBoxHandler from '../../../shared/utils/alert-box-handler';
import LoadingState from '../../../shared/utils/loading-state';
import Scroller from '../../../shared/utils/scroller';

@Component({
  selector: 'questions-manager-component',
  templateUrl: './questions-manager.component.html',
  styleUrls: ['./questions-manager.component.scss'],
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

  loadingState: LoadingState = new LoadingState(true);

  scroller: Scroller = new Scroller();

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
    this.testVariantsSub = this.testVariantService.value$.subscribe(
      (data: TestVariant[] | null) => {
        this.testVariants = data;
        this.loadingState.stopLoading();
        this.toFirstPage();
        this.checkCollection();
      },
    );
    this.loadTestVariants();
  }

  loadTestVariants() {
    if (this.testId !== 0) {
      this.loadingState.startLoading();
      this.testVariantService.searchTestVariantsByTestId(this.testId);
    }
  }

  ngOnDestroy(): void {
    this.testVariantsSub.unsubscribe();
  }

  deleteItem(testVariant: TestVariant) {
    this.testVariantService.deleteTestVariant(testVariant.id as number).subscribe({
      next: () => {
        this.testVariantService.searchTestVariantsByTestId(this.testId);
      },
      error: (errMsg: string) => console.log(errMsg),
    } as Observer<void>);
  }

  private checkCollection() {
    if (
      (this.testVariants === null || this.testVariants.length === 0) &&
      !this.loadingState.value
    ) {
      this.AlertBox.Alert('No test variant found!');
    } else {
      this.AlertBox.hideAlert();
    }
  }

  public toPrevPage() {
    if (this.previous()) {
      this.scroller.scrollToTop(2);
    }
  }

  public toNextPage() {
    if (this.next()) {
      this.scroller.scrollToTop(2);
    }
  }
}
