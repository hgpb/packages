import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

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

  public ir: IImageRevealInput = { viewports: [{}, {}], handle: {} };
  public irWidth: number;

  private readonly DEFAULT_HANDLE_WIDTH = 4;
  private readonly DEFAULT_IMAGE_REVEAL_HEIGHT = 300;
  private isResizing = false;
  private lastX: number;

  constructor() { }

  ngOnInit(): void {
    this.ir.height = this.getHeight();
    this.ir.handle.width = this.getHandleWidth();
    [this.ir.viewports[VIEWPORT.LEFT].style, this.ir.viewports[VIEWPORT.RIGHT].style] = this.setViewportStyle();
    [this.ir.viewports[VIEWPORT.LEFT].style.width, this.ir.viewports[VIEWPORT.RIGHT].style.width] = this.calcViewportWidths();
    [this.ir.viewports[VIEWPORT.LEFT].hasParallax, this.ir.viewports[VIEWPORT.RIGHT].hasParallax] = this.setViewportHasParallax();

    this.irWidth = this.calculateTotalWidth();
  }

  onMouseStart(e: MouseEvent): void {
    this.isResizing = true;
    this.lastX = e.clientX;
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.isResizing) {
      return;
    }
    const delta = e.clientX - this.lastX;
    this.updateViewportWidths(delta);
    this.lastX = e.clientX;
  }

  onTouchStart(e: TouchEvent): void {
    this.isResizing = true;
    this.lastX = e.touches[0].clientX;
  }

  onTouchMove(e: TouchEvent): void {
    if (!this.isResizing) {
      return;
    }
    const delta = e.touches[0].clientX - this.lastX;
    this.updateViewportWidths(delta);
    this.lastX = e.touches[0].clientX;
  }

  onResizeFinish(): void {
    this.isResizing = false;
  }

  onResize(): void {
    this.ir.height = this.getHeight();
    [this.ir.viewports[VIEWPORT.LEFT].style.width, this.ir.viewports[VIEWPORT.RIGHT].style.width] = this.calcViewportWidths();

    this.irWidth = this.calculateTotalWidth();
  }

  private setViewportHasParallax(): [boolean, boolean] {
    return [this.getHasParallax(VIEWPORT.LEFT), this.getHasParallax(VIEWPORT.RIGHT)];
  }

  private setViewportStyle(): [any, any] {
    return [this.getStyle(VIEWPORT.LEFT), this.getStyle(VIEWPORT.RIGHT)];
  }

  private updateViewportWidths(delta: number): void {
    this.ir.viewports[VIEWPORT.LEFT].style.width += delta;
    this.ir.viewports[VIEWPORT.RIGHT].style.width -= delta;
  }

  private calcViewportWidths(): [number, number] {
    const hasInputWidthSet = (viewport: IImageRevealViewport): boolean => Boolean(viewport.style.width);
    const removeHandleWidth = (revealWidth: number): number => revealWidth - (this.getHandleWidth() / 2);
    const revealElement = this.elemReveal.nativeElement as HTMLElement;
    const defaultRevealWidth = revealElement.offsetWidth / 2;
    const widths: [number, number] = [defaultRevealWidth, defaultRevealWidth];
    if (this.input.viewports.every(hasInputWidthSet)) {
      widths[VIEWPORT.LEFT] = revealElement.offsetWidth - (revealElement.offsetWidth - this.input.viewports[VIEWPORT.LEFT].style.width);
      widths[VIEWPORT.RIGHT] = revealElement.offsetWidth - (revealElement.offsetWidth - this.input.viewports[VIEWPORT.RIGHT].style.width);
    } else {
      if (hasInputWidthSet(this.input.viewports[VIEWPORT.LEFT])) {
        widths[VIEWPORT.RIGHT] = revealElement.offsetWidth - this.input.viewports[VIEWPORT.LEFT].style.width;
        widths[VIEWPORT.LEFT] = revealElement.offsetWidth - (widths[VIEWPORT.RIGHT]);
      }
      if (hasInputWidthSet(this.input.viewports[VIEWPORT.RIGHT])) {
        widths[VIEWPORT.LEFT] = revealElement.offsetWidth - this.input.viewports[VIEWPORT.RIGHT].style.width;
        widths[VIEWPORT.RIGHT] = revealElement.offsetWidth - (widths[VIEWPORT.LEFT]);
      }
    }

    return [removeHandleWidth(widths[VIEWPORT.LEFT]), removeHandleWidth(widths[VIEWPORT.RIGHT])];
  }

  private calculateTotalWidth(): number {
    return this.ir.viewports[VIEWPORT.LEFT].style.width + this.ir.viewports[VIEWPORT.RIGHT].style.width + this.ir.handle.width;
  }

  private getHandleWidth(): number {
    return Boolean(this.input.handle) && Boolean(this.input.handle.width) ? this.input.handle.width : this.DEFAULT_HANDLE_WIDTH;
  }

  private getHeight(): number {
    return Boolean(this.input.height) ? this.input.height : this.DEFAULT_IMAGE_REVEAL_HEIGHT;
  }

  private getStyle(idx: VIEWPORT): any {
    return Boolean(this.input.viewports[idx].style) ? {...this.input.viewports[idx].style} : {};
  }

  private getHasParallax(idx: VIEWPORT): boolean {
    return Boolean(this.input.viewports[idx].hasParallax) ? this.input.viewports[idx].hasParallax : false;
  }

}
