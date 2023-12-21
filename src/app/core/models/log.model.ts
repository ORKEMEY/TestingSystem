export default class Log {
  constructor(
    public testId: number,
    public userId: number,
    public expiredTime: string,
    public DateTime: string,
    public variantNumber: number,
    public mark: number,
  ) {}

  public id?: Number;
}
