import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observer, Subscription } from 'rxjs';
import TestVariantService from '../../../core/services/test-variant.service';
import Paginator from '../../../shared/paginator';
import TestVariant from '../../../core/models/test-variant.model';
import Alert from '../../../core/alert';

@Component({
  selector: 'questions-manager-component',
  templateUrl: './questions-manager.component.html',
  styleUrls: ['./questions-manager.component.css'],
})
export default class QuestionsManagerComponent
  extends Paginator<TestVariant>
  implements OnInit, OnDestroy
{
  private testVariantsSub: Subscription;

  @ViewChild('alertDiv', { static: false })
  alertDiv: ElementRef | undefined;

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
    this.testId = Number.parseInt(this.activatedRoute.snapshot.params.id, 10);
  }

  ngOnInit(): void {
    this.testVariantsSub = this.testVariantService.dataTestVariants$.subscribe(
      (data: TestVariant[] | null) => {
        this.testVariants = data;
        this.toFirstPage();
        this.checkCollection();
      },
    );
    this.testVariantService.searchTestVariantsByTestId(this.testId);
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
      Alert.alertMessage(this.alertDiv, 'No test variant found!');
    } else {
      Alert.hideAlertMessage(this.alertDiv);
    }
  }
}
