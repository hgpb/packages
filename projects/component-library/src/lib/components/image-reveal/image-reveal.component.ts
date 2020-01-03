import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {IImageRevealViewport} from './interfaces/image-reveal-viewport.interface';
import {IImageRevealInput} from './interfaces/image-reveal-input.interface';

enum VIEWPORT {
  LEFT = 0,
  RIGHT = 1,
}

@Component({
  selector: 'comp-image-reveal',
  templateUrl: 'image-reveal.component.html',
  styleUrls: ['image-reveal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageRevealComponent implements OnInit {
  @Input() input: IImageRevealInput;
  @ViewChild('reveal', { static: true }) elemReveal: ElementRef;

  public ir: IImageRevealInput = { viewports:  [{}, {}], handle: {} };
  public irWidth: number;

  private readonly DEFAULT_HANDLE_WIDTH = 4;
  private readonly DEFAULT_IMAGE_REVEAL_HEIGHT = 300;
  private isResizing = false;
  private lastX: number;

  constructor() { }

  ngOnInit(): void {
    this.ir.height = this.getHeight();
    this.ir.handle.width = this.getHandleWidth();
    [this.ir.viewports[VIEWPORT.LEFT].width, this.ir.viewports[VIEWPORT.RIGHT].width] = this.calcViewportWidths();
    [this.ir.viewports[VIEWPORT.LEFT].imagePath, this.ir.viewports[VIEWPORT.RIGHT].imagePath] = this.setViewportImagePaths();

    this.irWidth = this.calculateTotalWidth();
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isResizing) {
      return;
    }
    const delta = event.clientX - this.lastX;
    this.updateViewportWidths(delta);
    this.lastX = event.clientX;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isResizing) {
      return;
    }
    const delta = event.touches[0].clientX - this.lastX;
    this.updateViewportWidths(delta);
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
    this.ir.height = this.getHeight();
    [this.ir.viewports[VIEWPORT.LEFT].width, this.ir.viewports[VIEWPORT.RIGHT].width] = this.calcViewportWidths();

    this.irWidth = this.calculateTotalWidth();
  }

  private setViewportImagePaths(): [string, string] {
    return [this.getImagePath(VIEWPORT.LEFT), this.getImagePath(VIEWPORT.RIGHT)];
  }

  private updateViewportWidths(delta: number) {
    this.ir.viewports[VIEWPORT.LEFT].width += delta;
    this.ir.viewports[VIEWPORT.RIGHT].width -= delta;
  }

  private calcViewportWidths(): [number, number] {
    const hasInputWidthSet = (item: IImageRevealViewport): boolean => Boolean(item.width);
    const removeHandleWidth = (revealWidth: number): number => revealWidth - (this.getHandleWidth() / 2);
    const revealElement = this.elemReveal.nativeElement as HTMLElement;
    const defaultRevealWidth = revealElement.offsetWidth / 2;
    const widths: [number, number] = [defaultRevealWidth, defaultRevealWidth];

    if (this.input.viewports.every(hasInputWidthSet)) {
      widths[VIEWPORT.LEFT] = revealElement.offsetWidth - (revealElement.offsetWidth -
        this.input.viewports[VIEWPORT.LEFT].width);
      widths[VIEWPORT.RIGHT] = revealElement.offsetWidth - (revealElement.offsetWidth -
        this.input.viewports[VIEWPORT.RIGHT].width);
    } else {
      if (hasInputWidthSet(this.input.viewports[VIEWPORT.LEFT])) {
        widths[VIEWPORT.RIGHT] = revealElement.offsetWidth - this.input.viewports[VIEWPORT.LEFT].width;
        widths[VIEWPORT.LEFT] = revealElement.offsetWidth - (widths[VIEWPORT.RIGHT]);
      }
      if (hasInputWidthSet(this.input.viewports[VIEWPORT.RIGHT])) {
        widths[VIEWPORT.LEFT] = revealElement.offsetWidth - this.input.viewports[VIEWPORT.RIGHT].width;
        widths[VIEWPORT.RIGHT] = revealElement.offsetWidth - (widths[VIEWPORT.LEFT]);
      }
    }

    return [removeHandleWidth(widths[VIEWPORT.LEFT]), removeHandleWidth(widths[VIEWPORT.RIGHT])];
  }

  private calculateTotalWidth(): number {
    return this.ir.viewports[VIEWPORT.LEFT].width + this.ir.viewports[VIEWPORT.RIGHT].width + this.ir.handle.width;
  }

  private getHandleWidth(): number {
    return Boolean(this.input.handle) && Boolean(this.input.handle.width) ? this.input.handle.width : this.DEFAULT_HANDLE_WIDTH;
  }

  private getHeight(): number {
    return Boolean(this.input.height) ? this.input.height : this.DEFAULT_IMAGE_REVEAL_HEIGHT;
  }

  private getImagePath(idx: VIEWPORT): string {
    return Boolean(this.input.viewports[idx].imagePath) ? this.input.viewports[idx].imagePath : '';
  }

}
