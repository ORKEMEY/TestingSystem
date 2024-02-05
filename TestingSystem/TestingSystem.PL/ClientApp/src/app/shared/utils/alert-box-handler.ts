export default class AlertBoxHandler {
  isVisible: Boolean = false;

  Message: string = '';

  Alert(msg: string) {
    this.Message = msg;
    this.isVisible = true;
  }

  hideAlert() {
    this.Message = '';
    this.isVisible = false;
  }
}
