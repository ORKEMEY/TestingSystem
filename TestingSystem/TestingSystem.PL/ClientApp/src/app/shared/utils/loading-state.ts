import BehaviorSubjectItem from '../../core/utils/behavior-subject-item';

export default class LoadingState extends BehaviorSubjectItem<boolean> {
  constructor(initialValue: boolean = false) {
    super(initialValue);
  }

  startLoading() {
    this.value = true;
  }

  stopLoading() {
    this.value = false;
  }
}
