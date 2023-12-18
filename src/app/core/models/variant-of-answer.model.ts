export default class VariantOfAnswer {
  constructor(public answer: String, public questionId: Number) {}

  public isCorrect?: Boolean;

  public id?: Number;
}
