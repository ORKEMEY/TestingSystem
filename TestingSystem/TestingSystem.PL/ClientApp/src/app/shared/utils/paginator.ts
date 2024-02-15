export default abstract class Paginator<T> {
  protected abstract items: T[] | null;

  constructor(private numberOfElemsOnPage: number = 10, private currentPage: number = 1) {
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

  public get CurrentPage(): number {
    return this.currentPage;
  }

  public get NumberOfElemsOnPage(): number {
    return this.numberOfElemsOnPage;
  }

  public get itemsPaginated(): T[] | null {
    const startInd = (this.CurrentPage - 1) * this.numberOfElemsOnPage;
    const endInd = startInd + this.numberOfElemsOnPage;

    return this.items?.slice(startInd, endInd);
  }

  public previous(): boolean {
    if (this.CurrentPage !== 1) {
      this.CurrentPage -= 1;
      return true;
    }
    return false;
  }

  public next(): boolean {
    if (this.CurrentPage !== Math.ceil(this.items.length / this.numberOfElemsOnPage)) {
      this.CurrentPage += 1;
      return true;
    }
    return false;
  }

  public toFirstPage() {
    this.CurrentPage = 1;
  }
}
