import VariantOfAnswer from './variant-of-answer.model';
import Tag from './tag.model';
import Model from './model.model';
import QuestionType from './question-type.model';

export default class Question {
  public modelId: number;

  public model: Model;

  public questionTypeId: number;

  public questionType: QuestionType;

  public questionsAssemblyId: number;

  public bParam: number;

  public aParam: number;

  public cParam: number;

  constructor(public query: String, public answers?: VariantOfAnswer[]) {}

  public id?: Number;

  public tags?: Tag[];
}
