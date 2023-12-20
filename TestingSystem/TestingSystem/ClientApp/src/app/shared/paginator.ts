export default abstract class Paginator<T> {
  protected abstract items: T[] | null;

  private currentPage: number;

  private numberOfElemsOnPage: number;

  constructor(numberOfElemsOnPage: number = 10, currentPage: number = 1) {
    this.currentPage = currentPage;
    this.numberOfElemsOnPage = numberOfElemsOnPage;
  }

  public set CurrentPage(value: number) {
    if (
      this.items !== null &&
      value >= 1 &&
      this.items.length / this.numberOfElemsOnPage + 1 > value
    ) {
      this.currentPage = value;
    }
  }

  public get CurrentPage() {
    return this.currentPage;
  }

  public get itemsPaginated(): T[] | null {
    const startInd = (this.CurrentPage - 1) * this.numberOfElemsOnPage;
    const endInd = startInd + this.numberOfElemsOnPage;

    return this.items?.slice(startInd, endInd);
  }

  public previous() {
    this.CurrentPage -= 1;
  }

  public next() {
    this.CurrentPage += 1;
  }

  public toFirstPage() {
    this.CurrentPage = 1;
  }
}
