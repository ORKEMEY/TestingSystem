import TestVariant from './test-variant.model';
import TimeSpan from './time-span.model';
import Tag from './tag.model';

export default class Test {
  constructor(
    public name: String,
    public ownerId: number,
    public duration: TimeSpan,
    public openingTime: string,
    public closureTime: string,
    public numberOfVariants: number,
    public description: String,
  ) {}

  public isAccessOpen?: boolean;

  public testVariants?: TestVariant[];

  public tags?: Tag[];

  public id?: Number;
}
