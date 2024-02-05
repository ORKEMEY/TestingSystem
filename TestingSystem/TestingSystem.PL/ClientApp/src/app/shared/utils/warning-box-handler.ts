export default class WarningBoxHandler {
  isWarningVisible: Boolean = false;

  warningMessage: string = '';

  Warn(msg: string) {
    this.warningMessage = msg;
    this.isWarningVisible = true;
  }

  hideWarning() {
    this.warningMessage = '';
    this.isWarningVisible = false;
  }
}
