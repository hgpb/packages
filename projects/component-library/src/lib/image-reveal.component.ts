import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

export interface IImageReveal {
  path?: string;
  width?: number;
}

export interface IImageRevealInput {
  images: [IImageReveal, IImageReveal];
  height: number;
  handle?: IImageRevealHandle;
}

export interface IImageRevealHandle {
  width: number;
}

@Component({
  selector: 'comp-image-reveal',
  templateUrl: 'image-reveal.component.html',
  styleUrls: ['image-reveal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageRevealComponent implements OnInit {
  private readonly DEFAULT_HANDLE_WIDTH = 10;
  private lastX: number;
  private isResizing = false;

  @ViewChild('reveal', { static: true }) reveal: ElementRef;
  @Input() imageRevealInput: IImageRevealInput;

  imageReveal: [IImageReveal, IImageReveal] = [{}, {}];
  revealWidth: number;
  handleWidth: number;

  constructor() { }

  ngOnInit(): void {
    this.handleWidth = Boolean(this.imageRevealInput.handle) ? this.imageRevealInput.handle.width : this.DEFAULT_HANDLE_WIDTH;

    this.imageReveal[0].path = Boolean(this.imageRevealInput.images[0].path) ? this.imageRevealInput.images[0].path : '';
    this.imageReveal[1].path = Boolean(this.imageRevealInput.images[1].path) ? this.imageRevealInput.images[1].path : '';

    [this.imageReveal[0].width, this.imageReveal[1].width] = this.calculateWidth();

    this.revealWidth = this.imageReveal[0].width + this.imageReveal[1].width + this.handleWidth;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isResizing) {
      return;
    }
    const delta = event.clientX - this.lastX;
    this.imageReveal[0].width += delta;
    this.imageReveal[1].width -= delta;
    this.lastX = event.clientX;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isResizing) {
      return;
    }
    const delta = event.touches[0].clientX - this.lastX;
    this.imageReveal[0].width += delta;
    this.imageReveal[1].width -= delta;
    this.lastX = event.touches[0].clientX;
  }

  onMouseStart(event: MouseEvent): void {
    this.isResizing = true;
    this.lastX = event.clientX;
  }

  onTouchStart(event: TouchEvent): void {
    this.isResizing = true;
    this.lastX = event.touches[0].clientX;
  }

  onResizeFinish(): void {
    this.isResizing = false;
  }

  onResize(): void {
    [this.imageReveal[0].width, this.imageReveal[1].width] = this.calculateWidth();
    this.revealWidth = this.imageReveal[0].width + this.imageReveal[1].width + this.handleWidth;
  }

  private calculateWidth(): [number, number] {
    const hasInputWidthSet = (item: IImageReveal): boolean => Boolean(item.width);
    const removeHandleWidth = (revealWidth: number): number => revealWidth - (this.handleWidth / 2);
    const revealElement = this.reveal.nativeElement as HTMLElement;
    const defaultRevealWidth = revealElement.offsetWidth / 2;

    let width1 = defaultRevealWidth;
    let width2 = defaultRevealWidth;

    if (this.imageRevealInput.images.every(hasInputWidthSet)) {
      width1 = revealElement.offsetWidth - (revealElement.offsetWidth - this.imageRevealInput.images[0].width);
      width2 = revealElement.offsetWidth - (revealElement.offsetWidth - this.imageRevealInput.images[1].width);
    } else {
      if (hasInputWidthSet(this.imageRevealInput.images[0])) {
        width2 = revealElement.offsetWidth - this.imageRevealInput.images[0].width;
        width1 = revealElement.offsetWidth - (width2);
      }
      if (hasInputWidthSet(this.imageRevealInput.images[1])) {
        width1 = revealElement.offsetWidth - this.imageRevealInput.images[1].width;
        width2 = revealElement.offsetWidth - (width1);
      }
    }

    return [removeHandleWidth(width1), removeHandleWidth(width2)];
  }

}
