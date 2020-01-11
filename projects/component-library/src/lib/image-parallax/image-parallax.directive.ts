import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';

import ResizeObserver from 'resize-observer-polyfill';

enum DIMENSION {
  WIDTH = 0,
  HEIGHT = 1,
}

@Directive({selector: '[compParallaxLayer]'})
export class ImageParallaxDirective implements OnInit, OnDestroy {
  private bckgrdImg: HTMLImageElement;
  private bckgrdImgOrig: HTMLImageElement;
  private bckgrdPositionX: string;
  private bckgrdPositionY: string;
  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.saveBackgroundImage();
    this.saveBackgroundPositions();
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.unobserve(this.el.nativeElement);
  }

  @HostListener('touchmove', ['$event.changedTouches'])
  onTouchMove(touchList: TouchList): void {
    const [offsetX, offsetY] = this.calculateOffset(touchList);
    if (offsetX < 0) {
      return;
    }
    if (offsetX > this.el.nativeElement.offsetWidth) {
      return;
    }
    this.adjustBackgroundSize();
    this.calculatePosition(offsetX, offsetY);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.adjustBackgroundSize();
    this.calculatePosition(e.offsetX, e.offsetY);
  }

  private onResize(): void {
    this.adjustBackgroundSize();
    this.el.nativeElement.style.backgroundPositionX = this.bckgrdPositionX;
    this.el.nativeElement.style.backgroundPositionY = this.bckgrdPositionY;
  }

  private calculateOffset(touchList: TouchList): [number, number] {
    const parentRect = this.el.nativeElement.parentElement.getBoundingClientRect();
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = touchList[0].clientX - (rect.left - parentRect.left);
    const y = touchList[0].clientY - (rect.top - parentRect.top);

    return [x, y];
  }

  private saveBackgroundImage(): void {
    this.bckgrdImgOrig = new Image();
    this.bckgrdImgOrig.onload = () => {
      this.adjustBackgroundSize();
    };
    this.bckgrdImgOrig.src = this.el.nativeElement.style.backgroundImage.replace(/url\("|"\)$/ig, '');
    this.bckgrdImg = this.bckgrdImgOrig.cloneNode(true) as HTMLImageElement;
  }

  private saveBackgroundPositions(): void {
    this.bckgrdPositionX = this.el.nativeElement.style.backgroundPositionX;
    this.bckgrdPositionY = this.el.nativeElement.style.backgroundPositionY;
  }

  private adjustBackgroundSize(): void {
    if (this.el.nativeElement.style.backgroundSize === 'cover') {
      this.bckgrdImg.width = this.bckgrdImgOrig.width / this.bckgrdImgOrig.height * this.el.nativeElement.offsetHeight;
      this.bckgrdImg.height = this.bckgrdImgOrig.height / this.bckgrdImgOrig.width * this.el.nativeElement.offsetWidth;
    } else if (this.el.nativeElement.style.backgroundSize === 'contain') {
      if (this.bckgrdImgOrig.width > this.bckgrdImgOrig.height) {
        this.bckgrdImg.width = this.el.nativeElement.offsetWidth;
        const height = this.bckgrdImgOrig.height / this.bckgrdImgOrig.width * this.el.nativeElement.offsetWidth;
        if (height > this.el.nativeElement.offsetHeight) {
          this.bckgrdImg.height = this.el.nativeElement.offsetHeight;
        } else {
          this.bckgrdImg.height = height;
        }
      } else {
        this.bckgrdImg.height = this.el.nativeElement.offsetHeight;
        const width = this.bckgrdImgOrig.width / this.bckgrdImgOrig.height * this.el.nativeElement.offsetHeight
        if (width > this.el.nativeElement.offsetHeight) {
          this.bckgrdImg.width = this.el.nativeElement.offsetWidth;
        } else {
          this.bckgrdImg.width = width;
        }
      }
    } else {
      const bckgrdSizeValue = ['', ''];
      [bckgrdSizeValue[DIMENSION.WIDTH], bckgrdSizeValue[DIMENSION.HEIGHT]] = this.el.nativeElement.style.backgroundSize.split(' ');
      const parsedWidth = parseFloat(bckgrdSizeValue[DIMENSION.WIDTH]);
      const parsedHeight = parseFloat(bckgrdSizeValue[DIMENSION.HEIGHT]);
      if (bckgrdSizeValue[DIMENSION.WIDTH] && bckgrdSizeValue[DIMENSION.HEIGHT]) {
        // px
        if (bckgrdSizeValue[DIMENSION.WIDTH].indexOf('px') > 0) {
          this.bckgrdImg.width = parsedWidth;
        }
        if (bckgrdSizeValue[DIMENSION.HEIGHT].indexOf('px') > 0) {
          this.bckgrdImg.height = parsedHeight;
        }
        // %
        if (bckgrdSizeValue[DIMENSION.WIDTH].indexOf('%') > 0) {
          this.bckgrdImg.width = this.el.nativeElement.offsetWidth * parsedWidth / 100;
        }
        if (bckgrdSizeValue[DIMENSION.HEIGHT].indexOf('%') > 0) {
          this.bckgrdImg.height = this.el.nativeElement.offsetHeight * parsedHeight / 100;
        }
      } else if (bckgrdSizeValue[DIMENSION.WIDTH]) {
        // px
        if (bckgrdSizeValue[DIMENSION.WIDTH].indexOf('px') > 0) {
          this.bckgrdImg.width = parsedWidth;
          this.bckgrdImg.height = this.bckgrdImgOrig.height / this.bckgrdImgOrig.width * parsedWidth;
        }
        // %
        if (bckgrdSizeValue[DIMENSION.WIDTH].indexOf('%') > 0) {
          const percent = parsedWidth;
          this.bckgrdImg.width = this.el.nativeElement.offsetWidth * percent;
          this.bckgrdImg.height = this.bckgrdImgOrig.height / this.bckgrdImgOrig.width * this.el.nativeElement.offsetWidth * percent;
        }
      }
    }
  }

  private calculatePosition(x: number, y: number): void {
    if (this.isViewportWidthGreaterThanImg() && this.isViewportHeightGreaterThanImg()) {
      console.log('moo', this.el.nativeElement.offsetWidth, this.bckgrdImg.width);
      this.el.nativeElement.style.backgroundPositionX = this.bckgrdPositionX;
      this.el.nativeElement.style.backgroundPositionY = this.bckgrdPositionY;
    } else if (this.isViewportWidthGreaterThanImg()) {
      this.el.nativeElement.style.backgroundPositionX = this.bckgrdPositionX;
      if (this.calculateBackgroundPositionY(y)) {
        this.el.nativeElement.style.backgroundPositionY = `${this.calculateBackgroundPositionY(y)}px`;
      }
    } else if (this.isViewportHeightGreaterThanImg()) {
      this.el.nativeElement.style.backgroundPositionY = this.bckgrdPositionY;
      if (this.calculateBackgroundPositionX(x)) {
        this.el.nativeElement.style.backgroundPositionX = `${this.calculateBackgroundPositionX(x)}px`;
      }
    } else {
      if (this.calculateBackgroundPositionX(x)) {
        this.el.nativeElement.style.backgroundPositionX = `${this.calculateBackgroundPositionX(x)}px`;
      } else {
        this.el.nativeElement.style.backgroundPositionX = this.bckgrdPositionX;
      }
      if (this.calculateBackgroundPositionY(y)) {
        this.el.nativeElement.style.backgroundPositionY = `${this.calculateBackgroundPositionY(y)}px`;
      } else {
        this.el.nativeElement.style.backgroundPositionY = this.bckgrdPositionY;
      }
    }


  }

  private isViewportWidthGreaterThanImg(): boolean {
    return this.el.nativeElement.offsetWidth > this.bckgrdImg.width;
  }

  private isViewportHeightGreaterThanImg(): boolean {
    return this.el.nativeElement.offsetHeight > this.bckgrdImg.height;
  }

  private calculateBackgroundPositionX(x: number): number {
    const w = ((this.el.nativeElement.offsetWidth - (this.el.nativeElement.offsetWidth - x)) / this.el.nativeElement.offsetWidth);

    return -(w * this.bckgrdImg.width - w * this.el.nativeElement.offsetWidth);
  }

  private calculateBackgroundPositionY(y: number): number {
    const h = ((this.el.nativeElement.offsetHeight - (this.el.nativeElement.offsetHeight - y)) / this.el.nativeElement.offsetHeight);

    return -(h * this.bckgrdImg.height - h * this.el.nativeElement.offsetHeight);
  }
}
