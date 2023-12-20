import VariantOfAnswer from './variant-of-answer.model';
import Tag from './tag.model';
import Model from './model.model';
import QuestionType from './question-type.model';

export default class Question {
  constructor(
    public modelId: number,
    public model: Model,
    public questionTypeId: number,
    public questionType: QuestionType,
    public questionsAssemblyId: number,
    public query: String,
    public bParam: number,
    public aParam: number,
    public cParam: number,
  ) {}

  public id?: Number;

  public answers?: VariantOfAnswer[];

  public tags?: Tag[];
}
