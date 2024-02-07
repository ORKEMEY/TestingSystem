export default class AlertBoxHandler {
  isVisible: boolean = false;

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
