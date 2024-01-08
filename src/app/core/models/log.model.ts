import Customer from './customer.model';

export default class Log {
  public testId: number;

  public userId: number;

  public user: Customer;

  constructor(
    public expiredTime: string,

    public dateTime: string,
  ) {}

  public variantNumber: number;

  public id?: Number;

  public zero: number;

  public mark: number;

  public maxPoints: number;

  public numberOfCorrectAnswers: number;

  public maxNumberOfCorrectAnswers: number;

  /* public GetAbsPoints(): number {
    return this.mark - this.zero * this.numberOfCorrectAnswers;
  }

  public GetAbsMaxPoints(): number {
    return this.maxPoints - this.zero * this.maxNumberOfCorrectAnswers;
  }

  public GetPercentOfCorrectAnswers(): number {
    if (this.numberOfCorrectAnswers === 0 || this.maxNumberOfCorrectAnswers === 0) return 0;
    return (this.numberOfCorrectAnswers / this.maxNumberOfCorrectAnswers) * 100;
  }

  public GetPercentOfWrongAnswers(): number {
    if (this.numberOfCorrectAnswers === 0 || this.maxNumberOfCorrectAnswers === 0) return 0;
    return (
      ((this.maxNumberOfCorrectAnswers - this.numberOfCorrectAnswers) /
        this.maxNumberOfCorrectAnswers) *
      100
    );
  } */
}
