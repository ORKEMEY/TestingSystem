import Log from '../models/log.model';

export default class TestResultCalc {
  public GetAbsPoints(log: Log): number {
    if (!log) return 0;
    return log.mark;
  }

  public GetAbsMaxPoints(log: Log): number {
    if (!log) return 0;
    return log.maxPoints;
  }

  public GetPercentOfCorrectAnswers(log: Log): number {
    if (!log) return 0;
    if (log.numberOfCorrectAnswers === 0 || log.maxNumberOfCorrectAnswers === 0) return 0;
    return (log.numberOfCorrectAnswers / log.maxNumberOfCorrectAnswers) * 100;
  }

  public GetPercentOfWrongAnswers(log: Log): number {
    if (!log) return 0;
    if (log.numberOfCorrectAnswers === 0 || log.maxNumberOfCorrectAnswers === 0) return 0;
    return (
      ((log.maxNumberOfCorrectAnswers - log.numberOfCorrectAnswers) /
        log.maxNumberOfCorrectAnswers) *
      100
    );
  }
}
