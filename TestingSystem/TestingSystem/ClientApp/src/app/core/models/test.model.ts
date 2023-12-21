import TestVariant from './test-variant.model';
import Tag from './tag.model';

export default class Test {
  constructor(
    public name?: string,
    public duration?: string,
    public openingTime?: string,
    public closureTime?: string,
    public numberOfVariants?: number,
    public description?: String,
    public ownerId?: number,
  ) {}

  public isAccessOpen?: boolean;

  public testVariants?: TestVariant[];

  public tags?: Tag[];

  public id?: Number;
}
