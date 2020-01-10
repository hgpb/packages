import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageParallaxLayerDirective } from './image-parallax.directive';

@NgModule({
  declarations: [
    ImageParallaxLayerDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ImageParallaxLayerDirective,
  ]
})
export class ImageParallaxModule { }
