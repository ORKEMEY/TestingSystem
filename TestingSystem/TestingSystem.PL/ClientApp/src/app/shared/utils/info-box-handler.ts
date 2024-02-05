export default class InfoBoxHandler {
  isInfoVisible: Boolean = false;

  infoMessage: string = '';

  Info(msg: string) {
    this.infoMessage = msg;
    this.isInfoVisible = true;
  }

  hideInfo() {
    this.infoMessage = '';
    this.isInfoVisible = false;
  }
}
