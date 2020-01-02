import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild
} from '@angular/core';

export interface IImageReveal {
  path?: string;
  width?: number;
}

export interface IImageRevealInput {
  images: [IImageReveal, IImageReveal];
  height: number;
}

@Component({
  selector: 'comp-image-reveal',
  templateUrl: 'image-reveal.component.html',
  styleUrls: ['image-reveal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageRevealComponent implements OnInit {

  @Input() readonly imageRevealInput: IImageRevealInput;
  @ViewChild('reveal', { static: true }) reveal: ElementRef;

  imageReveal: [IImageReveal, IImageReveal] = [{}, {}];
  revealWidth: number;
  isResizing = false;
  handleWidth = 10;
  lastX;

  constructor() { }

  ngOnInit() {
    [this.imageReveal[0].width, this.imageReveal[1].width] = this.calculateWidth();
    this.revealWidth = this.imageReveal[0].width + this.imageReveal[1].width + this.handleWidth;
  }

  private calculateWidth() {
    const revealElement = this.reveal.nativeElement as HTMLElement;
    const hasWidth = (item: IImageReveal) => Boolean(item.width);
    let width1 = revealElement.offsetWidth / 2;
    let width2 = revealElement.offsetWidth / 2;

    if (hasWidth(this.imageRevealInput.images[0]) && hasWidth(this.imageRevealInput.images[1])) {
      width1 = revealElement.offsetWidth - (revealElement.offsetWidth - this.imageRevealInput.images[0].width);
      width2 = revealElement.offsetWidth - (revealElement.offsetWidth - this.imageRevealInput.images[1].width);
    } else {
      if (hasWidth(this.imageRevealInput.images[0])) {
        width2 = revealElement.offsetWidth - this.imageRevealInput.images[0].width;
        width1 = revealElement.offsetWidth - (width2);
      }
      if (hasWidth(this.imageRevealInput.images[1])) {
        width1 = revealElement.offsetWidth - this.imageRevealInput.images[1].width;
        width2 = revealElement.offsetWidth - (width1);
      }
    }

    return [width1, width2];
  }

  onHandleMove(event: MouseEvent) {
    if (!this.isResizing) {
      return;
    }
    const delta = event.clientX - this.lastX;
    this.imageReveal[0].width += delta;
    this.imageReveal[1].width -= delta;
    this.lastX = event.clientX;
  }

  onResizeStart(event: MouseEvent) {
    this.isResizing = true;
    this.lastX = event.clientX;
  }

  onResizeFinish() {
    this.isResizing = false;
  }

  onResize() {
    /*const containerElement = this.reveal.nativeElement as HTMLElement;
    this.imageReveal[0].width = (containerElement.offsetWidth - this.imageReveal[1].width);
    this.imageReveal[1].width = (containerElement.offsetWidth - this.imageReveal[0].width);
    this.revealWidth = this.imageReveal[0].width + this.imageReveal[1].width + this.handleWidth;*/
    [this.imageReveal[0].width, this.imageReveal[1].width] = this.calculateWidth();
    this.revealWidth = this.imageReveal[0].width + this.imageReveal[1].width + this.handleWidth;
  }

}
