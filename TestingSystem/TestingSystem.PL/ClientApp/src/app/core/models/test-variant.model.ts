import Question from './question.model';

export default class TestVariant {
  constructor(public number: number, public testId: number) {}

  public id?: number;

  public questions?: Question[];
}
