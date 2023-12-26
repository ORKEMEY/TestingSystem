export default class VariantOfAnswer {
  public questionId: Number;

  constructor(public answer: String, questionId?: Number) {
    this.questionId = questionId;
  }

  public isCorrect?: Boolean;

  public id?: Number;
}
