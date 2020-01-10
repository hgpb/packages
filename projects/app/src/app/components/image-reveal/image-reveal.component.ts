import { Component, OnInit } from '@angular/core';

import {
  IImageRevealViewport
} from '../../../../../component-library/src/lib/image-reveal/interfaces/image-reveal-viewport.interface';
import {
  IImageRevealInput
} from '../../../../../component-library/src/lib/image-reveal/interfaces/image-reveal-input.interface';

@Component({
  selector: 'app-image-reveal',
  templateUrl: './image-reveal.component.html',
  styleUrls: ['./image-reveal.component.css']
})
export class ImageRevealComponent implements OnInit {
  public input: IImageRevealInput;
  private viewport1: IImageRevealViewport = {
    style: {
      backgroundImage: 'url(assets/img/auto-3368094.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center right',
      // width: 300,
    },
    hasParallax: true,
  };
  private viewport2: IImageRevealViewport = {
    style: {
      backgroundImage: 'url(assets/img/auto-3370706.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center right',
      // width: 300,
    },
    hasParallax: true,
  };
  private updateImageReveal(): void {
    this.input = {
      viewports: [ this.viewport1, this.viewport2 ],
      height: window.innerHeight,
      // handle: { width: 10 },
    };
  }

  constructor() { }

  ngOnInit() {
    this.updateImageReveal();
  }

  onResize(): void {
    this.updateImageReveal();
  }

}
