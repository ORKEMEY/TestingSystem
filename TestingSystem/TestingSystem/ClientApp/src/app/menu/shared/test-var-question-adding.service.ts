import { Injectable } from '@angular/core';
import TestVariantService from '../../core/services/test-variant.service';

@Injectable()
export default class TestVariantQuestionAddingService {
  private testVariantId: number = 0;

  private questionId: number = 0;

  public get isActivated(): boolean {
    return this.testVariantId !== 0 || this.questionId !== 0;
  }

  constructor(private testVariantService: TestVariantService) {}

  public pushTestVariant(testVariantId: number) {
    this.testVariantId = testVariantId;
    this.submit();
  }

  public pushQuestionId(questionId: number) {
    this.questionId = questionId;
    this.submit();
  }

  private submit() {
    if (this.testVariantId !== 0 && this.questionId !== 0) {
      this.testVariantService.postQuestionToTestVariant(this.testVariantId, this.questionId);
      this.clear();
    }
  }

  public clear() {
    this.testVariantId = 0;
    this.questionId = 0;
  }
}
