import { Component, OnInit } from '@angular/core';

import {
  IImageRevealViewport
} from '../../../../../component-library/src/lib/components/image-reveal/interfaces/image-reveal-viewport.interface';
import {
  IImageRevealInput
} from '../../../../../component-library/src/lib/components/image-reveal/interfaces/image-reveal-input.interface';

@Component({
  selector: 'app-image-reveal',
  templateUrl: './image-reveal.component.html',
  styleUrls: ['./image-reveal.component.css']
})
export class ImageRevealComponent implements OnInit {
  imageRevealInput: IImageRevealInput;
  private viewport1: IImageRevealViewport = {
    imagePath: 'assets/img/image-reveal/auto-3368094.jpg',
  }
  private viewport2: IImageRevealViewport = {
    imagePath: 'assets/img/image-reveal/auto-3370706.jpg',
  }

  constructor() { }

  ngOnInit() {
    this.updateImageReveal();
  }

  onResize(): void {
    this.updateImageReveal();
  }

  private updateImageReveal(): void {
    this.imageRevealInput = {
      viewports: [ this.viewport1, this.viewport2 ],
      height: window.innerHeight,
    };
  }

}
