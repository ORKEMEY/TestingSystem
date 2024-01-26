import { timer, takeWhile } from 'rxjs';

export default class Scroller {
  scrollToTop(acceleration: number = 1) {
    let scrollAvailable = true;

    timer(0, 1)
      .pipe(takeWhile(() => scrollAvailable))
      .subscribe((e) => {
        if (window.pageYOffset >= 0) {
          window.scrollTo(0, window.pageYOffset - e * acceleration);
        }

        if (window.pageYOffset === 0) {
          scrollAvailable = false;
        }
      });
  }
}
