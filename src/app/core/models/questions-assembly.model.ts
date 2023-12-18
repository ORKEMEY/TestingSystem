import Question from './question.model';

export default class Test {
  constructor(public name: String, public ownerId: number) {}

  public id?: Number;

  public questions?: Question[];
}
