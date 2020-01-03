import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {IImageRevealViewport} from './interfaces/image-reveal-viewport.interface';
import {IImageRevealInput} from './interfaces/image-reveal-input.interface';

@Component({
  selector: 'comp-image-reveal',
  templateUrl: 'image-reveal.component.html',
  styleUrls: ['image-reveal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageRevealComponent implements OnInit {
  private readonly DEFAULT_HANDLE_WIDTH = 4;
  private readonly DEFAULT_VIEWPORT_HEIGHT = 300;
  private isResizing = false;
  private lastX: number;

  @ViewChild('reveal', { static: true }) reveal: ElementRef;
  @Input() imageRevealInput: IImageRevealInput;

  viewports: [IImageRevealViewport, IImageRevealViewport] = [{}, {}];
  viewportHeight: number;
  revealWidth: number;
  handleWidth: number;

  constructor() { }

  ngOnInit(): void {
    this.handleWidth = Boolean(this.imageRevealInput.handle) ? this.imageRevealInput.handle.width : this.DEFAULT_HANDLE_WIDTH;
    this.viewportHeight = Boolean(this.imageRevealInput.height) ? this.imageRevealInput.height : this.DEFAULT_VIEWPORT_HEIGHT;

    this.viewports[0].imagePath = Boolean(this.imageRevealInput.viewports[0].imagePath) ? this.imageRevealInput.viewports[0].imagePath : '';
    this.viewports[1].imagePath = Boolean(this.imageRevealInput.viewports[1].imagePath) ? this.imageRevealInput.viewports[1].imagePath : '';

    [this.viewports[0].width, this.viewports[1].width] = this.calculateViewportWidths();

    this.revealWidth = this.calculateTotalWidth();
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isResizing) {
      return;
    }
    const delta = event.clientX - this.lastX;
    this.viewports[0].width += delta;
    this.viewports[1].width -= delta;
    this.lastX = event.clientX;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isResizing) {
      return;
    }
    const delta = event.touches[0].clientX - this.lastX;
    this.viewports[0].width += delta;
    this.viewports[1].width -= delta;
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
    this.viewportHeight = Boolean(this.imageRevealInput.height) ? this.imageRevealInput.height : this.DEFAULT_VIEWPORT_HEIGHT;

    [this.viewports[0].width, this.viewports[1].width] = this.calculateViewportWidths();
    this.revealWidth = this.calculateTotalWidth();
  }

  private calculateViewportWidths(): [number, number] {
    const hasInputWidthSet = (item: IImageRevealViewport): boolean => Boolean(item.width);
    const removeHandleWidth = (revealWidth: number): number => revealWidth - (this.handleWidth / 2);
    const revealElement = this.reveal.nativeElement as HTMLElement;
    const defaultRevealWidth = revealElement.offsetWidth / 2;

    let width1 = defaultRevealWidth;
    let width2 = defaultRevealWidth;

    if (this.imageRevealInput.viewports.every(hasInputWidthSet)) {
      width1 = revealElement.offsetWidth - (revealElement.offsetWidth - this.imageRevealInput.viewports[0].width);
      width2 = revealElement.offsetWidth - (revealElement.offsetWidth - this.imageRevealInput.viewports[1].width);
    } else {
      if (hasInputWidthSet(this.imageRevealInput.viewports[0])) {
        width2 = revealElement.offsetWidth - this.imageRevealInput.viewports[0].width;
        width1 = revealElement.offsetWidth - (width2);
      }
      if (hasInputWidthSet(this.imageRevealInput.viewports[1])) {
        width1 = revealElement.offsetWidth - this.imageRevealInput.viewports[1].width;
        width2 = revealElement.offsetWidth - (width1);
      }
    }

    return [removeHandleWidth(width1), removeHandleWidth(width2)];
  }

  private calculateTotalWidth(): number {
    return this.viewports[0].width + this.viewports[1].width + this.handleWidth;
  }

}
