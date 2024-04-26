import VariantOfAnswer from './variant-of-answer.model';
import Tag from './tag.model';
import QuestionType from './question-type.model';

export default class Question {
  public questionTypeId: number;

  public questionType: QuestionType;

  public difficulty: number;

  constructor(public query: String, public answers?: VariantOfAnswer[]) {}

  public id?: Number;

  public tags?: Tag[];
}
